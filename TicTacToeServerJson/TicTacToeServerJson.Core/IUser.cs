using TicTacToe.Core;

namespace TicTacToeServerJson.Core
{
    public interface IUser
    {
        ITicTacToeBoxClass.ITicTacToeBox Move(
            ITicTacToeBoxClass.ITicTacToeBox ticTacToeBox,
            int move, string playerSymbol, string aISymbol);
    }
}