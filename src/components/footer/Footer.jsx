import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Youtube, Mail, Heart } from "lucide-react";

import logo from "../../../public/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/50 mt-auto">
      {/* Main Footer */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                width={140}
                height={70}
                alt="কেন্দ্রবাংলা Logo"
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              শিক্ষা, বিজ্ঞান, প্রযুক্তিসহ বিভিন্ন বিষয় নিয়ে সঠিক তথ্য সমৃদ্ধ 
              সহজবোধ্য ফিচার পড়ুন কেন্দ্রবাংলায়।
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Youtube"
              >
                <Youtube className="size-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  হোম
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  ড্যাশবোর্ড
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  অ্যাডমিন
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">ক্যাটাগরি</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?category=Technology" className="text-muted-foreground hover:text-primary transition-colors">
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link href="/?category=Lifestyle" className="text-muted-foreground hover:text-primary transition-colors">
                  জীবনধারা
                </Link>
              </li>
              <li>
                <Link href="/?category=News" className="text-muted-foreground hover:text-primary transition-colors">
                  সংবাদ
                </Link>
              </li>
              <li>
                <Link href="/?category=Travel" className="text-muted-foreground hover:text-primary transition-colors">
                  ভ্রমণ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-border/50">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              © {currentYear} কেন্দ্রবাংলা। সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="flex items-center gap-1">
              তৈরি করা হয়েছে <Heart className="size-4 text-red-500 fill-red-500" /> দিয়ে বাংলাদেশ থেকে
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
