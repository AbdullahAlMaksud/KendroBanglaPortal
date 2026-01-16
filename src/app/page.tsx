import { getAllPosts } from "@/lib/mdx";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedGridSection from "@/components/home/FeaturedGridSection";
import ListWithBanner from "@/components/home/ListWithBanner";
import { Smartphone, Monitor, RefreshCw } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.map((post) => post.frontmatter.category))
  );

  // Featured post is the latest one
  const featuredPost = posts[0];
  const editorsPicks = posts.slice(1, 5);

  // Posts for different sections
  const mobilePosts = posts.slice(0, 6);
  const softwarePosts = posts.slice(0, 3);
  const updatePosts = posts.slice(0, 4);

  if (!featuredPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">কোন পোস্ট নেই...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section - Featured + Editor's Picks */}
      <HeroSection featuredPost={featuredPost} editorsPicks={editorsPicks} />

      {/* মোবাইল প্রযুক্তি Section */}
      <CategorySection
        title="মোবাইল প্রযুক্তি"
        icon={<Smartphone className="size-5 text-primary" />}
        posts={mobilePosts}
        categories={categories}
      />

      {/* পিসি সফটওয়্যার Section */}
      {softwarePosts.length >= 3 && (
        <FeaturedGridSection
          title="পিসি সফটওয়্যার"
          icon={<Monitor className="size-5 text-primary" />}
          featuredPost={softwarePosts[0]}
          sidePosts={softwarePosts.slice(1)}
        />
      )}

      {/* সফটওয়্যার ও আপডেট Section */}
      <ListWithBanner
        title="সফটওয়্যার ও আপডেট"
        icon={<RefreshCw className="size-5 text-primary" />}
        posts={updatePosts}
      />
    </div>
  );
}
