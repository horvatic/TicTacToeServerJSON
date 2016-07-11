using System.Collections.Generic;
using System.Text;
using Microsoft.FSharp.Collections;
using Server.Core;
using TicTacToe.Core;
using TicTacToeServerJson.Core;
using Xunit;

namespace TicTacToeServerJson.Test
{
    public class TicTacToeServiceTest
    {
        [Fact]
        public void Make_Not_Null_Class()
        {
            Assert.NotNull(new TicTacToeService());
        }

        [Theory]
        [InlineData("GET / HTTP/1.1")]
        [InlineData("GET / HTTP/1.0")]
        [InlineData("POST / HTTP/1.1")]
        [InlineData("POST / HTTP/1.0")]
        [InlineData("OPTIONS / HTTP/1.1")]
        [InlineData("OPTIONS / HTTP/1.0")]
        public void Can_Process_Root(string requestListing)
        {
            var request = requestListing + "\r\n" +
                          "Host: localhost:8080\r\n" +
                          "Connection: keep-alive\r\n" +
                          "Content-Length: 33\r\n" +
                          "Cache-Control: max-age = 0\r\n" +
                          "Accept: text / html,application / xhtml + xml,application / xml; q = 0.9,image / webp,*;q=0.8\r\n" +
                          "Origin: http://localhost:8080\r\n" +
                          "Upgrade-Insecure-Requests: 1\r\n" +
                          "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36\r\n" +
                          "Content-Type: application/JSON\r\n" +
                          "Referer: http://localhost:8080/form\r\n" +
                          "Accept-Encoding: gzip, deflate\r\n" +
                          "Accept-Language: en-US,en;q=0.8\r\n\r\n";

            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter());
            Assert.True(service.CanProcessRequest(request,
                serverProperties));
        }

