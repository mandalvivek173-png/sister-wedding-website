/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Camera, 
  Music, 
  Users, 
  ChevronRight, 
  X,
  Flower2,
  Sparkles,
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Send,
  Share2,
  MessageSquare,
  Video,
  ExternalLink,
  Menu
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---
interface Event {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
  shayeri?: string;
}

interface GalleryImage {
  url: string;
  category: string;
  caption: string;
}

// --- Data ---
const EVENTS: Event[] = [
  {
    date: "28 January 2026",
    title: "Engagement Ceremony",
    description: "The beginning of our forever. A beautiful promise made with rings and hearts full of love.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-pink-200",
    image: "https://i.ibb.co/PsMnH03z/image.png",
    shayeri: "Do dilon ne ek naya safar shuru kiya, Ek chhoti si anguthi ne zindagi bhar ka rishta jod diya."
  },
  {
    date: "8 March 2026",
    title: "Devpooji Ceremony",
    description: "The auspicious beginning with divine blessings. A traditional Indian theme with marigold flowers and sacred rituals.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-wedding-gold",
    image: "https://i.ibb.co/nN5X7fx7/image.png",
    shayeri: "Shubh aarambh ki ye ghadi aayi hai, Devon ki kripa se shaadi ki rasmein sajayi hai."
  },
  {
    date: "9 March 2026",
    title: "Haldi Ceremony",
    description: "A joyful celebration with turmeric and love. Bright yellow theme with festive joy and turmeric glow.",
    icon: <Flower2 className="w-6 h-6" />,
    color: "bg-wedding-haldi",
    image: "https://i.ibb.co/7xbxwMFh/image.png",
    shayeri: "Haldi ki rangat se saj gaya aangan, Khushiyon ki mehfil mein chamka dulhan ka chehra."
  },
  {
    date: "10 March 2026",
    title: "Mehndi & Matkor",
    description: "Henna patterns and traditional village rituals. Green and floral theme with intricate henna patterns.",
    icon: <Music className="w-6 h-6" />,
    color: "bg-wedding-mehndi",
    image: "https://i.ibb.co/4ZxPKNqv/image.png",
    shayeri: "Mehndi ka rang jab gehra chadh jaata hai, Tab dulhan ka pyaar aur bhi khil jaata hai."
  },
  {
    date: "11 March 2026",
    title: "Wedding Ceremony",
    description: "The grand union of two souls. Royal Indian wedding theme with red and gold elegance.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-wedding-maroon",
    image: "https://i.ibb.co/GQw5QFn0/image.png",
    shayeri: "Do dil ek bandhan mein bandhne chale, Prem aur Sweety ek nayi zindagi rachne chale."
  }
];

