QUnit.test("StartPage", function (assert) {

    var xhttp = new MockXMLHttpRequest();
    startPage(xhttp);
    assert.deepEqual(window.xhttp, xhttp);
    assert.equal(xhttp.mockOpenRequestValues,
        "GEThttp://127.0.0.1:8080true");
    assert.equal(xhttp.mockSendCalled, 1);
    assert.notEqual(xhttp.onreadystatechange,
        null);
});

QUnit.test("Element with No Button", function (assert) {

    var exampleHtml =
        document.createElement("td");
    exampleHtml.appendChild(document
        .createTextNode("x"));
    displayWithNoButton("x");
    assert.deepEqual(displayWithNoButton("x"),
        exampleHtml);

});

QUnit.test("Game Over Refresh Button Html", function (assert) {

    const gameOverText = document.createElement("button");
    gameOverText.addEventListener("click",
        function () { location.reload() });
    gameOverText.appendChild(document
        .createTextNode("Another Game?"));

    assert.deepEqual(gameOverRefreshButtonHtml(),
        gameOverText);

});

QUnit.test("Element with Button", function (assert) {

    var exampleHtml = document.createElement("td");
    var moveableSpace = document.createElement("button");
    moveableSpace.id = 1;
    moveableSpace.addEventListener("click",
        function () { playerChoose(this.id) })
    moveableSpace.appendChild(document.createTextNode("-1-"));
    exampleHtml.appendChild(moveableSpace);
    assert.deepEqual(displayWithButton(1, "-1-"),
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Array_To_Page", function (assert) {
    var ticTacToeBox = ["x", "@", "-3-", "-4-",
        "-5-", "-6-", "-7-", "-8-", "-9-"]

    var exampleHtml =
        "<table>" +
        "<tr>" +
        "<td>x</td>" +
        "<td>@</td>" +
        "<td><button id=\"3\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\">" +
        "-9-</button></td>"
        + "</tr></table>";

    displayTicTacToeBox(ticTacToeBox, false);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Game_Over", function (assert) {
    var ticTacToeBox = ["x", "x", "x", "-4-",
        "-5-", "-6-", "-7-", "@", "@"]

    var exampleHtml =
        "<p>Game Over</p>" + 
        "<button>Another Game?</button>" +
        "<table>" +
        "<tr>" +
        "<td>x</td>" +
        "<td>x</td>" +
        "<td>x</td></tr><tr>" +
        "<td>" +
        "-4-</td>" +
        "<td>" +
        "-5-</td>" +
        "<td>" +
        "-6-</td></tr><tr>" +
        "<td>" +
        "-7-</td>" +
        "<td>@</td>" +
        "<td>@</td>"
        + "</tr></table>";

    displayTicTacToeBox(ticTacToeBox, true);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Array_To_Page_Has_Moves", function (assert) {
    var ticTacToeBox = ["x", "@", "-3-", "-4-",
        "-5-", "-6-", "-7-", "-8-", "-9-"]

    var exampleHtml =
        "<table>" +
        "<tr>" +
        "<td>x</td>" +
        "<td>@</td>" +
        "<td><button id=\"3\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\">" +
        "-9-</button></td>"
        + "</tr></table>";

    displayTicTacToeBox(ticTacToeBox, false);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Making_Of_JSON_To_Send_To_Server", function(assert) {
    var example = "{\"board\":[\"-1-\",\"-2-\","
        + "\"-3-\",\"-4-\",\"-5-\",\"-6-\",\"-7-\","
        + "\"-8-\",\"-9-\"],\"move\":\"1\"}";

    var ticTacToeBox = ["-1-", "-2-", "-3-", "-4-",
    "-5-", "-6-", "-7-", "-8-", "-9-"]
    var move = 1;
    var JSONFormated
        = generateTicTacToeJSON(ticTacToeBox, move);

    assert.equal(JSONFormated, example);
})

QUnit.test("Edit_Page_To_Show_New_TicTacToe_Board", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"board\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"], \"gameOver\" : \"false\" }";
    xhttp.stubSetResponseText(Json);
    editPage(xhttp);
    var exampleHtml =
        "<table>" +
        "<tr>" +
        "<td><button id=\"1\">" +
        "-1-</button></td>" +
        "<td><button id=\"2\">" +
        "-2-</button></td>" +
        "<td><button id=\"3\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\">" +
        "-9-</button></td>"
        + "</tr></table>";

    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
})

QUnit.test("Edit_Page_To_Show_New_TicTacToe_Board_Game_Over",
    function (assert) {
        var exampleHtml =
        "<p>Game Over</p>" +
        "<button>Another Game?</button>" +
        "<table>" +
        "<tr>" +
        "<td>x</td>" +
        "<td>x</td>" +
        "<td>x</td></tr><tr>" +
        "<td>" +
        "-4-</td>" +
        "<td>" +
        "-5-</td>" +
        "<td>" +
        "-6-</td></tr><tr>" +
        "<td>" +
        "-7-</td>" +
        "<td>@</td>" +
        "<td>@</td>"
        + "</tr></table>";
        var xhttp = new MockXMLHttpRequest();
        var Json = "{ \"board\" : [\"x\", \"x\","
            + " \"x\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
            + " \"@\", \"@\"], \"gameOver\" : \"true\" }";
        xhttp.stubSetResponseText(Json);
        editPage(xhttp);

    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Edit_Page_Ready_State_Zero", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"board\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"], \"gameOver\" : \"false\" }";
    var ticTacToeBox = JSON.parse(Json);
    xhttp.stubSetResponseText(Json);
    xhttp.readyState = 0;
    editPage(xhttp);
    assert.equal(document.getElementById('mainBody').innerHTML,
        "");
    window.ticTacToeBox = null;
})

QUnit.test("Edit_Page_Ready_Status_404", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"board\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"], \"gameOver\" : \"false\" }";
    xhttp.stubSetResponseText(Json);
    xhttp.status = 404;
    editPage(xhttp);

    assert.equal(document.getElementById('mainBody').innerHTML,
        "");
})

QUnit.test("Player_Choose_Move", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var returnedJson = "{ \"board\" : [\"x\", \"@\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"], \"gameOver\" : \"false\" }";
    var ticTacToeJson = "{ \"board\" : [\"-1-\", \"-2-\","
    + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
    + " \"-8-\", \"-9-\"], \"gameOver\" : \"false\" }";
    var sendJson = "{\"board\":[\"-1-\",\"-2-\","
    + "\"-3-\",\"-4-\",\"-5-\",\"-6-\",\"-7-\","
    + "\"-8-\",\"-9-\"],\"move\":\"1\"}";
    xhttp.stubSetResponseText(returnedJson);
    window.xhttp = xhttp;
    var ticTacToeBox = JSON.parse(ticTacToeJson);
    window.ticTacToeBox = ticTacToeBox.board;

    playerChoose(1);
    assert.equal(window.xhttp.mockOpenRequestValues,
        "POSThttp://127.0.0.1:8080true");
    assert.equal(window.xhttp.mockRequestHeader,
        "Content-Typeapplication/JSON");
    assert.equal(window.xhttp.mockSendData,
        sendJson);
    window.ticTacToeBox = null;
    window.xhttp = null;
})