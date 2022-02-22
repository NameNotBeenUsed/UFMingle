// handlers.article.go

package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

// @Summary Show forum home page and all articles
// @Produce json
// @Success 200 {object} article "Return all the information of article"
// @Router / [get]
func showIndexPage(c *gin.Context) {
	articles, err := getAllArticles()
	if err != nil {
		//print + exit
		log.Fatal(err)
	}
	// Call the render function with the name of the template to render
	//render(c, gin.H{
	//	"title":   "Home Page",
	//	"payload": articles}, "index.html")

	c.JSON(http.StatusOK, articles)
}

//这应该是前端负责的
//func showArticleCreationPage(c *gin.Context) {
//	// Call the render function with the name of the template to render
//	render(c, gin.H{
//		"title": "Create New Article"}, "create-article.html")
//}

// @Summary Open the article page
// @Produce json
// @Param article_id path int true "The index of the article"
// @Success 200 {object} article "Return the article"
// @Failure 404 {string} string "Not found or invalid article_id"
// @Router /article/view/:article_id [get]
func getArticle(c *gin.Context) {
	// Check if the article ID is valid
	if articleID, err := strconv.Atoi(c.Param("article_id")); err == nil {
		// Check if the article exists

		if article, err := getArticleByID(articleID); err == nil {
			// Call the render function with the title, article and the name of the
			// template
			//render(c, gin.H{
			//	"title":   article.Title,
			//	"payload": article}, "article.html")
			c.JSON(http.StatusOK, article)

		} else {
			// If the article is not found, abort with an error
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		}

	} else {
		// If an invalid article ID is specified in the URL, abort with an error
		c.JSON(http.StatusNotFound, gin.H{"error": "Invalid article ID"})
	}
}

// @Summary Create an article
// @Produce json
// @Param title header string true "The title of the article"
// @Param content header string true "The content of the article"
// @Success 200 {bool} bool "If the article has been created successfully, return ture, else false"
// @Failure 400 {string} string "There is an error while creating the article"
// @Router /article/create [post]
func createArticle(c *gin.Context) {
	// Obtain the POSTed title and content values
	var articleData article

	if err := c.BindJSON(&articleData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	validationErr := validate.Struct(articleData)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr})
		fmt.Println(validationErr)
		return
	}
	//title := c.PostForm("title")
	//content := c.PostForm("content")z
	//author := c.PostForm("author")

	if status, err := createNewArticle(articleData); status && err == nil {
		// If the article is created successfully, show success message
		//render(c, gin.H{
		//	"title":   "Submission Successful",
		//	"payload": a}, "submission-successful.html")
		c.JSON(http.StatusOK, status)
	} else {
		// if there was an error while creating the article, abort with an error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
