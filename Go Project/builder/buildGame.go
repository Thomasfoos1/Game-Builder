package Builder

import (
	"encoding/json"
	"fmt"
	"os"
)

type GameObject struct {
	ID        string                            `json:"id"`
	Sprite    Sprite                            `json:"sprite"`
	Pos       Position                          `json:"position"`
	Behaviors map[string]map[string]interface{} `json:"behaviors"`
}

type Sprite struct {
	ImgFileName string `json:"imageFile"`
	Width       string `json:"width"`
	Height      string `json:"height"`
}

type Position struct {
	X int `json:"x"`
	Y int `json:"y"`
	A int `json:"a"`
}

func Check(e error) {
	if e != nil {
		panic(e)
	}
}

func initGameObjectMap(body []byte) map[string]GameObject {
	var data map[string]GameObject
	json.Unmarshal(body, &data)
	return data
}

func BuildGame(body []byte) {
	objs := initGameObjectMap(body)

	buildHTML(objs)
	buildScript(objs)
}

func buildHTML(objs map[string]GameObject) {
	f, err := os.Create("play/game.html")
	Check(err)

	header, err := os.ReadFile("builder/buildComponents/PageHeader.txt")
	Check(err)
	f.Write(header)

	for key, element := range objs {
		//If image exists then add to html
		objHTML := ""
		if element.Sprite.ImgFileName != "" {
			objHTML = fmt.Sprintf(`<img src="%s" style="width:%spx;height:%spx;"/>`, element.Sprite.ImgFileName, element.Sprite.Width, element.Sprite.Height)
		} else {
			objHTML = "X"
		}

		f.Write([]byte(fmt.Sprintf(`<div id="%s" style = "position: absolute;">%s</div>`, key, objHTML)))
		f.Write([]byte{0x0A}) //newline
	}

	footer, err := os.ReadFile("builder/buildComponents/PageFooter.txt")
	Check(err)
	f.Write(footer)
	f.Close()
}

func buildScript(objs map[string]GameObject) {
	f, err := os.Create("play/script.js")
	Check(err)

	header, err := os.ReadFile("builder/buildComponents/ScriptHeader.txt")
	Check(err)
	f.Write(header)

	//Convert to json data and write to file
	for key, element := range objs {
		nl := []byte{0x0A}  //newline
		tab := []byte{0x09} //tab

		//JSON key
		f.Write([]byte(fmt.Sprintf(`%s: {`, key)))
		f.Write(nl)

		//id attribute
		f.Write(tab)
		f.Write([]byte(fmt.Sprintf(`id: "%s",`, key)))
		f.Write(nl)

		//position attribute
		f.Write(tab)
		f.Write([]byte(fmt.Sprintf(`position: new Position(%d,%d),`, element.Pos.X, element.Pos.Y)))
		f.Write(nl)

		//element attribute
		f.Write(tab)
		f.Write([]byte(fmt.Sprintf(`element: document.getElementById("%s"),`, key)))
		f.Write(nl)

		//behaviors attribute
		f.Write(tab)
		f.Write([]byte(fmt.Sprintf(`behaviors: [`)))
		for cmpName, cmpParams := range element.Behaviors {
			argsStr, err := json.Marshal(cmpParams)
			Check(err)
			f.Write([]byte(fmt.Sprintf(`new Behavior(%s, %s),`, cmpName, argsStr)))
		}
		f.Write([]byte("]\n"))
		f.Write([]byte("},\n"))
	}

	footer, err := os.ReadFile("builder/buildComponents/ScriptFooter.txt")
	Check(err)
	f.Write(footer)
	f.Close()
}

func SaveImage(fName string, body []byte) int {
	f, err := os.Create("play/" + fName)
	Check(err)
	f.Write(body)
	f.Close()

	return 200
}
