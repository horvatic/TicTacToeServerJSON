using System;
using System.Text;
using Server.Core;

namespace TicTacToeServerJson.Core
{
    public class TicTacToeService : IHttpServiceProcessor
    {
        public bool CanProcessRequest(string request,
            ServerProperties serverProperties)
        {
            return CleanRequest(request) == "/";
        }

        public IHttpResponse ProcessRequest(string request,
            IHttpResponse httpResponse,
            ServerProperties serverProperties)
        {
            var converter = new JsonConverter();
            var jSonData = request.Remove(0,
                request.IndexOf("\r\n\r\n",
                    StringComparison.Ordinal) + 4);
            var ticTacToeBox =
                converter
                    .Deserialize(jSonData);

            httpResponse.Body =
                converter
                    .Serialize(ticTacToeBox);
            httpResponse.ContentType = "application/JSON";
            httpResponse.ContentLength =
                Encoding.ASCII.GetByteCount(httpResponse.Body);

            return httpResponse;
        }

        private string CleanRequest(string request)
        {
            var parseVaulue = request.Contains("GET") ? "GET" : "POST";
            var offsets = request.Contains("GET") ? 5 : 6;
            if (request.Contains("HTTP/1.1"))
                return "/" + request
                    .Substring(request
                        .IndexOf(parseVaulue
                                 + " /", StringComparison.Ordinal)
                               + offsets,
                        request.IndexOf(" HTTP/1.1", StringComparison.Ordinal) - offsets)
                    .Replace("%20", " ");
            return "/" + request
                .Substring(request
                    .IndexOf(parseVaulue
                             + " /", StringComparison.Ordinal)
                           + offsets,
                    request.IndexOf(" HTTP/1.0", StringComparison.Ordinal) - offsets)
                .Replace("%20", " ");
        }
    }
}