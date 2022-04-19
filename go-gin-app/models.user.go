// models.user.go

package main

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

type user struct {
	Gatorlink string `json:"gatorlink"`
	GatorPW   string `json:"gatorPW"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Birthday  string `json:"birthday"`
	Gender    string `json:"gender"`
}

type mingleUser struct {
	Username string `form:"username" json:"username"`
	Password string `form:"password" json:"password"`
}

// For this demo, we're storing the user list in memory
// We also have some users predefined.
// In a real application, this list will most likely be fetched
// from a database. Moreover, in production settings, you should
// store passwords securely by salting and hashing them instead
// of using them as we're doing in this demo
//var userList = []user{
//	user{Username: "user1", Password: "pass1"},
//	user{Username: "user2", Password: "pass2"},
//	user{Username: "user3", Password: "pass3"},
//}

// Get all the records in the table users
func getAllUsers() ([]user, error) {
	rows, err := DB.Query("SELECT username, password FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var userList []user

	for rows.Next() {
		var u user
		if err := rows.Scan(&u.Username, &u.Password); err != nil {
			return nil, err
		}
		userList = append(userList, u)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return userList, nil
}

// Check if the username and password combination is valid
func isUserExist(u string) (bool, error) {
	//for _, u := range userList {
	//	if u.Username == username && u.Password == password {
	//		return true
	//	}
	//}
	//return false
	stmt, err := DB.Prepare("SELECT username, password FROM users WHERE username = ?")

	if err != nil {
		return false, err
	}
	//fmt.Println(u.Username, u.Password)
	defer stmt.Close()

	var temp mingleUser
	sqlErr := stmt.QueryRow(u).Scan(&temp.Username, &temp.Password)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			//The user does not exist
			return false, nil
		}
		return false, sqlErr
	}
	return true, nil
}

// Check if the username and password combination is valid
func isUserValid(u mingleUser) (bool, error) {
	//for _, u := range userList {
	//	if u.Username == username && u.Password == password {
	//		return true
	//	}
	//}
	//return false
	stmt, err := DB.Prepare("SELECT username, password FROM users WHERE username = ? AND password = ?")

	if err != nil {
		return false, err
	}
	//fmt.Println(u.Username, u.Password)
	defer stmt.Close()

	var temp mingleUser
	sqlErr := stmt.QueryRow(u.Username, u.Password).Scan(&temp.Username, &temp.Password)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			//The user does not exist
			return false, nil
		}
		return false, sqlErr
	}
	return true, nil
}

// Register a new user with the given username and password
// NOTE: For this demo, we
func registerNewUser(newUser user) (int64, error) {
	if strings.TrimSpace(newUser.Password) == "" {
		return 0, errors.New("The password can't be empty")
	}

	flag, err := isGatorIdAvailable(newUser.Gatorlink, newUser.GatorPW)
	if flag == false && err == nil {
		return 0, errors.New("The username is not available")
	}

	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := tx.Prepare("INSERT INTO users (username, password, gatorID, gender, birthday) VALUES (?, ?, ?, ?, ?)")

	if err != nil {
		return 0, err
	}

	defer stmt.Close()

	result, err := stmt.Exec(newUser.Username, newUser.Password, newUser.Gatorlink, newUser.Gender, newUser.Birthday)

	if err != nil {
		return 0, err
	}

	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	tx.Commit()

	return num, nil
}

// Check if the supplied username is available
func isGatorIdAvailable(gatorid string, gatorpw string) (bool, error) {
	//for _, u := range userList {
	//	if u.Username == username {
	//		return false
	//	}
	//}
	//return true
	stmt, err := DB.Prepare("SELECT password FROM gatorlink WHERE gatorId = ?")
	if err != nil {
		return false, err
	}

	defer stmt.Close()

	var tempPW string
	sqlErr := stmt.QueryRow(gatorid).Scan(&tempPW)

	if sqlErr != nil || tempPW != gatorpw {
		if sqlErr == sql.ErrNoRows {
			return true, nil
		}
		return false, sqlErr
	}

	return true, nil
}

// Check if the supplied username is available
func isUsernameAvailable(username string) (bool, error) {
	stmt, err := DB.Prepare("SELECT username FROM users WHERE username = ?")
	if err != nil {
		return false, err
	}

	defer stmt.Close()

	var tmpName string
	sqlErr := stmt.QueryRow(username).Scan(&tmpName)

	if sqlErr == sql.ErrNoRows {
		return true, nil
	} else {
		return false, sqlErr
	}

}

func deleteUser(username string) (int64, error) {
	tx, err := DB.Begin()

	if err != nil {
		return 0, err
	}

	stmt, err := DB.Prepare("DELETE from users where username = ?")

	if err != nil {
		return 0, err
	}

	defer stmt.Close()

	result, err := stmt.Exec(username)

	if err != nil {
		return 0, err
	}

	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	tx.Commit()

	return num, nil
}

//item:
// -password
// -birthday
// -gender
//func updateUserItem(username string, column string, content string) (int64, error) {
//	switch column {
//	case "password":
//		stmt, err := DB.Prepare("UPDATE users SET password=? WHERE username=?")
//		if err != nil {
//			return 0, err
//		}
//		res, errStmt := stmt.Exec(content, username)
//		if errStmt != nil {
//			return 0, errStmt
//		}
//		affect, errRes := res.RowsAffected()
//		if errRes != nil {
//			return 0, errRes
//		}
//		return affect, nil
//	case "birthday":
//		stmt, err := DB.Prepare("UPDATE users SET birthday=? WHERE username=?")
//		if err != nil {
//			return 0, err
//		}
//		res, errStmt := stmt.Exec(content, username)
//		if errStmt != nil {
//			return 0, errStmt
//		}
//		affect, errRes := res.RowsAffected()
//		if errRes != nil {
//			return 0, errRes
//		}
//		return affect, nil
//	case "gender":
//		stmt, err := DB.Prepare("UPDATE users SET gender=? WHERE username=?")
//		if err != nil {
//			return 0, err
//		}
//		res, errStmt := stmt.Exec(content, username)
//		if errStmt != nil {
//			return 0, errStmt
//		}
//		affect, errRes := res.RowsAffected()
//		if errRes != nil {
//			return 0, errRes
//		}
//		return affect, nil
//	default:
//		return 0, errors.New("invalid parameters")
//	}
//}

//Returned value should be equal to the length of the map
func updateUserItem(username string, content map[string]string) (int64, error) {
	var affect int64
	for k, v := range content {
		value := "'" + v + "'"
		tempUsername := "'" + username + "'"
		update := fmt.Sprintf("UPDATE users SET %s=%s WHERE username=%s", k, value, tempUsername)
		res, err := DB.Exec(update)
		if err != nil {
			return 0, err
		}
		eachAffect, errRes := res.RowsAffected()
		if errRes != nil {
			return 0, errRes
		}
		affect += eachAffect
	}
	return affect, nil
}

func getUserByUsername(username string) (user, error) {
	stmt, err := DB.Prepare("SELECT password, gatorId, birthday, gender FROM users WHERE username=?")
	if err != nil {
		return user{}, err
	}

	defer stmt.Close()

	userResult := user{}

	sqlErr := stmt.QueryRow(username).Scan(&userResult.Password, &userResult.Gatorlink, &userResult.Birthday, &userResult.Gender)

	if sqlErr != nil {
		return user{}, sqlErr
	}
	return userResult, nil
}

//一个用户可能对一篇文章点过赞，点过踩，或者没做过操作
//第一个返回int 状态 未操作:0；赞过:1；踩过:2，出错:-1
//第二个返回int 下标 状态为0/-1时，返回-1
func checkArticleStatus(username string, articleId int) (int, int, error) {
	stmt, err := DB.Prepare("SELECT like_list, dislike_list FROM users WHERE username=?")
	if err != nil {
		return -1, -1, err
	}
	defer stmt.Close()

	var queryLike string
	var queryDislike string
	sqlErr := stmt.QueryRow(username).Scan(&queryLike, &queryDislike)
	if sqlErr != nil {
		return -1, -1, sqlErr
	}

	res := 0
	index := -1

	//如果queryLike/queryDislike为空
	if queryLike == "" && queryDislike == "" {
		return 0, -1, nil
	}

	if queryLike == "" && queryDislike != "" {
		indexDislike, ifDisliked, err := checkIfStrContainsEle(queryDislike, articleId)
		if err != nil {
			return -1, -1, err
		}
		if ifDisliked {
			res = 2
			index = indexDislike
		}
	}

	if queryLike != "" && queryDislike == "" {
		indexLike, ifLiked, err := checkIfStrContainsEle(queryLike, articleId)
		if err != nil {
			return -1, -1, err
		}
		if ifLiked {
			res = 1
			index = indexLike
		}
	}

	if queryLike != "" && queryDislike != "" {
		indexLike, ifLiked, errLike := checkIfStrContainsEle(queryLike, articleId)
		if errLike != nil {
			return -1, -1, errLike
		}
		indexDislike, ifDisliked, errDislike := checkIfStrContainsEle(queryDislike, articleId)
		if errDislike != nil {
			return -1, -1, errDislike
		}
		if ifLiked {
			res = 1
			index = indexLike
		} else if ifDisliked {
			res = 2
			index = indexDislike
		}
	}

	return res, index, nil
}

//三个参数：username, articleId, status
//status = true  点赞
//status = false 点踩
//返回affectUsers, affectArticles, error
func changeArticleStatus(username string, articleId int, thumbsUp bool) (int64, int64, error) {
	//先查看之前是否点过赞或踩，一个用户只能对一篇文章赞或踩一次，这个判断由前端做
	//未操作:0；赞过:1；踩过:2，出错:-1
	status, index, err := checkArticleStatus(username, articleId)
	if err != nil {
		return 0, 0, err
	}

	stmtQuery, errQuery := DB.Prepare("SELECT like_list, dislike_list FROM users WHERE username=?")
	if errQuery != nil {
		return 0, 0, errQuery
	}
	defer stmtQuery.Close()

	var likeStr, dislikeStr string
	sqlErr := stmtQuery.QueryRow(username).Scan(&likeStr, &dislikeStr)
	if sqlErr != nil {
		return 0, 0, sqlErr
	}

	stmtUpdateUserLike, err := DB.Prepare("UPDATE users SET like_list=? WHERE username=?")
	if err != nil {
		return 0, 0, err
	}

	stmtUpdateUserDislike, err := DB.Prepare("UPDATE users SET dislike_list=? WHERE username=?")
	if err != nil {
		return 0, 0, err
	}

	stmtUpdate, errUpdate := DB.Prepare("UPDATE users SET like_list=?, dislike_list=? WHERE username=?")
	if errUpdate != nil {
		return 0, 0, err
	}
	defer stmtUpdate.Close()

	if likeStr == "" && dislikeStr == "" {
		if thumbsUp == true {
			//点赞
			res, err := stmtUpdateUserLike.Exec(strconv.Itoa(articleId), username)
			if err != nil {
				return 0, 0, err
			}
			affectUser, err := res.RowsAffected()
			if err != nil {
				return 0, 0, err
			}
			affectArticle, err := reactionToAnArticle(articleId, 1, 0)
			if err != nil {
				return 0, 0, err
			}
			return affectUser, affectArticle, nil
		} else {
			//点踩
			res, err := stmtUpdateUserDislike.Exec(strconv.Itoa(articleId), username)
			if err != nil {
				return 0, 0, err
			}
			affectUser, err := res.RowsAffected()
			if err != nil {
				return 0, 0, err
			}
			affectArticle, err := reactionToAnArticle(articleId, 0, 1)
			if err != nil {
				return 0, 0, err
			}
			return affectUser, affectArticle, nil
		}
	}

	if likeStr != "" && dislikeStr == "" {
		if thumbsUp == true {
			//点赞
			res, err := stmtUpdateUserLike.Exec(strconv.Itoa(articleId), username)
			if err != nil {
				return 0, 0, err
			}
			affectUser, err := res.RowsAffected()
			if err != nil {
				return 0, 0, err
			}
			affectArticle, err := reactionToAnArticle(articleId, 1, 0)
			if err != nil {
				return 0, 0, err
			}
			return affectUser, affectArticle, nil
		} else {
			//点踩
			indexLike, ifLiked, err := checkIfStrContainsEle(likeStr, articleId)
			if err != nil {
				return 0, 0, err
			}
			if ifLiked {
				likeList, err := convStrToIntList(likeStr)
				if err != nil {
					return 0, 0, err
				}
				likeList = append(likeList[:indexLike], likeList[indexLike+1:]...)
				newLikeStr := convIntListToStr(likeList)
				res, err := stmtUpdate.Exec(newLikeStr, strconv.Itoa(articleId), username)
				if err != nil {
					return 0, 0, err
				}
				affectUser, err := res.RowsAffected()
				if err != nil {
					return 0, 0, err
				}
				affectArticle, err := reactionToAnArticle(articleId, -1, 1)
				if err != nil {
					return 0, 0, err
				}
				return affectUser, affectArticle, nil
			} else {
				res, err := stmtUpdateUserDislike.Exec(strconv.Itoa(articleId), username)
				if err != nil {
					return 0, 0, err
				}
				affectUser, err := res.RowsAffected()
				if err != nil {
					return 0, 0, err
				}
				affectArticle, err := reactionToAnArticle(articleId, 0, 1)
				if err != nil {
					return 0, 0, err
				}
				return affectUser, affectArticle, nil
			}
		}
	}

	if likeStr == "" && dislikeStr != "" {
		if thumbsUp == true {
			//点赞
			indexDislike, ifDisliked, err := checkIfStrContainsEle(dislikeStr, articleId)
			if err != nil {
				return 0, 0, err
			}
			if ifDisliked {
				dislikeList, err := convStrToIntList(dislikeStr)
				if err != nil {
					return 0, 0, err
				}
				dislikeList = append(dislikeList[:indexDislike], dislikeList[indexDislike+1:]...)
				newDislikeStr := convIntListToStr(dislikeList)
				res, err := stmtUpdate.Exec(strconv.Itoa(articleId), newDislikeStr, username)
				if err != nil {
					return 0, 0, err
				}
				affectUser, err := res.RowsAffected()
				if err != nil {
					return 0, 0, err
				}
				affectArticle, err := reactionToAnArticle(articleId, 1, -1)
				if err != nil {
					return 0, 0, err
				}
				return affectUser, affectArticle, nil
			} else {
				res, err := stmtUpdateUserLike.Exec(strconv.Itoa(articleId), username)
				if err != nil {
					return 0, 0, err
				}
				affectUser, err := res.RowsAffected()
				if err != nil {
					return 0, 0, err
				}
				affectArticle, err := reactionToAnArticle(articleId, 1, 0)
				if err != nil {
					return 0, 0, err
				}
				return affectUser, affectArticle, nil
			}
		} else {
			//点踩
			res, err := stmtUpdateUserDislike.Exec(strconv.Itoa(articleId), username)
			if err != nil {
				return 0, 0, err
			}
			affectUser, err := res.RowsAffected()
			if err != nil {
				return 0, 0, err
			}
			affectArticle, err := reactionToAnArticle(articleId, 0, 1)
			if err != nil {
				return 0, 0, err
			}
			return affectUser, affectArticle, nil
		}
	}

	if likeStr != "" && dislikeStr != "" {
		likeList, err := convStrToIntList(likeStr)
		if err != nil {
			return 0, 0, err
		}
		dislikeList, err := convStrToIntList(dislikeStr)
		if err != nil {
			return 0, 0, err
		}

		likeNum := 0
		dislikeNum := 0
		newLikeStr := ""
		newDislikeStr := ""

		if status == 2 && index != -1 && thumbsUp == true {
			//之前点过踩，要赞，改变用户表中的两个列表，改变文章表中的两个统计数字
			//从dislike_list中删除，加到like_list中
			dislikeList = append(dislikeList[:index], dislikeList[index+1:]...)
			likeList = append(likeList, articleId)
			//更新文章表中的统计数字
			likeNum = 1
			dislikeNum = -1
		} else if status == 1 && index != -1 && thumbsUp == false {
			//之前点过赞，要踩
			//从like_list中删除，加到dislike_list中
			likeList = append(likeList[:index], likeList[index+1:]...)
			dislikeList = append(dislikeList, articleId)
			//更新文章表中的统计数字
			likeNum = -1
			dislikeNum = 1
		} else if status == 0 && index == -1 {
			//之前什么操作也没做过，要赞/踩
			if thumbsUp == true {
				likeList = append(likeList, articleId)
				likeNum = 1
			} else {
				dislikeList = append(dislikeList, articleId)
				dislikeNum = 1
			}
		}

		newDislikeStr = convIntListToStr(dislikeList)
		newLikeStr = convIntListToStr(likeList)
		res, errStmt := stmtUpdate.Exec(newLikeStr, newDislikeStr, username)
		if errStmt != nil {
			return 0, 0, errStmt
		}
		affectUsers, errRes := res.RowsAffected()
		if errRes != nil {
			return 0, 0, errRes
		}
		affectArticles, err := reactionToAnArticle(articleId, likeNum, dislikeNum)
		if err != nil {
			return 0, 0, err
		}

		return affectUsers, affectArticles, nil
	}

	return 0, 0, errors.New("error in changeArticleStatus")
}

//likes received
func getLikesReceived(username string) (int, error) {
	articleList, err := getArticlesByUser(username)
	if err != nil {
		return -1, err
	}

	likesReceived := 0
	for _, a := range articleList {
		likesReceived += a.Likes
	}

	return likesReceived, nil
}
