'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  VideoCameraIcon,
  PlusIcon,
  HeartIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolid
} from '@heroicons/react/24/solid';

export default function AppointmentsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Provider, 2: Select Date/Time, 3: Confirm

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Nimal Silva',
      specialty: 'Cardiologist',
      date: '2025-01-28',
      time: '2:00 PM',
      type: 'Video Consultation',
      location: 'Online',
      status: 'confirmed',
      avatar: 'NS'
    },
    {
      id: 2,
      doctor: 'Dr. Kamani Perera',
      specialty: 'General Practitioner',
      date: '2025-01-30',
      time: '10:30 AM',
      type: 'In-Person Visit',
      location: 'Healthify Clinic, Colombo',
      status: 'confirmed',
      avatar: 'KP'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: 'Dr. Priya Jayawardena',
      specialty: 'Endocrinologist',
      date: '2025-01-20',
      time: '11:00 AM',
      type: 'In-Person Visit',
      location: 'Healthify Clinic, Kandy',
      status: 'completed',
      avatar: 'PJ'
    }
  ];

  const availableProviders = [
    {
      id: 1,
      name: 'Dr. Nimal Silva',
      specialty: 'Cardiologist',
      experience: '15 years',
      rating: 4.9,
      consultationFee: '$75',
      nextAvailable: '2025-01-30',
      image: '/doctor-placeholder.jpg'
    },
    {
      id: 2,
      name: 'Dr. Priya Jayawardena',
      specialty: 'Endocrinologist',
      experience: '12 years',
      rating: 4.8,
      consultationFee: '$80',
      nextAvailable: '2025-01-29',
      image: '/doctor-placeholder.jpg'
    },
    {
      id: 3,
      name: 'Dr. Kamani Perera',
      specialty: 'General Practitioner',
      experience: '8 years',
      rating: 4.7,
      consultationFee: '$60',
      nextAvailable: '2025-01-28',
      image: '/doctor-placeholder.jpg'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleBookingSubmit = () => {
    // Here you would typically make an API call to book the appointment
    setIsBookingModalOpen(false);
    setBookingStep(1);
    setSelectedProvider(null);
    // Show success message
    alert('Appointment booked successfully!');
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
              <Link href="/appointments" className="text-healthify-primary border-b-2 border-healthify-primary px-1 pb-4 text-sm font-medium">
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
              <Link href="/appointments" className="bg-healthify-primary/10 text-healthify-primary block px-3 py-2 rounded-md text-base font-medium">
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
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Appointments
            </h1>
            <p className="text-gray-600">
              View and manage your upcoming and past appointments.
            </p>
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 bg-healthify-primary text-white rounded-lg hover:bg-healthify-primary/90 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Book New Appointment</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Next Appointment</p>
                <p className="text-lg font-semibold text-gray-900">Tomorrow 2:00 PM</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-lg font-semibold text-gray-900">3 Appointments</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <UserIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Providers</p>
                <p className="text-lg font-semibold text-gray-900">4 Doctors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming ({upcomingAppointments.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-healthify-primary text-healthify-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past ({pastAppointments.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {activeTab === 'upcoming' && upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-healthify-primary rounded-full flex items-center justify-center text-white font-medium">
                    {appointment.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{appointment.doctor}</h3>
                    <p className="text-gray-600">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{appointment.date}</span>
                    <ClockIcon className="w-4 h-4 text-gray-400 ml-4" />
                    <span className="text-sm text-gray-600">{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {appointment.type === 'Video Consultation' ? (
                      <VideoCameraIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MapPinIcon className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm text-gray-600">{appointment.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending Confirmation'}
                </span>
                <div className="flex space-x-2">
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium">
                    Reschedule
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Cancel
                  </button>
                  {appointment.type === 'Video Consultation' && appointment.status === 'confirmed' && (
                    <button className="bg-healthify-primary text-white px-4 py-1 rounded text-sm hover:bg-healthify-primary/90">
                      Join Call
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'past' && pastAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
                    {appointment.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{appointment.doctor}</h3>
                    <p className="text-gray-600">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{appointment.date}</span>
                    <ClockIcon className="w-4 h-4 text-gray-400 ml-4" />
                    <span className="text-sm text-gray-600">{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {appointment.type === 'Video Consultation' ? (
                      <VideoCameraIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MapPinIcon className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm text-gray-600">{appointment.location}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Completed
                </span>
                <div className="flex space-x-2">
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium">
                    View Summary
                  </button>
                  <button className="text-sm text-healthify-primary hover:text-healthify-primary/80 font-medium">
                    Book Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {bookingStep === 1 && 'Select Healthcare Provider'}
                  {bookingStep === 2 && 'Choose Date & Time'}
                  {bookingStep === 3 && 'Confirm Appointment'}
                </h2>
                <button 
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setBookingStep(1);
                    setSelectedProvider(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Step 1: Provider Selection */}
              {bookingStep === 1 && (
                <div>
                  <p className="text-gray-600 mb-6">Choose from our available healthcare providers:</p>
                  <div className="grid gap-4">
                    {availableProviders.map((provider) => (
                      <div key={provider.id} 
                           className="border border-gray-200 rounded-lg p-4 hover:border-healthify-primary cursor-pointer transition-colors"
                           onClick={() => {
                             setSelectedProvider(provider);
                             setBookingStep(2);
                           }}>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-healthify-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {provider.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            <p className="text-healthify-primary">{provider.specialty}</p>
                            <p className="text-sm text-gray-600">{provider.experience} experience</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900">{provider.consultationFee}</p>
                            <p className="text-xs text-gray-500">Next: {provider.nextAvailable}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {bookingStep === 2 && selectedProvider && (
                <div>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Selected Provider:</h3>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-healthify-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {selectedProvider.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{selectedProvider.name}</p>
                        <p className="text-sm text-healthify-primary">{selectedProvider.specialty}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Select Date:</h4>
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {/* Calendar would go here - simplified for now */}
                        <div className="text-center p-2 border border-gray-200 rounded hover:bg-healthify-primary hover:text-white cursor-pointer">
                          28
                        </div>
                        <div className="text-center p-2 border border-gray-200 rounded hover:bg-healthify-primary hover:text-white cursor-pointer">
                          29
                        </div>
                        <div className="text-center p-2 border border-gray-200 rounded hover:bg-healthify-primary hover:text-white cursor-pointer">
                          30
                        </div>
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Select Time:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time, index) => (
                          <button key={index} 
                                  className="p-2 border border-gray-200 rounded hover:bg-healthify-primary hover:text-white text-sm transition-colors">
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <button 
                      onClick={() => setBookingStep(1)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setBookingStep(3)}
                      className="px-6 py-2 bg-healthify-primary text-white rounded-md hover:bg-healthify-primary/90"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {bookingStep === 3 && selectedProvider && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Appointment Summary:</h3>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="grid gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provider:</span>
                        <span className="font-medium">{selectedProvider.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialty:</span>
                        <span className="font-medium">{selectedProvider.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">January 30, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">10:00 AM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultation Fee:</span>
                        <span className="font-medium text-healthify-primary">{selectedProvider.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Visit (Optional):
                    </label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-healthify-primary focus:border-healthify-primary"
                      rows={3}
                      placeholder="Briefly describe your symptoms or reason for the consultation..."
                    ></textarea>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setBookingStep(2)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleBookingSubmit}
                      className="flex-1 px-6 py-2 bg-healthify-primary text-white rounded-md hover:bg-healthify-primary/90"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 