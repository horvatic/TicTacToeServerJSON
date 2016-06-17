namespace TicTacToeServerJson.Core
{
    public class ServiceDependents
    {
        public readonly TicTacToeGame Game;
        public readonly JsonConverter Converter;

        public ServiceDependents(JsonConverter converter,
            TicTacToeGame game)
        {
            Game = game;
            Converter = converter;
        }
    }
}