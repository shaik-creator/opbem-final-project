import { Bell, LogOut, Menu, Plus, RefreshCw, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/authService';
import { can } from '../../utils/permissions';
import { roleLabel } from '../../constants/roles';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const canCreateBooking = can(user?.role, 'booking.create');
  const canSearchBookings = can(user?.role, 'booking.view');

  const initials = String(user?.name || 'User')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function handleRefresh() {
    window.dispatchEvent(new Event('orbem:refresh-dashboard'));
    window.dispatchEvent(new Event('orbem:refresh-page'));
  }

  return (
    <header className="relative z-20 flex min-h-16 shrink-0 flex-wrap items-center gap-3 border-b border-[#dbe3ea] bg-white/90 px-3 py-3 backdrop-blur-xl sm:flex-nowrap sm:px-4 sm:py-0 lg:px-7">
      {/* Subtle gradient bottom line */}
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#1d9e75]/30 to-transparent" />
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dbe3ea] bg-white text-[#64748b] transition hover:bg-[#eef2f5] hover:text-[#111827] lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden min-w-0 items-center gap-2 sm:flex">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1d9e75] opacity-50" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1d9e75]" />
        </span>
        <span className="truncate text-sm font-semibold text-[#172033]">Operations Command Center</span>
      </div>


      <div className="min-w-0 flex-1" />

      <div className="order-last flex h-10 w-full min-w-0 flex-none items-center gap-2 rounded-lg border border-[#dbe3ea] bg-[#f3f5f9] px-3 text-sm text-[#64748b] sm:order-none sm:max-w-[360px] sm:flex-1">
        <Search className="h-4 w-4 shrink-0" />
        <input
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#64748b]"
          placeholder="Search AWB, customer, route"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.currentTarget.value.trim()) {
              navigate(canSearchBookings ? `/bookings?q=${encodeURIComponent(event.currentTarget.value.trim())}` : '/dashboard');
              event.currentTarget.value = '';
            }
          }}
        />
      </div>

      <button
        type="button"
        className="hidden h-10 w-10 items-center justify-center rounded-lg border border-[#dbe3ea] bg-white text-[#64748b] transition hover:bg-[#eef2f5] hover:text-[#111827] sm:inline-flex"
        onClick={handleRefresh}
        aria-label="Refresh data"
        title="Refresh data"
      >
        <RefreshCw className="h-4 w-4" />
      </button>

      {canCreateBooking && (
        <Link
          to="/bookings/new"
          className="hidden min-h-10 max-w-full items-center gap-2 rounded-lg border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(29,158,117,0.22)] transition hover:bg-brand-700 lg:inline-flex"
        >
          <Plus className="h-4 w-4" />
          <span className="whitespace-nowrap">New Booking</span>
        </Link>
      )}

      <Link
        to="/notifications"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#dbe3ea] bg-white text-[#64748b] transition hover:bg-[#eef2f5] hover:text-[#111827]"
        aria-label="Alerts"
        title="Alerts"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#e24b4a]" aria-hidden="true" />
      </Link>

      <Link to="/profile" className="hidden min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-[#f5f7fa] md:flex">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d9e75] text-xs font-semibold text-white">{initials || 'U'}</span>
        <span className="min-w-0">
          <span className="block max-w-[140px] truncate text-sm font-semibold text-[#111827]">{user?.name || 'User'}</span>
          <span className="block max-w-[140px] truncate text-xs text-[#64748b]">{roleLabel(user?.role)}</span>
        </span>
      </Link>

      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-[#64748b] transition hover:bg-[#eef2f5] hover:text-[#111827]"
        onClick={handleLogout}
        aria-label="Logout"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </header>
  );
}
