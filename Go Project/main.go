package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"

	"test.com/test/Builder"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// build the game web page
func save(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println(id)

	//Convert response to byte array
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	//Build the game with request data
	Builder.BuildGame(body)

	fmt.Fprintf(w, "hello\n")
}

// Saves an image to the server for reference on build
func saveImage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fileName := vars["fileName"]

	//Convert response to byte array
	file, _, fErr := r.FormFile("photo")
	defer file.Close()
	Builder.Check(fErr)

	body := bytes.NewBuffer(nil)
	_, bErr := io.Copy(body, file)
	Builder.Check(bErr)

	//Save the image to file
	w.WriteHeader(Builder.SaveImage(fileName, body.Bytes()))

	fmt.Fprintf(w, "hello\n")
}

// Fileserver to get required files to play game
func play(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	path := vars["path"]

	p := "." + r.URL.Path

	if path == "run" {
		p = "./play/index.html"
	}

	http.ServeFile(w, r, p)
}

func main() {
	rtr := mux.NewRouter()

	//for CORS
	//TODO - fix allowed origins with domain of client
	headersOk := handlers.AllowedHeaders([]string{"content-type", "Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	//Routing
	rtr.HandleFunc("/play/{path}", play).Methods("GET")
	rtr.HandleFunc("/save/{id}", save).Methods("PUT")
	rtr.HandleFunc("/save/image/{fileName}", saveImage).Methods("POST")

	//Host server on port 8080
	http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(rtr))
}
