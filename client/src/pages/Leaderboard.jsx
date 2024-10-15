const Leaderboard = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const sortedUsers = users.sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-800 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6 text-center shadow-md p-4 bg-gray-900 rounded-lg">
        Leaderboard
      </h1>
      <div className="flex flex-col items-center w-full">
        {sortedUsers.map((user, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg shadow-lg mb-4 w-full"
          >
            <h2 className="text-xl font-semibold text-white text-center mb-2">
              Player:{" "}
              <span className="font-bold text-green-400">{user.username}</span>
            </h2>
            <div className="w-full bg-gray-600 rounded-md mb-2">
              <div
                className="bg-green-500 h-4 rounded-md"
                style={{ width: `${user.score}px` }}
              >
                <span className="text-white text-center block">
                  {user.score}
                </span>
              </div>
            </div>
            <p className="text-lg font-semibold text-white text-center">
              Score:{" "}
              <span className="font-bold text-green-400">{user.score}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
