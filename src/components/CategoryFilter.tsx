'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (category: string | null) => {
    if (category) {
      router.push(`/?category=${category}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          !currentCategory
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${!currentCategory ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
        সব পোস্ট
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            currentCategory === category
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${currentCategory === category ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
          {category}
        </button>
      ))}
    </div>
  );
}
