'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  UserIcon,
  HeartIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function MessagesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      doctor: 'Dr. Nimal Silva',
      specialty: 'Cardiologist',
      lastMessage: 'Your test results look good. Let\'s schedule a follow-up appointment.',
      time: '2 hours ago',
      unread: 1,
      avatar: 'NS',
      online: true
    },
    {
      id: 2,
      doctor: 'Dr. Kamani Perera',
      specialty: 'General Practitioner',
      lastMessage: 'Please take the prescribed medication twice daily.',
      time: '1 day ago',
      unread: 0,
      avatar: 'KP',
      online: false
    },
    {
      id: 3,
      doctor: 'Dr. Priya Jayawardena',
      specialty: 'Endocrinologist',
      lastMessage: 'How are you feeling after the treatment?',
      time: '3 days ago',
      unread: 0,
      avatar: 'PJ',
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'doctor',
      message: 'Hello! I\'ve reviewed your recent blood work results.',
      time: '10:30 AM',
      avatar: 'NS'
    },
    {
      id: 2,
      sender: 'patient',
      message: 'Thank you doctor. How do they look?',
      time: '10:35 AM',
      avatar: 'You'
    },
    {
      id: 3,
      sender: 'doctor',
      message: 'Your cholesterol levels have improved significantly since our last check. This is great progress!',
      time: '10:38 AM',
      avatar: 'NS'
    },
    {
      id: 4,
      sender: 'patient',
      message: 'That\'s wonderful news! I\'ve been following the diet plan you recommended.',
      time: '10:40 AM',
      avatar: 'You'
    },
    {
      id: 5,
      sender: 'doctor',
      message: 'Your test results look good. Let\'s schedule a follow-up appointment.',
      time: '10:45 AM',
      avatar: 'NS'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-healthify-primary rounded-lg flex items-center justify-center">
                  <HeartSolid className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Healthify <span className="text-healthify-primary">Connect</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/appointments" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Appointments
              </Link>
              <Link href="/messages" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Prescriptions
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <UserIcon className="w-6 h-6" />
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <Link href="/appointments" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Appointments
              </Link>
              <Link href="/messages" className="bg-healthify-primary/10 text-healthify-primary block px-3 py-2 rounded-md text-base font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Prescriptions
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthify-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-healthify-primary/5 border-r-2 border-r-healthify-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-healthify-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {conversation.avatar}
                        </div>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.doctor}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.time}</p>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.specialty}</p>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-healthify-primary rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{conversation.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-healthify-primary rounded-full flex items-center justify-center text-white font-medium">
                      NS
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Dr. Nimal Silva</h3>
                    <p className="text-sm text-gray-600">Cardiologist • Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'patient' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        message.sender === 'patient' 
                          ? 'bg-healthify-primary text-white ml-2' 
                          : 'bg-gray-300 text-gray-700 mr-2'
                      }`}>
                        {message.avatar === 'You' ? 'You' : message.avatar}
                      </div>
                      <div>
                        <div className={`px-4 py-2 rounded-lg ${
                          message.sender === 'patient'
                            ? 'bg-healthify-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${
                          message.sender === 'patient' ? 'text-right' : 'text-left'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <PaperClipIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <PhotoIcon className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-healthify-primary focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-healthify-primary text-white rounded-lg hover:bg-healthify-primary/90 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your messages are encrypted and HIPAA compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 