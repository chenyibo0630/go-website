package route

import (
	"cyb/action"
	"go.net/websocket"
	"net/http"
	"strings"
)

func HandleRoute() {

	http.Handle("/echo", websocket.Handler(action.Echo))
	//static
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	//defalt
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		host := r.Referer()
		if strings.EqualFold(host, "http://blog.yibosama.com") {

		} else {
			//homepage
			action.Home(w, r)
		}
	})

}
