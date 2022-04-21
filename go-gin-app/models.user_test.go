// models.user_test.go

package main

import (
	"fmt"
	"testing"
)

// Test the validity of different combinations of username/password
func TestUserValidity(t *testing.T) {
	//TestUser_1 := user{Username: "user1", Password: "pass1"}
	//TestUser_2 := user{Username: "user2", Password: "pass1"}
	//TestUser_3 := user{Username: "user1", Password: ""}
	//TestUser_4 := user{Username: "", Password: "pass1"}
	//TestUser_5 := user{Username: "User1", Password: "pass1"}

	TestUser_1 := mingleUser{Username: "user1", Password: "pass1"}
	TestUser_2 := mingleUser{Username: "user3", Password: "pass1"}
	TestUser_3 := mingleUser{Username: "user1", Password: ""}
	TestUser_4 := mingleUser{Username: "", Password: "pass1"}
	TestUser_5 := mingleUser{Username: "User1", Password: "pass1"}

	status, err := isUserValid(TestUser_1)
	if !status || err != nil {
		t.Fail()
	}

	status, err = isUserValid(TestUser_2)
	if status || err != nil {
		t.Fail()
	}

	status, err = isUserValid(TestUser_3)
	if status || err != nil {
		t.Fail()
	}

	status, err = isUserValid(TestUser_4)
	if status || err != nil {
		t.Fail()
	}

	status, err = isUserValid(TestUser_5)
	if status || err != nil {
		t.Fail()
	}
}

// Test if a new user can be registered with valid username/password
func TestValidUserRegistration(t *testing.T) {
	//saveLists()

	//newUser := mingleUser{Username: "newuser", Password: "newpass"}
	newUser := user{Gatorlink: "user1@ufl.edu", GatorPW: "1111", Username: "TestUser", Password: "TestPass", Gender: "unknown"}
	num, err := registerNewUser(newUser)
	//fmt.Println(num, err)
	if err != nil || num == 0 {
		fmt.Println("TestValidUserRegistration 59 Failure")
		t.Fail()
	}

	num, err = deleteUser(newUser.Username)
	//fmt.Println(err)
	if num == 0 || err != nil {
		fmt.Println("TestValidUserRegistration 66 Failure")
		t.Fail()
	}
	//restoreLists()
}

// Test that a new user cannot be registered with invalid username/password
func TestInvalidUserRegistration(t *testing.T) {
	//saveLists()

	// Try to register a user with a used username
	//usedUser := user{Username: "user1", Password: "pass1"}
	usedUser := user{Gatorlink: "user1@ufl.edu", GatorPW: "1111", Username: "user1", Password: "pass1"}
	num, err := registerNewUser(usedUser)
	if err == nil || num != 0 {
		t.Fail()
	}

	// Try to register with a blank password
	//invalidUser := user{Username: "newuser", Password: ""}
	//num, err = registerNewUser(invalidUser)

	// Try to register who is not a gator
	notGator := user{Gatorlink: "someone@ufl.edu", GatorPW: "somepass", Username: "TestUser", Password: "TestPass"}
	num, err = registerNewUser(notGator)
	if err == nil || num != 0 {
		t.Fail()
	}

	//restoreLists()
}

// Test the function that checks for username availability
func TestUsernameAvailability(t *testing.T) {
	//saveLists()

	// This username should be available
	status, err := isUsernameAvailable("newuser")
	if status == false || err != nil {
		fmt.Println("TestUsernameAvailability 105 Failure")
		t.Fail()
	}

	// This username should not be available
	status, err = isUsernameAvailable("user1")
	if status == true || err != nil {
		fmt.Println("TestUsernameAvailability 112 Failure")
		t.Fail()
	}

	// Register a new user
	newUser := user{Gatorlink: "user2@ufl.edu", GatorPW: "2222", Username: "newuser", Password: "newpass", Gender: "unknown"}
	affect, err := registerNewUser(newUser)
	if affect == 0 || err != nil {
		fmt.Println("TestUsernameAvailability 120 Failure", affect, err)
		t.Fail()
	}

	// This newly registered username should not be available
	status, err = isUsernameAvailable("newuser")
	if status == true || err != nil {
		fmt.Println("TestUsernameAvailability 127 Failure", status, err)
		t.Fail()
	}

	// Now this username should be available
	num, err := deleteUser(newUser.Username)
	if num == 0 || err != nil {
		fmt.Println("TestUsernameAvailability 134 Failure")
		t.Fail()
	}
	status, err = isUsernameAvailable("newuser")
	if status == false || err != nil {
		fmt.Println("TestUsernameAvailability 139 Failure")
		t.Fail()
	}
	//restoreLists()
}

//func TestAFunc(t *testing.T) {
//	str1 := "gender"
//	str2 := "female"
//	str2_2 := "'" + str2 + "'"
//	str3 := "user_mj"
//	str3_3 := "'" + str3 + "'"
//	query := fmt.Sprintf("UPDATE users SET %s=%s WHERE username=%s", str1, str2_2, str3_3)
//	//fmt.Println(query)
//	res, err := DB.Exec(query)
//	if err != nil {
//		fmt.Println(err)
//	}
//	affect, errRes := res.RowsAffected()
//	if errRes != nil || affect != 1 {
//		fmt.Println(errRes)
//	}
//	//fmt.Println(affect)
//
//	//stmt, err := DB.Prepare("UPDATE users SET ?=? WHERE username=?")
//	//if err != nil {
//	//	fmt.Println(err)
//	//}
//	//res, errStmt := stmt.Exec("gender", "'unknown'", "'user_mj'")
//	//if errStmt != nil {
//	//	fmt.Println(errStmt)
//	//}
//	//affect, errRes := res.RowsAffected()
//	//if errRes != nil {
//	//	fmt.Println(errRes)
//	//}
//	//fmt.Println(affect)
//}

