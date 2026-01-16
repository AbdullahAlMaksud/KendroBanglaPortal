import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import SmallPostCard from "./SmallPostCard";

interface FeaturedGridSectionProps {
  title: string;
  icon?: React.ReactNode;
  featuredPost: Post;
  sidePosts: Post[];
}

export default function FeaturedGridSection({
  title,
  icon,
  featuredPost,
  sidePosts,
}: FeaturedGridSectionProps) {
  const imageUrl = featuredPost.frontmatter.image;

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

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* Large Featured Post */}
        <Link href={`/${featuredPost.slug}`} className="group block">
          <div className="relative h-full overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
            {/* Image */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20 overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={featuredPost.frontmatter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="size-10 text-primary/50" />
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-bold rounded">
                  {featuredPost.frontmatter.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {featuredPost.frontmatter.title}
              </h3>

              <p className="text-muted-foreground line-clamp-2">
                {featuredPost.frontmatter.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" />
                <span>{featuredPost.frontmatter.date}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Side Posts */}
        <div className="flex flex-col gap-6">
          {sidePosts.slice(0, 2).map((post) => (
            <SmallPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
