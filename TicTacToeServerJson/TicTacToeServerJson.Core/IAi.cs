using TicTacToe.Core;

namespace TicTacToeServerJson.Core
{
    public interface IAi
    {
        ITicTacToeBoxClass.ITicTacToeBox Move(
            ITicTacToeBoxClass.ITicTacToeBox ticTacToeBox,
            GameSettings.gameSetting settings);
    }
}
