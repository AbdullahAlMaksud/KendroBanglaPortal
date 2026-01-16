import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { Clock } from "lucide-react";

interface SmallPostCardProps {
  post: Post;
}

export default function SmallPostCard({ post }: SmallPostCardProps) {
  const imageUrl = post.frontmatter.image;

  return (
    <Link href={`/${post.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
        {/* Image */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.frontmatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {post.frontmatter.category?.charAt(0) || "P"}
                </span>
              </div>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {post.frontmatter.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              {post.frontmatter.date}
            </span>
          </div>

          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.frontmatter.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.frontmatter.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
