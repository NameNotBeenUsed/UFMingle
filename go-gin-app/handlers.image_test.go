package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetAvatar(t *testing.T) {
	w := httptest.NewRecorder()
	r := getRouter(true)
	http.SetCookie(w, &http.Cookie{Name: "token", Value: "%7B%22username%22%3A%22user1%22%2C%22password%22%3A%22pass1%22%7D"})
	r.GET("/avatar/:username", ensureLoggedIn(), getAvatar)
	req, _ := http.NewRequest("GET", "/avatar/user1", nil)
	req.Header = http.Header{"Cookie": w.Result().Header["Set-Cookie"]}
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Fail()
	}
}
