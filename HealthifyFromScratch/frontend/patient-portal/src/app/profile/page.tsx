'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function ProfilePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const currentSubscription = {
    tier: 'Pro',
    status: 'Active',
    nextBilling: '2025-02-15',
    amount: '$29.99/month'
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
              <Link href="/messages" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="text-gray-500 hover:text-gray-700 px-1 pb-4 text-sm font-medium">
                Prescriptions
              </Link>
              <Link href="/profile" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and subscription.
          </p>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-healthify-primary rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JP</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">John Perera</h2>
              <p className="text-gray-600">john.perera@gmail.com</p>
              <p className="text-sm text-gray-500 mt-1">Patient ID: HP-001234</p>
              <div className="mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <StarIcon className="w-4 h-4 mr-1" />
                  {currentSubscription.tier} Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
