using System.Text;
using Server.Core;
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
        public void Can_Process_Root(string requestListing)
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

            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new HttpResponse(), new ServerTime(),
                new MockPrinter());
            Assert.True(service.CanProcessRequest(request, serverProperties));
        }

        [Fact]
        public void Process_Request()
        {

            var service = new TicTacToeService();
            var serverProperties = new ServerProperties(null,
                5555, new HttpResponse(), new ServerTime(),
                new MockPrinter(),
                new JsonConverter());
            var httpResponce = service.ProcessRequest(GetJsonData(),
                new HttpResponse(), serverProperties);
            var example =
               @"{ ""data"" : [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""]}";

            Assert.Equal(example, httpResponce.Body);
            Assert.Equal(Encoding.ASCII.GetByteCount(example),
                httpResponce.ContentLength);
            Assert.Equal("application/JSON",
                httpResponce.ContentType);
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
	""data"": [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""]
}";
        }
    }
}