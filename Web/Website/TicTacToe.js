// WebSite/TicTacToe
$(function () {

});

function makeTableElement(symbol, id) {
    if (symbol != "x" && symbol != "@")
        return $("<td></td>").append
        ($("<button></button>").attr("id", id)
            .text(symbol)
            .click(function() { playerChooseMove(this.id) }));
    else
        return $("<td></td>").text(symbol);
}

function editPage(ticTacToeData) {
    $("#mainBody").empty();
    const ticTacToeTable = $("<table></table>");
    for (var row = 0; row < 9; row += 3) {
        const tableRow = $("<tr></tr>")
        for (var col = 0; col < 3; col++) {
            tableRow.append(makeTableElement(ticTacToeData[col + row],
                col + row + 1));
        }
        ticTacToeTable.append(tableRow)
    }
    $("#mainBody").append(ticTacToeTable);
}

function startPage() {
    $.ajaxSetup({
        contentType: "application/JSON"
    });
    $.getJSON("http://127.0.0.1:8080", function (json) {
        window.ticTacToeData = json.data;
        editPage(json.data)
    });
}

function generateTicTacToeJSON(ticTacToeBox, move) {
    return JSON.stringify({
        "data": ticTacToeBox,
        "move": move.toString()
    });
}

function playerChooseMove(id) {
    $.post("http://127.0.0.1:8080",
        generateTicTacToeJSON(window.ticTacToeData, id),
        function (json) {
            window.ticTacToeData = JSON.parse(json).data;
            editPage(window.ticTacToeData)
        });
}