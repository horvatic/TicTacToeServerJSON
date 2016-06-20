using System;
using System.Collections.Generic;
using System.Reflection;
using Server.Core;
using TicTacToeServerJson.Core;
using Xunit;

namespace TicTacToeServerJson.Test
{
    public class RequestProcessorTest
    {
        [Fact]
        public void Make_Request_Object()
        {
            Assert.NotNull(new RequestProcessor());
        }

        [Theory]
        [InlineData("GET / HTTP/1.1")]
        [InlineData("GET / HTTP/1.0")]
        [InlineData("OPTIONS / HTTP/1.1")]
        [InlineData("OPTIONS / HTTP/1.0")]
        public void Can_Process_Non_Post_Request(string requestListing)
        {
            var request = requestListing + "\r\n" +
                          "Host: localhost:8080\r\n" +
                          "Connection: keep-alive\r\n" +
                          "Content-Length: 33\r\n" +
                          "Cache-Control: max-age = 0\r\n" +
                          "Accept: text / html,application / xhtml + xml,application / xml; q = 0.9,image / webp,*/*;q=0.8\r\n" +
                          "Origin: http://localhost:8080\r\n" +
                          "Upgrade-Insecure-Requests: 1\r\n" +
                          "User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36\r\n" +
                          "Content-Type: application/JSON\r\n" +
                          "Referer: http://localhost:8080/form\r\n" +
                          "Accept-Encoding: gzip, deflate\r\n" +
                          "Accept-Language: en-US,en;q=0.8\r\n\r\n";

            var zSocket = new MockZSocket().StubReceive(request)
                .StubSentToReturn(10)
                .StubConnect(true);
            zSocket = zSocket.StubAcceptObject(zSocket);
            var sender = new MockSender().StubSendResponce("200 OK");
            var responce = new HttpResponse();
            var properties = new ServerProperties(@"Home",
                8080, new HttpResponse(), new ServerTime(),
                new MockPrinter());
            var server = new MainServer(zSocket, properties,
                new HttpServiceFactory(new MockHttpService(responce)),
                new RequestProcessor(), sender,
                new List<string> {"TicTacToeServerJson.Test"},
                new List<Assembly> {Assembly.GetExecutingAssembly()});
            server.RunningProcess(new PoolDataForRequest(zSocket,
                Guid.NewGuid()));

            zSocket.VerifyManyReceive(1);
            sender.VerifySendResponce(zSocket, responce);
        }

        [Fact]
        public void Post_Request_Two_Parts()
        {
            var request = new Queue<string>();
            request.Enqueue(GetRequestHeader());
            request.Enqueue(GetJson());
            var zSocket = new MockZSocket()
                .StubReceiveWithQueue(request)
                .StubSentToReturn(10)
                .StubConnect(true);
            zSocket = zSocket.StubAcceptObject(zSocket);
            var sender = new MockSender().StubSendResponce("200 OK");
            var responce = new HttpResponse();
            var properties = new ServerProperties(@"Home",
                8080, new HttpResponse(), new ServerTime(),
                new MockPrinter());
            var server = new MainServer(zSocket, properties,
                new HttpServiceFactory(new MockHttpService(responce)),
                new RequestProcessor(), sender,
                new List<string> {"TicTacToeServerJson.Test"},
                new List<Assembly> {Assembly.GetExecutingAssembly()});
            server.RunningProcess(new PoolDataForRequest(zSocket,
                Guid.NewGuid()));

            zSocket.VerifyManyReceive(2);
            sender.VerifySendResponce(zSocket, responce);
        }

        [Fact]
        public void Post_Request_One_Part()
        {
            var request = GetRequestHeader() + GetJson();
            var zSocket = new MockZSocket()
                .StubReceive(request)
                .StubSentToReturn(10)
                .StubConnect(true);
            zSocket = zSocket.StubAcceptObject(zSocket);
            var sender = new MockSender().StubSendResponce("200 OK");
            var responce = new HttpResponse();
            var properties = new ServerProperties(@"Home",
                8080, new HttpResponse(), new ServerTime(),
                new MockPrinter());
            var server = new MainServer(zSocket, properties,
                new HttpServiceFactory(new MockHttpService(responce)),
                new RequestProcessor(), sender,
                new List<string> { "TicTacToeServerJson.Test" },
                new List<Assembly> { Assembly.GetExecutingAssembly() });
            server.RunningProcess(new PoolDataForRequest(zSocket,
                Guid.NewGuid()));

            zSocket.VerifyManyReceive(1);
            sender.VerifySendResponce(zSocket, responce);
        }

        private string GetRequestHeader()
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

";
        }

        private string GetJson()
        {
            return
                @"{""data"": [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""], ""move"" : ""1""}";
        }
    }
}