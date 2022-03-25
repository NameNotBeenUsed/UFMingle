// models.user.go

package main

import (
	"crypto/rand"
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
func isUserValid(u user) (bool, error) {
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
func registerNewUser(newUser user) (int64, error) {
	if strings.TrimSpace(newUser.Password) == "" {
		return 0, errors.New("The password can't be empty")
	}

	flag, err := isUsernameAvailable(newUser.Username)
	if flag == false && err == nil {
		return 0, errors.New("The username isn't available")
	}

	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := tx.Prepare("INSERT INTO users (username, password) VALUES (?, ?)")

	if err != nil {
		return 0, err
	}

	defer stmt.Close()

	result, err := stmt.Exec(newUser.Username, newUser.Password)

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

	defer stmt.Close()

	var tempName string
	sqlErr := stmt.QueryRow(username).Scan(&tempName)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return true, nil
		}
		return false, sqlErr
	}

	return false, nil
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

func GenerateSalt() ([]byte, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return nil, err
	}
	return salt, nil
}
