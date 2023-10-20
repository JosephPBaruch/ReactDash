package main

import (
	"fmt"
	"log"
	"net/http"
)



func main() {
	handler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		paramValue := req.URL.Query().Get("name")
        log.Println(paramValue)

		resp := []byte(`{"status": "ok"}`)
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		rw.Header().Set("Content-Type", "application/json")
		rw.Header().Set("Content-Length", fmt.Sprint(len(resp)))
		rw.Write(resp)
	})

	log.Println("Server is available at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
