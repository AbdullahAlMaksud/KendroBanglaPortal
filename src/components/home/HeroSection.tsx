import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";
import { Clock, Sparkles } from "lucide-react";
import EditorsPicks from "./EditorsPicks";

interface HeroSectionProps {
  featuredPost: Post;
  editorsPicks: Post[];
}

export default function HeroSection({
  featuredPost,
  editorsPicks,
}: HeroSectionProps) {
  const imageUrl = featuredPost.frontmatter.image;

  return (
    <section className="container px-4 md:px-6 py-8">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* Main Featured Post */}
        <Link href={`/${featuredPost.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            {/* Image */}
            <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20 overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={featuredPost.frontmatter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="size-12 text-primary/50" />
                  </div>
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* NEW Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                  নতুন
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {featuredPost.frontmatter.title}
              </h2>

              <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                {featuredPost.frontmatter.description}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {featuredPost.frontmatter.author?.charAt(0) || "A"}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {featuredPost.frontmatter.author}
                  </span>
                </div>

                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="size-4" />
                  {featuredPost.frontmatter.date}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Editor's Picks Sidebar */}
        <EditorsPicks posts={editorsPicks} />
      </div>
    </section>
  );
}
