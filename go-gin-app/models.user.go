// models.user.go

package main

import (
	"database/sql"
	"errors"
	"fmt"
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
