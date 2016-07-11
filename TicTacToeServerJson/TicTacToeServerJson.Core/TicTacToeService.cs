using System;
using System.Collections.Generic;
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
            if (request == "")
                return false;
            var action =
                request.Substring(0, request.IndexOf("\r\n",
                    StringComparison.Ordinal));
            if (action == "OPTIONS / HTTP/1.1"
                || action == "OPTIONS / HTTP/1.0")
                return true;
            return CleanRequest(request) == "/";
        }

        public string ProcessRequest(string request,
            IHttpResponse httpResponse,
            ServerProperties serverProperties)
        {
            if ((request.Contains("OPTIONS / HTTP/1.1") || request.Contains("OPTIONS / HTTP/1.0"))
                && request.Substring(0, request.IndexOf("\r\n",
                    StringComparison.Ordinal))
                == "OPTIONS / HTTP/1.1")
            {
                return ProcessOptions(httpResponse);
            }

            if ((request.ToLower().Contains("content-type: application/json")
                || request.ToLower().Contains("accept: application/json")) &&
                request.Substring(0, 4) == "POST")
                return ProcessRequestWithJson(
                    request,
                    httpResponse,
                    serverProperties);
            return ProcessRequestWithNoJson(httpResponse,
                serverProperties);
        }

        private string ProcessOptions(
            IHttpResponse httpResponse)
        {
            httpResponse.SendHeaders(new List<string>
            {
                "HTTP/1.1 200 OK\r\n",
                "Access-Control-Allow-Origin: *\r\n",
                "Access-Control-Allow-Headers: Content-Type\r\n",
                "Access-Control-Allow-Methods: POST, GET, OPTIONS\r\n"
            });

            return "200 OK";
        }

        private string ProcessRequestWithNoJson(
            IHttpResponse httpResponse,
            ServerProperties serverProperties)
        {
            var converter = ((ServiceDependents)
                serverProperties.ServiceSpecificObjectsWrapper)
                .Converter;
            var ticTacToeJson =
                converter
                    .SerializeTicTacToeBox(
                        new TicTacToeBoxClass.TicTacToeBox(
                            Game.makeTicTacToeBox(3)));
            SendData(ticTacToeJson, httpResponse);
            return "200 OK";
        }

        private string ProcessRequestWithJson(
            string request,
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

            var ticTacToeJson =
                converter
                    .SerializeTicTacToeBox(ticTacToeBox);

            if (GameOver(ticTacToeBox, game))
                ticTacToeJson = ticTacToeJson
                    .Replace(@"""gameOver"" : ""false""",
                    @"""gameOver"" : ""true""");

            SendData(ticTacToeJson, httpResponse);

            return "200 OK";
        }

        private void SendData(string ticTacToeBox,
            IHttpResponse httpResponse)
        {
            httpResponse.SendHeaders(new List<string>
            {
                "HTTP/1.1 200 OK\r\n",
                "Content-Type: application/JSON\r\n",
                "Access-Control-Allow-Origin: *\r\n",
                "Content-Length: " + GetByteCount(ticTacToeBox)
                + "\r\n\r\n"
            });
            httpResponse.SendBody(GetByte(ticTacToeBox),
                GetByteCount(ticTacToeBox));
        }

        private bool GameOver(ITicTacToeBoxClass.ITicTacToeBox
            ticTacToeBox,
            TicTacToeGame game)
        {
            return CheckForWinnerOrTie
                .checkForWinnerOrTie(ticTacToeBox,
                    game.Setting.playerGlyph,
                    game.Setting.aIGlyph)
                   != (int)GameStatusCodes.GenResult.NoWinner;
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
