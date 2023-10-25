package main

import (
	"log"
	"encoding/json"
	"net/http"
)

type User struct {
    IP    string `json:"id"`
	COUNT string `json:"count"`
	TIME  string `json:"time"`
}

func main() {
	handler := http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		pingIP := req.URL.Query().Get("ip")
		pingCount := req.URL.Query().Get("count")
		pingTime := req.URL.Query().Get("timeout")
		user := User{
			IP:    pingIP,
			COUNT: pingCount, 
			TIME:  pingTime, 
		}
		
		json, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Content-Type", "application/json")
		w.Write(json)
	})
	log.Println("Server is available at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
