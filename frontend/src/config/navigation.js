import {
  BarChart3,
  Bell,
  CheckSquare,
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  Plane,
  Settings,
  Truck,
  UserRound,
  UsersRound
} from 'lucide-react';
import { ROLES, normalizeRole } from '../constants/roles';

const navigationByRole = {
  [ROLES.ADMIN]: [
    {
      section: 'Main',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/bookings', label: 'Bookings', icon: Package },
        { to: '/shipments', label: 'Shipments', icon: Truck },
        { to: '/documents', label: 'Documents', icon: FileText }
      ]
    },
    {
      section: 'Business',
      items: [
        { to: '/revenue', label: 'Revenue', icon: CreditCard },
        { to: '/customers', label: 'Customers', icon: UsersRound },
        { to: '/staff', label: 'Staff', icon: CheckSquare },
        { to: '/airline-rates', label: 'Airline Rates', icon: Plane }
      ]
    },
    {
      section: 'Support',
      items: [
        { to: '/alerts', label: 'Alerts', icon: Bell },
        { to: '/reports', label: 'Reports', icon: BarChart3 },
        { to: '/settings', label: 'Account Center', icon: Settings, account: true }
      ]
    }
  ],

  [ROLES.OPERATIONS]: [
    {
      section: 'Operations',
      items: [
        { to: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
        { to: '/bookings', label: 'Bookings', icon: Package },
        { to: '/shipments', label: 'Shipments', icon: Truck },
        { to: '/documents', label: 'Documents', icon: FileText }
      ]
    },
    {
      section: 'Support',
      items: [
        { to: '/alerts', label: 'Alerts', icon: Bell },
        { to: '/profile', label: 'My Profile', icon: UserRound, account: true }
      ]
    }
  ],

  [ROLES.ACCOUNTS]: [
    {
      section: 'Accounts',
      items: [
        { to: '/dashboard', label: 'Accounts Dashboard', icon: LayoutDashboard },
        { to: '/revenue', label: 'Revenue', icon: CreditCard },
        { to: '/customers', label: 'Customers', icon: UsersRound },
        { to: '/reports', label: 'Reports', icon: BarChart3 }
      ]
    },
    {
      section: 'Support',
      items: [
        { to: '/alerts', label: 'Alerts', icon: Bell },
        { to: '/profile', label: 'My Profile', icon: UserRound, account: true }
      ]
    }
  ],

  [ROLES.WAREHOUSE]: [
    {
      section: 'Warehouse',
      items: [
        { to: '/dashboard', label: 'Warehouse Dashboard', icon: LayoutDashboard },
        { to: '/shipments', label: 'Shipments', icon: Truck },
        { to: '/documents', label: 'Documents', icon: FileText },
        { to: '/tasks', label: 'Tasks', icon: CheckSquare }
      ]
    },
    {
      section: 'Support',
      items: [
        { to: '/alerts', label: 'Alerts', icon: Bell },
        { to: '/profile', label: 'My Profile', icon: UserRound, account: true }
      ]
    }
  ]
};

export function getNavigationForRole(role) {
  return navigationByRole[normalizeRole(role)] || navigationByRole[ROLES.OPERATIONS];
}
