'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SimpleMDE from '@/components/SimpleMDE';
import Link from 'next/link';

const formSchema = z.object({
  title: z.string().min(1, 'শিরোনাম দিতে হবে।').max(100),
  slug: z.string().min(1, 'স্লাগ দিতে হবে।'),
  content: z.string().min(1, 'কন্টেন্ট দিতে হবে।'),
  description: z.string().min(1, 'বিবরণ দিতে হবে।'),
  category: z.string().min(1, 'ক্যাটাগরি দিতে হবে।'),
  author: z.string().min(1, 'লেখকের নাম দিতে হবে।'),
});

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      description: '',
      category: 'Technology',
      author: 'Admin',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      // API call placeholder - we will implement the API next
      console.log('Submitting:', values);
      
      const res = await fetch('/api/posts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
      });

      if (!res.ok) {
          throw new Error('Failed to create post');
      }

      router.push('/admin');
      router.refresh();
    } catch (e) {
      setError('পোস্ট তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">নতুন পোস্ট লিখুন</h1>
        <Link href="/admin" className="text-gray-600 hover:text-blue-600">
             &larr; ফিরে যান
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম</label>
                    <input
                        {...form.register('title')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="পোস্টের শিরোনাম..."
                    />
                    {form.formState.errors.title && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">স্লাগ (URL)</label>
                    <input
                        {...form.register('slug')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="my-post-url"
                    />
                    {form.formState.errors.slug && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি</label>
                    <select
                        {...form.register('category')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="News">News</option>
                        <option value="Travel">Travel</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">লেখক</label>
                    <input
                        {...form.register('author')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ছোট বিবরণ (Excerpt)</label>
                <textarea
                    {...form.register('description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="পোস্টের সারসংক্ষেপ..."
                />
                 {form.formState.errors.description && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                 )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মূল কন্টেন্ট</label>
                <div className="prose-editor">
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                        <SimpleMDE
                            {...field}
                            placeholder="এখানে লিখুন..."
                        />
                        )}
                    />
                </div>
                {form.formState.errors.content && (
                    <p className="text-red-500 text-xs mt-1">{form.formState.errors.content.message}</p>
                )}
            </div>

            {error && (
                <div className="p-3 rounded bg-red-50 text-red-600 text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'সেভ হচ্ছে...' : 'প্রকাশ করুন'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
