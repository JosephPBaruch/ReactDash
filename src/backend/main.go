package main

import (
	"log"
	"os/exec"
	"strings"
	"encoding/json"
	"net/http"
)

type Ping struct {
    IP    string `json:"id"`
	COUNT string `json:"count"`
	TIME  string `json:"time"`
}

type Trace struct {
	IP    string `json:"id"`
}

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, req *http.Request) {
		response := ""
		pingIP := req.URL.Query().Get("ip")
		pingCount := req.URL.Query().Get("count")
		pingTime := req.URL.Query().Get("timeout")

		out, _ := exec.Command("ping", "-c " + pingCount, "-t " + pingTime, pingIP ).Output()
		if strings.Contains(string(out), "100.0% packet loss") {
			response = "Fail"
		} else {
			response = "Succeed"
		}

		user := Ping{
			IP:   response,
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


	// -------------- TraceRoute ------------------
	http.HandleFunc("/trace", func(w http.ResponseWriter, req *http.Request) {
		traceIP := req.URL.Query().Get("ip")

		out, _ := exec.Command("sudo", "tcptraceroute", traceIP ).Output()

		user := Trace{
			IP:   string(out),
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
	log.Fatal(http.ListenAndServe(":8000", nil))
}
