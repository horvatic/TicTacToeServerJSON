using System;
using System.Text;
using Server.Core;
using TicTacToe.Core;

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
            var game = ((ServiceDependents)
                serverProperties.ServiceSpecificObjectsWrapper)
                .Game;

            var converter = ((ServiceDependents)
                serverProperties.ServiceSpecificObjectsWrapper)
                .Converter;
            var jSonData = request.Remove(0,
                request.IndexOf("\r\n\r\n",
                    StringComparison.Ordinal) + 4);
            var ticTacToeBox =
                converter
                    .DeserializeTicTacToeBox(jSonData);

            var move = converter
                .DeserializeMove(jSonData);

            var errorMesageCode = Game.isUserInputCorrect(ticTacToeBox,
                move, game.Setting.playerGlyph, game.Setting.aIGlyph);

            if (errorMesageCode == Translate.Blank)
                ticTacToeBox = (TicTacToeBoxClass.TicTacToeBox)
                    game.Play(ticTacToeBox,
                        CleanInput.SanitizeHumanPickedPlace(move, 9));

            httpResponse.Body =
                converter
                    .SerializeTicTacToeBox(ticTacToeBox);
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