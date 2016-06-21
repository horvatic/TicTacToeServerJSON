// WebSite/TicTacToe

function DisplayWithNoButton(element) {
    return "<td>" + element + "</td>";
}

function DisplayWithButton(id, element) {
    return "<td><button id=" + id
    + " onclick=PlayerChoose(this.id)>" +
    element + "</button></td>";
}

function OutputBoxElement(index, element, GameOver) {
    if (element != "@" && element != "x" && !GameOver)
        return DisplayWithButton((index + 1),
            element)
    else
        return DisplayWithNoButton(element)
}

function DisplayTicTacToeBox(ticTacToeBox, GameOver) {
    var htmlOutPut = GameOver == true ?
        "<button onclick=\"location.reload()\">Another Game?</button>"
        : "";
        htmlOutPut +=
        "<table style=\"width: 100 % \">" +
        "<tbody>"
    for (var i = 0; i < 9; i += 3) {
        htmlOutPut += "<tr>"
        for (var k = 0; k < 3; k++) {
            htmlOutPut += OutputBoxElement((i + k),
                ticTacToeBox[i + k], GameOver);
        }
        htmlOutPut += "</tr>"
    }
    document.getElementById("mainBody")
        .innerHTML = htmlOutPut + "</tr></tbody></table>"
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
        var serviceResponse = JSON.parse(xhttp.responseText);
        window.ticTacToeBox = serviceResponse.data;
        if (serviceResponse.GameOver == undefined)
            DisplayTicTacToeBox(serviceResponse.data, false);
        else 
            DisplayTicTacToeBox(serviceResponse.data, true);
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