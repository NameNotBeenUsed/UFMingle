// main.go

package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

var router *gin.Engine

// @title UFMingle
// @version 2.0
// @description An on-campus dating application
// @termOfService https://github.com/NameNotBeenUsed/UFMingle/tree/backend_v1.0
func main() {
	connDBErr := ConnectDB()
	if connDBErr != nil {
		fmt.Println(connDBErr.Error())
	}

	createArticleTableErr := createArticleTable()
	if createArticleTableErr != nil {
		fmt.Println(createArticleTableErr.Error())
	}

	createUserTableErr := createUserTable()
	if createUserTableErr != nil {
		fmt.Println(createUserTableErr.Error())
	}

	// Set Gin to production mode
	gin.SetMode(gin.ReleaseMode)

	// Set the router as the default one provided by Gin
	router = gin.Default()

	// Process the templates at the start so that they don't have to be loaded
	// from the disk again. This makes serving HTML pages very fast.
	router.LoadHTMLGlob("templates/*")

	// Initialize the routes
	initializeRoutes()

	// Start serving the application
	router.Run()
}

// Render one of HTML, JSON or CSV based on the 'Accept' header of the request
// If the header doesn't specify this, HTML is rendered, provided that
// the template name is present
func render(c *gin.Context, data gin.H, templateName string) {
	loggedInInterface, _ := c.Get("is_logged_in")
	data["is_logged_in"] = loggedInInterface.(bool)

	switch c.Request.Header.Get("Accept") {
	case "application/json":
		// Respond with JSON
		c.JSON(http.StatusOK, data["payload"])
	case "application/xml":
		// Respond with XML
		c.XML(http.StatusOK, data["payload"])
	default:
		// Respond with HTML
		c.HTML(http.StatusOK, templateName, data)
	}
}
