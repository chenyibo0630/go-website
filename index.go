package main

import (
	"go-website/route"
	"log"
	"net/http"
)

func main() {
	route.HandleRoute()
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
