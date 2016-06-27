﻿using Moq;
using Server.Core;

namespace TicTacToeServerJson.Test
{
    public class MockHttpService : IHttpServiceProcessor
    {
        private readonly Mock<IHttpServiceProcessor> _mock;

        public MockHttpService()
        {
            _mock = (new Mock<IHttpServiceProcessor>());
        }

        public MockHttpService(string responce)
        {
            _mock = (new Mock<IHttpServiceProcessor>());
            StubProcessRequest(responce);
        }


        public bool CanProcessRequest(string request, ServerProperties serverProperties)
        {
            if (request == "GET /Default HTTP/1.1")
                return false;
            return _mock.Object.CanProcessRequest(request, serverProperties);
        }

        public string ProcessRequest(string request,
            IHttpResponse httpResponse,
            ServerProperties serverProperties)
        {
            return _mock.Object.ProcessRequest(request, httpResponse, serverProperties);
        }

        public MockHttpService StubProcessRequest(string response)
        {
            _mock.Setup(
                m => m.ProcessRequest(It.IsAny<string>(), It.IsAny<IHttpResponse>(),
                    It.IsAny<ServerProperties>())).Returns(response);
            return this;
        }

        public MockHttpService StubCanProcessRequest(bool canProcess)
        {
            _mock.Setup(m => m.CanProcessRequest(It.IsAny<string>(),
                It.IsAny<ServerProperties>())).Returns(canProcess);
            return this;
        }
    }
}