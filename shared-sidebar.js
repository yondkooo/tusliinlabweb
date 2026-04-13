// shared-sidebar.js - include in all dashboard pages
// Call renderSidebar(activeId) after DOM loads

const SIDEBAR_ITEMS = [
  { href: 'admin-dashboard.html', icon: 'dashboard', label: 'Dashboard', id: 'dashboard' },
  { href: 'booking.html', icon: 'calendar_month', label: 'Bookings', id: 'bookings' },
  { href: 'mock-test.html', icon: 'assignment', label: 'Mock Tests', id: 'mock-tests' },
  { href: '#', icon: 'menu_book', label: 'Library', id: 'library' },
  { href: 'finance.html', icon: 'payments', label: 'Payments', id: 'payments' },
  { href: 'documents.html', icon: 'description', label: 'Documents', id: 'documents' },
  { href: '#', icon: 'analytics', label: 'Reports', id: 'reports' },
  { href: '#', icon: 'directions_car', label: 'Fleet', id: 'fleet' },
  { href: '#', icon: 'settings', label: 'Settings', id: 'settings' },
];

function renderSidebar(activeId) {
  const el = document.getElementById('sidebar-nav');
  if (!el) return;
  el.innerHTML = SIDEBAR_ITEMS.map(item => {
    const active = item.id === activeId;
    return `<a href="${item.href}" class="flex items-center gap-3 px-4 py-3 ${active ? 'bg-white text-blue-900 rounded-xl font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-200/60 rounded-xl'} transition-all duration-200"><span class="material-symbols-outlined">${item.icon}</span><span class="text-sm">${item.label}</span></a>`;
  }).join('');
}