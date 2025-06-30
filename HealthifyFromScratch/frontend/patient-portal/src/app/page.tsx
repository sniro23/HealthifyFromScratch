'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HeartIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function PatientPortal() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const healthStats = [
    {
      title: 'Next Appointment',
      value: 'Dr. Silva',
      subtitle: 'Tomorrow 2:00 PM',
      icon: CalendarIcon,
      color: 'text-healthify-primary',
      bgColor: 'bg-healthify-primary/10'
    },
    {
      title: 'Heart Rate',
      value: '72 BPM',
      subtitle: 'Normal range',
      icon: HeartIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Messages',
      value: '3 New',
      subtitle: 'From Dr. Perera',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Health Records',
      value: '12 Reports',
      subtitle: 'View all records',
      icon: DocumentTextIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule with your healthcare provider',
      icon: CalendarIcon,
      bgColor: 'bg-healthify-primary',
      href: '/appointments'
    },
    {
      title: 'Chat with Doctor',
      description: 'Secure messaging with your care team',
      icon: ChatBubbleLeftRightIcon,
      bgColor: 'bg-blue-600',
      href: '/messages'
    },
    {
      title: 'View Prescriptions',
      description: 'Access your medication history',
      icon: DocumentTextIcon,
      bgColor: 'bg-green-600',
      href: '/prescriptions'
    },
    {
      title: 'Health Records',
      description: 'View your complete medical history',
      icon: HeartIcon,
      bgColor: 'bg-red-600',
      href: '/health-records'
    }
  ];

  const recentActivity = [
    {
      title: 'Lab Results Available',
      description: 'Blood work from last week is ready',
      time: '2 hours ago'
    },
    {
      title: 'Appointment Confirmed',
      description: 'Visit with Dr. Silva confirmed for tomorrow',
      time: '1 day ago'
    },
    {
      title: 'Prescription Refilled',
      description: 'Metformin prescription has been refilled',
      time: '3 days ago'
    }
  ];

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
              <Link href="/" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/appointments" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Appointments
              </Link>
              <Link href="/messages" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Prescriptions
              </Link>
              <Link href="/profile" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Profile
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
              <Link href="/" className="bg-healthify-primary/10 text-healthify-primary block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <Link href="/appointments" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Appointments
              </Link>
              <Link href="/messages" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Prescriptions
              </Link>
              <Link href="/profile" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Good morning, John! 👋
          </h1>
          <p className="text-gray-600">
            Here's your health overview for today. Stay on top of your wellness journey.
          </p>
        </div>

        {/* Health Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`${action.bgColor} text-white p-6 rounded-lg hover:opacity-90 transition-opacity`}
              >
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                <p className="text-xs opacity-90">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="w-2 h-2 bg-healthify-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}