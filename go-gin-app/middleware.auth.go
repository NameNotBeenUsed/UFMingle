// middleware.auth.go

package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// This middleware ensures that a request will be aborted with an error
// if the user is not logged in
func ensureLoggedIn() gin.HandlerFunc {
	return func(c *gin.Context) {
		// If there's an error or if the token is empty
		// the user is not logged in
		loggedInInterface, _ := c.Get("is_logged_in")
		loggedIn := loggedInInterface.(bool)

		//fmt.Println("Print at ensureLoggedIn()")
		//fmt.Println(loggedIn)

		if !loggedIn {
			//if token, err := c.Cookie("token"); err != nil || token == "" {

			c.AbortWithStatus(http.StatusUnauthorized)
			//articles, err := getAllArticles()
			//if err != nil {
			//	log.Fatal(err)
			//}
			//c.Redirect(http.StatusUnauthorized, "/")
			//render(c, gin.H{
			//	"title":   "Home Page",
			//	"payload": articles}, "index_alert.html")
			//c.JSON(http.StatusUnauthorized, gin.H{"message": "User is not logged in."})
		}
	}
}

// This middleware ensures that a request will be aborted with an error
// if the user is already logged in
func ensureNotLoggedIn() gin.HandlerFunc {
	return func(c *gin.Context) {
		// If there's no error or if the token is not empty
		// the user is already logged in
		loggedInInterface, _ := c.Get("is_logged_in")
		loggedIn := loggedInInterface.(bool)

		//fmt.Println("Print at ensureNotLoggedIn()")
		//fmt.Println(loggedIn)

		if loggedIn {
			//if token, err := c.Cookie("token"); err == nil || token != "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			//c.JSON(http.StatusUnauthorized, `"message": "User is already logged in."`)
			//}
		}
	}
}

// This middleware sets whether the user is logged in or not
func setUserStatus() gin.HandlerFunc {
	return func(c *gin.Context) {
		if token, err := c.Cookie("token"); err == nil || token != "" {
			c.Set("is_logged_in", true)
		} else {
			c.Set("is_logged_in", false)
		}
	}
}
