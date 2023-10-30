package main

import (
	"log"
	"os/exec"
	"strings"
	"encoding/json"
	"net/http"
)

type Ping struct {
	Response string `json:"response"`
	Body     string `json:"packets"`
}

type Trace struct {
	IP    string `json:"id"`
}

type TCP struct {
    IP    string `json:"id"`
	COUNT string `json:"count"`
}

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, req *http.Request) {
		response := "a"
		pingIP := req.URL.Query().Get("ip")
		pingCount := req.URL.Query().Get("count")
		pingTime := req.URL.Query().Get("timeout")

		out, _ := exec.Command("ping", "-c " + pingCount, "-t " + pingTime, pingIP ).Output()
		if strings.Contains(string(out), " 0% packet loss") {
			response = "Succeed"
		} else {
			response = "Fail"
		}

		user := Ping{
			Response: response, 
			Body: string(out),
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

	http.HandleFunc("/tcp", func(w http.ResponseWriter, req *http.Request) {
		tcpIP := req.URL.Query().Get("ip")
		tcpCount := req.URL.Query().Get("count")

		//out, _ := exec.Command("sudo", "tcptraceroute", traceIP ).Output()

		user := TCP{
			IP:   tcpIP,
			COUNT: tcpCount,
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
