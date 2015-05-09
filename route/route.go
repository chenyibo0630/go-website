package route

import (
	"cyb/action"
	"go.net/websocket"
	"net/http"
)

func HandleRoute() {
	//home
	http.Handle("/echo", websocket.Handler(action.Echo))
	http.HandleFunc("/", action.Home)
	//static
	http.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})

}
