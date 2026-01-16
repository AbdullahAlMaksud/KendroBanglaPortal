import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { Clock } from "lucide-react";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  const imageUrl = post.frontmatter.image;

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex gap-4 p-4 rounded-xl hover:bg-card/50 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-20 md:w-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">
                {post.frontmatter.category?.charAt(0) || "P"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
          {post.frontmatter.category}
        </span>

        <h3 className="text-sm md:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.frontmatter.title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2 hidden md:block">
          {post.frontmatter.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span>{post.frontmatter.date}</span>
        </div>
      </div>
    </Link>
  );
}
