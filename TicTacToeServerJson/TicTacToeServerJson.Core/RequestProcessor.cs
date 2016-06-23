using System;
using Server.Core;

namespace TicTacToeServerJson.Core
{
    public class RequestProcessor : IRequestProcessor
    {
        public string HandleRequest(string request,
            IZSocket handler, ISend sender,
            IHttpServiceProcessor service,
            ServerProperties properties)
        {
            if (request.Substring(0, 4)
                == "POST")
            {
                return ConCatRequest(request, handler, sender,
                    service, properties);
            }
            return ProcessRequest(request, handler, sender,
                service, properties);
        }

        private string ConCatRequest(string request, 
            IZSocket handler, ISend sender, 
            IHttpServiceProcessor service,
            ServerProperties properties)
        {
            var concatRequest = request;
            if (!request.Contains(@"""data"""))
                concatRequest += handler.Receive();
            return ProcessRequest(concatRequest, handler, sender,
                service, properties);
        }

        private string ProcessRequest(string request,
            IZSocket handler, ISend sender,
            IHttpServiceProcessor service,
            ServerProperties properties)
        {
            var httpResponce = service.ProcessRequest(request,
                properties.DefaultResponse.Clone(),
                properties);
            return sender.SendResponce(handler, httpResponce);
        }
    }
}