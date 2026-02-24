"use client"

import Image from 'next/image';
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, {useState} from "react";

function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  return (
    <footer
        id={"footer"}
        className="tracking-wide bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-800 px-8 sm:px-12 pt-16 pb-8">
      {/* 4-Column Grid for Desktop (min-width: 1024px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
        
        {/* Column 1: Logo & Socials */}
        <div className="flex flex-col items-center">
          <Link href="/" className="relative block h-40 w-40">
            <Image
              src="/photos/logo.webp"
              alt="Rungtawan Authentic Thai Spa"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </Link>
          <h1 className="text-slate-200 text-sm mt-4 leading-relaxed">
            Rungtawan Authentic Thai Therapy
          </h1>
          <ul className="mt-6 flex space-x-4">
            {/* Facebook */}
            <li>
              <a href="https://www.facebook.com/rungtawanauthenticthaitherapy/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-500 w-7 h-7" viewBox="0 0 49.652 49.652">
                  <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" />
                </svg>
              </a>
            </li>
            {/* WhatsApp */}
            <li>
              <a href="https://wa.me/447368961295" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-green-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.061-4.512 10.063-10.062a10.017 10.017 0 00-2.947-7.132 10.016 10.016 0 00-7.115-2.938c-5.549 0-10.062 4.513-10.064 10.063-.001 2.332.604 4.26 1.74 5.966l-.987 3.604 3.709-.973zm10.538-6.142c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.672-1.622-.921-2.227-.242-.593-.487-.513-.67-.523-.173-.011-.371-.013-.57-.013-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>
            </li>
            {/* Email Icon */}
            <li>
              <a href="mailto:rungtawanthaimassage57@gmail.com" className="hover:opacity-80 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-slate-200" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099l3.83-3.104 5.612 8.188h-18.738l5.472-8.183zm9.201-1.259l4.623-3.746v9.458l-4.623-5.712z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Pages */}
        <div>
          <h4 className="text-white font-semibold text-lg border-b border-emerald-700/50 pb-2">Pages</h4>
          <ul className="mt-6 space-y-4">
            <li><a href="#" className="hover:text-white text-slate-200 text-sm transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-white text-slate-200 text-sm transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-white text-slate-200 text-sm transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-white text-slate-200 text-sm transition-colors">Contact</a></li>
            <li><a href="#booking" className="hover:text-white text-slate-200 text-sm transition-colors font-semibold">Book Now</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Location */}
        <div className="space-y-8">
          <div>
            <h4 className="text-white font-semibold text-lg border-b border-emerald-700/50 pb-2">Contact</h4>
            <div className="mt-4 space-y-2">
              <p className="text-slate-200 text-sm">Phone: <a href="tel:+447368961295" className="hover:underline">+44 7368 961295</a></p>
              <p className="text-slate-200 text-sm">Email: <a href="mailto:info@example.com" className="hover:underline">rungtawanthaimassage57@gmail.com</a></p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg border-b border-emerald-700/50 pb-2">Location</h4>
            <p className="mt-4 text-slate-200 text-sm leading-relaxed">
              62A Oldham Street, 1st Floor,<br /> Manchester, M4 1LE
            </p>
            <p className="mt-4 text-slate-200 text-xs italic">
              Mon-Sat: 10:00 - 20:00<br /> Sunday: Closed
            </p>
          </div>
        </div>

        {/* Column 4: Map */}
        <div>
          <div className="w-full h-68 rounded-lg overflow-hidden shadow-2xl border border-emerald-700/50">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.152425610061!2d-2.2365052230676277!3d53.48360627232941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1d4c1b4809b%3A0x2c4fe330e4ff9a8b!2sRungtawan%20Authentic%20Thai%20Therapy!5e0!3m2!1sen!2suk!4v1770550875563!5m2!1sen!2suk"
			  width="100%"
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-8 border-emerald-700/50" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <ul className="flex space-x-6">
          <li><button  onClick={() => setIsPrivacyOpen(true)} className="hover:text-white text-slate-400 text-xs">Privacy Policy</button></li>
          <li><button onClick={() => setIsTermsOpen(true)} className="hover:text-white text-slate-400 text-xs">Terms</button></li>
        </ul>
		<div className="flex items-center gap-2 text-slate-400 text-md">
  <span>Powered by</span>

  <a
    href="https://yorkshirewebsites.co.uk"
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-54 h-6 opacity-80 hover:opacity-100 transition-opacity"
  >
    <Image
      src="/photos/yw-logo.svg"
      alt="Yorkshire Websites"
      fill
      className="object-contain"
      sizes="96px"
    />
  </a>
</div>
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} Rungtawan Authentic Thai Therapy. All rights reserved.
        </p>
      </div>
      {/* DIALOGS */}
      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>How we handle your data at Rungtawan Thai Massage</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed pr-2">
            <section>
              <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">1. The Data We Collect</h4>
              <p>We collect Identity Data (Name), Contact Data (Phone, Email), and Health Data (Medical history). Health data is classified as "Special Category Data" under UK GDPR.</p>
            </section>
            <section>
              <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">2. Why We Need Your Data</h4>
              <p>To manage your bookings and ensure your safety during treatments. We maintain records for 7 years as required by UK law and professional insurance providers.</p>
            </section>
            <section>
              <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">3. Sharing Your Information</h4>
              <p>We do not sell or trade your data. Information is only shared with insurance providers or legal authorities if strictly required by law.</p>
            </section>
            <section>
              <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">4. Your Rights</h4>
              <p>You have the right to access, correct, or request erasure of your data. Contact us at rungtawanthaimassage57@gmail.com for any data inquiries.</p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- TERMS & CONDITIONS DIALOG --- */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms & Conditions</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <p className="font-semibold text-gray-900 mb-2">Last Updated: February 2026</p>
              <p>
                By booking a treatment with <strong>Rungtawan Thai Massage</strong>, you agree to be bound by the following terms and conditions.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">1. Bookings & Cancellations</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li><strong>24-Hour Policy:</strong> We require at least 24 hours' notice for cancellations or rescheduling.</li>
                <li><strong>Late Cancellations:</strong> Cancellations made with less than 24 hours' notice may incur a charge of 50% of the treatment fee.</li>
                <li><strong>No-Shows:</strong> Failure to attend without notice will be charged at 100% of the service price.</li>
                <li><strong>Late Arrival:</strong> Your session may be shortened to avoid delaying the next client, but the full fee will apply.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">2. Health & Safety</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li><strong>Medical Disclosure:</strong> You must inform your therapist of any medical conditions, allergies, or injuries before treatment.</li>
                <li><strong>Right to Refuse:</strong> We reserve the right to refuse treatment if we believe it is medically unsafe for the client.</li>
                <li><strong>Pregnancy:</strong> Please notify us upon booking if you are pregnant, as specific protocols apply.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">3. Professional Conduct</h3>
              <p className="mb-2">
                We maintain a strictly professional environment.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-3 italic text-red-700">
                Any illicit remarks, advances, or inappropriate behavior will result in the immediate termination of the session and a permanent ban without a refund.
              </div>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">4. Privacy (GDPR)</h3>
              <p>
                Your personal and health data is stored securely in accordance with UK Data Protection laws. We only use this information to ensure your treatment is safe and effective.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 uppercase tracking-wide text-xs mb-2">5. Liability</h3>
              <p>
                Rungtawan Thai Massage is not responsible for the loss or damage of personal belongings brought onto the premises. Please keep valuables with you or at home.
              </p>
            </section>

            <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
              Governed by the laws of England and Wales.
              rungtawanthaimassage.co.uk
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
