import React from 'react';
import { ChevronDown, Menu, X, Home, User, Calendar, MessageCircle, FileText, Settings, Bell } from 'lucide-react';
import { Button } from './Button';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  onClick?: () => void;
  disabled?: boolean;
}

export interface NavbarProps {
  title?: string;
  logo?: React.ReactNode;
  items?: NavigationItem[];
  userMenu?: React.ReactNode;
  variant?: 'patient' | 'provider' | 'admin';
  className?: string;
}

export interface SidebarProps {
  items: NavigationItem[];
  isOpen?: boolean;
  onToggle?: () => void;
  variant?: 'patient' | 'provider' | 'admin';
  className?: string;
}

export interface TabBarProps {
  items: NavigationItem[];
  activeItemId?: string;
  onItemClick?: (item: NavigationItem) => void;
  variant?: 'patient' | 'provider' | 'admin';
  className?: string;
}

// Navigation Item Component
const NavItem: React.FC<{
  item: NavigationItem;
  variant?: 'patient' | 'provider' | 'admin';
  isActive?: boolean;
  className?: string;
}> = ({ item, variant = 'patient', isActive = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'patient':
        return isActive 
          ? 'text-primary-700 bg-primary-50 border-primary-200'
          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50';
      case 'provider':
        return isActive
          ? 'text-secondary-700 bg-secondary-50 border-secondary-200'
          : 'text-gray-700 hover:text-secondary-600 hover:bg-secondary-50';
      case 'admin':
        return isActive
          ? 'text-purple-700 bg-purple-50 border-purple-200'
          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50';
      default:
        return 'text-gray-700 hover:text-primary-600 hover:bg-primary-50';
    }
  };

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      setIsExpanded(!isExpanded);
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        disabled={item.disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
          ${getVariantClasses()}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-expanded={item.children ? isExpanded : undefined}
      >
        <div className="flex items-center space-x-3">
          {item.icon && (
            <span className="flex-shrink-0">
              {item.icon}
            </span>
          )}
          <span>{item.label}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {item.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-700">
              {item.badge}
            </span>
          )}
          {item.children && item.children.length > 0 && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>
      </button>

      {/* Submenu */}
      {item.children && isExpanded && (
        <div className="mt-1 ml-6 space-y-1">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              variant={variant}
              className="pl-4"
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Navbar Component
const Navbar: React.FC<NavbarProps> = ({
  title,
  logo,
  items = [],
  userMenu,
  variant = 'patient',
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'patient':
        return 'bg-white border-primary-200';
      case 'provider':
        return 'bg-white border-secondary-200';
      case 'admin':
        return 'bg-white border-purple-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <nav className={`border-b ${getVariantClasses()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {logo && (
              <div className="flex-shrink-0 mr-4">
                {logo}
              </div>
            )}
            {title && (
              <h1 className="text-xl font-semibold text-gray-900">
                {title}
              </h1>
            )}
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {items.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                variant={variant}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {userMenu}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  variant={variant}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({
  items,
  isOpen = true,
  onToggle,
  variant = 'patient',
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'patient':
        return 'bg-primary-50 border-primary-200';
      case 'provider':
        return 'bg-secondary-50 border-secondary-200';
      case 'admin':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <aside
      className={`
        ${isOpen ? 'w-64' : 'w-16'} 
        transition-width duration-300 ease-in-out
        ${getVariantClasses()}
        border-r min-h-screen
        ${className}
      `}
    >
      <div className="p-4">
        {/* Toggle button */}
        {onToggle && (
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Navigation items */}
        <nav className="space-y-2">
          {items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              variant={variant}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

// Tab Bar Component (for mobile)
const TabBar: React.FC<TabBarProps> = ({
  items,
  activeItemId,
  onItemClick,
  variant = 'patient',
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'patient':
        return 'bg-white border-primary-200';
      case 'provider':
        return 'bg-white border-secondary-200';
      case 'admin':
        return 'bg-white border-purple-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t ${getVariantClasses()} ${className}`}>
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const isActive = item.id === activeItemId;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item)}
              disabled={item.disabled}
              className={`
                flex flex-col items-center px-3 py-2 min-h-[44px] text-xs font-medium
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                ${isActive 
                  ? 'text-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {item.icon && (
                <span className="mb-1">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-700">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// Healthcare-specific navigation presets
export const patientNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar className="h-4 w-4" />,
    href: '/appointments',
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <MessageCircle className="h-4 w-4" />,
    href: '/messages',
    badge: 3,
  },
  {
    id: 'health-records',
    label: 'Health Records',
    icon: <FileText className="h-4 w-4" />,
    href: '/health-records',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-4 w-4" />,
    href: '/profile',
  },
];

export const providerNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-4 w-4" />,
    href: '/dashboard',
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: <User className="h-4 w-4" />,
    href: '/patients',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: <Calendar className="h-4 w-4" />,
    href: '/appointments',
    badge: 5,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: <MessageCircle className="h-4 w-4" />,
    href: '/messages',
    badge: 12,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <FileText className="h-4 w-4" />,
    href: '/analytics',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
    href: '/settings',
  },
];

export { Navbar, Sidebar, TabBar, NavItem }; 