'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DocumentTextIcon,
  HeartIcon,
  UserIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function HealthRecordsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const vitalSigns = [
    { label: 'Blood Pressure', value: '120/80 mmHg', status: 'normal', date: '2025-01-25' },
    { label: 'Heart Rate', value: '72 BPM', status: 'normal', date: '2025-01-25' },
    { label: 'Temperature', value: '98.6°F', status: 'normal', date: '2025-01-25' },
    { label: 'Weight', value: '70 kg', status: 'normal', date: '2025-01-20' },
    { label: 'BMI', value: '22.5', status: 'normal', date: '2025-01-20' }
  ];

  const labResults = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      date: '2025-01-20',
      status: 'Normal',
      doctor: 'Dr. Nimal Silva',
      results: ['Hemoglobin: 14.2 g/dL', 'White Blood Cells: 7,200/μL', 'Platelets: 250,000/μL']
    },
    {
      id: 2,
      name: 'Lipid Panel',
      date: '2025-01-15',
      status: 'Improved',
      doctor: 'Dr. Nimal Silva',
      results: ['Total Cholesterol: 180 mg/dL', 'LDL: 100 mg/dL', 'HDL: 60 mg/dL']
    }
  ];

  const medicalConditions = [
    {
      id: 1,
      condition: 'Hypertension',
      diagnosedDate: '2023-03-15',
      status: 'Controlled',
      severity: 'Moderate',
      doctor: 'Dr. Nimal Silva',
      medications: ['Lisinopril 10mg daily'],
      notes: 'Well controlled with medication and lifestyle changes. Regular monitoring required.'
    },
    {
      id: 2,
      condition: 'Type 2 Diabetes Mellitus',
      diagnosedDate: '2022-08-20',
      status: 'Controlled',
      severity: 'Mild',
      doctor: 'Dr. Priya Jayawardena',
      medications: ['Metformin 500mg twice daily'],
      notes: 'Good glycemic control achieved with medication and diet management.'
    },
    {
      id: 3,
      condition: 'Hyperlipidemia',
      diagnosedDate: '2023-03-15',
      status: 'Improving',
      severity: 'Mild',
      doctor: 'Dr. Nimal Silva',
      medications: ['Atorvastatin 20mg daily'],
      notes: 'Significant improvement with statin therapy and dietary modifications.'
    }
  ];

  const allergies = [
    {
      id: 1,
      allergen: 'Penicillin',
      type: 'Drug Allergy',
      severity: 'Severe',
      reaction: 'Anaphylaxis, skin rash, difficulty breathing',
      diagnosedDate: '2018-05-10',
      doctor: 'Dr. Kamani Perera',
      notes: 'Avoid all penicillin-based antibiotics. Carry emergency epinephrine.'
    },
    {
      id: 2,
      allergen: 'Shellfish',
      type: 'Food Allergy',
      severity: 'Moderate',
      reaction: 'Hives, swelling, nausea',
      diagnosedDate: '2020-02-14',
      doctor: 'Dr. Saman Fernando',
      notes: 'Avoid all shellfish and seafood. Antihistamines for mild reactions.'
    },
    {
      id: 3,
      allergen: 'Dust Mites',
      type: 'Environmental',
      severity: 'Mild',
      reaction: 'Sneezing, runny nose, watery eyes',
      diagnosedDate: '2019-11-08',
      doctor: 'Dr. Ravi Gunawardena',
      notes: 'Seasonal symptoms. Use air purifiers and hypoallergenic bedding.'
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
              <Link href="/health-records" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
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
              <Link href="/messages" className="text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
                Messages
              </Link>
              <Link href="/health-records" className="bg-healthify-primary/10 text-healthify-primary block px-3 py-2 rounded-md text-base font-medium">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Health Records
          </h1>
          <p className="text-gray-600">
            View your complete medical history, test results, and vital signs.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'vitals'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vital Signs
              </button>
                              <button
                  onClick={() => setActiveTab('labs')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'labs'
                      ? 'border-healthify-primary text-healthify-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Lab Results
                </button>
                <button
                  onClick={() => setActiveTab('conditions')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'conditions'
                      ? 'border-healthify-primary text-healthify-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Medical Conditions
                </button>
                <button
                  onClick={() => setActiveTab('allergies')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'allergies'
                      ? 'border-healthify-primary text-healthify-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Allergies
                </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <HeartIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Latest BP</p>
                    <p className="text-lg font-semibold text-gray-900">120/80 mmHg</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BeakerIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Recent Labs</p>
                    <p className="text-lg font-semibold text-gray-900">2 Results</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Conditions</p>
                    <p className="text-lg font-semibold text-gray-900">2 Managed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vital Signs Tab */}
        {activeTab === 'vitals' && (
          <div className="space-y-4">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{vital.label}</h3>
                    <p className="text-2xl font-bold text-healthify-primary">{vital.value}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Normal
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Last updated: {vital.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'labs' && (
          <div className="space-y-4">
            {labResults.map((lab) => (
              <div key={lab.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{lab.name}</h3>
                    <p className="text-sm text-gray-600">Ordered by {lab.doctor}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lab.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {lab.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">{lab.date}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Results:</h4>
                  <ul className="space-y-1">
                    {lab.results.map((result, index) => (
                      <li key={index} className="text-sm text-gray-600">{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Full Report
                  </button>
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medical Conditions Tab */}
        {activeTab === 'conditions' && (
          <div className="space-y-4">
            {medicalConditions.map((condition) => (
              <div key={condition.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{condition.condition}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        condition.status === 'Controlled' 
                          ? 'bg-green-100 text-green-800'
                          : condition.status === 'Improving'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {condition.status}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        condition.severity === 'Mild' 
                          ? 'bg-green-50 text-green-700'
                          : condition.severity === 'Moderate'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {condition.severity}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p><span className="font-medium">Diagnosed:</span> {condition.diagnosedDate}</p>
                        <p><span className="font-medium">Primary Doctor:</span> {condition.doctor}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Current Medications:</span></p>
                        <ul className="list-disc list-inside mt-1">
                          {condition.medications.map((med, index) => (
                            <li key={index} className="text-sm text-gray-600">{med}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Clinical Notes:</h4>
                      <p className="text-sm text-gray-600">{condition.notes}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    Download Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Allergies Tab */}
        {activeTab === 'allergies' && (
          <div className="space-y-4">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        {allergy.severity === 'Severe' ? (
                          <ShieldExclamationIcon className="w-5 h-5 text-red-600" />
                        ) : (
                          <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{allergy.allergen}</h3>
                        <p className="text-sm text-gray-600">{allergy.type}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        allergy.severity === 'Severe' 
                          ? 'bg-red-100 text-red-800'
                          : allergy.severity === 'Moderate'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {allergy.severity}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p><span className="font-medium">Reaction:</span></p>
                        <p className="text-sm text-gray-700 mt-1">{allergy.reaction}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Diagnosed:</span> {allergy.diagnosedDate}</p>
                        <p><span className="font-medium">By:</span> {allergy.doctor}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Management Notes:</h4>
                      <p className="text-sm text-gray-600">{allergy.notes}</p>
                    </div>

                    {allergy.severity === 'Severe' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex">
                          <ShieldExclamationIcon className="w-5 h-5 text-red-600 mt-0.5" />
                          <div className="ml-2">
                            <h4 className="text-sm font-medium text-red-800">⚠️ SEVERE ALLERGY ALERT</h4>
                            <p className="text-xs text-red-700 mt-1">Always inform healthcare providers about this allergy before any treatment.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    Print Alert Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 