// handlers.article.go

package main

import (
	"encoding/json"
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
	//fmt.Println("？？？？？？？？？？？？？？？？？？？？？？")
	articles, err := getAllArticles()
	if err != nil {
		//print + exit
		log.Fatal(err)
	}
	//fmt.Println(articles)
	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title":   "Home Page",
		"payload": articles}, "index.html")

	//c.JSON(http.StatusOK, articles)
}

//这应该是前端负责的
//用于测试
func showArticleCreationPage(c *gin.Context) {
	// Call the render function with the name of the template to render
	render(c, gin.H{
		"title": "Create New Article"}, "create-article.html")
}

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
			render(c, gin.H{
				"title":   article.Title,
				"payload": article}, "article.html")
			//c.JSON(http.StatusOK, article)

		} else {
			// If the article is not found, abort with an error
			//c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			c.AbortWithError(http.StatusNotFound, err)
		}

	} else {
		// If an invalid article ID is specified in the URL, abort with an error
		//c.JSON(http.StatusNotFound, gin.H{"error": "Invalid article ID"})
		c.AbortWithStatus(http.StatusNotFound)
	}
}

// @Summary Create an article
// @Produce json
// @Param title header string true "The title of the article"
// @Param content header string true "The content of the article"
// @Param author header string true "The author of the article"
// @Success 200 {int} int "If the article has been created successfully, return the number of rows been affected, else 0"
// @Failure 400 {error} error "There is an error while creating the article"
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
	//content := c.PostForm("content")
	//author := c.PostForm("author")
	var tempuser mingleUser
	token, _ := c.Cookie("token")
	if err := json.Unmarshal([]byte(token), &tempuser); err == nil {
		if num, err := createNewArticle(articleData, tempuser); num != 0 && err == nil {
			// If the article is created successfully, show success message
			render(c, gin.H{
				"title":   "Submission Successful",
				"payload": num}, "submission-successful.html")
			//c.JSON(http.StatusOK, status)
		} else {
			// if there was an error while creating the article, abort with an error
			//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			c.AbortWithError(http.StatusBadRequest, err)
		}
	} else {
		c.AbortWithError(http.StatusBadRequest, err)
	}

	/*if num, err := createNewArticle(articleData); num != 0 && err == nil {
		// If the article is created successfully, show success message
		render(c, gin.H{
			"title":   "Submission Successful",
			"payload": num}, "submission-successful.html")
		//c.JSON(http.StatusOK, status)
	} else {
		// if there was an error while creating the article, abort with an error
		//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.AbortWithError(http.StatusBadRequest, err)
	}*/
}
