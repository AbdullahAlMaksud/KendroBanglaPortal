import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { Star, Clock } from "lucide-react";

interface EditorsPicksProps {
  posts: Post[];
}

export default function EditorsPicks({ posts }: EditorsPicksProps) {
  const displayPosts = posts.slice(0, 4);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="size-5 text-primary fill-primary" />
        <h2 className="text-lg font-bold text-foreground">সম্পাদকের বাছাই</h2>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {displayPosts.map((post, index) => {
          const imageUrl = post.frontmatter.image;

          return (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group flex gap-4 p-3 rounded-xl hover:bg-background/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {post.frontmatter.category?.charAt(0) || "P"}
                    </span>
                  </div>
                )}
                {/* Number badge */}
                <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <span className="inline-block text-xs font-medium text-primary">
                  {post.frontmatter.category}
                </span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.frontmatter.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>{post.frontmatter.date}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
