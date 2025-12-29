import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar/Navbar';
import dbConnect from '@/lib/db';
import { Post } from '@/models/Schema';
import { getPostBySlug as getMdxPostBySlug, getPostSlugs } from '@/lib/mdx';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export async function generateStaticParams() {
    const conn = await dbConnect();
    if (!conn) {
         return getPostSlugs().map((slug) => ({
            slug: slug.replace(/\.mdx$/, ''),
        }));
    }
    
    try {
        const posts = await Post.find({}, 'slug').lean();
        return posts.map((post: any) => ({
            slug: post.slug,
        }));
    } catch (e) {
         return getPostSlugs().map((slug) => ({
            slug: slug.replace(/\.mdx$/, ''),
        }));
    }
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const conn = await dbConnect();
  
  let post: any = null;
  let content: any = null;

  if (conn) {
      try {
        const dbPost = await Post.findOne({ slug: params.slug }).lean() as any;
        if (dbPost) {
             const result = await compileMDX({ source: dbPost.content, options: { parseFrontmatter: false } });
             const dateStr = dbPost.date ? new Date(dbPost.date).toLocaleDateString('bn-BD') : '';
             post = { 
                 ...dbPost, 
                 date: dateStr,
                 frontmatter: { ...dbPost, date: dateStr }
             };
             content = result.content;
        }
      } catch (e) {
          console.warn("DB Fetch Error in Single Post, attempting fallback", e);
      }
  }

  if (!post) {
      try {
          const mdxPost = getMdxPostBySlug(params.slug);
          const result = await compileMDX({ source: mdxPost.content, options: { parseFrontmatter: false } });
          
          let dateStr = '';
          if (mdxPost.frontmatter.date) {
              const d = new Date(mdxPost.frontmatter.date);
              if (!isNaN(d.getTime())) {
                  dateStr = d.toLocaleDateString('bn-BD');
              } else {
                  dateStr = String(mdxPost.frontmatter.date);
              }
          }

          post = { 
              ...mdxPost, 
              title: mdxPost.frontmatter.title,
              author: mdxPost.frontmatter.author,
              category: mdxPost.frontmatter.category,
              date: dateStr
          };
          content = result.content;
      } catch (e) {
          console.error("Fallback Error", e);
          return notFound();
      }
  }

  if (!post) {
      notFound();
  }

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Header with Gradient */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            হোমে ফিরে যান
          </Link>
          
          <div className="max-w-4xl animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur text-primary px-4 py-2 rounded-full font-semibold text-sm border border-primary/20">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur px-4 py-2 rounded-full border border-border">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {post.author?.charAt(0) || 'A'}
              </div>
              <div>
                <span className="font-semibold text-foreground">{post.author}</span>
                <p className="text-sm text-muted-foreground">লেখক</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-16 relative z-10">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-black/5 p-6 sm:p-10 md:p-14 border border-white/20 dark:border-gray-700/50 animate-fade-in-up">
            <div className="prose prose-lg prose-pink max-w-none text-foreground 
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
              prose-code:bg-primary/10 prose-code:text-primary prose-code:px-2 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
              {content}
            </div>
          </div>

          {/* Share & Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-card rounded-2xl border border-border">
            <div className="text-center sm:text-left">
              <p className="text-muted-foreground text-sm mb-1">এই লেখাটি ভালো লাগলে শেয়ার করুন</p>
              <p className="font-semibold text-foreground">আপনার মতামত আমাদের কাছে মূল্যবান</p>
            </div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              আরও পোস্ট পড়ুন
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">কেন্দ্র বাংলা পোর্টাল</h3>
              <p className="text-muted-foreground text-sm">একটি পরিপূর্ণ বাংলা ওয়েব ম্যাগাজিন</p>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">হোম</Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">ড্যাশবোর্ড</Link>
              <Link href="/settings" className="text-muted-foreground hover:text-primary transition-colors">সেটিংস</Link>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} কেন্দ্র বাংলা পোর্টাল। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
