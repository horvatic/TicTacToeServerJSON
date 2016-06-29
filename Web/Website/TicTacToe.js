// WebSite/TicTacToe

function displayWithNoButton(element) {
    var tableItem = document.createElement("td");
    tableItem.appendChild(document
        .createTextNode(element));
    return tableItem;
}

function displayWithButton(id, element) {
    var tableItem = document.createElement("td");
    var moveableSpace = document.createElement("button");
    moveableSpace.id = id;
    moveableSpace.addEventListener("click",
        function () { playerChoose(this.id) })
    moveableSpace.appendChild(document.createTextNode(element));
    tableItem.appendChild(moveableSpace);
    return tableItem;
}

function outputBoxElement(index, element, GameOver) {
    if (element != "@" && element != "x" && !GameOver)
        return displayWithButton((index + 1),
            element)
    else
        return displayWithNoButton(element)
}

function displayTicTacToeBox(ticTacToeBox, gameOver) {
    displayDiv = document.getElementById("mainBody")
    while (displayDiv.firstChild) {
        displayDiv.removeChild(displayDiv.firstChild);
    }
    var ticTacToeBoxTable = document.createElement("table");
    for (var row = 0; row < 9; row += 3) {
        var tableRow = document.createElement("tr");
        for (var col = 0; col < 3; col++) {
            var element = outputBoxElement((row + col),
                ticTacToeBox[row + col], gameOver);
            tableRow.appendChild(element);
        }
        ticTacToeBoxTable.appendChild(tableRow);
    }
    if (gameOver) {
        document.getElementById("mainBody")
            .appendChild(gameOverTextHtml());
        document.getElementById("mainBody")
           .appendChild(gameOverRefreshButtonHtml());
    }
    document.getElementById("mainBody").appendChild(ticTacToeBoxTable);
}

function gameOverTextHtml() {
    var gameOverText = document.createElement("p");
    gameOverText.appendChild(document
        .createTextNode("Game Over"));
    return gameOverText;
}

function gameOverRefreshButtonHtml() {
    var gameOverText = document.createElement("button");
    gameOverText.addEventListener("click",
        function () { location.reload() })
    gameOverText.appendChild(document
        .createTextNode("Another Game?"));
    return gameOverText;
}

function generateTicTacToeJSON(ticTacToeBox, move) {
    var packet = "{ \"data\" : [";
    for (var i = 0; i < 8; i++) {
        packet += "\"" + ticTacToeBox[i] + "\", ";
    }
    packet += "\"" + ticTacToeBox[8] + "\"], "
    + "\"move\" : \"" + move + "\" }";
    return packet;
}

function editPage(xhttp) {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        var serviceResponse = JSON.parse(xhttp.responseText);
        window.ticTacToeBox = serviceResponse.data;
        if (serviceResponse.GameOver == undefined)
            displayTicTacToeBox(serviceResponse.data, false);
        else 
            displayTicTacToeBox(serviceResponse.data, true);
    }
}

function startPage(xhttp) {
    xhttp.onreadystatechange = function () {
        editPage(this);
    };
    window.xhttp = xhttp;
    xhttp.open("GET", "http://127.0.0.1:8080", true);
    xhttp.send();
}

function playerChoose(id) {
    xhttp.open("POST", "http://127.0.0.1:8080", true);
    xhttp.setRequestHeader("Content-Type",
        "application/JSON");
    xhttp.send(generateTicTacToeJSON(window.ticTacToeBox, id));
}