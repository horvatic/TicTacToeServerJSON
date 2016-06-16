using System;
using Microsoft.FSharp.Collections;
using TicTacToe.Core;

namespace TicTacToeServerJson.Core
{
    public class JsonConverter
    {
        public ITicTacToeBoxClass.ITicTacToeBox Deserialize
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

        public string Serialize
            (ITicTacToeBoxClass.ITicTacToeBox ticTacToeBox)
        {
            var jSonTicTacToeBox = @"{ ""data"" : [";
            for (var i = 0; i < ticTacToeBox.cellCount(); i++)
            {
                jSonTicTacToeBox += "\""
                                    + ticTacToeBox
                                        .getGlyphAtLocation(i)
                                    + "\", ";
            }
            jSonTicTacToeBox = jSonTicTacToeBox
                .Substring(0, jSonTicTacToeBox.Length - 2)
                               + "]}";
            return jSonTicTacToeBox;
        }
    }
}