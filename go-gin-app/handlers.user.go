// handlers.user.go

package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 前端的活
// @Summary Show the login page
// @Produce json
// @Router /u/login [get]
func showLoginPage(c *gin.Context) {
	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title": "Login",
	}, "login.html")
}

// @Summary Perform function login
// @Produce json
// @Param username header string true "Username"
// @Param password header string true "Password"
// @Success 200 {string} string "Log in successfully"
// @Failure 400 {string} string "Failed to log in"
// @Router /u/login [post]
func performLogin(c *gin.Context) {
	// Obtain the POSTed username and password values
	//username := c.PostForm("username")
	//password := c.PostForm("password")
	var u mingleUser
	if err := c.BindJSON(&u); err != nil {
		//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	validationErr := validate.Struct(u)
	if validationErr != nil {
		//c.JSON(http.StatusBadRequest, gin.H{"error": validationErr})
		c.AbortWithError(http.StatusBadRequest, validationErr)
		fmt.Println(validationErr)
		return
	}

	var sameSiteCookie http.SameSite

	// Check if the username/password combination is valid
	valid, err := isUserValid(u)
	if valid && err == nil {
		// If the username/password is valid set the token in a cookie
		//token := generateSessionToken()
		//token = token + " " + u.Username + " " + u.Password
		jsonstr, _ := json.Marshal(u)
		c.SetSameSite(sameSiteCookie)
		// maxAge: seconds
		c.SetCookie("token", string(jsonstr), 3600, "", "localhost", false, true)
		c.Set("is_logged_in", true)

		//loggedInInterface, _ := c.Get("is_logged_in")
		//loggedIn := loggedInInterface.(bool)
		//
		//fmt.Println("Print at performLogin()")
		//fmt.Println(loggedIn)

		render(c, gin.H{
			"title":   "Successful Login",
			"payload": "Successful Login"}, "login-successful.html")
		//c.JSON(http.StatusOK, gin.H{"message": "Log in Successfully"})

	} else {
		// If the username/password combination is invalid,
		// show the error message on the login page
		c.HTML(http.StatusBadRequest, "login.html", gin.H{
			"ErrorTitle":   "Login Failed",
			"ErrorMessage": "Invalid credentials provided"})

		//c.JSON(http.StatusBadRequest, gin.H{"error": "It's not a valid user"})
	}
}

func generateSessionToken() string {
	// We're using a random 16 character string as the session token
	// This is NOT a secure way of generating session tokens
	// DO NOT USE THIS IN PRODUCTION

	return strconv.FormatInt(rand.Int63(), 16)
}

// @Summary Logout
// @Produce json
// @Success 200 {string} string "Log out successfully"
// @Router /u/logout [get]
func logout(c *gin.Context) {

	var sameSiteCookie http.SameSite

	// Clear the cookie
	c.SetSameSite(sameSiteCookie)
	c.SetCookie("token", "", -1, "", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"payload": "Log out successfully"})

	//loggedInInterface, _ := c.Get("is_logged_in")
	//loggedIn := loggedInInterface.(bool)
	//
	//fmt.Println("Print at logout()")
	//fmt.Println(loggedIn)

	// Redirect to the home page
	//c.Redirect(http.StatusTemporaryRedirect, "/")
}

// 前端的活
// @Summary Show the registration page
// @Router /u/register [get]
func showRegistrationPage(c *gin.Context) {
	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title": "Register"}, "register.html")
}

// @Summary Register a new user
// @Param gatorlink header string true "Gatorlink"
// @Param gatorPW header string true "GatorPW"
// @Param username header string true "Username"
// @Param password header string true "Password"
// @Success 200 {int} int "Register successfully, return the number of rows been affected"
// @Failure 400 {error} error "ErrorMessage"
// @Router /u/register [post]
func register(c *gin.Context) {
	// Obtain the POSTed username and password values
	//username := c.PostForm("username")
	//password := c.PostForm("password")

	var sameSiteCookie http.SameSite

	var newUser user
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	validationErr := validate.Struct(newUser)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error()})
		fmt.Println(validationErr)
		return
	}

	if num, err := registerNewUser(newUser); err == nil {
		// If the user is created, set the token in a cookie and log the user in
		//token := generateSessionToken()
		//token = token + " " + newUser.Username + " " + newUser.Password
		ufuser := mingleUser{newUser.Username, newUser.Password}
		jsonstr, _ := json.Marshal(ufuser)
		c.SetSameSite(sameSiteCookie)
		c.SetCookie("token", string(jsonstr), 3600, "", "localhost", false, true)
		c.Set("is_logged_in", true)

		render(c, gin.H{
			"title":   "Successful registration & Login",
			"payload": num}, "login-successful.html")
		//c.JSON(http.StatusOK, gin.H{"message": "Register successfully"})

	} else {
		// If the username/password combination is invalid,
		// show the error message on the login page
		c.HTML(http.StatusBadRequest, "register.html", gin.H{
			"ErrorTitle":   "Registration Failed",
			"ErrorMessage": err.Error()})
		//c.JSON(http.StatusBadRequest, err.Error())

	}
}
