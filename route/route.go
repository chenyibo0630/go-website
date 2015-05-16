package route

import (
	"fmt"
	"go-website/action"
	"go.net/websocket"
	"net/http"
	"regexp"
)

func HandleRoute() {

	http.Handle("/echo", websocket.Handler(action.Echo))
	//static
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	//defalt
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		host := r.Referer()
		// host := "blog.yibosama.com"
		reg := regexp.MustCompile(`(?:http://)?(?P<domain>\w+)[\.][\w]*[\.]com`)
		domain := reg.FindStringSubmatch(host)
		if domain != nil && len(domain) > 1 {
			switch domain[1] {
			case "blog":
				fmt.Println("blog")
			default:
				action.Home(w, r)
			}
		} else {
			//homepage
			action.Home(w, r)
		}
	})

}
