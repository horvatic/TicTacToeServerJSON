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
        public void Deserialize_Json()
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
            var ticTacToe = converter.Deserialize(data);
            for (var i = 0; i < ticTacToe.cellCount(); i++)
                Assert.Equal(exampleList[i],
                    ticTacToe.getGlyphAtLocation(i));
        }

        [Fact]
        public void Serialize_Json()
        {
            var ticTacToeBox =
                new TicTacToeBoxClass
                    .TicTacToeBox(Game.makeTicTacToeBox(3));
            var example =
                @"{ ""data"" : [""-1-"", ""-2-"", ""-3-"", ""-4-"", ""-5-"", ""-6-"", ""-7-"", ""-8-"", ""-9-""]}";
            var converter = new JsonConverter();
            var serialize = converter.Serialize(ticTacToeBox);
            Assert.Equal(example, serialize);
        }

        private string GetJsonData()
        {
            return
                @"{
	""data"": [""-1-"", ""x"", ""x"", ""x"", ""x"", ""x"", ""x"", ""x"", ""-9-""]
}";
        }
    }
}