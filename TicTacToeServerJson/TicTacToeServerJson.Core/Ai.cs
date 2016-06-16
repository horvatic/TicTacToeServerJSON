using TicTacToe.Core;

namespace TicTacToeServerJson.Core
{
    public class Ai : IAi
    {
        public ITicTacToeBoxClass.ITicTacToeBox Move(
            ITicTacToeBoxClass.ITicTacToeBox ticTacToeBox,
            GameSettings.gameSetting settings)
        {
            return AI.aIMove(settings, ticTacToeBox);
        }
    }

}