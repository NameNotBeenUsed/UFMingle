package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getComment(c *gin.Context) {
	if articleId := c.Param("article_id"); articleId != "" {
		if allComments, err := getAllComment(articleId); err == nil {

			render(c, gin.H{
				"title":   "Comments",
				"payload": allComments}, "")
			//c.JSON(http.StatusOK, status)
		} else {
			// if there was an error while creating the article, abort with an error
			//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			c.AbortWithError(http.StatusBadRequest, err)
		}
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
}

func createComment(c *gin.Context) {
	var commentData comment

	if err := c.BindJSON(&commentData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	validationErr := validate.Struct(commentData)
	if validationErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": validationErr})
		fmt.Println(validationErr)
		return
	}

	var tempuser mingleUser
	token, _ := c.Cookie("token")
	if err := json.Unmarshal([]byte(token), &tempuser); err == nil {
		if articleId, errA := strconv.Atoi(c.Param("article_id")); errA == nil {
			commentData.CommentAuthor = tempuser.Username
			commentData.ArticleId = articleId
			if num, err := createNewComment(commentData, tempuser); num != 0 && err == nil {
				// If the article is created successfully, show success message
				render(c, gin.H{
					"title":   "Comment Submitted!",
					"payload": num}, "submission-successful.html")
				//c.JSON(http.StatusOK, status)
			} else {
				// if there was an error while creating the article, abort with an error
				//c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				c.AbortWithError(http.StatusBadRequest, err)
			}
		} else {
			c.AbortWithError(http.StatusNotFound, errA)
		}
	} else {
		c.AbortWithError(http.StatusUnauthorized, err)
	}
}
