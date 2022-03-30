package main

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
		commentResult = append(commentResult, singleComment)
	}

	err = rows.Err()

	if err != nil {
		return nil, err
	}

	return commentResult, err

}

func createNewComment(commentData comment, tempuser mingleUser) (int64, error) {
	res, er := isUserValid(tempuser)
	if res {
		tx, err := DB.Begin()
		if err != nil {
			return 0, err
		}

		stmt, err := tx.Prepare("INSERT INTO comment (topic_id, comment_user, comment_content, comment_time) VALUES (?, ?, ?, CURRENT_TIMESTAMP)")
		if err != nil {
			return 0, err
		}

		defer stmt.Close()

		result, execErr := stmt.Exec(commentData.ArticleId, commentData.CommentAuthor, commentData.Content)
		if execErr != nil {
			return 0, execErr
		}
		num, errR := result.RowsAffected()
		if errR != nil {
			return 0, errR
		}
		tx.Commit()

		return num, nil
	} else {
		return 0, er
	}
}
