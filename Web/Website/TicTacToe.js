// WebSite/TicTacToe
function makeTableElement(symbol, id, gameOver) {
    if (symbol != "x" && symbol != "@" && gameOver == "false")
        return $("<td></td>").append
        ($("<button></button>").attr("id", id)
            .text(symbol)
            .click(function() { playerChooseMove(this.id) }));
    else
        return $("<td></td>").text(symbol);
}

function editPage(ticTacToeData, gameOver) {
    $("#mainBody").empty();
    const ticTacToeTable = $("<table></table>");
    for (var row = 0; row < 9; row += 3) {
        const tableRow = $("<tr></tr>")
        for (var col = 0; col < 3; col++) {
            tableRow.append(makeTableElement(ticTacToeData[col + row],
                col + row + 1, gameOver));
        }
        ticTacToeTable.append(tableRow)
    }
    if (gameOver == "true") {
        $("#mainBody").append($("<p></p>").text("Game Over"));
        $("#mainBody").append($("<button></button>")
            .text("Another Game?")
            .attr("id", "refresh")
            .click(function () { startPage() }));
    }
    $("#mainBody").append(ticTacToeTable);
}

function startPage() {
    $.ajaxSetup({
        contentType: "application/JSON"
    });
    $.getJSON("http://127.0.0.1:8080", function (json) {
        window.ticTacToeData = json.board;
        editPage(json.board, json.gameOver)
    });
}

function generateTicTacToeJSON(ticTacToeBox, move) {
    return JSON.stringify({
        "board": ticTacToeBox,
        "move": move.toString()
    });
}

function playerChooseMove(id) {
    $.post("http://127.0.0.1:8080",
        generateTicTacToeJSON(window.ticTacToeData, id),
        function (json) {
            var gameData = JSON.parse(json);
            window.ticTacToeData = gameData.board;
            const gameOver = gameData.gameOver;
            editPage(window.ticTacToeData, gameOver)
        });
}