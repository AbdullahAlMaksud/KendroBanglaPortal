import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.frontmatter.category)));
  
  // Featured post is the latest one
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Compact */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Sparkles className="size-4" />
              বাংলায় জ্ঞানের নতুন দিগন্ত
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                কেন্দ্রবাংলা
              </span>
              <br />
              <span className="text-foreground/90 text-3xl md:text-4xl lg:text-5xl font-bold">
                পোর্টাল
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-900">
              প্রযুক্তি, জীবনধারা, শিক্ষা এবং আরও অনেক কিছুর জন্য আপনার বিশ্বস্ত বাংলা উৎস
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="container px-4 md:px-6 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="size-5 text-primary" />
            <h2 className="text-xl font-bold">ফিচার্ড পোস্ট</h2>
          </div>
          
          <Link href={`/${featuredPost.slug}`} className="block group">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 border border-white/10 dark:border-gray-800/50 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      {featuredPost.frontmatter.category}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="size-4" />
                      {featuredPost.frontmatter.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {featuredPost.frontmatter.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg line-clamp-3">
                    {featuredPost.frontmatter.description}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                        {featuredPost.frontmatter.author?.charAt(0) || 'A'}
                      </div>
                      <span className="font-medium">{featuredPost.frontmatter.author}</span>
                    </div>
                    
                    <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      পড়ুন <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
                
                {/* Placeholder illustration */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                    <Sparkles className="size-16 text-primary/50" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Main Content */}
      <section className="container px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              {/* Categories */}
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
                  ক্যাটাগরি
                </h3>
                <CategoryFilter categories={categories} />
              </div>
              
              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20 p-6 space-y-4">
                <h3 className="text-lg font-bold">নিউজলেটার সাবস্ক্রাইব</h3>
                <p className="text-sm text-muted-foreground">
                  নতুন পোস্ট ও আপডেট সরাসরি আপনার ইনবক্সে পান
                </p>
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="আপনার ইমেইল" 
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    সাবস্ক্রাইব
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Posts Grid */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="size-5 text-primary" />
                সর্বশেষ লেখা
              </h2>
              <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
                {posts.length} টি পোস্ট
              </span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            
            {remainingPosts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                আরও পোস্ট শীঘ্রই আসছে...
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