        [Fact]
        public void Empty_Request()
        {
            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter());
            Assert.False(service.CanProcessRequest("",
                serverProperties));
        }

        [Fact]
        public void Process_Request_Options()
        {
            var zSocket = new MockZSocket();
            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter());
            var statusCode = service.ProcessRequest(GetOptionData(),
                new HttpResponse(zSocket), serverProperties);

            zSocket.VerifySend(GetByte("HTTP/1.1 200 OK\r\n"),
                GetByteCount("HTTP/1.1 200 OK\r\n"));
            zSocket.VerifySend(GetByte("Access-Control-Allow-Origin: *\r\n"),
                GetByteCount("Access-Control-Allow-Origin: *\r\n"));
            zSocket.VerifySend(GetByte("Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"),
                GetByteCount("Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"));
            Assert.Equal("200 OK", statusCode);
        }

        [Fact]
        public void Process_Request_Send_Json()
        {
            var zSocket = new MockZSocket();
            var ticTacToeBox = new List<string>
            {
                "x",
                "-2-",
                "-3-",
                "-4-",
                "-5-",
                "-6-",
                "-7-",
                "@",
                "-9-"
            };

            var mockAi = new MockAi()
                .StubMove(
                    new TicTacToeBoxClass.TicTacToeBox(
                        ListModule.OfSeq(ticTacToeBox)));

            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter(),
                new ServiceDependents(new JsonConverter(),
                    new TicTacToeGame(new User(), mockAi,
                        MakeSettings())));
            var statusCode = service.ProcessRequest(GetJsonData(),
                new HttpResponse(zSocket), serverProperties);
            var example =
                @"{ ""board"" : [""x"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""@"", ""-9-""], ""gameOver"" : ""false""}";

            zSocket.VerifySend(GetByte("HTTP/1.1 200 OK\r\n"),
                GetByteCount("HTTP/1.1 200 OK\r\n"));

            zSocket.VerifySend(GetByte(example),
                GetByteCount(example));

            zSocket.VerifySend(GetByte("Content-Length: "
                                       + GetByteCount(example)
                                       + "\r\n\r\n"),
                GetByteCount("Content-Length: "
                             + GetByteCount(example)
                             + "\r\n\r\n"));

            zSocket.VerifySend(GetByte("Content-Type: application/JSON\r\n"),
                GetByteCount("Content-Type: application/JSON\r\n"));

            zSocket.VerifySend(GetByte("Access-Control-Allow-Origin: *\r\n"),
                GetByteCount("Access-Control-Allow-Origin: *\r\n"));
            Assert.Equal("200 OK", statusCode);
        }
        [Fact]
        public void Process_Request_Send_Json_AngJs()
        {
            var zSocket = new MockZSocket();
            var ticTacToeBox = new List<string>
            {
                "x",
                "-2-",
                "-3-",
                "-4-",
                "-5-",
                "-6-",
                "-7-",
                "@",
                "-9-"
            };

            var mockAi = new MockAi()
                .StubMove(
                    new TicTacToeBoxClass.TicTacToeBox(
                        ListModule.OfSeq(ticTacToeBox)));

            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter(),
                new ServiceDependents(new JsonConverter(),
                    new TicTacToeGame(new User(), mockAi,
                        MakeSettings())));
            var statusCode = service.ProcessRequest(GetJsonDataAngJs(),
                new HttpResponse(zSocket), serverProperties);
            var example =
                @"{ ""board"" : [""x"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""@"", ""-9-""], ""gameOver"" : ""false""}";

            zSocket.VerifySend(GetByte("HTTP/1.1 200 OK\r\n"),
                GetByteCount("HTTP/1.1 200 OK\r\n"));

            zSocket.VerifySend(GetByte(example),
                GetByteCount(example));

            zSocket.VerifySend(GetByte("Content-Length: "
                                       + GetByteCount(example)
                                       + "\r\n\r\n"),
                GetByteCount("Content-Length: "
                             + GetByteCount(example)
                             + "\r\n\r\n"));

            zSocket.VerifySend(GetByte("Content-Type: application/JSON\r\n"),
                GetByteCount("Content-Type: application/JSON\r\n"));

            zSocket.VerifySend(GetByte("Access-Control-Allow-Origin: *\r\n"),
                GetByteCount("Access-Control-Allow-Origin: *\r\n"));
            Assert.Equal("200 OK", statusCode);
        }

        [Fact]
        public void Process_Request_Send_Json_Game_Over()
        {
            var ticTacToeBox = new List<string>
            {
                "x",
                "x",
                "x",
                "-4-",
                "-5-",
                "-6-",
                "@",
                "@",
                "-9-"
            };

            var mockAi = new MockAi()
                .StubMove(
                    new TicTacToeBoxClass.TicTacToeBox(
                        ListModule.OfSeq(ticTacToeBox)));

            var zSocket = new MockZSocket();
            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter(),
                new ServiceDependents(new JsonConverter(),
                    new TicTacToeGame(new User(), mockAi,
                        MakeSettings())));
            var statusCode = service.ProcessRequest(GetJsonData(),
                new HttpResponse(zSocket), serverProperties);
            var example =
                @"{ ""board"" : [""x"", ""x"", ""x"", ""-4-"", ""-5-"", ""-6-"", ""@"", ""@"", ""-9-""], ""gameOver"" : ""true""}";

            zSocket.VerifySend(GetByte("HTTP/1.1 200 OK\r\n"),
                GetByteCount("HTTP/1.1 200 OK\r\n"));

            zSocket.VerifySend(GetByte(example),
                GetByteCount(example));

            zSocket.VerifySend(GetByte("Content-Length: "
                                       + GetByteCount(example)
                                       + "\r\n\r\n"),
                GetByteCount("Content-Length: "
                             + GetByteCount(example)
                             + "\r\n\r\n"));

            zSocket.VerifySend(GetByte("Content-Type: application/JSON\r\n"),
                GetByteCount("Content-Type: application/JSON\r\n"));

            zSocket.VerifySend(GetByte("Access-Control-Allow-Origin: *\r\n"),
                GetByteCount("Access-Control-Allow-Origin: *\r\n"));
            Assert.Equal("200 OK", statusCode);
        }

        [Fact]
        public void Process_Request_No_Send_Json()
        {
            var zSocket = new MockZSocket();
            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new ServerTime(),
                new MockPrinter(),
                new ServiceDependents(new JsonConverter(),
                    new TicTacToeGame(new User(), new Ai(),
                        MakeSettings())));
            var statusCode =
                service.ProcessRequest(GetRequestNoJson(),
                    new HttpResponse(zSocket), serverProperties);
            var example =
                @"{ ""board"" : [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""], ""gameOver"" : ""false""}";


            zSocket.VerifySend(GetByte("HTTP/1.1 200 OK\r\n"),
                GetByteCount("HTTP/1.1 200 OK\r\n"));

            zSocket.VerifySend(GetByte(example),
                GetByteCount(example));

            zSocket.VerifySend(GetByte("Content-Length: "
                                       + GetByteCount(example)
                                       + "\r\n\r\n"),
                GetByteCount("Content-Length: "
                             + GetByteCount(example)
                             + "\r\n\r\n"));

            zSocket.VerifySend(GetByte("Content-Type: application/JSON\r\n"),
                GetByteCount("Content-Type: application/JSON\r\n"));

            zSocket.VerifySend(GetByte("Access-Control-Allow-Origin: *\r\n"),
                GetByteCount("Access-Control-Allow-Origin: *\r\n"));
            Assert.Equal("200 OK", statusCode);


        }


        private static GameSettings.gameSetting MakeSettings()
        {
            return new GameSettings.gameSetting(3, "x", "@"
                , (int) PlayerValues.playerVals.Human
                , false, false, false);
        }

        private string GetOptionData()
        {
            return
                @"OPTIONS / HTTP/1.1
        Host: 127.0.0.1:8080
        Connection: keep-alive
        Access-Control-Request-Method: POST
        Origin: null
        User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36
        Access-Control-Request-Headers: content-type
        Accept: *
        Accept-Encoding: gzip, deflate, sdch
        Accept-Language: en-US,en;q=0.8
        ";
        }

        private string GetJsonData()
        {
            return
                @"POST / HTTP/1.1
        Host: localhost:8080
        User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
        Accept-Language: en-US,en;q=0.5
        Accept-Encoding: gzip, deflate
        Content-Type: application/JSON
        Content-Length: 76
        Connection: keep-alive

        {
        	""board"": [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""], ""move"" : ""1""
        }";
        }

        private string GetJsonDataAngJs()
        {
            return
                @"POST / HTTP/1.1
        Host: localhost:8080
        User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0
        Accept: application/json, text/html
        Accept-Language: en-US,en;q=0.5
        Accept-Encoding: gzip, deflate
        Content-Length: 76
        Connection: keep-alive

        {
        	""board"": [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""], ""move"" : ""1""
        }";
        }

        private string GetRequestNoJson()
        {
            return
                @"GET / HTTP/1.1
        Host: localhost:8080
        Connection: keep-alive
        Upgrade-Insecure-Requests: 1
        User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
        Accept-Encoding: gzip, deflate, sdch
        Accept-Language: en-US,en;q=0.8

        ";
        }

        private int GetByteCount(string message)
        {
            return Encoding.ASCII.GetByteCount(message);
        }

        private byte[] GetByte(string message)
        {
            return Encoding.ASCII.GetBytes(message);
        }
    }
}