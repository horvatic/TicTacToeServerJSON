using Server.Core;

namespace TicTacToeServerJson.Core
{
    public class RequestProcessor : IRequestProcessor
    {
        public string HandleRequest(string request,
            IZSocket handler, IHttpServiceProcessor service,
            ServerProperties properties,
            IHttpResponse httpResponse)
        {
            if (request.Substring(0, 4)
                == "POST")
            {
                return ConCatRequest(request, handler,
                    service, properties, httpResponse);
            }
            return ProcessRequest(request, handler,
                service, properties, httpResponse);
        }

        private string ConCatRequest(string request,
            IZSocket handler,
            IHttpServiceProcessor service,
            ServerProperties properties,
            IHttpResponse httpResponse)
        {
            var concatRequest = request;
            if (!request.Contains(@"""board"""))
                concatRequest += handler.Receive();
            return ProcessRequest(concatRequest, handler,
                service, properties, httpResponse);
        }

        private string ProcessRequest(string request,
            IZSocket handler,
            IHttpServiceProcessor service,
            ServerProperties properties,
            IHttpResponse httpResponse)
        {
            var returnCode = service.ProcessRequest(request,
                httpResponse,
                properties);
            return returnCode;
        }
    }
}