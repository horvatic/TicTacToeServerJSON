using TicTacToe.Core;
using TicTacToeServerJson.Core;
using Xunit;
namespace TicTacToeServerJson.Test
{
    public class ServiceDependentsTest
    {
        [Fact]
        public void Make_Not_Null_Class()
        {
            Assert.NotNull(new ServiceDependents(null, null));
        }

        [Fact]
        public void Set_Dependents()
        {
            var game = new TicTacToeGame(
                new MockUser(), 
                new MockAi(), 
                new GameSettings.gameSetting(3, "x", "@"
                    , (int)PlayerValues.playerVals.Human
                    , false, false, false)
                );
            var convert = new JsonConverter();
            var serviceDependents =
                new ServiceDependents(convert,
                    game);

            Assert.Equal(game, serviceDependents.Game);
            Assert.Equal(convert, serviceDependents.Converter);
        }
    }
}
