"use client";
import { Phone, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import CallbackModal from "./CallBackModel";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const t = useTranslations("HomePage");
  const router = useRouter();

  const changeLocale = (locale) => {
    router.push(`/${locale}`);
  };

  useEffect(() => {
    // Remove this line as it can cause issues
    // document.body.removeAttribute("cz-shortcut-listen"); 

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`${
        isScrolled ? "fixed top-0 left-0 right-0 z-50 bg-[#0e1e3a] shadow-md" : "bg-[#0e1e3a]"
      } text-white transition-all duration-300 w-full`}
    >
      {!isScrolled && (
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-sm border-b border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-2 sm:mb-0">
            <Link href="#" className="flex items-center gap-1 hover:text-[#1e7bff]">
              <Phone className="h-4 w-4" />
              <span>+90 (507)-254-78-78</span>
            </Link>
            <Link href="#" className="flex items-center gap-1 hover:text-[#1e7bff]">
              <Mail className="h-4 w-4" />
              <span>farzzgroup@gmail.com</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeLocale("ru")}
                className="flex items-center gap-1 hover:text-[#1e7bff] text-sm"
              >
                <span>RU</span>
              </button>
              <button
                onClick={() => changeLocale("uz")}
                className="flex items-center gap-1 hover:text-[#1e7bff] text-sm"
              >
                <span>UZ</span>
              </button>
            </div>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-[#1e7bff] text-white px-4 py-1.5 rounded-md hover:bg-[#1a6de0] text-sm"
            >
              Call back
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logopng.png"
            alt="Logo"
            width={40}
            height={40}
            className="sm:w-14 sm:h-14 object-fill"
          />
          
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg uppercase">FARZZ GROUP</span>
            <span className="text-xs">Real Estate in Turkey</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("company")}
              className="hover:text-[#1e7bff] text-sm"
            >
              {t("about")}
            </button>
            {activeDropdown === "company" && (
              <div className="absolute top-full left-0 bg-[#0e1e3a] shadow-md rounded-md py-2 min-w-[150px] z-50">
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Our Story
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Team
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("services")}
              className="hover:text-[#1e7bff] text-sm"
            >
              Services
            </button>
            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 bg-[#0e1e3a] shadow-md rounded-md py-2 min-w-[150px] z-50">
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Consulting
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Property Management
                </Link>
              </div>
            )}
          </div>

          <Link href="#" className="hover:text-[#1e7bff] text-sm">
            {t("home")}
          </Link>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("catalog")}
              className="flex items-center bg-blue-900 rounded-3xl p-2 gap-1 hover:text-[#1e7bff] text-sm"
            >
              <span>{t("all_apartments")}</span>
            </button>
            {activeDropdown === "catalog" && (
              <div className="absolute top-full left-0 bg-[#0e1e3a] shadow-md rounded-md py-2 min-w-[150px] z-50">
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Apartments
                </Link>
                <Link href="#" className="block px-4 py-2 hover:bg-[#1e7bff] hover:text-white text-sm">
                  Villas
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#0e1e3a] px-4 py-4 border-t border-gray-700">
          <div className="flex flex-col gap-4">
            <div>
              <button
                onClick={() => handleDropdownToggle("company")}
                className="w-full text-left hover:text-[#1e7bff] text-sm"
              >
               {t("about")}
              </button>
              {activeDropdown === "company" && (
                <div className="pl-4 py-2">
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Our Story
                  </Link>
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Team
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => handleDropdownToggle("services")}
                className="w-full text-left hover:text-[#1e7bff] text-sm"
              >
                Services
              </button>
              {activeDropdown === "services" && (
                <div className="pl-4 py-2">
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Consulting
                  </Link>
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Property Management
                  </Link>
                </div>
              )}
            </div>

            <Link href="#" className="hover:text-[#1e7bff] text-sm">
              {t("home")}
            </Link>

            <div>
              <button
                onClick={() => handleDropdownToggle("catalog")}
                className="w-full text-left hover:text-[#1e7bff] text-sm"
              >
                {t("all_apartments")}
              </button>
              {activeDropdown === "catalog" && (
                <div className="pl-4 py-2">
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Apartments
                  </Link>
                  <Link href="#" className="block py-1 hover:text-[#1e7bff] text-sm">
                    Villas
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      
      <CallbackModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}