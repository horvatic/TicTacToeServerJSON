QUnit.test("StartPage", function (assert) {

    var xhttp = new MockXMLHttpRequest();
    StartPage(xhttp);
    assert.ok(window.xhttp, xhttp);
    assert.equal(xhttp.OpenRequestValues,
        "GEThttp://127.0.0.1:8080true");
    assert.equal(xhttp.SendCalled, 1);
    assert.notEqual(xhttp.onreadystatechange,
        null);
});

QUnit.test("Element with Button", function (assert) {

    var exampleHtml =
        "<td>x</td>";
    DisplayWithNoButton("x");
    assert.equal(DisplayWithNoButton("x"),
        exampleHtml);

});

QUnit.test("Element with No Button", function (assert) {

    var exampleHtml =
        "<td><button id=1"
            + " onclick=PlayerChoose(this.id)>" +
            "-1-</button></td>";
    assert.equal(DisplayWithButton(1, "-1-"),
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Array_To_Page", function (assert) {
    var ticTacToeBox = ["x", "@", "-3-", "-4-",
        "-5-", "-6-", "-7-", "-8-", "-9-"]

    var exampleHtml =
        "<table style=\"width: 100 % \">" +
        "<tbody><tr>" +
        "<td>x</td>" +
        "<td>@</td>" +
        "<td><button id=\"3\" onclick=\"PlayerChoose(this.id)\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\" onclick=\"PlayerChoose(this.id)\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\" onclick=\"PlayerChoose(this.id)\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\" onclick=\"PlayerChoose(this.id)\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\" onclick=\"PlayerChoose(this.id)\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\" onclick=\"PlayerChoose(this.id)\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\" onclick=\"PlayerChoose(this.id)\">" +
        "-9-</button></td>"
        + "</tr></tbody></table>";

    DisplayTicTacToeBox(ticTacToeBox, false);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Game_Over", function (assert) {
    var ticTacToeBox = ["x", "x", "x", "-4-",
        "-5-", "-6-", "-7-", "@", "@"]

    var exampleHtml =
        "<p>Game Over</p>" + 
        "<button onclick=\"location.reload()\">Another Game?</button>" +
        "<table style=\"width: 100 % \">" +
        "<tbody><tr>" +
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
        + "</tr></tbody></table>";

    DisplayTicTacToeBox(ticTacToeBox, true);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Display_TicTacToe_Array_To_Page_Has_Moves", function (assert) {
    var ticTacToeBox = ["x", "@", "-3-", "-4-",
        "-5-", "-6-", "-7-", "-8-", "-9-"]

    var exampleHtml =
        "<table style=\"width: 100 % \">" +
        "<tbody><tr>" +
        "<td>x</td>" +
        "<td>@</td>" +
        "<td><button id=\"3\" onclick=\"PlayerChoose(this.id)\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\" onclick=\"PlayerChoose(this.id)\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\" onclick=\"PlayerChoose(this.id)\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\" onclick=\"PlayerChoose(this.id)\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\" onclick=\"PlayerChoose(this.id)\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\" onclick=\"PlayerChoose(this.id)\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\" onclick=\"PlayerChoose(this.id)\">" +
        "-9-</button></td>"
        + "</tr></tbody></table>";

    DisplayTicTacToeBox(ticTacToeBox, false);
    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Making_Of_JSON_To_Send_To_Server", function(assert) {
    var example = "{ \"data\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"], \"move\" : \"1\" }";

    var ticTacToeBox = ["-1-", "-2-", "-3-", "-4-",
    "-5-", "-6-", "-7-", "-8-", "-9-"]
    var move = 1;
    var JSONFormated
        = GenerateTicTacToeJSON(ticTacToeBox, move);

    assert.equal(JSONFormated, example);
})

