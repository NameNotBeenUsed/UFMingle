// routes.go

package main

import (
	_ "go-gin-app/docs"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func initializeRoutes() {

	// Use the setUserStatus middleware for every route to set a flag
	// indicating whether the request was from an authenticated user or not
	router.Use(setUserStatus())
	router.Use(gin.Logger())
	//router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Accept"},
		AllowCredentials: true,
		MaxAge:           1 * time.Hour,
	}))
	// Handle the index route
	router.GET("/", showIndexPage)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Group user related routes together
	userRoutes := router.Group("/u")
	{
		// Handle the GET requests at /u/login
		// Show the login page
		// Ensure that the user is not logged in by using the middleware
		//userRoutes.GET("/login", ensureNotLoggedIn(), showLoginPage)

		// Handle POST requests at /u/login
		// Ensure that the user is not logged in by using the middleware
		userRoutes.POST("/login", ensureNotLoggedIn(), performLogin)

		// Handle GET requests at /u/logout
		// Ensure that the user is logged in by using the middleware
		userRoutes.GET("/logout", ensureLoggedIn(), logout)

		// Handle the GET requests at /u/register
		// Show the registration page
		// Ensure that the user is not logged in by using the middleware
		//userRoutes.GET("/register", ensureNotLoggedIn(), showRegistrationPage)

		// Handle POST requests at /u/register
		// Ensure that the user is not logged in by using the middleware
		userRoutes.POST("/register", ensureNotLoggedIn(), register)

		userRoutes.GET("/info", ensureLoggedIn(), getUserInfo)

		userRoutes.PATCH("/info", ensureLoggedIn(), updateUserInfo)

		userRoutes.GET("/article/:articleId", ensureLoggedIn(), checkReaction)

		userRoutes.PATCH("/article/:articleId", ensureLoggedIn(), changeReaction)

		userRoutes.GET("/likes", ensureLoggedIn(), likesReceivedByUser)
		userRoutes.POST("/subscribe/:username", ensureLoggedIn(), subscribeSomeone)
		userRoutes.GET("/getmystars", ensureLoggedIn(), getMyStars)
		userRoutes.GET("/getmyfollowers", ensureLoggedIn(), getMyFollowers)

	}

	// Group article related routes together
	articleRoutes := router.Group("/article")
	{
		// Handle GET requests at /article/view/some_article_id
		//articleRoutes.GET("/view/:article_id", getArticle)
		articleRoutes.GET("/view/:article_id", ensureLoggedIn(), getArticle)

		// Handle the GET requests at /article/create
		// Show the article creation page
		// Ensure that the user is logged in by using the middleware
		// articleRoutes.GET("/create", ensureLoggedIn(), showArticleCreationPage)

		// Handle POST requests at /article/create
		// Ensure that the user is logged in by using the middleware
		//articleRoutes.POST("/create", createArticle)
		articleRoutes.POST("/create", ensureLoggedIn(), createArticle)

		articleRoutes.GET("/comment_view/:article_id", ensureLoggedIn(), getComment)

		articleRoutes.POST("/comment/:article_id", ensureLoggedIn(), createComment)

		articleRoutes.GET("/pastposts/:username", ensureLoggedIn(), getArticleByUsername)
		articleRoutes.GET("/personol_comment/:username", ensureLoggedIn(), getCommentByUsername)
	}

	imageRoutes := router.Group("/image")
	{
		imageRoutes.GET("/avatar/:username", ensureLoggedIn(), getAvatar)
		imageRoutes.POST("/avatar/:username", ensureLoggedIn(), uploadAvatar)
		imageRoutes.POST("/upload", ensureLoggedIn(), uploadImages)
		imageRoutes.GET("/download/:filename", ensureLoggedIn(), downloadImage)
		imageRoutes.DELETE("/delete/:filename", ensureLoggedIn(), deleteImage)
	}

}
