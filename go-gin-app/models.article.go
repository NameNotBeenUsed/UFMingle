// models.article.go

package main

import (
	"database/sql"
	"strconv"
)

type article struct {
	ID      int    `json:"id"`
	Author  string `json:"author"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

// For this demo, we're storing the article list in memory
// In a real application, this list will most likely be fetched
// from a database or from static files
//var articleList = []article{
//	article{ID: 1, Author: "loveLadyGaga", Title: "[seeking for a woman]Where is my true love", Content: "name: Mike.B\n " +
//		"age:23\n" +
//		"height:175c\n" +
//		"I like music and I wanna meet a girl who loves music too",
//	},
//	article{ID: 2, Author: "123handsomeGator", Title: "[seeking for a man]I am Rose, looking for my Jack",
//		Content: "name: Zoey.J\n" +
//			"age:20\n" +
//			"height:170cm\n" +
//			"I was born in a happy family and I prefers boys who have a good sense of humor.\n"},
//	article{ID: 3, Author: "_gators", Title: "[seeking for a man]Spotlights on me~",
//		Content: "name: Lily.J\n" +
//			"age:27\n" +
//			"height:172cm\n" +
//			"I am now a teacher in a high school. I have a dog and tow cats. I am looking for a handsome boyfriend~\n"},
//}

// Return a list of all the articles
func getAllArticles() ([]article, error) {
	//return articleList
	rows, err := DB.Query("SELECT id, author, title, content from articles")
	//fmt.Println("getAllArticles")
	//fmt.Println(err)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	articleResult := make([]article, 0)

	for rows.Next() {
		singleArticle := article{}
		err = rows.Scan(&singleArticle.ID, &singleArticle.Author, &singleArticle.Title, &singleArticle.Content)
		checkErr(err)
		articleResult = append(articleResult, singleArticle)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return articleResult, err
}

// Get number count of articles
// 刷新页面用
func getArticles(count int) ([]article, error) {
	rows, err := DB.Query("SELECT id, author, title, content from articles LIMIT" + strconv.Itoa(count))
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	articleResults := make([]article, 0)

	for rows.Next() {
		singleArticle := article{}
		err = rows.Scan(&singleArticle.ID, &singleArticle.Author, &singleArticle.Title, &singleArticle.Content)

		if err != nil {
			return nil, err
		}

		articleResults = append(articleResults, singleArticle)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return articleResults, err
}

// Fetch an article based on the ID supplied
func getArticleByID(id int) (article, error) {
	//for _, a := range articleList {
	//	if a.ID == id {
	//		return &a, nil
	//	}
	//}
	stmt, err := DB.Prepare("SELECT id, author, title, content from articles WHERE id = ?")
	if err != nil {
		return article{}, err
	}

	defer stmt.Close()

	articleResult := article{}

	sqlErr := stmt.QueryRow(id).Scan(&articleResult.ID, &articleResult.Author, &articleResult.Content, &articleResult.Content)

	if sqlErr != nil {
		if sqlErr == sql.ErrNoRows {
			return article{}, nil
		}
		return article{}, sqlErr
	}
	return articleResult, nil
}

// Create a new article with the title and content provided
func createNewArticle(newArticle article) (int64, error) {
	//// Set the ID of a new article to one more than the number of articles
	//a := article{ID: len(articleList) + 1, Author: author, Title: title, Content: content}
	//
	//// Add the article to the list of articles
	//articleList = append(articleList, a)
	//
	//return &a, nil
	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := tx.Prepare("INSERT INTO articles (author, title, content) VALUES (?, ?, ?)")
	if err != nil {
		return 0, err
	}

	defer stmt.Close()

	result, execErr := stmt.Exec(newArticle.Author, newArticle.Title, newArticle.Content)
	if execErr != nil {
		return 0, execErr
	}
	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}
	tx.Commit()

	return num, nil
}

func deleteArticleById(id int) (int64, error) {
	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := DB.Prepare("DELETE from articles where id = ?")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(id)

	if err != nil {
		return 0, err
	}

	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	tx.Commit()

	return num, nil
}

func deleteArticleByTitle(title string) (int64, error) {
	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := DB.Prepare("DELETE FROM articles WHERE title = ?")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(title)
	if err != nil {
		return 0, err
	}

	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	tx.Commit()

	return num, err
}
