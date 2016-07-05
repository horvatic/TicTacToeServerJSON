using System;
using Microsoft.FSharp.Collections;
using TicTacToe.Core;

namespace TicTacToeServerJson.Core
{
    public class JsonConverter
    {
        public ITicTacToeBoxClass.ITicTacToeBox DeserializeTicTacToeBox
            (string data)
        {
            var readData = data
                .Remove(0, data.IndexOf("[",
                    StringComparison.Ordinal) + 1);
            var dataSplit = readData
                .Remove(readData.IndexOf("]",
                    StringComparison.Ordinal))
                .Replace("\r\n", "")
                .Replace("\"", "")
                .Replace(" ", "")
                .Split(',');


            return new TicTacToeBoxClass.TicTacToeBox(
                ListModule.OfSeq(dataSplit));
        }

        public string SerializeTicTacToeBox
            (ITicTacToeBoxClass.ITicTacToeBox ticTacToeBox)
        {
            var jSonTicTacToeBox = @"{ ""board"" : [";
            for (var i = 0; i < ticTacToeBox.cellCount(); i++)
            {
                jSonTicTacToeBox += "\""
                                    + ticTacToeBox
                                        .getGlyphAtLocation(i)
                                    + "\", ";
            }
            jSonTicTacToeBox = jSonTicTacToeBox
                .Substring(0, jSonTicTacToeBox.Length - 2)
                               + @"], ""gameOver"" : ""false""}";
            return jSonTicTacToeBox;
        }

        public string DeserializeMove(string data)
        {
            var dataSplit = data
                .Remove(0, data.IndexOf("]",
                    StringComparison.Ordinal) + 1)
                .Replace("\r\n", "")
                .Replace("\"", "")
                .Replace(" ", "")
                .Replace("move", "")
                .Replace(":", "")
                .Replace("}", "")
                .Replace(",", "");
            return dataSplit;
        }
    }
}