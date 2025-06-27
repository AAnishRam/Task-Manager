import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Video,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: "meeting" | "task" | "reminder" | "personal";
  location?: string;
  attendees?: number;
  isVirtual?: boolean;
  color: string;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample events
  const events: Event[] = [
    {
      id: 1,
      title: "Team Standup",
      time: "09:00 AM",
      duration: "30min",
      type: "meeting",
      location: "Conference Room A",
      attendees: 8,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "02:00 PM",
      duration: "1h",
      type: "meeting",
      isVirtual: true,
      attendees: 12,
      color: "bg-red-500",
    },
    {
      id: 3,
      title: "Code Review",
      time: "04:00 PM",
      duration: "45min",
      type: "task",
      location: "Dev Room",
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Project Deadline",
      time: "11:59 PM",
      duration: "All day",
      type: "reminder",
      color: "bg-yellow-500",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);

      const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
      const isToday = currentDay.toDateString() === new Date().toDateString();

      // Sample events for certain dates
      const dayEvents: Event[] = [];
      if (isCurrentMonth && currentDay.getDate() === new Date().getDate()) {
        dayEvents.push(...events.slice(0, 2));
      } else if (
        isCurrentMonth &&
        currentDay.getDate() === new Date().getDate() + 1
      ) {
        dayEvents.push(events[2]);
      } else if (
        isCurrentMonth &&
        currentDay.getDate() === new Date().getDate() + 7
      ) {
        dayEvents.push(events[3]);
      }

      days.push({
        date: currentDay.getDate(),
        isCurrentMonth,
        isToday,
        events: dayEvents,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const todayEvents = events.filter((event) => true); // Show all events for demo

  return (
    <div className="h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            </div>

            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  view === "month"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  view === "week"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  view === "day"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Day
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                {/* Week Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-100 rounded-lg cursor-pointer transition-colors ${
                        day.isCurrentMonth
                          ? "bg-white hover:bg-gray-50"
                          : "bg-gray-50 text-gray-400"
                      } ${day.isToday ? "bg-blue-50 border-blue-200" : ""}`}
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day.date
                          )
                        )
                      }
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          day.isToday
                            ? "text-blue-600"
                            : day.isCurrentMonth
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {day.date}
                      </div>

                      {/* Events */}
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded text-white truncate ${event.color}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Today's Events
              </h3>
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${event.color} mt-1.5 flex-shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {event.title}
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                        <span>•</span>
                        <span>{event.duration}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.isVirtual && (
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <Video className="w-3 h-3" />
                          <span>Virtual Meeting</span>
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      )}
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Schedule Meeting
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Set Reminder
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors">
                  <Video className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Join Meeting
                  </span>
                </button>
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-gray-700">Meetings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-700">Tasks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-gray-700">Reminders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-700">Important</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