const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  // Engagement
  { url: "https://i.ibb.co/PsMnH03z/image.png", category: "Engagement", caption: "The Ring Exchange" },
  { url: "https://i.ibb.co/p6bQQ2FZ/image.png", category: "Engagement", caption: "Beautiful Promise" },
  { url: "https://i.ibb.co/kVhG1xcQ/image.png", category: "Engagement", caption: "Engagement Moments" },
  { url: "https://i.ibb.co/kgNxBfz7/image.png", category: "Engagement", caption: "Beginning of Forever" },
  
  // Devpooji
  { url: "https://i.ibb.co/nN5X7fx7/image.png", category: "Devpooji", caption: "Devpooji Rituals" },
  { url: "https://i.ibb.co/zTN2wTg8/image.png", category: "Devpooji", caption: "Sacred Fire" },
  { url: "https://i.ibb.co/nM3t2Wgm/image.png", category: "Devpooji", caption: "Family Blessings" },
  { url: "https://i.ibb.co/rK26jYf4/image.png", category: "Devpooji", caption: "Divine Start" },
  
  // Haldi
  { url: "https://i.ibb.co/7xbxwMFh/image.png", category: "Haldi", caption: "Haldi Ceremony" },
  { url: "https://i.ibb.co/DPR0N4ZW/image.png", category: "Haldi", caption: "Turmeric Glow" },
  { url: "https://i.ibb.co/twZw82ZY/image.png", category: "Haldi", caption: "Joyful Moments" },
  { url: "https://i.ibb.co/Q3ZZVSkW/image.png", category: "Haldi", caption: "Festive Yellow" },
  { url: "https://i.ibb.co/tw50WY6k/image.png", category: "Haldi", caption: "Haldi Celebration" },
  { url: "https://i.ibb.co/C3JhzyNd/image.png", category: "Haldi", caption: "Family Fun" },
  { url: "https://i.ibb.co/wZtYZ5F4/image.png", category: "Haldi", caption: "Traditional Haldi" },

  // Mehndi (Strictly new pics as requested)
  { url: "https://i.ibb.co/4ZxPKNqv/image.png", category: "Mehndi", caption: "Mehndi Rituals" },
  { url: "https://i.ibb.co/WvcZZyrv/image.png", category: "Mehndi", caption: "Mehndi Celebration" },
  { url: "https://i.ibb.co/hP07hzz/image.png", category: "Mehndi", caption: "Mehndi Moments" },
  { url: "https://i.ibb.co/0jH7rcDc/image.png", category: "Mehndi", caption: "Beautiful Mehndi" },
  { url: "https://i.ibb.co/hJ1zTjrY/image.png", category: "Mehndi", caption: "Mehndi Joy" },
  { url: "https://i.ibb.co/8LGbw4gx/image.png", category: "Mehndi", caption: "Mehndi Tradition" },
  { url: "https://i.ibb.co/V0ch5LmQ/image.png", category: "Mehndi", caption: "Mehndi Fun" },
  
  // Matkor
  { url: "https://i.ibb.co/QFsRv6by/image.png", category: "Matkor", caption: "Matkor Rituals" },
  
  // Wedding & Varmala
  { url: "https://i.ibb.co/XrNC38hw/image.png", category: "Wedding", caption: "Groom's Barat Entry" },
  { url: "https://i.ibb.co/BKsJFCyX/image.png", category: "Wedding", caption: "Barati Celebration" },
  { url: "https://i.ibb.co/xKyf1bYy/image.png", category: "Wedding", caption: "Barati Dance" },
  { url: "https://i.ibb.co/rKxTQn9p/image.png", category: "Wedding", caption: "Barat Procession" },
  { url: "https://i.ibb.co/GQw5QFn0/image.png", category: "Wedding", caption: "The Wedding Day" },
  { url: "https://i.ibb.co/BVhvRFGL/image.png", category: "Wedding", caption: "Royal Union" },
  { url: "https://i.ibb.co/FkxFw3Z2/image.png", category: "Wedding", caption: "Sacred Vows" },
  { url: "https://i.ibb.co/RTRWysHW/image.png", category: "Wedding", caption: "Wedding Rituals" },
  { url: "https://i.ibb.co/MH9ZSPD/image.png", category: "Wedding", caption: "Varmala Ceremony" },
  { url: "https://i.ibb.co/0ywjPQPv/image.png", category: "Wedding", caption: "Exchange of Garlands" },
  { url: "https://i.ibb.co/1jLTy7t/image.png", category: "Wedding", caption: "Varmala Joy" },
  { url: "https://i.ibb.co/HTycyGyn/image.png", category: "Wedding", caption: "Beautiful Varmala" },
  { url: "https://i.ibb.co/WNBhJZNH/image.png", category: "Wedding", caption: "Couple Portrait" },
  { url: "https://i.ibb.co/zhVpq3rF/image.png", category: "Wedding", caption: "Varmala Moments" },
  { url: "https://i.ibb.co/8DcZQ1HW/image.png", category: "Wedding", caption: "Grand Varmala" },
  
  // Entry & Bidayi
  { url: "https://i.ibb.co/QvL0vg6X/image.png", category: "Wedding", caption: "Grand Entry" },
  { url: "https://i.ibb.co/hxcBjMvj/image.png", category: "Wedding", caption: "Royal Entrance" },
  { url: "https://i.ibb.co/wh8xcyp7/image.png", category: "Wedding", caption: "Bidayi Moments" },
  { url: "https://i.ibb.co/FkZ3MTDb/image.png", category: "Wedding", caption: "Emotional Bidayi" },
  { url: "https://i.ibb.co/kV0P2gP8/image.png", category: "Wedding", caption: "New Journey" },

  // Family
  { url: "https://i.ibb.co/4ZxPKNqv/image.png", category: "Family Moments", caption: "With Father" },
  { url: "https://i.ibb.co/hJ1zTjrY/image.png", category: "Family Moments", caption: "With Mother" },
  { url: "https://i.ibb.co/8LGbw4gx/image.png", category: "Family Moments", caption: "Full Family" },
  { url: "https://i.ibb.co/V0ch5LmQ/image.png", category: "Family Moments", caption: "Sister & Jija Ji" },
];