QUnit.test("Edit_Page_To_Show_New_TicTacToe_Board", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"data\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"] }";
    xhttp.SetResponseText(Json);
    EditPage(xhttp);
    var exampleHtml =
        "<table style=\"width: 100 % \">" +
        "<tbody><tr>" +
        "<td><button id=\"1\" onclick=\"PlayerChoose(this.id)\">" +
        "-1-</button></td>" +
        "<td><button id=\"2\" onclick=\"PlayerChoose(this.id)\">" +
        "-2-</button></td>" +
        "<td><button id=\"3\" onclick=\"PlayerChoose(this.id)\">" +
        "-3-</button></td></tr><tr>" +
        "<td><button id=\"4\" onclick=\"PlayerChoose(this.id)\">" +
        "-4-</button></td>" +
        "<td><button id=\"5\" onclick=\"PlayerChoose(this.id)\">" +
        "-5-</button></td>" +
        "<td><button id=\"6\" onclick=\"PlayerChoose(this.id)\">" +
        "-6-</button></td></tr><tr>" +
        "<td><button id=\"7\" onclick=\"PlayerChoose(this.id)\">" +
        "-7-</button></td>" +
        "<td><button id=\"8\" onclick=\"PlayerChoose(this.id)\">" +
        "-8-</button></td>" +
        "<td><button id=\"9\" onclick=\"PlayerChoose(this.id)\">" +
        "-9-</button></td>"
        + "</tr></tbody></table>";

    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
})

QUnit.test("Edit_Page_To_Show_New_TicTacToe_Board_Game_Over",
    function (assert) {
        var exampleHtml =
        "<p>Game Over</p>" +
        "<button onclick=\"location.reload()\">Another Game?</button>" +
        "<table style=\"width: 100 % \">" +
        "<tbody><tr>" +
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
        + "</tr></tbody></table>";
        var xhttp = new MockXMLHttpRequest();
        var Json = "{ \"data\" : [\"x\", \"x\","
            + " \"x\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
            + " \"@\", \"@\"], \"GameOver\" : \"true\" }";
        xhttp.SetResponseText(Json);
        EditPage(xhttp);

    assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);

});

QUnit.test("Edit_Page_Ready_State_Zero", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"data\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"] }";
    var ticTacToeBox = JSON.parse(Json);
    xhttp.SetResponseText(Json);
    xhttp.readyState = 0;
    EditPage(xhttp);
    assert.ok(window.ticTacToeBox,
        ticTacToeBox);
    assert.equal(document.getElementById('mainBody').innerHTML,
        "");
    window.ticTacToeBox = null;
})

QUnit.test("Edit_Page_Ready_Status_404", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var Json = "{ \"data\" : [\"-1-\", \"-2-\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"] }";
    xhttp.SetResponseText(Json);
    xhttp.status = 404;
    EditPage(xhttp);

    assert.equal(document.getElementById('mainBody').innerHTML,
        "");
})

QUnit.test("Player_Choose_Move", function (assert) {
    var xhttp = new MockXMLHttpRequest();
    var returnedJson = "{ \"data\" : [\"x\", \"@\","
        + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
        + " \"-8-\", \"-9-\"] }";
    var ticTacToeJson = "{ \"data\" : [\"-1-\", \"-2-\","
    + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
    + " \"-8-\", \"-9-\"] }";
    var sendJson = "{ \"data\" : [\"-1-\", \"-2-\","
    + " \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\","
    + " \"-8-\", \"-9-\"], \"move\" : \"1\" }";
    xhttp.SetResponseText(returnedJson);
    window.xhttp = xhttp;
    var ticTacToeBox = JSON.parse(ticTacToeJson)
    window.ticTacToeBox = ticTacToeBox.data;

    PlayerChoose(1);
    assert.equal(window.xhttp.OpenRequestValues,
        "POSThttp://127.0.0.1:8080true");
    assert.equal(window.xhttp.RequestHeader,
        "Content-Typeapplication/JSON");
    assert.equal(window.xhttp.SendData,
        sendJson);
    window.ticTacToeBox = null;
    window.xhttp = null;
})