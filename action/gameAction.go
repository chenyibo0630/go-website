package action

import (
	"html/template"
	"log"
	"net/http"
)

func PokeMole(w http.ResponseWriter, r *http.Request) {
	s1, err := template.ParseFiles("view/games/pokeMole.html", "view/common.html")
	if err != nil {
		log.Println(err)
	}
	s1.ExecuteTemplate(w, "content", nil)
}
