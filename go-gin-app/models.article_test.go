// models.article_test.go

package main

import (
	"testing"
)

// Test the function that fetches all articles
func TestGetAllArticles(t *testing.T) {
	_, err := getAllArticles()

	if err != nil {
		t.Fail()
	}

	//fmt.Println(alist)
	// Check that the length of the list of articles returned is the
	// same as the length of the global variable holding the list
	//if len(alist) != len(articleList) {
	//	t.Fail()
	//}

	// Check that each member is identical
	//for i, v := range alist {
	//	if v.Content != articleList[i].Content ||
	//		v.ID != articleList[i].ID ||
	//		v.Title != articleList[i].Title {
	//
	//		t.Fail()
	//		break
	//	}
	//}
}

// Test the function that fetch an Article by its ID
func TestGetArticleByID(t *testing.T) {
	_, err := getArticleByID(1)

	//if err != nil || a.ID != 1 || a.Title != "Article 1" || a.Content != "Article 1 body" {
	//	t.Fail()
	//}
	if err != nil {
		t.Fail()
	}

	//fmt.Println(a)
}

// Test the function that creates a new article
func TestCreateNewArticle(t *testing.T) {
	// get the original count of articles
	//originalLength := len(getAllArticles())

	newArticle := article{Title: "New test title", Author: "New test author", Content: "New test content"}
	// add another article
	num, err := createNewArticle(newArticle)
	if err != nil {
		t.Fail()
	}

	// get the new count of articles
	//allArticles, err := getAllArticles()
	//if err != nil {
	//	t.Fail()
	//}

	//newLength := len(allArticles)

	if num == 0 {
		t.Fail()
	}

	num, err = deleteArticleByTitle(newArticle.Title)
	if num == 0 || err != nil {
		t.Fail()
	}
}
