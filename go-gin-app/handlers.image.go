package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
)

// @Summary Get the avatar of the user
// @Produce json
// @Param username path string true "username"
// @Success 200 {file} file "An avatar is returned"
// @Failure 404 {error} error "Error"
// @Router /image/avatar/:username [get]
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

//type article struct {
//	ID       int    `json:"id"`
//	Author   string `json:"author"`
//	Title    string `json:"title"`
//	Content  string `json:"content"`
//	Likes    int    `json:"likes"`
//	Dislikes int    `json:"dislikes"`
//}

// data 是一个数组，返回图片Object，Object中包含需要包含url、alt和href三个属性,它们分别代表图片地址、图片文字说明和跳转链接,alt和href属性是可选的，可以不设置或设置为空字符串,需要注意的是url是一定要填的。
//"data": [
//	{
//		url: "图片地址",
//		alt: "图片文字说明",
//		href: "跳转链接"
//	},
//	{
//		url: "图片地址1",
//		alt: "图片文字说明1",
//		href: "跳转链接1"
//	},
//	"……"
//]

type returnData struct {
	URL  string `json:"url"`
	Alt  string `json:"alt"`
	Href string `json:"href"`
}

// @Summary Upload images inserted by users in posts or replies
// @Produce json
// @Success 200 {map} map "errno: 0, data: A list of download addresses of images"
// @Failure 400 {error} error "Error"
// @Router /image/upload [post]
func uploadImages(c *gin.Context) {
	form, _ := c.MultipartForm()
	//fmt.Println(form)
	//files := form.File["file[]"]
	filesMap := form.File
	//fmt.Println("form.File[\"file[]\"]: ", form.File["file[]"])
	//fmt.Println("form.File: ", form.File)

	imgResult := make([]returnData, 0)
	for _, files := range filesMap {
		file := files[0]
		if err := c.SaveUploadedFile(file, "./image/"+file.Filename); err != nil {
			log.Println(err)
			c.AbortWithError(http.StatusBadRequest, err)
		}
		tmpData := returnData{URL: "http://localhost:8080/image/download/" + file.Filename}
		imgResult = append(imgResult, tmpData)
	}
	//c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
	c.JSON(http.StatusOK, gin.H{"errno": 0,
		"data": imgResult})
}

// @Summary Retrieve images inserted in the posts or replies
// @Produce jpeg
// @Param filename path string true "Image filename"
// @Success 200 {file} file "Success"
// @Failure 400 {error} error "Failure"
// @Router /image/download/:filename [get]
func downloadImage(c *gin.Context) {
	filename := c.Param("filename")
	_, errF := os.Stat("./Image/" + filename)
	if errF == nil {
		c.File("./Image/" + filename)
	} else {
		c.AbortWithError(http.StatusBadRequest, errF)
		log.Println("err at 84", errF)
	}
	return
}

// @Summary Delete an image file
// @Produce json
// @Param filename path string true "Filename of the image"
// @Success 200 {map} map "Success"
// @Failure 400 {error} error "Failure"
// @Router /image/delete/:filename [delete]
func deleteImage(c *gin.Context) {
	filename := c.Param("filename")
	_, errF := os.Stat("./Image/" + filename)
	if errF == nil {
		if err := os.Remove("./Image/" + filename); err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			log.Println("err at 94", err)
		} else {
			c.JSON(http.StatusOK, gin.H{"message": "Success"})
		}
	} else {
		c.AbortWithError(http.StatusBadRequest, errF)
		log.Fatal("err at 99", errF)
	}
}
