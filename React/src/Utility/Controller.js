
//Controller for API Callouts to the Server
export let ServerController = {
    //Send a request to the server to save the game. 
    //if successful then open page to run
    sendSavePlayReq : function(GameSettings, doPlay){
        let req = new XMLHttpRequest();
        req.open("PUT", "http://localhost:8080/save/test");
        req.setRequestHeader("Content-Type", "application/json");

        //Build the request body
        let data = {};
        for (var gObj of Object.values(GameSettings.objects)){
            let nObj = {
            id: gObj.id,
            behaviors: gObj.behaviors,
            position: gObj.position,
            sprite: gObj.sprite
            }
            data[gObj.id] = nObj;
        }
        
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200 && doPlay) {
                window.open('http://localhost:8080/play/run');
            }
        };

        req.send(JSON.stringify(data));
    }
}