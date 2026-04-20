/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Heart, Clock, Send, ChevronDown } from 'lucide-react';
import couplePhoto from './MyImage-1776680179-00.jpg';

// --- Wedding Configuration ---
// PASTE YOUR IMAGE LINKS HERE
const WEDDING_IMAGES = {
  welcomeBackground: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/ec3fcf2a-b207-4dec-bd24-a19931ecf028.jpeg",
  bridePhoto: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/c37ab4cd-a5be-41eb-85bb-c982fbf8f5d2.png",
  groomPhoto: "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/7be12f09-b1fe-47a3-90fd-7fc5b35af693.png",
  memories: [
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/fae48d42-3cb8-4077-b64d-bb18660e63d7.jpeg",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/5685e671-cc6d-4666-99d9-ab2306f12354.jpeg",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/9928de3e-fa6c-4b35-a6ae-dcf8e8d883fc.png",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/b145b85c-4097-4712-80b5-22a188387e26.png",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/76d0b8e5-f6c5-4407-8e26-7c5f6880e196.jpeg",
    "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/86c9edbb-d883-44a8-97a0-3e94b9a7c97a.jpeg",
  ]
};

// --- Types ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Components ---

const Section = ({ 
  children, 
  bgImage, 
  className = "",
  overlayClassName = "bg-black/50",
  bgPosition = "bg-center",
  topContent
}: { 
  children: React.ReactNode; 
  bgImage: string; 
  className?: string;
  overlayClassName?: string;
  bgPosition?: string;
  topContent?: React.ReactNode;
}) => (
  <section 
    className={`relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden ${className}`}
  >
    <motion.div 
      initial={{ scale: 1 }}
      whileInView={{ scale: 1.05 }}
      transition={{ duration: 10, ease: "linear" }}
      className={`absolute inset-0 bg-cover ${bgPosition} z-0`}
      style={{ backgroundImage: `url(${bgImage})` }}
    />
    <div className={`absolute inset-0 z-0 ${overlayClassName}`} />
    
    {topContent && (
      <div className="absolute top-12 left-0 right-0 z-20 px-6">
        {topContent}
      </div>
    )}

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 w-full max-w-4xl"
    >
      {children}
    </motion.div>
  </section>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showFab, setShowFab] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const weddingDate = useMemo(() => new Date("May 14, 2026 12:00:00").getTime(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const gap = weddingDate - now;

      if (gap < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(gap / (1000 * 60 * 60 * 24)),
        hours: Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((gap % (1000 * 60)) / 1000),
      });
    }, 1000);

    const handleScroll = () => {
      setShowFab(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [weddingDate]);

  const openMap = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=RRR+Convention+Hall+Anantapur", "_blank");
  };

  const openValimaMap = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=N+S+Grand+Anantapur", "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wedding Invitation | Rizwana & Noor Mohammed',
          text: 'You are cordially invited to the wedding of Rizwana & Noor Mohammed.',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="relative selection:bg-wedding-gold selection:text-wedding-maroon">
      {/* Curtain Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex overflow-hidden touch-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            {/* Left Curtain */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "-100%", skewX: -5 }}
              transition={{ duration: 1.8, ease: [0.45, 0, 0.55, 1] }}
              className="w-1/2 h-full bg-gradient-to-r from-wedding-maroon via-[#5a0606] to-wedding-maroon flex items-center justify-end border-r border-wedding-gold/30 shadow-[20px_0_50px_rgba(0,0,0,0.7)] relative"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/padded-little.png')] shadow-inner" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "100%", skewX: 5 }}
              transition={{ duration: 1.8, ease: [0.45, 0, 0.55, 1] }}
              className="w-1/2 h-full bg-gradient-to-l from-wedding-maroon via-[#5a0606] to-wedding-maroon flex items-center justify-start border-l border-wedding-gold/30 shadow-[-20px_0_50px_rgba(0,0,0,0.7)] relative"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/padded-little.png')] shadow-inner" />
            </motion.div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 text-white p-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <Heart className="w-16 h-16 text-wedding-gold mx-auto mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                </motion.div>
                <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-wider leading-tight drop-shadow-lg">
                  Welcome to our <br /> <span className="text-wedding-gold">Ghar Ki Pehli Shaadi</span>
                </h1>
                <p className="text-wedding-cream/80 text-lg md:text-xl mb-12 font-light tracking-[0.2em] uppercase">Wedding Invitation</p>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="group relative px-12 py-5 bg-wedding-gold text-wedding-maroon font-bold rounded-full overflow-hidden transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] active:scale-95 uppercase tracking-widest text-sm min-h-[56px]"
                >
                  <span className="relative z-10">Open Invitation</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {isOpen && showFab && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-8 right-6 z-[90] flex flex-col gap-4"
          >
            <button 
              onClick={handleShare}
              className="w-14 h-14 bg-white text-wedding-maroon rounded-full shadow-2xl flex items-center justify-center border border-wedding-gold/20 active:scale-90 transition-transform"
            >
              <Send size={24} className="-rotate-45" />
            </button>
            <button 
              onClick={openMap}
              className="w-14 h-14 bg-wedding-gold text-wedding-maroon rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
            >
              <MapPin size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${!isOpen ? 'h-screen overflow-hidden' : 'scroll-smooth'}`}>
        
        {/* Welcome Section */}
        <Section 
          bgImage={WEDDING_IMAGES.welcomeBackground} 
          className="snap-start"
          overlayClassName="bg-black/30"
          bgPosition="bg-[center_top]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-4 pt-24 md:pt-36"
          >
            <h2 className="text-wedding-gold font-serif italic text-2xl md:text-3xl mb-6 font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">Bismillah-ir-Rahman-ir-Rahim</h2>
            <p className="text-wedding-cream/90 text-lg md:text-xl font-light tracking-wide">Wedding Of</p>
            <h1 className="font-serif text-3xl md:text-6xl text-white mb-8 leading-tight drop-shadow-2xl">
              Rizwana <br />
              <span className="text-wedding-gold">&</span> <br />
              Noor Mohammad
            </h1>
            <div className="mt-12 animate-bounce opacity-50">
              <ChevronDown className="w-8 h-8 text-wedding-gold mx-auto" />
            </div>
          </motion.div>
        </Section>

        {/* Meet the Couple Section */}
        <Section bgImage="https://picsum.photos/seed/couple-bg/1920/1080" className="snap-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto px-4">
            {/* The Bride */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-wedding-gold/30 shadow-2xl relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 border-2 border-wedding-gold/20">
                <img 
                  src={WEDDING_IMAGES.bridePhoto} 
                  alt="The Bride" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-wedding-gold font-serif text-2xl md:text-3xl tracking-widest uppercase">The Bride</span>
                </div>
              </div>
              <h3 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-2">Rizwana</h3>
              <p className="text-wedding-cream/70 italic text-sm md:text-base">Daughter of Mr. Rajak Vali & Mrs. Mahaboob Bee</p>
            </motion.div>

            {/* The Groom */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white/10 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-wedding-gold/30 shadow-2xl relative"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 border-2 border-wedding-gold/20">
                <img 
                  src={WEDDING_IMAGES.groomPhoto} 
                  alt="The Groom" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="text-wedding-gold font-serif text-2xl md:text-3xl tracking-widest uppercase">The Groom</span>
                </div>
              </div>
              <h3 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-2">Noor Mohammad</h3>
              <p className="text-wedding-cream/70 italic text-sm md:text-base">Son of Mr. Fakruddin & Mrs. Hazara Begum</p>
            </motion.div>
          </div>
        </Section>

        {/* Invitation Section */}
        <Section bgImage="https://picsum.photos/seed/wedding2/1920/1080" className="snap-start">
          <div className="border-2 border-wedding-gold/30 p-6 md:p-16 rounded-sm inline-block mx-4">
            <h2 className="font-serif text-wedding-gold text-3xl md:text-5xl mb-8">Invitation</h2>
            <p className="text-white text-base md:text-2xl leading-relaxed max-w-2xl mx-auto font-light">
              With the blessings of Allah and our beloved parents, 
              we cordially invite you to celebrate the Nikah and Valima 
              of our beloved children.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
              <Heart className="text-wedding-gold w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </Section>

        {/* Details Section */}
        <Section bgImage="https://picsum.photos/seed/wedding3/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-5xl mb-12">Wedding Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-white w-full max-w-5xl px-4">
            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
              <Calendar className="w-8 h-8 md:w-10 md:h-10 text-wedding-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-wedding-gold">Nikah</h3>
              <p className="text-lg md:text-xl mb-2">Thursday, 14th May 2026</p>
              <p className="text-wedding-cream/70 text-sm md:text-base">12:00 PM Onwards</p>
              <p className="text-wedding-cream/70 mb-6 text-sm md:text-base">RRR Convention Hall, Anantapur</p>
              <button 
                onClick={openMap}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-transparent border-2 border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-wedding-maroon active:scale-95 transition-all font-bold text-sm uppercase tracking-widest min-h-[48px]"
              >
                <MapPin size={18} />
                Open Location
              </button>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-wedding-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl mb-4 text-wedding-gold">Valima</h3>
              <p className="text-lg md:text-xl mb-2">Friday, 15th May 2026</p>
              <p className="text-wedding-cream/70 text-sm md:text-base">11:00 AM Onwards</p>
               <p className="text-wedding-cream/70 mb-6 text-sm md:text-base">N S banquet hall, Anantapur</p>
               <button 
                onClick={openValimaMap}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-transparent border-2 border-wedding-gold text-wedding-gold rounded-full hover:bg-wedding-gold hover:text-wedding-maroon active:scale-95 transition-all font-bold text-sm uppercase tracking-widest min-h-[48px]"
              >
                <MapPin size={18} />
                Open Location
              </button>
            </div>
          </div>
        </Section>

        {/* Countdown Section */}
        <Section bgImage="https://picsum.photos/seed/wedding4/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-12 px-4">Counting Down to Forever</h2>
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8 px-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-wedding-maroon/90 backdrop-blur-md w-full md:w-32 h-24 md:h-32 flex flex-col items-center justify-center rounded-2xl border border-wedding-gold/30 shadow-2xl">
                <span className="text-3xl md:text-5xl font-bold text-wedding-gold">{item.value}</span>
                <span className="text-[10px] md:text-sm uppercase tracking-widest text-wedding-cream/80 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Memories Section */}
        <Section bgImage="https://picsum.photos/seed/wedding6/1920/1080" className="snap-start">
          <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-12">Our Memories</h2>
          <div className="w-full max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {WEDDING_IMAGES.memories.map((img, i) => (
                <motion.div 
                  key={i}
                  className={`rounded-2xl overflow-hidden shadow-2xl border-2 md:border-4 border-wedding-gold/20 relative group ${
                    i === 0 || i === 1 || i >= 4 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
                  }`}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={img} 
                    alt={`Memory ${i + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-wedding-cream/60 mt-8 italic flex items-center justify-center gap-2 text-sm">
            <Heart size={14} className="text-wedding-gold" />
            Our beautiful journey together
            <Heart size={14} className="text-wedding-gold" />
          </p>
        </Section>

        {/* Couple Portrait Section */}
        <Section
          bgImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          className="snap-start"
          overlayClassName="bg-black/50"
        >
          <div className="max-w-2xl mx-auto w-full px-4 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-wedding-gold/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 font-light"
            >
              A Moment Together
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative w-full rounded-3xl overflow-hidden border-2 border-wedding-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.25)]"
            >
              <img
                src={couplePhoto}
                alt="Rizwana & Noor Mohammad"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <p className="font-serif text-wedding-gold text-2xl md:text-4xl drop-shadow-lg tracking-wider">
                  Rizwana &amp; Noor Mohammad
                </p>
                <p className="text-wedding-cream/70 text-sm mt-1 tracking-widest">14th May 2026</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-4 mt-8"
            >
              <div className="h-px w-16 bg-wedding-gold/40" />
              <Heart className="text-wedding-gold w-5 h-5" fill="currentColor" />
              <div className="h-px w-16 bg-wedding-gold/40" />
            </motion.div>
          </div>
        </Section>

        {/* Blessings Section */}
        <Section bgImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80" className="snap-start" overlayClassName="bg-black/55">
          <div className="max-w-xl mx-auto w-full px-4">
            <h2 className="font-serif text-wedding-gold text-3xl md:text-4xl mb-8">Send Your Blessings</h2>
            
            {submissionStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-wedding-gold/20 backdrop-blur-md p-8 rounded-2xl border border-wedding-gold text-white text-center"
              >
                <div className="w-16 h-16 bg-wedding-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-wedding-maroon" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
                <p>Your blessings have been sent to our hearts.</p>
                <button 
                  onClick={() => setSubmissionStatus('idle')}
                  className="mt-6 text-wedding-gold underline text-sm"
                >
                  Send another wish
                </button>
              </motion.div>
            ) : (
              <form 
                className="space-y-4" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submissionStatus === 'sending') return;
                  
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const message = formData.get('message') as string;

                  if (!name || !message) return;

                  setSubmissionStatus('sending');
                  try {
                    const response = await fetch('/api/wishes', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name, message }),
                    });
                    
                    if (response.ok) {
                      setSubmissionStatus('success');
                    } else {
                      setSubmissionStatus('error');
                    }
                  } catch (err) {
                    console.error(err);
                    setSubmissionStatus('error');
                  }
                }}
              >
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Your Name" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-wedding-gold transition-colors text-base"
                />
                <textarea 
                  name="message"
                  required
                  placeholder="Your Blessings & Wishes" 
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-wedding-gold transition-colors text-base"
                />
                
                {submissionStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                )}

                <button 
                  type="submit"
                  disabled={submissionStatus === 'sending'}
                  className="w-full py-5 bg-wedding-gold text-wedding-maroon font-bold rounded-xl hover:bg-white active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-sm min-h-[56px]"
                >
                  {submissionStatus === 'sending' ? (
                    <div className="w-5 h-5 border-2 border-wedding-maroon border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Wishes
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Section>

        {/* Footer */}
        <footer className="bg-wedding-maroon text-wedding-cream py-16 px-6 text-center border-t border-wedding-gold/20">
          <div className="max-w-4xl mx-auto">
            <Heart className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
            <p className="font-serif text-2xl mb-2">Rizwana & Noor Mohammad</p>
            <p className="text-wedding-cream/60 text-xs tracking-widest uppercase mb-8">May 14-15, 2026</p>
            <div className="h-px bg-wedding-gold/20 w-24 mx-auto mb-8" />
            <p className="text-wedding-cream/40 text-[10px] leading-relaxed">
              Designed with ❤️ by Karishma <br />
              Conceptualized by Haneef <br/>
              © 2026 Wedding Invitation
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
