import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Music,
  SkipBack,
  SkipForward,
  Volume2,
  Plus,
  Check,
  Trash2,
  Edit3,
  Calendar,
  User,
  Mail,
  Timer,
  Quote,
  Settings,
} from "lucide-react";

// Type definitions
interface WeatherData {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  location: string;
}

interface Song {
  title: string;
  artist: string;
  isPlaying: boolean;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TimerMode = "pomodoro" | "shortBreak" | "longBreak" | "custom";

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  custom: number;
}

const Dashboard: React.FC = () => {
  // Timer state
  const [timerMode, setTimerMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Timer settings with editable values
  const [timerSettings, setTimerSettings] = useState<TimerSettings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    custom: 30,
  });

  // Weather state
  const [weather, setWeather] = useState<WeatherData>({
    temp: 24,
    condition: "sunny",
    location: "Coimbatore",
  });

  // Music state
  const [currentSong, setCurrentSong] = useState<Song>({
    title: "Focus Beats",
    artist: "Lofi Hip Hop",
    isPlaying: false,
  });

  // Todo state
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Complete dashboard design", completed: false },
    { id: 2, text: "Review code", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Date and time state
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Inspirational quotes
  const quotes: string[] = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ];
  const [currentQuote, setCurrentQuote] = useState<string>(quotes[0]);

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Timer completed - could add notification here
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Quote rotation effect
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    }, 30000); // Change quote every 30 seconds
    return () => clearInterval(quoteInterval);
  }, [quotes]);

  // Timer functions
  const toggleTimer = (): void => {
    setIsRunning(!isRunning);
  };

  const resetTimer = (): void => {
    setIsRunning(false);
    setTimeLeft(timerSettings[timerMode] * 60);
  };

  const changeTimerMode = (mode: TimerMode): void => {
    setTimerMode(mode);
    setIsRunning(false);
    setTimeLeft(timerSettings[mode] * 60);
  };

  const updateTimerSetting = (
    mode: keyof TimerSettings,
    minutes: number
  ): void => {
    setTimerSettings((prev) => ({
      ...prev,
      [mode]: minutes,
    }));

    // If we're currently using this timer mode, update the time left
    if (timerMode === mode && !isRunning) {
      setTimeLeft(minutes * 60);
    }
  };

  // Todo functions
  const addTodo = (): void => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string): void => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditingId(null);
  };

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Weather icon
  const WeatherIcon: React.FC = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case "snowy":
        return <CloudSnow className="w-6 h-6 text-blue-300" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Anish Ram A</h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">aanishram@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date and Time Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center justify-center text-gray-600 mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {weather.temp}°C
                </div>
                <div className="text-gray-600 text-sm">{weather.location}</div>
              </div>
              <div className="flex flex-col items-center">
                <WeatherIcon />
                <span className="text-sm text-gray-600 mt-1 capitalize">
                  {weather.condition}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Pomodoro Timer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Timer className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Pomodoro Timer
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Timer Settings Panel */}
            {showSettings && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Timer Settings (minutes)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Focus Time
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={timerSettings.pomodoro}
                      onChange={(e) =>
                        updateTimerSetting(
                          "pomodoro",
                          parseInt(e.target.value) || 25
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Short Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timerSettings.shortBreak}
                      onChange={(e) =>
                        updateTimerSetting(
                          "shortBreak",
                          parseInt(e.target.value) || 5
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Long Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={timerSettings.longBreak}
                      onChange={(e) =>
                        updateTimerSetting(
                          "longBreak",
                          parseInt(e.target.value) || 15
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Custom Time
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="240"
                      value={timerSettings.custom}
                      onChange={(e) =>
                        updateTimerSetting(
                          "custom",
                          parseInt(e.target.value) || 30
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Timer Mode Selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => changeTimerMode("pomodoro")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timerMode === "pomodoro"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Focus ({timerSettings.pomodoro}m)
              </button>
              <button
                onClick={() => changeTimerMode("shortBreak")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timerMode === "shortBreak"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Break ({timerSettings.shortBreak}m)
              </button>
              <button
                onClick={() => changeTimerMode("longBreak")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timerMode === "longBreak"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Long Break ({timerSettings.longBreak}m)
              </button>
              <button
                onClick={() => changeTimerMode("custom")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timerMode === "custom"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Custom ({timerSettings.custom}m)
              </button>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={toggleTimer}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                    isRunning
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{isRunning ? "Pause" : "Start"}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Inspirational Quote */}
            <div className="border-t pt-4">
              <div className="flex items-start space-x-2">
                <Quote className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {currentQuote}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Todo Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Tasks
              </h3>
            </div>

            {/* Add Todo */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <button
                onClick={addTodo}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Todo List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    todo.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {todo.completed && <Check className="w-3 h-3 text-white" />}
                  </button>

                  {editingId === todo.id ? (
                    <input
                      type="text"
                      defaultValue={todo.text}
                      onBlur={(e) => updateTodo(todo.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          updateTodo(
                            todo.id,
                            (e.target as HTMLInputElement).value
                          );
                        }
                      }}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}

                  <div className="flex space-x-1">
                    <button
                      onClick={() => setEditingId(todo.id)}
                      className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {todos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Check className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No tasks yet. Add one above!</p>
                </div>
              )}
            </div>
          </div>

          {/* Music Player Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <Music className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Music Player
              </h3>
            </div>

            {/* Album Art Placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
              <Music className="w-12 h-12 text-white opacity-80" />
            </div>

            {/* Song Info */}
            <div className="text-center mb-4">
              <h4 className="font-semibold text-gray-800">
                {currentSong.title}
              </h4>
              <p className="text-gray-600 text-sm">{currentSong.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1:24</span>
                <span>3:45</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-purple-500 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentSong({
                    ...currentSong,
                    isPlaying: !currentSong.isPlaying,
                  })
                }
                className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
              >
                {currentSong.isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-500 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 mt-4">
              <Volume2 className="w-4 h-4 text-gray-600" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>

            {/* Spotify Connect */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700 font-medium">
                    Connect to Spotify
                  </span>
                </div>
                <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
