'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors"
    >
      লগআউট
    </button>
  );
}
