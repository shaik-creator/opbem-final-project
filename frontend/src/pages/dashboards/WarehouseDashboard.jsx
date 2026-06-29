import RoleDashboardBase from './RoleDashboardBase';

export default function WarehouseDashboard() {
  return (
    <RoleDashboardBase
      title="Warehouse Workspace"
      subtitle="Handle cargo received, dispatch readiness, and warehouse document flow."
      statusText="Warehouse Staff"
      queueTitle="Warehouse handling"
      cards={[
        { key: 'cargoReceived', label: 'Cargo received', icon: 'shipments', tone: '#1d9e75' },
        { key: 'readyForDispatch', label: 'Ready for dispatch', icon: 'complete', tone: '#378add' },
        { key: 'pendingWarehouseDocs', label: 'Pending warehouse docs', icon: 'documents', tone: '#ef9f27' },
        { key: 'delayedHandover', label: 'Delayed handover', icon: 'alerts', tone: '#e24b4a' },
        { key: 'warehouseTasks', label: 'Warehouse tasks', icon: 'tasks', tone: '#6366f1' },
        { key: 'warehouseAlerts', label: 'Warehouse alerts', icon: 'alerts', tone: '#d97706' }
      ]}
      quickLinks={[
        { to: '/shipments', label: 'Update warehouse status', hint: 'Cargo' },
        { to: '/documents', label: 'Upload warehouse docs', hint: 'Docs' },
        { to: '/tasks', label: 'Open task board', hint: 'Tasks' },
        { to: '/alerts', label: 'Review warehouse alerts', hint: 'Alerts' }
      ]}
    />
  );
}
