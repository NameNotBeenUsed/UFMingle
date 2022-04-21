package main

import (
	"database/sql"
	"errors"
	"fmt"
)

type comment struct {
	ArticleId     int    `json:"article_id"`
	CommentAuthor string `json:"comment_author"`
	Content       string `json:"content"`
	CommentId     int    `json:"commentId"`
	CommentTime   string `json:"commentTime"`
	Likes         string `json:"likes"`
	Dislikes      string `json:"dislikes"`
}

func getAllComment(articleId string) ([]comment, error) {
	query := "SELECT comment_id, topic_id, comment_user, comment_content, comment_time, likes, dislikes from comment where topic_id=" + articleId
	rows, err := DB.Query(query)
	//fmt.Println("getAllArticles")
	//fmt.Println(err)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	commentResult := make([]comment, 0)

	for rows.Next() {
		singleComment := comment{}
		err = rows.Scan(&singleComment.CommentId, &singleComment.ArticleId, &singleComment.CommentAuthor, &singleComment.Content, &singleComment.CommentTime, &singleComment.Likes, &singleComment.Dislikes)
		checkErr(err)
		//fmt.Println(err)
		commentResult = append(commentResult, singleComment)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return commentResult, err

}

func getCommentsByUser(username string) ([]comment, error) {
	query := "SELECT comment_id, topic_id, comment_user, comment_content, comment_time, likes, dislikes from comment where comment_user='" + username + "';"
	rows, err := DB.Query(query)
	//fmt.Println("getAllArticles")
	//fmt.Println(err)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	commentResult := make([]comment, 0)

	for rows.Next() {
		singleComment := comment{}
		err = rows.Scan(&singleComment.CommentId, &singleComment.ArticleId, &singleComment.CommentAuthor, &singleComment.Content, &singleComment.CommentTime, &singleComment.Likes, &singleComment.Dislikes)
		checkErr(err)
		//fmt.Println(err)
		commentResult = append(commentResult, singleComment)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return commentResult, err
}

func createNewComment(commentData comment, tempuser mingleUser) (int64, error) {
	//res_user, er := isUserValid(tempuser)
	//res_comment, er := isCommentValid(commentData)
	//if res_user && res_comment {
	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}
	//tx.Exec("PRAGMA foreign_keys = ON")

	stmt, err := tx.Prepare("INSERT INTO comment (topic_id, comment_user, comment_content, comment_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)")
	if err != nil {
		fmt.Println("here1")
		return 0, err
	}

	defer stmt.Close()

	result, execErr := stmt.Exec(commentData.ArticleId, commentData.CommentAuthor, commentData.Content)
	if execErr != nil {
		fmt.Println("here2")
		tx.Commit()
		return 0, execErr
	}
	num, errR := result.RowsAffected()
	if errR != nil {
		fmt.Println("here3")
		return 0, errR
	}
	tx.Commit()
	fmt.Println("here4")
	return num, nil
	/*} else {
		return 0, er
	}*/
}

// Check if the comment matches the foreign key constraint
func isCommentValid(newComment comment) (bool, error) {
	stmt_article, err := DB.Prepare("SELECT id FROM articles WHERE id = ?")
	if err != nil {
		return false, err
	}
	defer stmt_article.Close()
	var tmpId int
	flag_article := false
	sqlErr := stmt_article.QueryRow(newComment.ArticleId).Scan(&tmpId)
	if sqlErr != sql.ErrNoRows && tmpId == newComment.ArticleId {
		flag_article = true
	}

	stmt_user, err := DB.Prepare("SELECT username FROM users WHERE username = ?")
	if err != nil {
		return false, err
	}
	defer stmt_user.Close()
	var tmpName string
	flag_user := false
	sqlErr = stmt_user.QueryRow(newComment.CommentAuthor).Scan(&tmpName)
	if sqlErr != sql.ErrNoRows && tmpName == newComment.CommentAuthor {
		flag_user = true
	}

	if flag_article && flag_user {
		return true, nil
	} else {
		return false, errors.New("ERROR")
	}
}

func deleteCommentByCommentId(commentId int) (int64, error) {
	tx, err := DB.Begin()
	if err != nil {
		return 0, err
	}

	stmt, err := DB.Prepare("DELETE FROM comment WHERE comment_id = ?")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(commentId)
	if err != nil {
		tx.Commit()
		return 0, err
	}

	num, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	tx.Commit()
	return num, err
}