interface Wish {
  name: string;
  message: string;
  date: string;
}

// --- Components ---

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-14 h-14 bg-wedding-maroon text-wedding-gold rounded-full flex items-center justify-center shadow-2xl border-2 border-wedding-gold hover:bg-wedding-maroon/90 transition-all group"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 group-hover:animate-pulse" />
        ) : (
          <Play className="w-6 h-6 ml-1 group-hover:animate-pulse" />
        )}
        
        {/* Animated sound waves when playing */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2 flex gap-0.5 items-end h-6">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 4] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                className="w-1 bg-wedding-gold rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
};

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="fixed inset-0 z-[100] bg-wedding-maroon flex flex-col items-center justify-center"
  >
    <div className="absolute inset-0 opacity-10 floral-pattern" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative text-center"
    >
      <Flower2 className="w-24 h-24 text-wedding-gold mx-auto mb-8 animate-pulse" />
      <h1 className="text-6xl md:text-8xl font-cursive gold-text-gradient mb-4">S & P</h1>
      <div className="w-32 h-1 bg-wedding-gold mx-auto mb-8" />
      <p className="text-wedding-gold font-display tracking-[0.5em] text-sm uppercase">Loading Our Story...</p>
    </motion.div>
  </motion.div>
);

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Events', id: 'timeline' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Family', id: 'family' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-wedding-maroon/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-wedding-gold font-display text-2xl font-bold tracking-tighter"
        >
          S <Heart className="inline w-4 h-4 fill-wedding-gold" /> P
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`font-display text-xs uppercase tracking-widest transition-colors hover:text-wedding-gold ${activeSection === item.id ? 'text-wedding-gold' : 'text-white'}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-wedding-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-wedding-maroon border-t border-wedding-gold/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="font-display text-xs uppercase tracking-widest text-white text-left py-2"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Petals = () => (
  <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i}
        className="animate-float text-wedding-gold/20 text-2xl"
        style={{ 
          left: `${Math.random() * 100}%`, 
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.1
        }}
      >
        🌸
      </div>
    ))}
  </div>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = Math.abs(target - now);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-wedding-maroon/10 border border-wedding-gold/30 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
            <span className="text-2xl md:text-4xl font-display text-wedding-gold font-bold">{item.value}</span>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-wedding-maroon font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="inline-block"
    >
      <Flower2 className={`w-8 h-8 mx-auto mb-4 ${light ? 'text-wedding-gold' : 'text-wedding-maroon'}`} />
      <h2 className={`text-4xl md:text-5xl font-cursive mb-2 ${light ? 'text-white' : 'text-wedding-maroon'}`}>{title}</h2>
      {subtitle && <p className={`text-sm uppercase tracking-[0.3em] font-medium ${light ? 'text-white/80' : 'text-gray-500'}`}>{subtitle}</p>}
      <div className={`h-px w-24 mx-auto mt-4 ${light ? 'bg-wedding-gold' : 'bg-wedding-maroon'}`} />
    </motion.div>
  </div>
);

const ScrollReveal = ({ children, delay = 0, direction = 'up' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right', key?: React.Key }) => {
  const variants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};


export default function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', category: 'Wedding', caption: '' });
  const [appStep, setAppStep] = useState<'welcome' | 'opening' | 'home'>('welcome');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [wishes, setWishes] = useState<Wish[]>([
    { name: "Rahul Sharma", message: "Wishing you both a lifetime of happiness and love!", date: "12 March 2026" },
    { name: "Priya Mandal", message: "So happy for you Sweety! You look like a queen.", date: "13 March 2026" }
  ]);

  const heroImages = [
    "https://i.ibb.co/GQw5QFn0/image.png",
    "https://i.ibb.co/WNBhJZNH/image.png",
    "https://i.ibb.co/PsMnH03z/image.png",
    "https://i.ibb.co/nN5X7fx7/image.png"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (appStep === 'home') {
      const interval = setInterval(() => {
        setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [appStep, heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'timeline', 'gallery', 'family'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Engagement', 'Devpooji', 'Haldi', 'Mehndi', 'Matkor', 'Wedding', 'Family Moments'];
  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.url && newImage.caption) {
      setImages([newImage, ...images]);
      setNewImage({ url: '', category: 'Wedding', caption: '' });
      setIsUploadModalOpen(false);
    }
  };

  const scrollToGallery = (category: string) => {
    setActiveCategory(category);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (appStep === 'welcome') {
    return (
      <div 
        className="h-screen bg-[#050505] flex items-center justify-center overflow-hidden relative cursor-pointer"
        onClick={() => setAppStep('opening')}
      >
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.ibb.co/GQw5QFn0/image.png" 
            className="w-full h-full object-cover grayscale" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-wedding-gold rounded-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ 
                opacity: [0, 1, 0], 
                y: [0, 1000],
                x: [0, Math.random() * 400 - 200]
              }}
              transition={{ 
                duration: Math.random() * 10 + 5, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{ left: `${Math.random() * 100}%`, top: `-10px` }}
            />
          ))}
        </div>
        
        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Flower2 className="w-16 h-16 mx-auto mb-8 text-wedding-gold animate-pulse" />
              <h2 className="text-wedding-gold font-display text-sm uppercase tracking-[0.8em] mb-4">In the celebration of love...</h2>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="text-7xl md:text-9xl font-cursive gold-text-gradient mb-6"
            >
              Sweety Mandal & Prem
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-white/60 font-serif italic text-xl mb-12 tracking-widest"
            >
              "Two hearts, one beautiful journey."
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="premium-button">
                Enter Our Wedding Story
              </div>
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-wedding-gold font-display text-xs uppercase tracking-[0.3em]"
              >
                Tap anywhere to continue
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (appStep === 'opening') {
    return (
      <div 
        className="h-screen bg-wedding-maroon flex items-center justify-center overflow-hidden relative cursor-pointer"
        onClick={() => setAppStep('home')}
      >
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 4 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://i.ibb.co/WNBhJZNH/image.png" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 opacity-20 floral-pattern" />
        
        {/* Floating Petals */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="floating-petal animate-float text-wedding-gold/40"
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            🌸
          </div>
        ))}

        <div className="text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="royal-border p-16 md:p-24 bg-white/5 backdrop-blur-sm rounded-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-wedding-gold font-display text-2xl uppercase tracking-[0.8em] mb-8">The Royal Wedding Celebration</h2>
              <h1 className="text-7xl md:text-9xl font-cursive gold-text-gradient mb-8">Sweety Mandal & Prem</h1>
              <p className="text-wedding-gold/80 font-serif text-3xl mb-12 tracking-[0.3em]">11 March 2026</p>
              
              <div className="flex flex-col items-center gap-6">
                <div className="premium-button">
                  Explore Our Wedding
                </div>
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-wedding-gold font-display text-xs uppercase tracking-[0.3em]"
                >
                  Tap anywhere to continue
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-ivory selection:bg-wedding-maroon selection:text-white">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <Navbar activeSection={activeSection} />
      <MusicPlayer />
      <Petals />
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAppStep('welcome')}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-wedding-gold/30 rounded-full text-wedding-gold font-display text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </motion.button>
      
      {/* --- Hero Section --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              src={heroImages[currentHeroImage]}
              alt="Wedding Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-wedding-maroon/60 via-wedding-maroon/20 to-wedding-ivory" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="royal-border p-12 md:p-20 bg-white/10 backdrop-blur-md inline-block rounded-3xl"
          >
            <Flower2 className="w-16 h-16 mx-auto mb-8 text-wedding-gold animate-pulse" />
            <h1 className="text-xl md:text-2xl font-display uppercase tracking-[0.8em] text-wedding-gold mb-6">
              The Royal Wedding Celebration
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10">
              <span className="text-7xl md:text-9xl font-cursive gold-text-gradient">Sweety</span>
              <div className="flex flex-col items-center">
                <Heart className="w-10 h-10 text-wedding-gold fill-wedding-gold mb-2" />
                <span className="text-wedding-gold font-display text-2xl">&</span>
              </div>
              <span className="text-7xl md:text-9xl font-cursive gold-text-gradient">Prem</span>
            </div>
            <p className="text-lg md:text-2xl font-serif italic text-white/90 max-w-2xl mx-auto mb-12 tracking-wide">
              "Celebrating the beginning of a beautiful forever."
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              className="premium-button"
            >
              Explore Our Wedding Story
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-wedding-gold"
        >
          <div className="w-px h-16 bg-wedding-gold/50 mx-auto" />
          <span className="text-[10px] uppercase tracking-[0.5em] mt-2 block">Scroll</span>
        </motion.div>
      </section>

      {/* --- Meet the Couple --- */}
      <section id="couple" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionTitle title="Meet the Couple" subtitle="Two Hearts, One Soul" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Bride */}
            <ScrollReveal direction="right">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-wedding-gold shadow-2xl mx-auto">
                    <img src="https://i.ibb.co/GQw5QFn0/image.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-wedding-gold/30 rounded-full"
                  />
                </div>
                <h3 className="text-4xl font-cursive text-wedding-maroon">Sweety Mandal</h3>
                <p className="text-gray-600 font-serif italic text-lg max-w-md mx-auto">
                  "A dreamer with a heart full of kindness. Sweety brings light and joy wherever she goes, with a smile that can brighten the darkest day."
                </p>
              </div>
            </ScrollReveal>

            {/* Groom */}
            <ScrollReveal direction="left">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-wedding-gold shadow-2xl mx-auto">
                    <img src="https://i.ibb.co/XrNC38hw/image.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-wedding-gold/30 rounded-full"
                  />
                </div>
                <h3 className="text-4xl font-cursive text-wedding-maroon">Prem</h3>
                <p className="text-gray-600 font-serif italic text-lg max-w-md mx-auto">
                  "A man of integrity and strength. Prem's calm nature and unwavering support make him the perfect partner for this beautiful journey."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* --- Timeline Section --- */}
      <section className="py-32 bg-wedding-cream relative">
        <div className="container mx-auto px-4">
          <SectionTitle title="Wedding Timeline" subtitle="The Royal Itinerary" />
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-wedding-gold/30 hidden md:block" />
            
            <div className="space-y-24">
              {EVENTS.map((event, index) => (
                <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 relative group">
                      <div className="royal-border p-3 rounded-2xl bg-white shadow-xl overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-80 object-cover rounded-xl group-hover:scale-110 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-wedding-maroon border-4 border-wedding-gold rounded-full z-20 hidden md:flex items-center justify-center shadow-xl">
                      <Calendar className="w-5 h-5 text-wedding-gold" />
                    </div>
                    
                    <div className={`md:w-1/2 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-wedding-gold font-display text-xl tracking-widest mb-4 block">{event.date}</span>
                      <h3 className="text-4xl font-serif text-wedding-maroon mb-4">{event.title}</h3>
                      <p className="text-gray-600 font-serif italic text-lg leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Engagement Ceremony Section --- */}
      <section id="engagement" className="py-32 bg-[#FFF0F5] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-wedding-gold rounded-full blur-sm"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <ScrollReveal>
              <Flower2 className="w-12 h-12 text-wedding-gold mx-auto mb-6" />
              <h2 className="text-5xl md:text-7xl font-cursive text-wedding-maroon mb-6">Welcome to Our Engagement Ceremony</h2>
              <p className="text-wedding-gold font-display text-xl tracking-[0.3em] mb-8">28 JANUARY 2026</p>
              <div className="max-w-2xl mx-auto">
                <p className="text-3xl font-serif italic text-wedding-maroon/80 leading-relaxed mb-8">
                  "Do dilon ne ek naya safar shuru kiya,<br />
                  Ek chhoti si anguthi ne zindagi bhar ka rishta jod diya."
                </p>
              </div>
              <div className="w-32 h-1 bg-wedding-gold mx-auto" />
            </ScrollReveal>
          </div>

          {/* Engagement Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {images.filter(img => img.category === 'Engagement').map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedImage(image)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl royal-border p-1 bg-white shadow-xl"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                    <img 
                      src={image.url} 
                      alt={image.caption} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    {image.category !== 'Engagement' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <p className="text-white font-serif italic text-lg">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Ceremony Sections --- */}
      {EVENTS.filter(e => e.title !== "Engagement Ceremony").map((event, index) => (
        <section 
          key={index} 
          id={event.title.toLowerCase().replace(/\s+/g, '-')}
          className={`py-32 relative overflow-hidden ${index % 2 === 0 ? 'bg-wedding-ivory' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <ScrollReveal>
                  <div className="royal-border p-4 rounded-3xl bg-white shadow-2xl">
                    <img src={event.image} alt={event.title} className="w-full h-[500px] object-cover rounded-2xl" referrerPolicy="no-referrer" />
                  </div>
                </ScrollReveal>
              </div>
              
              <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <ScrollReveal delay={0.2}>
                  <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-cursive text-wedding-maroon">{event.title}</h2>
                    <div className="w-24 h-1 bg-wedding-gold" />
                    <p className="text-2xl font-serif italic text-wedding-gold leading-relaxed">
                      {event.shayeri}
                    </p>
                    <p className="text-xl text-gray-700 font-serif leading-relaxed">
                      {event.description}
                    </p>
                    <div className="pt-8">
                      <button 
                        onClick={() => scrollToGallery(event.title)}
                        className="premium-button"
                      >
                        View Ceremony Gallery
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* --- Pre Wedding Video --- */}
      <section id="video" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="Our Pre Wedding Story" subtitle="A Cinematic Journey" />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto royal-border p-4 rounded-3xl bg-white shadow-2xl relative group">
              <div className="aspect-video rounded-2xl overflow-hidden relative">
                <img src="https://i.ibb.co/GQw5QFn0/image.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all cursor-pointer">
                  <div className="w-20 h-20 bg-wedding-gold rounded-full flex items-center justify-center shadow-2xl">
                    <Video className="w-10 h-10 text-wedding-maroon" />
                  </div>
                </div>
              </div>
              <p className="mt-8 text-xl text-gray-600 font-serif italic">
                "Capturing the essence of our love through the lens of time."
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* --- Guest Wishes --- */}
      <section id="wishes" className="py-32 bg-wedding-ivory relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionTitle title="Leave Your Blessings" subtitle="Words of Love" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <ScrollReveal direction="right">
                <div className="glass-card p-10 rounded-3xl royal-border sticky top-32">
                  <h3 className="text-3xl font-cursive text-wedding-maroon mb-6">Send Your Love</h3>
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                    setWishes([{ name, message, date: "Just now" }, ...wishes]);
                    form.reset();
                  }}>
                    <input name="name" type="text" required placeholder="Your Name" className="w-full px-6 py-4 bg-white border border-wedding-gold/30 rounded-xl focus:border-wedding-gold outline-none font-serif" />
                    <textarea name="message" required placeholder="Your Blessings" rows={4} className="w-full px-6 py-4 bg-white border border-wedding-gold/30 rounded-xl focus:border-wedding-gold outline-none font-serif resize-none" />
                    <button type="submit" className="premium-button w-full">
                      Send Blessings
                      <Heart className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              {wishes.map((wish, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="left">
                  <div className="glass-card p-8 rounded-2xl border-l-4 border-wedding-gold relative group hover:shadow-2xl transition-all">
                    <MessageSquare className="absolute top-6 right-6 text-wedding-gold/20 w-12 h-12" />
                    <p className="text-xl text-gray-700 font-serif italic leading-relaxed mb-6">"{wish.message}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-wedding-maroon font-display text-sm font-bold uppercase tracking-widest">{wish.name}</span>
                      <span className="text-gray-400 text-xs font-serif">{wish.date}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Share Section --- */}
      <section className="py-20 bg-wedding-maroon relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-wedding-gold font-display text-xl uppercase tracking-[0.4em] mb-10">Share Our Joy</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="flex items-center gap-3 px-8 py-3 bg-green-600 text-white rounded-full font-display text-xs uppercase tracking-widest hover:bg-green-700 transition-all">
              WhatsApp
            </button>
            <button className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-full font-display text-xs uppercase tracking-widest hover:bg-blue-700 transition-all">
              Facebook
            </button>
            <button className="flex items-center gap-3 px-8 py-3 bg-wedding-gold text-wedding-maroon rounded-full font-display text-xs uppercase tracking-widest hover:bg-wedding-gold-light transition-all">
              Copy Link
            </button>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://i.ibb.co/GQw5QFn0/image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-wedding-maroon/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Flower2 className="w-12 h-12 text-wedding-gold mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-cursive text-white mb-6 leading-tight">
              "Two souls with but a single thought, Two hearts that beat as one."
            </h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* --- Photo Gallery --- */}
      <section id="gallery" className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <SectionTitle title="Wedding Gallery" subtitle="Moments Frozen in Time" />
          
          <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 md:px-8 py-2 rounded-full font-display text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border-2 ${
                  activeCategory === category 
                    ? 'bg-wedding-maroon border-wedding-maroon text-wedding-gold shadow-lg' 
                    : 'border-wedding-gold/30 text-wedding-gold hover:border-wedding-gold'
                }`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-6 md:px-8 py-2 rounded-full font-display text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border-2 border-wedding-maroon bg-wedding-maroon text-wedding-gold flex items-center gap-2 hover:bg-wedding-maroon/90 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              Upload Memories
            </button>
          </div>

          <div className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(image)}
                  className="masonry-item group cursor-pointer relative overflow-hidden rounded-2xl royal-border p-1 bg-white mb-6"
                >
                  <img 
                    src={image.url} 
                    alt={image.caption} 
                    className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {image.category !== 'Engagement' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <p className="text-white font-serif italic text-lg">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Countdown Section --- */}
      <section className="py-32 bg-wedding-maroon relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 floral-pattern" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-wedding-gold font-display text-sm uppercase tracking-[0.5em] mb-4">Time Since Our Big Day</h2>
            <h3 className="text-5xl md:text-7xl font-cursive gold-text-gradient mb-12">Cherishing Every Moment</h3>
            <div className="inline-block p-12 royal-border bg-white/5 backdrop-blur-sm rounded-3xl">
              <Countdown targetDate="2026-03-12T02:00:00" />
            </div>
            <p className="text-wedding-gold/60 font-serif italic text-xl mt-12 tracking-widest">11th March 2026 • A Royal Union</p>
          </motion.div>
        </div>
      </section>

      {/* --- Final Section --- */}
      <footer className="py-32 bg-wedding-maroon text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 floral-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Flower2 className="w-16 h-16 mx-auto mb-10 text-wedding-gold" />
            <h2 className="text-6xl md:text-9xl font-cursive mb-10 gold-text-gradient">Thank You</h2>
            <p className="text-2xl md:text-3xl font-serif italic max-w-3xl mx-auto mb-16 opacity-90 leading-relaxed">
              "Thank you for being part of our beautiful journey and blessing us with your love. Your presence made our celebration truly royal."
            </p>
            <div className="flex items-center justify-center gap-8 mb-16">
              <div className="h-px w-24 bg-wedding-gold/50" />
              <Heart className="text-wedding-gold fill-wedding-gold w-10 h-10 animate-pulse" />
              <div className="h-px w-24 bg-wedding-gold/50" />
            </div>
            <p className="text-sm uppercase tracking-[0.8em] text-wedding-gold font-display">Sweety & Prem • 2026</p>
          </motion.div>
        </div>
      </footer>

      {/* --- Upload Modal --- */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-wedding-ivory w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl royal-border"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8 bg-wedding-maroon text-wedding-gold flex justify-between items-center">
                <h3 className="text-3xl font-cursive">Upload Wedding Photo</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <form onSubmit={handleUpload} className="p-8 space-y-6">
                <div>
                  <label className="block text-wedding-maroon font-display text-xs uppercase tracking-widest mb-2">Photo URL</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://example.com/photo.jpg"
                    value={newImage.url}
                    onChange={e => setNewImage({ ...newImage, url: e.target.value })}
                    className="w-full px-6 py-4 bg-white border border-wedding-gold/30 rounded-xl focus:outline-none focus:border-wedding-gold font-serif"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-wedding-maroon font-display text-xs uppercase tracking-widest mb-2">Category</label>
                    <select 
                      value={newImage.category}
                      onChange={e => setNewImage({ ...newImage, category: e.target.value })}
                      className="w-full px-6 py-4 bg-white border border-wedding-gold/30 rounded-xl focus:outline-none focus:border-wedding-gold font-serif appearance-none"
                    >
                      {categories.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-wedding-maroon font-display text-xs uppercase tracking-widest mb-2">Caption</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Beautiful Moment"
                      value={newImage.caption}
                      onChange={e => setNewImage({ ...newImage, caption: e.target.value })}
                      className="w-full px-6 py-4 bg-white border border-wedding-gold/30 rounded-xl focus:outline-none focus:border-wedding-gold font-serif"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-wedding-maroon text-wedding-gold font-display uppercase tracking-widest rounded-xl hover:bg-wedding-maroon/90 transition-all shadow-xl"
                >
                  Add to Gallery
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Lightbox --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-wedding-gold transition-all flex items-center gap-2 group"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
              <X className="w-10 h-10" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {selectedImage.category !== 'Engagement' && (
                <div className="mt-6 text-center">
                  <p className="text-wedding-gold font-cursive text-3xl mb-2">{selectedImage.caption}</p>
                  <span className="text-white/60 uppercase tracking-widest text-xs">{selectedImage.category}</span>
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(null)}
                className="mt-8 px-8 py-3 bg-wedding-gold text-wedding-maroon font-display text-xs uppercase tracking-widest rounded-full font-bold shadow-xl"
              >
                Back to Website
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
