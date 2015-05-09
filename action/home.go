package action

import (
	"fmt"
	"go.net/websocket"
	"html/template"
	"net/http"
)

// func Login(w http.ResponseWriter, r *http.Request) {
// 	if r.Method == "GET" {
// 		t, err := template.ParseFiles("view/login.gtpl")
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 		} else {
// 			person := model.Person{UserName: "Astaxie"}
// 			t.Execute(w, person)
// 		}
// 	} else {
// 		fmt.Println("username:", r.Form["username"])
// 		fmt.Println("password:", r.Form["password"])
// 	}
// }

func Home(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("static/home.html")
	t.Execute(w, nil)
}

func Echo(ws *websocket.Conn) {
	var err error
	for {
		var reply string
		if err = websocket.Message.Receive(ws, &reply); err != nil {
			fmt.Println("Can't receive")
			break
		}
		fmt.Println("Received back from client: " + reply)
		msg := "Received: " + reply
		fmt.Println("Sending to client: " + msg)
		if err = websocket.Message.Send(ws, msg); err != nil {
			fmt.Println("Can't send")
			break
		}
	}
}
