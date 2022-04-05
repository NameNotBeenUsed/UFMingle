package main

import (
	"fmt"
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

func uploadImages(c *gin.Context) {
	form, _ := c.MultipartForm()
	files := form.File["file[]"]

	for _, file := range files {
		if err := c.SaveUploadedFile(file, "./image/"+file.Filename); err != nil {
			fmt.Println(err)
		}
	}
	c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
}
