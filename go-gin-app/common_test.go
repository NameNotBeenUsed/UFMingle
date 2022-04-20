package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"testing"

	"github.com/gin-gonic/gin"
)

//var tmpUserList []user
//var tmpArticleList []article

// This function is used to do setup before executing the test functions
func TestMain(m *testing.M) {
	//Set Gin to Test Mode
	gin.SetMode(gin.TestMode)

	connDBErr := ConnectDB()
	if connDBErr != nil {
		fmt.Println(connDBErr.Error())
	}
	// Run the other tests
	os.Exit(m.Run())
}

// Helper function to create a router during testing
func getRouter(withTemplates bool) *gin.Engine {
	r := gin.Default()
	if withTemplates {
		r.LoadHTMLGlob("templates/*")
		r.Use(setUserStatus())
	}
	return r
}

// Helper function to process a request and test its response
func testHTTPResponse(t *testing.T, r *gin.Engine, req *http.Request, f func(w *httptest.ResponseRecorder) bool) {

	// Create a response recorder
	w := httptest.NewRecorder()

	// Create the service and process the above request.
	r.ServeHTTP(w, req)

	// f(w) == false, fail
	if !f(w) {
		t.Fail()
	}
}

// This is a helper function that allows us to reuse some code in the above
// test methods
func testMiddlewareRequest(t *testing.T, r *gin.Engine, expectedHTTPCode int) {
	// Create a request to send to the above route
	req, _ := http.NewRequest("GET", "/", nil)

	// Process the request and test the response
	testHTTPResponse(t, r, req, func(w *httptest.ResponseRecorder) bool {
		return w.Code == expectedHTTPCode
	})
}

// This function is used to store the main lists into the temporary one
// for testing
//func saveLists() {
//	tmpUserList, _ = getAllUsers()
//	tmpArticleList, _ = getAllArticles()
//}

// This function is used to restore the main lists from the temporary one
//func restoreLists() {
//	userList = tmpUserList
//	articleList = tmpArticleList
//}

func TestConvIntListToStr(t *testing.T) {
	//corner case
	emptyList := []int{}
	//fmt.Println("print", convIntListToStr(list))
	//fmt.Println("test", convIntListToStr(list) == "")
	if convIntListToStr(emptyList) != "" {
		t.Fail()
	}

	//regular case
	testList := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}
	//fmt.Println(convIntListToStr(testList))
	if convIntListToStr(testList) != "1,2,3,4,5,6,7,8,9,0" {
		t.Fail()
	}
}

func TestDelete(t *testing.T) {
	//corner case
	likeList := []int{1}
	likeList = append(likeList[:0], likeList[0+1:]...)
	if len(likeList) != 0 {
		t.Fail()
	}

	//regular case
	testList := []int{1, 2, 3}
	testList = append(testList[:1], testList[2:]...)
	if !reflect.DeepEqual(testList, []int{1, 3}) {
		t.Fail()
	}
}

func TestConvStrToIntList(t *testing.T) {
	//corner case
	emptyStr := ""
	resList, err := convStrToIntList(emptyStr)
	if len(resList) != 0 || err != nil {
		t.Fail()
	}

	//regular case
	testStr := "1,2,3,4,5,6,7,8,9,0"
	resList, err = convStrToIntList(testStr)
	if err != nil || !reflect.DeepEqual(resList, []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0}) {
		t.Fail()
	}
}

func TestContains(t *testing.T) {
	//corner case
	index, ifContains := contains([]int{}, 0)
	if index != -1 || ifContains != false {
		t.Fail()
	}

	//regular case
	index, ifContains = contains([]int{1, 2, 3, 4, 5}, 5)
	if index != 4 || ifContains != true {
		t.Fail()
	}

	index, ifContains = contains([]int{1, 2, 3, 4, 5}, 9)
	if index != -1 || ifContains != false {
		t.Fail()
	}
}

func TestCheckIfStrContainsEle(t *testing.T) {
	//corner case
	emptyStr := ""
	index, ifContains, err := checkIfStrContainsEle(emptyStr, 1)
	if index != -1 || ifContains != false || err != nil {
		t.Fail()
	}

	//regular case
	testStr := "1,2,3,4,5,6"
	index, ifContains, err = checkIfStrContainsEle(testStr, 4)
	if index != 3 || ifContains != true || err != nil {
		t.Fail()
	}

	index, ifContains, err = checkIfStrContainsEle(testStr, 9)
	if index != -1 || ifContains != false || err != nil {
		t.Fail()
	}
}
