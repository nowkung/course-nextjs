import Link from 'next/link';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-2">
          <NavLink href="/dashboard">Overview</NavLink>
          <NavLink href="/dashboard/invoice">Invoice</NavLink>
          <NavLink href="/dashboard/customer">Customer</NavLink>
          <div className="pt-4 mt-4 border-t border-gray-700">
            <NavLink href="/demo">Component Demo</NavLink>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors">
      {children}
    </Link>
  );
}
