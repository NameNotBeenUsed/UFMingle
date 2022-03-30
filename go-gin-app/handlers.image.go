package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

func getAvatar(c *gin.Context) {
	username := c.Param("username")
	if res, err := isUserExist(username); err == nil && res == true {
		_, errF := os.Stat("./Avatar/" + username + ".png")
		if errF == nil {
			c.File("./Avatar/" + username + ".png")
		} else {
			c.File("./Avatar/test.png")
		}
	} else {
		c.AbortWithError(http.StatusNotFound, err)
	}
	return
}
