// models.user_test.go

package main

import "testing"

// Test the validity of different combinations of username/password
func TestUserValidity(t *testing.T) {
	TestUser_1 := user{Username: "user1", Password: "pass1"}
	TestUser_2 := user{Username: "user2", Password: "pass1"}
	TestUser_3 := user{Username: "user1", Password: ""}
	TestUser_4 := user{Username: "", Password: "pass1"}
	TestUser_5 := user{Username: "User1", Password: "pass1"}

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

	newUser := user{Username: "newuser", Password: "newpass"}
	num, err := registerNewUser(newUser)

	if err != nil || num == 0 {
		t.Fail()
	}

	num, err = deleteUser(newUser.Username)
	if num == 0 || err != nil {
		t.Fail()
	}
	//restoreLists()
}

// Test that a new user cannot be registered with invalid username/password
func TestInvalidUserRegistration(t *testing.T) {
	//saveLists()

	// Try to register a user with a used username
	usedUser := user{Username: "user1", Password: "pass1"}
	num, err := registerNewUser(usedUser)

	if err == nil || num != 0 {
		t.Fail()
	}

	// Try to register with a blank password
	invalidUser := user{Username: "newuser", Password: ""}
	num, err = registerNewUser(invalidUser)

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
		t.Fail()
	}

	// This username should not be available
	status, err = isUsernameAvailable("user1")
	if status == true || err != nil {
		t.Fail()
	}

	// Register a new user
	newUser := user{Username: "newuser", Password: "newpass"}
	registerNewUser(newUser)

	// This newly registered username should not be available
	status, err = isUsernameAvailable("newuser")
	if status == true || err != nil {
		t.Fail()
	}

	// Now this username should be available
	num, err := deleteUser(newUser.Username)
	if num == 0 || err != nil {
		t.Fail()
	}
	status, err = isUsernameAvailable("newuser")
	if status == false || err != nil {
		t.Fail()
	}
	//restoreLists()
}
