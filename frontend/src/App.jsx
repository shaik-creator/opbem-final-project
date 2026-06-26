import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './auth/ProtectedRoute';
import PublicRoute from './auth/PublicRoute';
import LoadingState from './components/common/LoadingState';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './services/authService';
import { SocketProvider } from './context/SocketContext';
import { ROLES } from './constants/roles';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const Bookings = lazy(() => import('./pages/Bookings'));
const BookingCreate = lazy(() => import('./pages/BookingCreate'));
const BookingDetailPage = lazy(() => import('./pages/BookingDetailPage'));
const Customers = lazy(() => import('./pages/Customers'));
const CustomerDetail = lazy(() => import('./pages/CustomerDetail'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Documents = lazy(() => import('./pages/Documents'));
const Payments = lazy(() => import('./pages/Payments'));
const AirlineRates = lazy(() => import('./pages/AirlineRates'));
const Reports = lazy(() => import('./pages/Reports'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Settings = lazy(() => import('./pages/Settings'));
const Assistant = lazy(() => import('./pages/Assistant'));
const Profile = lazy(() => import('./pages/Profile'));
const Staff = lazy(() => import('./pages/Staff'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));

const ADMIN = [ROLES.ADMIN];
const ADMIN_OPERATIONS = [ROLES.ADMIN, ROLES.OPERATIONS];
const ADMIN_ACCOUNTS = [ROLES.ADMIN, ROLES.ACCOUNTS];
const ADMIN_OPERATIONS_WAREHOUSE = [ROLES.ADMIN, ROLES.OPERATIONS, ROLES.WAREHOUSE];
const ADMIN_ACCOUNTS_OPERATIONS = [ROLES.ADMIN, ROLES.ACCOUNTS, ROLES.OPERATIONS];
const ADMIN_WAREHOUSE = [ROLES.ADMIN, ROLES.WAREHOUSE];
const DOCUMENT_ROLES = [ROLES.ADMIN, ROLES.OPERATIONS, ROLES.WAREHOUSE, ROLES.ACCOUNTS];

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingState rows={6} />}>
            <Routes>
              <Route
                path="/"
                element={
                  localStorage.getItem('token') ||
                  localStorage.getItem('authToken') ||
                  localStorage.getItem('orbem_token')
                    ? <Navigate to="/dashboard" replace />
                    : <Navigate to="/login" replace />
                }
              />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/bookings" element={<ProtectedRoute allowedRoles={ADMIN_OPERATIONS}><Bookings /></ProtectedRoute>} />
                <Route path="/shipments" element={<ProtectedRoute allowedRoles={ADMIN_OPERATIONS_WAREHOUSE}><Bookings /></ProtectedRoute>} />
                <Route path="/shipments/:id" element={<ProtectedRoute allowedRoles={ADMIN_OPERATIONS_WAREHOUSE}><BookingDetailPage /></ProtectedRoute>} />
                <Route path="/bookings/new" element={<ProtectedRoute allowedRoles={ADMIN_OPERATIONS}><BookingCreate /></ProtectedRoute>} />
                <Route path="/bookings/:id" element={<ProtectedRoute allowedRoles={ADMIN_OPERATIONS}><BookingDetailPage /></ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute allowedRoles={ADMIN_ACCOUNTS_OPERATIONS}><Customers /></ProtectedRoute>} />
                <Route path="/customers/:id" element={<ProtectedRoute allowedRoles={ADMIN_ACCOUNTS_OPERATIONS}><CustomerDetail /></ProtectedRoute>} />
                <Route path="/staff" element={<ProtectedRoute allowedRoles={ADMIN}><Staff /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute allowedRoles={ADMIN_WAREHOUSE}><Tasks /></ProtectedRoute>} />
                <Route path="/documents" element={<ProtectedRoute allowedRoles={DOCUMENT_ROLES}><Documents /></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute allowedRoles={ADMIN_ACCOUNTS}><Payments /></ProtectedRoute>} />
                <Route path="/revenue" element={<ProtectedRoute allowedRoles={ADMIN_ACCOUNTS}><Payments /></ProtectedRoute>} />
                <Route path="/airline-rates" element={<ProtectedRoute allowedRoles={ADMIN}><AirlineRates /></ProtectedRoute>} />
                <Route path="/calendar" element={<ProtectedRoute allowedRoles={ADMIN}><Calendar /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute allowedRoles={ADMIN_ACCOUNTS_OPERATIONS}><Reports /></ProtectedRoute>} />
                <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/alerts" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
