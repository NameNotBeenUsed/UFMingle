// handlers.article.go

package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary Show forum home page and all articles
// @Produce json
// @Success 200 {array} article "Return an array of structure article"
// @Router / [get]
func showIndexPage(c *gin.Context) {
	articles := getAllArticles()

	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title":   "Home Page",
		"payload": articles}, "index.html")

	//c.JSON(http.StatusOK, getAllArticles)
}

// @Summary Show article creation page
// @Router /article/create [get]
func showArticleCreationPage(c *gin.Context) {
	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title": "Create New Article"}, "create-article.html")
}

// @Summary Open the article page
// @Produce json
// @Param article_id path int true "The index of the article"
// @Success 200 {object} article "Return the struct article"
// @Failure 404 {int} int "Not found or invalid article_id"
// @Router /article/view/:article_id [get]
func getArticle(c *gin.Context) {
	// Check if the article ID is valid
	if articleID, err := strconv.Atoi(c.Param("article_id")); err == nil {
		// Check if the article exists
		if article, err := getArticleByID(articleID); err == nil {
			// Call the render function with the title, article and the name of the
			// template
			render(c, gin.H{
				"title":   article.Title,
				"payload": article}, "article.html")

		} else {
			// If the article is not found, abort with an error
			c.AbortWithError(http.StatusNotFound, err)
		}

	} else {
		// If an invalid article ID is specified in the URL, abort with an error
		c.AbortWithStatus(http.StatusNotFound)
	}
}

// @Summary Create an article
// @Produce json
// @Param title header string true "The title of the article"
// @Param content header string true "The content of the article"
// @Success 200 {int} int "Create an article successfully"
// @Failure 400 {int} int "Failed to create an article"
// @Router /article/create [post]
func createArticle(c *gin.Context) {
	// Obtain the POSTed title and content values
	title := c.PostForm("title")
	content := c.PostForm("content")
	author := c.PostForm("author")
	if a, err := createNewArticle(title, content, author); err == nil {
		// If the article is created successfully, show success message
		render(c, gin.H{
			"title":   "Submission Successful",
			"payload": a}, "submission-successful.html")
	} else {
		// if there was an error while creating the article, abort with an error
		c.AbortWithStatus(http.StatusBadRequest)
	}
}
