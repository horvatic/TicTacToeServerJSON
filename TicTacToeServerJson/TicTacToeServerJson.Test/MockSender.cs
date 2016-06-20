using Moq;
using Server.Core;

namespace TicTacToeServerJson.Test
{
    public class MockSender : ISend
    {
        private readonly Mock<ISend> _mock;

        public MockSender()
        {
            _mock = new Mock<ISend>();
        }
        public string SendResponce(IZSocket handler,
            IHttpResponse httpResponce)
        {
            return _mock.Object.SendResponce(handler,
                httpResponce);
        }

        public MockSender StubSendResponce(string statueCode)
        {
            _mock.Setup(m => m.SendResponce(It.IsAny<IZSocket>(),
                It.IsAny<IHttpResponse>())).Returns(statueCode);
            return this;
        }

        public void VerifySendResponce(IZSocket handler,
            IHttpResponse httpResponce)
        {
            _mock.Verify(m => m.SendResponce(handler, 
                httpResponce),
                Times.AtLeastOnce);
        }
    }
}