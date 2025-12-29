// This is a server component, so we can fetch directly from API or DB
import Link from 'next/link';
import dbConnect from '@/lib/db';
import { Post } from '@/models/Schema';
import { formatDate } from '@/lib/utils'; // We'll create this helper

export const dynamic = 'force-dynamic';

async function getPosts() {
    const conn = await dbConnect();
    if (!conn) {
        return [];
    }
    try {
        const posts = await Post.find({}).sort({ date: -1 }).lean(); 
        // Convert _id and date to string to avoid serialization issues
        return posts.map((post: any) => ({
            ...post,
            _id: post._id.toString(),
            date: post.date.toISOString(),
            id: post._id.toString() // Alias for convenience
        }));
    } catch(e) {
        return [];
    }
}

export default async function AdminDashboard() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">সব পোস্ট ({posts.length})</h1>
        <Link href="/admin/posts/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + নতুন পোস্ট লিখুন
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিরোনাম</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ক্যাটাগরি</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('bn-BD')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">এডিট</Link>
                  <button className="text-red-600 hover:text-red-900">ডিলিট</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        এখনও কোনো পোস্ট নেই। নতুন পোস্ট তৈরি করুন।
                    </td>
                 </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
