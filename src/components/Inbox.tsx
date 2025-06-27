import React, { useState } from "react";
import {
  Inbox,
  Search,
  Star,
  Archive,
  Trash2,
  Mail,
  MailOpen,
  Flag,
  Clock,
  User,
  Paperclip,
  Reply,
  ReplyAll,
  Forward,
  MoreHorizontal,
} from "lucide-react";

interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  isImportant: boolean;
}

const InboxComponent: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: "John Smith",
      subject: "Project Update Required",
      preview:
        "Hi, I need the latest updates on the dashboard project. Can you please...",
      time: "2 hours ago",
      isRead: false,
      isStarred: true,
      hasAttachment: false,
      isImportant: true,
    },
    {
      id: 2,
      sender: "Sarah Johnson",
      subject: "Meeting Schedule",
      preview: "The client meeting has been rescheduled to tomorrow at 3 PM...",
      time: "4 hours ago",
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      isImportant: false,
    },
    {
      id: 3,
      sender: "Team Lead",
      subject: "Weekly Report Submission",
      preview: "Please submit your weekly reports by Friday evening...",
      time: "1 day ago",
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      isImportant: true,
    },
    {
      id: 4,
      sender: "HR Department",
      subject: "Policy Updates",
      preview: "New company policies have been updated. Please review...",
      time: "2 days ago",
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      isImportant: false,
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStar = (id: number) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const markAsRead = (id: number) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, isRead: true } : email
      )
    );
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = emails.filter((email) => !email.isRead).length;

  return (
    <div className="h-full bg-gray-50">
      <div className="flex h-full">
        {/* Email List Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Inbox className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">Inbox</h2>
                {unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => {
                  setSelectedEmail(email);
                  markAsRead(email.id);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !email.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                } ${selectedEmail?.id === email.id ? "bg-blue-100" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        !email.isRead ? "bg-blue-500" : "bg-transparent"
                      }`}
                    />
                    <span
                      className={`font-medium text-sm ${
                        !email.isRead ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {email.sender}
                    </span>
                    {email.isImportant && (
                      <Flag className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          email.isStarred
                            ? "text-yellow-500 fill-current"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                </div>
                <div className="mb-1">
                  <span
                    className={`text-sm ${
                      !email.isRead
                        ? "font-medium text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {email.subject}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate flex-1 mr-2">
                    {email.preview}
                  </p>
                  {email.hasAttachment && (
                    <Paperclip className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <>
              {/* Email Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedEmail.subject}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{selectedEmail.sender}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedEmail.time}</span>
                      </div>
                      {selectedEmail.hasAttachment && (
                        <div className="flex items-center space-x-2">
                          <Paperclip className="w-4 h-4" />
                          <span>Has attachment</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <Archive className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <ReplyAll className="w-4 h-4" />
                    <span>Reply All</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Forward className="w-4 h-4" />
                    <span>Forward</span>
                  </button>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 bg-white p-6 overflow-y-auto">
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Dear Team,
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-4">
                    {selectedEmail.preview} Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p className="text-gray-800 leading-relaxed mb-6">
                    Best regards,
                    <br />
                    {selectedEmail.sender}
                  </p>

                  {selectedEmail.hasAttachment && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Attachments
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Paperclip className="w-4 h-4" />
                        <span>project-report.pdf</span>
                        <span className="text-gray-400">|</span>
                        <span>2.4 MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No email selected
                </h3>
                <p className="text-gray-500">
                  Choose an email from the list to view its contents
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxComponent;
