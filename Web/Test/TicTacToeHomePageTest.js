QUnit.module("mocking ajaxs")
QUnit.test("StartPage", function (assert) {
    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"-1-\", \"-2-\", \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"-8-\", \"-9-\"], \"gameOver\" : \"false\"}"
    });
    var ticTacToe = ["-1-", "-2-", "-3-", "-4-", "-5-", "-6-", 
        "-7-", "-8-", "-9-"];
    var exampleHtml =
      "<table><tbody>" +
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
      + "</tr></tbody></table>";

    var done = assert.async();
    startPage();
    setTimeout(function() {
        assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
        assert.deepEqual(window.ticTacToeData, ticTacToe);
        assert.equal($.ajaxSetup()['contentType'], "application/JSON");
        done();
    }, 500);
});

QUnit.test("PlayerChoseMove", function (assert) {
    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"x\", \"@\", \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"-8-\", \"-9-\"], \"gameOver\" : \"false\"}"
    });
    var ticTacToe = ["x", "@", "-3-", "-4-", "-5-", "-6-",
    "-7-", "-8-", "-9-"];
    window.ticTacToeData = ticTacToe
    var exampleHtml =
      "<table><tbody>" +
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
      + "</tr></tbody></table>";

    var done = assert.async();
    playerChooseMove(1);
    setTimeout(function () {
        assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
        assert.deepEqual(window.ticTacToeData, ticTacToe);
        done();
    }, 500);
});

QUnit.test("PlayerChoseMoveGameOver", function (assert) {
    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"x\", \"x\", \"x\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"@\", \"@\"], \"gameOver\" : \"true\"}"
    });
    var ticTacToe = ["x", "x", "-3-", "-4-", "-5-", "-6-",
    "-7-", "@", "@"];
    window.ticTacToeData = ticTacToe;
    var exampleHtml =
        "<p>Game Over</p>" +
        "<button id=\"refresh\">Another Game?</button>" +
        "<table><tbody>" +
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
        + "</tr></tbody></table>";

    var done = assert.async();
    playerChooseMove(3);
    setTimeout(function () {
        assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
        done();
    }, 500);
});

QUnit.test("Make Table Element Game Not Over, Test Listener", function (assert) {
    var tableElement = makeTableElement("-1-", 1, "false");
    $("#mainBody").append(tableElement);
    $("#1").click();
    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"x\", \"@\", \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"-8-\", \"-9-\"], \"gameOver\" : \"false\"}"
    });
    var ticTacToe = ["x", "@", "-3-", "-4-", "-5-", "-6-",
        "-7-", "-8-", "-9-"];
    window.ticTacToeData = ticTacToe
    var exampleHtml =
      "<table><tbody>" +
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
      + "</tr></tbody></table>";

    var done = assert.async();
    playerChooseMove(1);
    setTimeout(function () {
        assert.equal(document.getElementById('mainBody').innerHTML,
        exampleHtml);
        assert.deepEqual(window.ticTacToeData, ticTacToe);
        done();
    }, 500);
});

QUnit.test("Test Game Over Page Reload Listener", function (assert) {
    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"x\", \"x\", \"x\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"@\", \"@\"], \"gameOver\" : \"true\"}"
    });
    var ticTacToe = ["x", "x", "-3-", "-4-", "-5-", "-6-",
    "-7-", "@", "@"];
    window.ticTacToeData = ticTacToe;
    var GameOverHtml =
    "<p>Game Over</p>" +
    "<button id=\"refresh\">Another Game?</button>" +
    "<table><tbody>" +
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
    + "</tr></tbody></table>";

    var NewGameHtml =
      "<table><tbody>" +
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
      + "</tr></tbody></table>";

    var done = assert.async();
    playerChooseMove(3);
    setTimeout(function () {
        assert.equal(document.getElementById('mainBody').innerHTML,
        GameOverHtml);
        done();
    }, 500);

    $.mockjax.clear();
    $.mockjax({
        url: "http://127.0.0.1:8080",
        responseText: "{ \"board\" : [\"-1-\", \"-2-\", \"-3-\", \"-4-\", \"-5-\", \"-6-\", \"-7-\", \"-8-\", \"-9-\"], \"gameOver\" : \"false\"}"
    });

    $("#refresh").click();
    var doneRefreshing = assert.async();
    playerChooseMove(3);
    setTimeout(function () {
        assert.equal(document.getElementById('mainBody').innerHTML,
        NewGameHtml);
        doneRefreshing();
    }, 500);
});

QUnit.module("Non Ajaxs")
QUnit.test("Making_Of_JSON_To_Send_To_Server", function(assert) {
    var example = "{\"board\":[\"-1-\",\"-2-\","
        + "\"-3-\",\"-4-\",\"-5-\",\"-6-\",\"-7-\","
        + "\"-8-\",\"-9-\"],\"move\":\"1\"}";

    var ticTacToeBox = [
        "-1-", "-2-", "-3-", "-4-",
        "-5-", "-6-", "-7-", "-8-", "-9-"
    ]
    var move = 1;
    var JSONFormated = generateTicTacToeJSON(ticTacToeBox, move);

    assert.equal(JSONFormated, example);
});