//测试了三个函数：checkArticleStatus，changeArticleStatus，getLikesReceived
//func TestManipulateArticleStatus(t *testing.T) {
//	//先改变user_mj对文章的反应，再用check status看状态是否更新正确
//	//id=2 article 初始值都为0，先获取初始值，测试完毕后恢复原状
//	//用户表和文章表都要恢复原状
//	username := "user_mj"
//	articleId := 2
//	reaction, index, err := checkArticleStatus(username, articleId)
//	//第一个返回int 状态 未操作:0；赞过:1；踩过:2，出错:-1
//	//第二个返回int 下标 状态为0/-1时，返回-1
//	//初始用户没有任何操作
//	if reaction != 0 || index != -1 || err != nil {
//		t.Fail()
//	}
//
//	//点赞
//	affectUsers, affectArticles, err := changeArticleStatus(username, articleId, true)
//	if affectUsers != 1 || affectArticles != 1 || err != nil {
//		t.Fail()
//	}
//
//	//检验状态
//	reaction, index, err = checkArticleStatus(username, articleId)
//	if reaction != 1 || index == -1 || err != nil {
//		t.Fail()
//	}
//
//	//检验likes received，文章2的作者是user1，此时应该收到了两个赞
//	likes, err := getLikesReceived("user1")
//	if likes != 2 || err != nil {
//		t.Fail()
//	}
//
//	//点踩
//	affectUsers, affectArticles, err = changeArticleStatus(username, articleId, false)
//	if affectUsers != 1 || affectArticles != 1 || err != nil {
//		t.Fail()
//	}
//
//	//检验状态
//	reaction, index, err = checkArticleStatus(username, articleId)
//	if reaction != 2 || index == -1 || err != nil {
//		t.Fail()
//	}
//
//	//检验likes received，此时应该收到了一个赞
//	likes, err = getLikesReceived("user1")
//	if likes != 1 || err != nil {
//		t.Fail()
//	}
//
//	//用户表和文章表都要恢复原状
//	//用户表
//	stmt, err := DB.Prepare("UPDATE users SET like_list=?, dislike_list=? WHERE username=?")
//	if err != nil {
//		t.Fail()
//	}
//	res, err := stmt.Exec("", "", username)
//	if err != nil {
//		t.Fail()
//	}
//	affect, err := res.RowsAffected()
//	if affect != 1 || err != nil {
//		t.Fail()
//	}
//
//	//文章表
//	stmt, err = DB.Prepare("UPDATE articles SET likes=?, dislikes=? WHERE id=?")
//	if err != nil {
//		t.Fail()
//	}
//	res, err = stmt.Exec(0, 0, articleId)
//	if err != nil {
//		t.Fail()
//	}
//	affect, err = res.RowsAffected()
//	if affect != 1 || err != nil {
//		t.Fail()
//	}
//
//	//检验likes received，此时应该收到了一个赞
//	likes, err = getLikesReceived("user1")
//	if likes != 1 || err != nil {
//		t.Fail()
//	}
//}

//test getUserByUsername, updateUserItem
func TestManipulateUserInfo(t *testing.T) {
	//user_rl
	originalUserRl, err := getUserByUsername("user_rl")
	//fmt.Println("originalUserRl", originalUserRl)
	if err != nil {
		fmt.Println("TestManipulateUserInfo 271 failure")
		t.Fail()
	}

	content := make(map[string]string)
	//password, birthday and gender
	content["password"] = "userRl"
	content["birthday"] = "2022-04-19"
	content["gender"] = "female"

	affect, err := updateUserItem("user_rl", content)
	if int(affect) != len(content) || err != nil {
		fmt.Println("TestManipulateUserInfo 283 failure", affect, err)
		t.Fail()
	}

	updatedUserRl, err := getUserByUsername("user_rl")
	if err != nil {
		fmt.Println("TestManipulateUserInfo 289 failure")
		t.Fail()
	}
	//fmt.Println("updatedUserRl", updatedUserRl)
	//fmt.Println("ifEqual", updatedUserRl.Birthday == "2022-04-19T00:00:00Z")
	if updatedUserRl.Password != content["password"] || updatedUserRl.Birthday != "2022-04-19T00:00:00Z" || updatedUserRl.Gender != content["gender"] {
		fmt.Println("TestManipulateUserInfo 295 failure")
		t.Fail()
	}

	content["password"] = originalUserRl.Password
	content["birthday"] = "2020-12-30"
	content["gender"] = originalUserRl.Gender
	//fmt.Println("还原content", content)
	affect, err = updateUserItem("user_rl", content)
	if int(affect) != len(content) || err != nil {
		fmt.Println("TestManipulateUserInfo 305 failure")
		t.Fail()
	}

	checkUserRl, err := getUserByUsername("user_rl")
	//fmt.Println("checkUserRl", checkUserRl)
	if checkUserRl.Password != originalUserRl.Password || checkUserRl.Birthday != "2020-12-30T00:00:00Z" || checkUserRl.Gender != originalUserRl.Gender || err != nil {
		fmt.Println("TestManipulateUserInfo 312")
		t.Fail()
	}
}
