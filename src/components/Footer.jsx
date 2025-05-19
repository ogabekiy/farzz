"use client"
import { Mail, Phone, Instagram, Youtube, MessageCircle, Send, Globe, Home, Info, Building2, Facebook, SendIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CallbackModal from './CallBackModel';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const router = useRouter();

  const t = useTranslations("Footer")

  const [modalOpen, setModalOpen] = useState(false);

  const changeLocale = (locale) => {
    router.push(`/${locale}`);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={'/logopng.png'} width={80} height={80} alt='logo' />
              <span className="text-2xl font-bold">Farzz Group</span>
            </Link>
            <p className="text-gray-400 text-sm">
              {t("text")}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition">
                  <Building2 className="h-4 w-4" />
                  <span>Apartments</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition">
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <a href="mailto:farzzgroup@gmail.com">farzzgroup@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <a href="tel:+905072547878">+90 (507)-254-78-78</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MessageCircle className="h-4 w-4" />
                <a href="https://wa.me/+905072547878">WhatsApp</a>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Send className="h-4 w-4" />
                <a href="https://t.me/+905072547878">Telegram</a>
              </li>
              <li>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" 
                  onClick={() => setModalOpen(true)}
                >
                  Request a Callback
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media and Language Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect & Language</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/farzzgroup" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@FARZZGROUP" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/people/FARZZ-GROUP/61575679045530/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://t.me/+YmGH2mUJ3r45YjAy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                <SendIcon className="h-6 w-6" />
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-300" />
              <select
                className="bg-gray-800 text-white border border-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => changeLocale(e.target.value)}
                defaultValue="uz"
              >
                <option value="uz">Oʻzbek</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © "Farzz Group" All rights reserved, 2025
        </div>
      </div>
      <CallbackModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
};

export default Footer;