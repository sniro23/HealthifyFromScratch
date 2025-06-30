'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ClipboardDocumentListIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function PrescriptionsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  const currentPrescriptions = [
    {
      id: 1,
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribed: '2025-01-15',
      prescribedBy: 'Dr. Nimal Silva',
      refillsLeft: 2,
      nextRefill: '2025-02-15',
      status: 'active'
    },
    {
      id: 2,
      medication: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      prescribed: '2025-01-15',
      prescribedBy: 'Dr. Nimal Silva',
      refillsLeft: 0,
      nextRefill: null,
      status: 'needs_refill'
    }
  ];

  const prescriptionHistory = [
    {
      id: 3,
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      prescribed: '2024-12-20',
      prescribedBy: 'Dr. Kamani Perera',
      completed: '2024-12-27',
      status: 'completed'
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
              <Link href="/prescriptions" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
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
              <Link href="/messages" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Health Records
              </Link>
              <Link href="/prescriptions" className="bg-healthify-primary/10 text-healthify-primary block px-3 py-2 rounded-md text-base font-medium">
                Prescriptions
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Prescriptions
          </h1>
          <p className="text-gray-600">
            Manage your prescriptions, request refills, and view medication history.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Prescriptions</p>
                <p className="text-lg font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Refills Available</p>
                <p className="text-lg font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-50 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Needs Attention</p>
                <p className="text-lg font-semibold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current ({currentPrescriptions.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                History ({prescriptionHistory.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Current Prescriptions */}
        {activeTab === 'current' && (
          <div className="space-y-4">
            {currentPrescriptions.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{prescription.medication}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        prescription.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {prescription.status === 'active' ? 'Active' : 'Needs Refill'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                        <p><span className="font-medium">Frequency:</span> {prescription.frequency}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Prescribed by:</span> {prescription.prescribedBy}</p>
                        <p><span className="font-medium">Date prescribed:</span> {prescription.prescribed}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                      <span className={`flex items-center ${
                        prescription.refillsLeft > 0 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        <span className="font-medium">Refills left:</span> 
                        <span className="ml-1">{prescription.refillsLeft}</span>
                      </span>
                      {prescription.nextRefill && (
                        <span className="text-gray-600">
                          <span className="font-medium">Next refill:</span> {prescription.nextRefill}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {prescription.refillsLeft > 0 ? (
                      <button className="bg-healthify-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-healthify-primary/90">
                        Request Refill
                      </button>
                    ) : (
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700">
                        Contact Doctor
                      </button>
                    )}
                    <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prescription History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {prescriptionHistory.map((prescription) => (
              <div key={prescription.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{prescription.medication}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Completed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                        <p><span className="font-medium">Frequency:</span> {prescription.frequency}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Prescribed by:</span> {prescription.prescribedBy}</p>
                        <p><span className="font-medium">Date prescribed:</span> {prescription.prescribed}</p>
                        <p><span className="font-medium">Completed:</span> {prescription.completed}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 