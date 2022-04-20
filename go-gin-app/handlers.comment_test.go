package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"
)

// Test function getComment with an authenticated user
func TestGetCommentAuthenticated(t *testing.T) {
	w := httptest.NewRecorder()
	r := getRouter(true)
	http.SetCookie(w, &http.Cookie{Name: "token", Value: "123"})
	r.GET("/article/comment_view/:article_id", ensureLoggedIn(), getComment)

	req, _ := http.NewRequest("GET", "/article/comment_view/1", nil)
	req.Header = http.Header{"Cookie": w.Result().Header["Set-Cookie"]}

	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fail()
	}

	p, err := ioutil.ReadAll(w.Body)
	if err != nil || strings.Index(string(p), "This is the comment") < 0 {
		t.Fail()
	}
}

// Test function getComment with an unauthenticated user
func TestGetCommentUnauthenticated(t *testing.T) {
	r := getRouter(true)
	r.GET("/article/comment_view/:article_id", ensureLoggedIn(), getComment)
	req, err := http.NewRequest("GET", "/article/comment_view/1", nil)
	fmt.Println(err)

	testHTTPResponse(t, r, req, func(w *httptest.ResponseRecorder) bool {
		statusOK := w.Code == http.StatusOK

		p, err := ioutil.ReadAll(w.Body)
		pageOK := err == nil && strings.Index(string(p), "This is the comment") > 0

		//fmt.Println(statusOK)
		//fmt.Println(pageOK)

		// statusOK == false && pageOK == false, pass
		return !statusOK && !pageOK
	})
}

// Test function createComment with an authenticated user
func TestCreateCommentAuthenticated(t *testing.T) {
	w := httptest.NewRecorder()
	r := getRouter(true)
	//existUser := `{username : user1, password : pass1}`
	//existUser := mingleUser{Username: "user1", Password: "pass1"}
	//jsonStr, err := json.Marshal(existUser)
	//fmt.Println(jsonStr)
	//fmt.Println(string(jsonStr))
	//fmt.Println(err)

	http.SetCookie(w, &http.Cookie{Name: "token", Value: "%7B%22username%22%3A%22user1%22%2C%22password%22%3A%22pass1%22%7D"})
	r.POST("/article/comment/:article_id", ensureLoggedIn(), createComment)

	commentPayload := getCommentPOSTPayload()
	req, _ := http.NewRequest("POST", "/article/comment/2", strings.NewReader(commentPayload))
	req.Header = http.Header{"Cookie": w.Result().Header["Set-Cookie"]}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Content-Length", strconv.Itoa(len(commentPayload)))

	r.ServeHTTP(w, req)

	//fmt.Println(w.Code)
	if w.Code != http.StatusOK {
		t.Fail()
	}

	p, err := ioutil.ReadAll(w.Body)
	//fmt.Println(string(p))
	//fmt.Println(err)
	if err != nil || strings.Index(string(p), "successfully submitted") < 0 {
		t.Fail()
	}

	//delete the valid comment after test
	commentList, _ := getAllComment("2")
	validCommentId := commentList[len(commentList)-1].CommentId
	num, err := deleteCommentByCommentId(validCommentId)
	if num == 0 {
		t.Fail()
	}
}

func getCommentPOSTPayload() string {
	//params := url.Values{}
	//params.Add("author", "Test Article Author")
	//params.Add("title", "Test Article Title")
	//params.Add("content", "Test Article Content")
	//
	//return params.Encode()
	//validComment := `{
	//	"article_id": 2,
	//	"comment_author": "user1",
	//	"content": "Test Comment Content"
	//}`
	validComment := comment{ArticleId: 2, CommentAuthor: "user1", Content: "Test Comment Content"}
	jsonStr, _ := json.Marshal(validComment)
	return string(jsonStr)
}
