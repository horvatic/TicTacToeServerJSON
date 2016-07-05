using System.Collections.Generic;
using TicTacToe.Core;
using TicTacToeServerJson.Core;
using Xunit;

namespace TicTacToeServerJson.Test
{
    public class JsonConverterTest
    {
        [Fact]
        public void Object_Not_Null()
        {
            Assert.NotNull(new JsonConverter());
        }

        [Fact]
        public void DeserializeTicTacToeBox_Json()
        {
            var exampleList = new List<string>
            {
                "-1-",
                "x",
                "x",
                "x",
                "x",
                "x",
                "x",
                "x",
                "-9-"
            };

            var data = GetJsonData();
            var converter = new JsonConverter();
            var ticTacToe = converter.DeserializeTicTacToeBox(data);
            for (var i = 0; i < ticTacToe.cellCount(); i++)
                Assert.Equal(exampleList[i],
                    ticTacToe.getGlyphAtLocation(i));
        }

        [Fact]
        public void SerializeTicTacToeBox_Json()
        {
            var ticTacToeBox =
                new TicTacToeBoxClass
                    .TicTacToeBox(Game.makeTicTacToeBox(3));
            var example =
                @"{ ""board"" : [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""], ""gameOver"" : ""false""}";
            var converter = new JsonConverter();
            var serialize = converter.SerializeTicTacToeBox(ticTacToeBox);
            Assert.Equal(example, serialize);
        }

        [Fact]
        public void DeserializeMove_Json()
        {
            var data = GetJsonData();
            var converter = new JsonConverter();
            var move = converter.DeserializeMove(data);
            Assert.Equal("1", move);
        }

        private string GetJsonData()
        {
            return
                @"{
	""board"": [""-1-"", ""x"", ""x"", ""x"", ""x"", ""x"", ""x"", ""x"", ""-9-""], ""move"" : ""1""
}";
        }
    }
}