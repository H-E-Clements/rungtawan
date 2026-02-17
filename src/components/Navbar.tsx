"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/logo.webp";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="text-sm text-white w-full">
            {/* Top banner */}
            <div className="text-center font-medium py-2 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700">
                <p>
                    Exclusive Price Drop! Hurry,{" "}
                    <a href="#services" className="underline underline-offset-2">Offer Ends Soon!</a>
                </p>
            </div>

            {/* Navbar */}
            <nav className="relative h-25 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
                {/* Logo */}
                <Link href="/">
                    <Image src={logo} alt="Logo" width={100} height={40} />
                </Link>

                {/* Desktop menu */}
                <ul className="hidden md:flex items-center space-x-24 md:pl-28 text-lg">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <a href="#services">Services</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#footer">Contact</a>
                    </li>
                </ul>

                {/* Desktop button */}
                <a
                    href={"#booking"}
                    className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all">
                    Book Now
                </a>

                {/* Mobile menu button */}
                <button
                    aria-label="menu-btn"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="menu-btn inline-block md:hidden active:scale-90 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                    >
                        <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
                    </svg>
                </button>

                {/* Mobile menu */}
{menuOpen && (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg p-6 md:hidden z-50">
        <ul className="flex flex-col space-y-4"> {/* Removed conflicting text-lg text-sm */}
            <li className="text-gray-900 text-lg">
                <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="text-gray-900 text-lg">
                <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            <li className="text-gray-900 text-lg">
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </li>
            <li className="text-gray-900 text-lg">
                <a href="#footer" onClick={() => setMenuOpen(false)}>Contact</a>
            </li>
        </ul>

        <a  href={"#booking"}
            type="button"
            className="bg-emerald-800 text-white mt-6 px-8 h-11 rounded-full active:scale-95 transition-all w-full"
        >
            Book Now
        </a>
    </div>
)}

            </nav>
            <div className="bg-white border-b border-gray-200 text-gray-600 py-3 px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[12px] md:text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Phone:</span>
                        <a href="tel:+447368961295" className="hover:text-violet-600 transition">+44 7368 961295</a>
                    </div>
                    <div className="flex items-center gap-2 text-center md:text-right">
                        <span className="font-semibold text-gray-900">Address:</span>
                        <span>62A Oldham Street, 1st Floor, Manchester, M4 1LE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
