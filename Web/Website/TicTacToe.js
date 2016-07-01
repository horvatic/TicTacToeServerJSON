// WebSite/TicTacToe

function displayWithNoButton(element) {
    const tableItem = document.createElement("td");
    tableItem.appendChild(document
        .createTextNode(element));
    return tableItem;
}

function displayWithButton(id, element) {
    const tableItem = document.createElement("td");
    const moveableSpace = document.createElement("button");
    moveableSpace.id = id;
    moveableSpace.addEventListener("click",
        function() { playerChoose(this.id) });
    moveableSpace.appendChild(document.createTextNode(element));
    tableItem.appendChild(moveableSpace);
    return tableItem;
}

function outputBoxElement(index, element, GameOver) {
    if (element != "@" && element != "x" && !GameOver)
        return displayWithButton((index + 1),
            element);
    else
        return displayWithNoButton(element);
}

function displayTicTacToeBox(ticTacToeBox, gameOver) {
    removeChildern(document.getElementById("mainBody"));

    const ticTacToeBoxTable = document.createElement("table");
    for (var row = 0; row < 9; row += 3) {
        const tableRow = document.createElement("tr");
        for (var col = 0; col < 3; col++) {
            const element = outputBoxElement((row + col),
                ticTacToeBox[row + col], gameOver);
            tableRow.appendChild(element);
        }
        ticTacToeBoxTable.appendChild(tableRow);
    }

    if (gameOver) {
        gameIsOver();
    }
    document.getElementById("mainBody").appendChild(ticTacToeBoxTable);
}

function gameIsOver() {
    document.getElementById("mainBody")
    .appendChild(gameOverTextHtml());
    document.getElementById("mainBody")
       .appendChild(gameOverRefreshButtonHtml());
}

function removeChildern(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function gameOverTextHtml() {
    const gameOverText = document.createElement("p");
    gameOverText.appendChild(document
        .createTextNode("Game Over"));
    return gameOverText;
}

function gameOverRefreshButtonHtml() {
    const gameOverText = document.createElement("button");
    gameOverText.addEventListener("click",
        function() { location.reload() });
    gameOverText.appendChild(document
        .createTextNode("Another Game?"));
    return gameOverText;
}

function generateTicTacToeJSON(ticTacToeBox, move) {
    return JSON.stringify({
        "data": ticTacToeBox,
        "move": move.toString()
    });
}

function editPage(xhttp) {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        const serviceResponse = JSON.parse(xhttp.responseText);
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