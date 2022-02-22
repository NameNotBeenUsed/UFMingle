// models.user.go

package main

import (
	"database/sql"
	"errors"
	"strings"
)

type user struct {
	Username string `json:"username"`
	Password string `json:"password"`
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

// Check if the username and password combination is valid
func isUserValid(u user) (bool, error) {
	//for _, u := range userList {
	//	if u.Username == username && u.Password == password {
	//		return true
	//	}
	//}
	//return false
	stmt, err := DB.Prepare("SELECT * FROM users WHERE username = ? AND password = ?")

	if err != nil {
		return false, err
	}
	//fmt.Println(u.Username, u.Password)

	var temp user
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
func registerNewUser(newUser user) (bool, error) {
	if strings.TrimSpace(newUser.Password) == "" {
		return false, errors.New("The password can't be empty")
	}

	flag, err := isUsernameAvailable(newUser.Username)
	if flag == false && err == nil {
		return false, errors.New("The username isn't available")
	}

	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	stmt, err := tx.Prepare("INSERT INTO users (username, password) VALUES (?, ?)")

	if err != nil {
		return false, err
	}

	defer stmt.Close()

	_, err = stmt.Exec(newUser.Username, newUser.Password)

	if err != nil {
		return false, err
	}

	tx.Commit()

	return true, nil
}

// Check if the supplied username is available
func isUsernameAvailable(username string) (bool, error) {
	//for _, u := range userList {
	//	if u.Username == username {
	//		return false
	//	}
	//}
	//return true
	stmt, err := DB.Prepare("SELECT username FROM users WHERE username = ?")
	if err != nil {
		return false, err
	}

	sqlErr := stmt.QueryRow(username).Scan()

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return true, nil
		}
		return false, sqlErr
	}

	return false, nil
}
