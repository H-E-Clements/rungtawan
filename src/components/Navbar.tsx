"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/app/logo.webp";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="text-sm text-white w-full">
            {/* Top banner */}
            <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
                <p>
                    Exclusive Price Drop! Hurry,{" "}
                    <span className="underline underline-offset-2">Offer Ends Soon!</span>
                </p>
            </div>

            {/* Navbar */}
            <nav className="relative h-25 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow">
                {/* Logo */}
                <Image src={logo} alt="Logo" width={100} height={40} />

                {/* Desktop menu */}
                <ul className="hidden md:flex items-center space-x-24 md:pl-28 text-lg">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

                {/* Desktop button */}
                <button className="md:inline hidden bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all">
                    Get started
                </button>

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
                    <div className="absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden">
                        <ul className="flex flex-col space-y-4 text-lg">
                            <li>
                                <a href="#" className="text-sm">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm">
                                    Pricing
                                </a>
                            </li>
                        </ul>

                        <button
                            type="button"
                            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
                        >
                            Get started
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
}
