// WebSite/TicTacToe

function DisplayTicTacToeBox(ticTacToeBox) {
    document.getElementById("mainBody")
            .innerHTML = "";
    for (var i = 0; i < 9; i += 3) {
        for (var k = 0; k < 3; k++) {
            document.getElementById("mainBody")
                .innerHTML +=
                "<button id=" + (i + k + 1)
                + " onclick=PlayerChoose(this.id)>" +
                ticTacToeBox[i + k] + "</button>";
        }
        document.getElementById("mainBody")
            .innerHTML += "<br>";
    }
}

function GenerateTicTacToeJSON(ticTacToeBox, move) {
    var packet = "{ \"data\" : [";
    for (var i = 0; i < 8; i++) {
        packet += "\"" + ticTacToeBox[i] + "\", ";
    }
    packet += "\"" + ticTacToeBox[8] + "\"], "
    + "\"move\" : \"" + move + "\" }";
    return packet;
}

function EditPage(xhttp) {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        var ticTacToeBox = JSON.parse(xhttp.responseText);
        window.ticTacToeBox = ticTacToeBox.data;
        DisplayTicTacToeBox(ticTacToeBox.data);
    }
}

function StartPage(xhttp) {
    xhttp.onreadystatechange = function () {
        EditPage(this);
    };
    window.xhttp = xhttp;
    xhttp.open("GET", "http://127.0.0.1:8080", true);
    xhttp.send();
}

function PlayerChoose(id) {
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.setRequestHeader("Content-Type",
        "application/JSON");
    xhttp.send(GenerateTicTacToeJSON(window.ticTacToeBox, id));
}