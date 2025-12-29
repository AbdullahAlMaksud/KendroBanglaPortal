"use client";

import { useSettings } from "@/lib/SettingsContext";
import { useTheme } from "next-themes";
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Type, Minus, Plus,
  Moon, Sun, Laptop, Palette, LayoutTemplate, Settings
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SettingsSheet({ trigger }: { trigger?: React.ReactNode }) {
  const {
    fontSize, fontFamily, textAlign, colorTheme,
    setFontSize, setFontFamily, setTextAlign, setColorTheme
  } = useSettings();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="size-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <Settings className="size-6 text-primary" />
            সেটিংস
          </SheetTitle>
          <SheetDescription>
            আপনার পছন্দ অনুযায়ী ওয়েবসাইট কাস্টমাইজ করুন
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 pb-6">
          {/* Theme Mode Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Sun className="size-4" />
              থিম মোড
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'light', icon: Sun, label: 'লাইট' },
                { value: 'dark', icon: Moon, label: 'ডার্ক' },
                { value: 'system', icon: Laptop, label: 'অটো' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                    theme === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <Icon className="size-5 mb-1" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Palette className="size-4" />
              কালার থিম
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'default', label: 'ডিফল্ট', color: 'bg-rose-500' },
                { value: 'nature', label: 'প্রকৃতি', color: 'bg-green-600' },
                { value: 'ocean', label: 'সমুদ্র', color: 'bg-sky-500' },
              ].map(({ value, label, color }) => (
                <button
                  key={value}
                  onClick={() => setColorTheme(value as any)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    colorTheme === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className={`size-4 rounded-full ${color}`} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Type className="size-4" />
              লেখার আকার
            </h3>
            <div className="flex items-center justify-between bg-muted/50 p-2 rounded-lg border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize(fontSize - 1)}
                disabled={fontSize <= 12}
                className="h-8 w-8"
              >
                <Minus className="size-4" />
              </Button>
              
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{fontSize}px</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFontSize(fontSize + 1)}
                disabled={fontSize >= 32}
                className="h-8 w-8"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Font Family Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              🔤 ফন্ট নির্বাচন
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFontFamily('anek-bangla')}
                className={`p-3 rounded-lg border transition-all text-left ${
                  fontFamily === 'anek-bangla'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <span className="block text-sm font-medium" style={{ fontFamily: 'var(--font-anek-bangla), Anek Bangla' }}>
                  Anek Bangla
                </span>
                <span className="text-[10px] opacity-70">
                  আধুনিক
                </span>
              </button>

              <button
                onClick={() => setFontFamily('tiro-bangla')}
                className={`p-3 rounded-lg border transition-all text-left ${
                  fontFamily === 'tiro-bangla'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <span className="block text-sm font-medium" style={{ fontFamily: 'var(--font-tiro-bangla), Tiro Bangla' }}>
                  Tiro Bangla
                </span>
                <span className="text-[10px] opacity-70">
                  ঐতিহ্যবাহী
                </span>
              </button>
            </div>
          </div>

          {/* Text Alignment Control */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <LayoutTemplate className="size-4" />
              লেখার সারিবদ্ধতা
            </h3>
            <div className="flex justify-between gap-1 bg-muted/50 p-1 rounded-lg border">
              {[
                { value: 'left', icon: AlignLeft, label: 'বাম' },
                { value: 'center', icon: AlignCenter, label: 'মাঝে' },
                { value: 'right', icon: AlignRight, label: 'ডান' },
                { value: 'justify', icon: AlignJustify, label: 'সমান' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setTextAlign(value as 'left' | 'center' | 'right' | 'justify')}
                  className={`flex-1 flex items-center justify-center p-2 rounded-md transition-all ${
                    textAlign === value
                      ? 'bg-background shadow-sm text-primary'
                      : 'hover:bg-background/50 text-muted-foreground'
                  }`}
                  title={label}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              👁️ প্রিভিউ
            </h3>
            <div 
              className="p-4 rounded-lg bg-background border border-border content-area text-base"
              style={{
                fontSize: `${fontSize}px`,
                textAlign: textAlign,
                fontFamily: fontFamily === 'tiro-bangla' 
                  ? 'var(--font-tiro-bangla), Tiro Bangla, serif' 
                  : 'var(--font-anek-bangla), Anek Bangla, sans-serif'
              }}
            >
              <p>
                এটি একটি প্রিভিউ টেক্সট। আপনার সেটিংস এখানে প্রদর্শিত হবে। 
                বাংলাদেশ একটি সুন্দর দেশ।
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
