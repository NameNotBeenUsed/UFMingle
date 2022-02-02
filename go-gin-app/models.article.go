// models.article.go

package main

import "errors"

type article struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

// For this demo, we're storing the article list in memory
// In a real application, this list will most likely be fetched
// from a database or from static files
var articleList = []article{
	article{ID: 1, Title: "[seeking for a woman]Where is my true love", Content: "name: Mike.B\n " +
		"age:23\n" +
		"height:175c\n" +
		"I like music and I wanna meet a girl who loves music too",
	},
	article{ID: 2, Title: "[seeking for a man]I am Rose, looking for my Jack",
		Content: "name: Zoey.J\n" +
			"age:20\n" +
			"height:170cm\n" +
			"I was born in a happy family and I prefers boys who have a good sense of humor.\n"},
	article{ID: 3, Title: "[seeking for a man]Spotlights on me~",
		Content: "name: Lily.J\n" +
			"age:27\n" +
			"height:172cm\n" +
			"I am now a teacher in a high school. I have a dog and tow cats. I am looking for a handsome boyfriend~\n"},
}

// Return a list of all the articles
func getAllArticles() []article {
	return articleList
}

// Fetch an article based on the ID supplied
func getArticleByID(id int) (*article, error) {
	for _, a := range articleList {
		if a.ID == id {
			return &a, nil
		}
	}
	return nil, errors.New("Article not found")
}

// Create a new article with the title and content provided
func createNewArticle(title, content string) (*article, error) {
	// Set the ID of a new article to one more than the number of articles
	a := article{ID: len(articleList) + 1, Title: title, Content: content}

	// Add the article to the list of articles
	articleList = append(articleList, a)

	return &a, nil
}
