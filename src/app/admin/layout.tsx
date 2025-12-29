import Link from 'next/link';
import { signOut } from '@/auth'; // Server action likely needed, or client component for logout button
import LogoutButton from '@/components/LogoutButton'; // We'll create this

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">অ্যাডমিন প্যানেল</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium">
                ড্যাশবোর্ড
            </Link>
            <Link href="/admin/posts/new" className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium">
                নতুন পোস্ট
            </Link>
            <Link href="/" target="_blank" className="block px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium">
                 লাইভ সাইট দেখুন
            </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
            <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
