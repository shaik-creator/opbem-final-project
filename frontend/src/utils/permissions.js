import { ROLES, normalizeRole } from '../constants/roles';

const permissions = {
  [ROLES.ADMIN]: ['*'],

  [ROLES.OPERATIONS]: [
    'dashboard.operations',
    'booking.view',
    'booking.create',
    'booking.edit.assigned',
    'shipment.view',
    'shipment.updateStatus',
    'document.view',
    'document.upload',
    'alert.view.operations',
    'task.assign.alert',
    'profile.edit'
  ],

  [ROLES.ACCOUNTS]: [
    'dashboard.accounts',
    'revenue.view',
    'revenue.create',
    'revenue.edit',
    'customer.view',
    'customer.edit.billing',
    'report.revenue',
    'alert.view.payments',
    'profile.edit'
  ],

  [ROLES.WAREHOUSE]: [
    'dashboard.warehouse',
    'shipment.view.assigned',
    'shipment.updateWarehouseStatus',
    'document.view',
    'document.upload',
    'task.view.warehouse',
    'alert.view.warehouse',
    'task.assign.alert',
    'profile.edit'
  ]
};

export function can(role, permission) {
  const normalizedRole = normalizeRole(role);
  const rolePermissions = permissions[normalizedRole] || [];
  return rolePermissions.includes('*') || rolePermissions.includes(permission);
}

export function hasRole(role, allowedRoles = []) {
  if (!allowedRoles.length) return true;
  const normalizedRole = normalizeRole(role);
  return allowedRoles.map(normalizeRole).includes(normalizedRole);
}
