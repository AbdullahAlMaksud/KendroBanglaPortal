"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { SheetSide } from "./MenuSidebar";
import ProfileDropDown from "./ProfileDropDown";
import { Settings } from "lucide-react";
import { SettingsSheet } from "../settings/SettingsSheet";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "top-4 left-0 right-0 px-4" 
          : "top-0 px-0"
      }`}
    >
      <div 
        className={`w-full flex justify-between items-center h-16 px-4 md:px-6 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-md shadow-lg rounded-full border border-white/20 text-foreground"
            : "bg-transparent text-white"
        }`}
      >
        {/* Profile */}
        <div className="lg:hidden">
          <ProfileDropDown />
        </div>
        {/* Logo */}
        <Link href="/" className="">
          <Image
            src={logo}
            alt="KendroBangla Logo"
            width={100}
            height={50}
            className={`object-cover transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
          />
        </Link>
        {/* Large Display */}
        <div className={`hidden lg:flex items-center text-sm gap-2 ${scrolled ? 'text-foreground' : 'text-white'}`}>
          <Link
            className={`hover:text-primary transition-colors px-3 py-1 font-medium`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`hover:text-primary transition-colors px-3 py-1 font-medium`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          
          <SettingsSheet 
            trigger={
              <button
                className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
                  scrolled 
                    ? "hover:bg-primary/10 text-foreground" 
                    : "hover:bg-white/20 text-white"
                }`}
                title="সেটিংস"
              >
                <Settings className="size-5" />
              </button>
            }
          />
        </div>
        {/* Sidebar */}
        <div className="lg:hidden flex items-center gap-2">
          <SettingsSheet 
            trigger={
              <button
                className={`flex items-center p-2 rounded-full transition-colors ${
                  scrolled 
                    ? "hover:bg-primary/10 text-foreground" 
                    : "hover:bg-white/20 text-white"
                }`}
                title="সেটিংস"
              >
                <Settings className="size-5" />
              </button>
            }
          />
          <SheetSide />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
