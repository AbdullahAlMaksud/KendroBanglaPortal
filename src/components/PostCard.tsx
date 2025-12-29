import Link from 'next/link';
import { Post } from '@/lib/mdx';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
            {post.frontmatter.category}
          </span>
          <span className="text-sm text-muted-foreground font-medium">{post.frontmatter.date}</span>
        </div>
        
        <Link href={`/${post.slug}`}>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.frontmatter.title}
          </h2>
        </Link>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {post.frontmatter.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {post.frontmatter.author?.charAt(0) || 'A'}
            </span>
            {post.frontmatter.author}
          </span>
          <Link 
            href={`/${post.slug}`}
            className="group/btn flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-all duration-300"
          >
            আরও পড়ুন 
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
