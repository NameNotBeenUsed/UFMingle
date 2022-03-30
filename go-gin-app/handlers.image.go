package main

import "github.com/gin-gonic/gin"

func getImage(c *gin.Context) {
	c.File("./img.png")
	return
}
