import Link from "next/link";
import { Post } from "@/lib/mdx";
import { ArrowRight, Megaphone } from "lucide-react";
import PostListItem from "./PostListItem";

interface ListWithBannerProps {
  title: string;
  icon?: React.ReactNode;
  posts: Post[];
}

export default function ListWithBanner({
  title,
  icon,
  posts,
}: ListWithBannerProps) {
  const displayPosts = posts.slice(0, 4);

  return (
    <section className="container px-4 md:px-6 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {title}
            </h2>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
        >
          সব দেখুন
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* Posts List */}
        <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 divide-y divide-border/30">
          {displayPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-primary/20 p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Megaphone className="size-8 text-primary" />
          </div>

          <h3 className="text-xl font-bold text-foreground">বিজ্ঞাপন</h3>

          <p className="text-sm text-muted-foreground">
            আপনার বিজ্ঞাপন এখানে দিতে যোগাযোগ করুন
          </p>

          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            যোগাযোগ করুন
          </Link>
        </div>
      </div>
    </section>
  );
}
