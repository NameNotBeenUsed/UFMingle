package main

import (
	"strconv"
	"testing"
	"time"
)

// Test the function that fetches all comments
func TestGetAllComment(t *testing.T) {
	// With an article id that does exist
	_, err := getAllComment("1")
	if err != nil {
		t.Fail()
	}

	// With an article id that does not exist
	tmp, _ := getAllComment("10000")
	//fmt.Println(tmp)
	//fmt.Println(err2)
	if len(tmp) != 0 {
		t.Fail()
	}
}

// Test createNewComment
func TestCreateNewComment(t *testing.T) {
	//valid comment
	validComment := comment{ArticleId: 3, CommentAuthor: "user1", Content: "Test Comment", CommentTime: time.Now().Format("2006-01-02 15:04:05")}
	//invalid comment
	invalidComment := comment{ArticleId: 1000, CommentAuthor: "someone", Content: "Test Comment", CommentTime: time.Now().Format("2006-01-02 15:04:05")}
	//valid user
	validUser := mingleUser{Username: "user1", Password: "pass1"}
	//invalid user
	invalidUser := mingleUser{Username: "invalidUser", Password: "invalidPass"}

	//valid comment and invalid user
	num, err := createNewComment(validComment, invalidUser)
	if num != 0 || err != nil {
		t.Fail()
	}

	//res, err := isCommentValid(invalidComment)
	//fmt.Println(res)
	//fmt.Println(err)

	//invalid comment and valid user
	num, err = createNewComment(invalidComment, validUser)
	//fmt.Println(num)
	//fmt.Println(err)
	if num != 0 {
		t.Fail()
	}
	//valid comment and valid user
	num, err = createNewComment(validComment, validUser)
	//fmt.Println(num)
	//fmt.Println(err)
	if num == 0 {
		t.Fail()
	}
	//delete the valid comment after test
	commentList, err := getAllComment(strconv.Itoa(validComment.ArticleId))
	validCommentId := commentList[len(commentList)-1].CommentId
	num, err = deleteCommentByCommentId(validCommentId)
	if num == 0 {
		t.Fail()
	}
}
