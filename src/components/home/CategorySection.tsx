"use client";

import Link from "next/link";
import { Post } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";
import SmallPostCard from "./SmallPostCard";
import { useState } from "react";

interface CategorySectionProps {
  title: string;
  icon?: React.ReactNode;
  posts: Post[];
  categories: string[];
}

export default function CategorySection({
  title,
  icon,
  posts,
  categories,
}: CategorySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.frontmatter.category === activeCategory)
    : posts;

  const displayPosts = filteredPosts.slice(0, 3);

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

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          সব
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <SmallPostCard key={post.slug} post={post} />
        ))}
      </div>

      {displayPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          এই ক্যাটাগরিতে কোন পোস্ট নেই
        </div>
      )}
    </section>
  );
}
