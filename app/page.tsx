'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize2,
  Menu,
  X,
} from 'lucide-react'
import { useScrollReveal } from './useScrollReveal'

/* ── Portfolio Work Data (Categorized with Nigerian & Global Editorial Context) ── */
interface WorkItem {
  id: string
  title: string
  type: string
  image: string
  caption: string
  location: string
  year: string
  alt: string
  featuredInAll?: boolean
}

const workItems: WorkItem[] = [
  // ── Weddings ──
  {
    id: 'w1',
    title: 'The Vows at Sunset',
    type: 'Weddings',
    image: '/work-wedding-1.jpg',
    caption: 'An intimate outdoor ceremony bathed in late afternoon golden light.',
    location: 'Epe Resort, Lagos',
    year: '2024',
    alt: 'Bride and groom walking in a golden hour landscape',
    featuredInAll: true,
  },
  {
    id: 'p0',
    title: 'Modern Editorial Portrait',
    type: 'Portraits',
    image: '/editorial-portrait.png',
    caption: 'Sculptural fine-art portraiture exploring poise, minimalism, and quiet presence.',
    location: 'Victoria Island, Lagos',
    year: '2024',
    alt: 'Fine art portrait of a woman with cropped hair against grey backdrop',
    featuredInAll: true,
  },
  {
    id: 'w2',
    title: 'Family Kinship',
    type: 'Weddings',
    image: '/family-photography.jpg',
    caption: 'Multigenerational warmth and unscripted laughter during a wedding reception.',
    location: 'Victoria Island, Lagos',
    year: '2024',
    alt: 'Family gathered outdoors celebrating a wedding',
    featuredInAll: true,
  },
  {
    id: 'p1',
    title: 'Quiet Confidence',
    type: 'Portraits',
    image: '/work-portrait-1.jpg',
    caption: 'Chiaroscuro studio study exploring depth, shadow, and quiet strength.',
    location: 'Lekki Studio, Lagos',
    year: '2024',
    alt: 'High-contrast fine art studio portrait',
    featuredInAll: true,
  },
  {
    id: 'w3',
    title: 'Timeless Union',
    type: 'Weddings',
    image: '/gallery-2.jpg',
    caption: 'Soft natural light embracing the couple in quiet reflection.',
    location: 'Ikoyi, Lagos',
    year: '2024',
    alt: 'Romantic couple portrait in soft light',
    featuredInAll: true,
  },
  {
    id: 'w4',
    title: 'Serene Moments',
    type: 'Weddings',
    image: '/gallery-3.jpg',
    caption: 'An unhurried destination celebration with understated elegance.',
    location: 'Maitama, Abuja',
    year: '2024',
    alt: 'Intimate wedding couple celebration',
  },

  // ── Portraits ──
  {
    id: 'p2',
    title: 'Unguarded',
    type: 'Portraits',
    image: '/work-portrait-2.jpg',
    caption: 'Natural window illumination, no artifice, pure character.',
    location: 'Victoria Island, Lagos',
    year: '2024',
    alt: 'Candid portrait with natural window light',
  },

  // ── Commercial ──
  {
    id: 'c1',
    title: 'Form & Function',
    type: 'Commercial',
    image: '/work-commercial-1.jpg',
    caption: 'Architectural product composition for a modern design studio.',
    location: 'Lagos, Nigeria',
    year: '2024',
    alt: 'Minimalist commercial arrangement',
  },
  {
    id: 'c2',
    title: 'The Craft',
    type: 'Commercial',
    image: '/work-commercial-2.jpg',
    caption: 'Editorial still life capturing texture and artisanal materiality.',
    location: 'Brand Lookbook',
    year: '2024',
    alt: 'Commercial product photography with textured surfaces',
  },
  {
    id: 'c3',
    title: 'Bottled Heritage',
    type: 'Commercial',
    image: '/bottle-photography.jpg',
    caption: 'Atmospheric beverage campaign lit with antique bronze tones.',
    location: 'Commercial Series',
    year: '2024',
    alt: 'Artisan beverage bottle with moody studio lighting',
  },
  {
    id: 'c4',
    title: 'Precision Horology',
    type: 'Commercial',
    image: '/luxury-watch-photography.jpg',
    caption: 'Macro exploration of mechanical artistry and polished steel.',
    location: 'Luxury Campaign',
    year: '2024',
    alt: 'Luxury timepiece macro detail',
  },
  {
    id: 'c5',
    title: 'In Stride',
    type: 'Commercial',
    image: '/sport-shoe-photography.jpg',
    caption: 'Dynamic athletic footwear captured with bold geometric shadows.',
    location: 'Athletics Lookbook',
    year: '2024',
    alt: 'Sport shoe product photography with geometric shadows',
  },

  // ── Lifestyle ──
  {
    id: 'l1',
    title: 'Golden Hour Birthday',
    type: 'Lifestyle',
    image: '/birthday-photo.jpg',
    caption: 'A vibrant outdoor birthday celebration captured at twilight.',
    location: 'Lekki Phase 1, Lagos',
    year: '2024',
    alt: 'Candid outdoor evening birthday celebration',
  },
  {
    id: 'l2',
    title: 'Celebration & Joy',
    type: 'Lifestyle',
    image: '/birthday-photography-2.jpg',
    caption: 'Spontaneous celebration, pure joy, and unscripted laughter.',
    location: 'Private Residence, Ikoyi',
    year: '2024',
    alt: 'Joyful birthday celebration with natural laughter',
  },
  {
    id: 'l3',
    title: 'Studio Glow',
    type: 'Lifestyle',
    image: '/birthday-photography-studio.jpg',
    caption: 'Intimate studio birthday portrait with warm ambient illumination.',
    location: 'Ikeja Studio, Lagos',
    year: '2024',
    alt: 'Studio birthday portrait with warm golden tones',
  },

  // ── Beauty ──
  {
    id: 'b1',
    title: 'Skin & Light',
    type: 'Beauty',
    image: '/skincare-photography.jpg',
    caption: 'Clean botanical skincare highlighted by soft morning daylight.',
    location: 'Botanical Campaign',
    year: '2024',
    alt: 'Minimalist skincare product on marble surface',
  },
  {
    id: 'b2',
    title: 'Bare Essentials',
    type: 'Beauty',
    image: '/skincare-photography-2.jpg',
    caption: 'Organic textures and subtle gradients in serene high-key lighting.',
    location: 'Clean Beauty Editorial',
    year: '2024',
    alt: 'Natural cosmetics in soft diffused daylight',
  },
  {
    id: 'b3',
    title: 'The Daily Ritual',
    type: 'Beauty',
    image: '/skincare-products.jpg',
    caption: 'A complete skincare suite styled with editorial restraint.',
    location: 'Product Narrative',
    year: '2024',
    alt: 'Arrangement of luxury skincare bottles and jars',
  },
  {
    id: 'b4',
    title: 'Sensory Texture',
    type: 'Beauty',
    image: '/product-photography-cream.jpg',
    caption: 'Macro exploration of rich hydrating cream textures.',
    location: 'Texture Study',
    year: '2024',
    alt: 'Close-up macro of skincare cream swirl',
  },
  {
    id: 'b5',
    title: 'Luminous Glow',
    type: 'Beauty',
    image: '/product-photography-2.jpg',
    caption: 'Radiant cosmetic bottle styled with soft reflective highlights.',
    location: 'Beauty Series',
    year: '2024',
    alt: 'Beauty product bottle with soft lighting',
  },

  // ── Accessories ──
  {
    id: 'a1',
    title: 'Artisan Leather',
    type: 'Accessories',
    image: '/leather-bag-1.jpg',
    caption: 'Handcrafted leather goods highlighting patina, grain, and brass hardware.',
    location: 'Atelier Lookbook',
    year: '2024',
    alt: 'Leather bag crafted with artisan detailing',
  },
  {
    id: 'a2',
    title: 'Worn Character',
    type: 'Accessories',
    image: '/leather-bag-2.jpg',
    caption: 'Elegance in every stitch, built to outlast fleeting trends.',
    location: 'Leather Goods',
    year: '2024',
    alt: 'Detailed leather craftsmanship showcase',
  },
  {
    id: 'a3',
    title: 'Architectural Frames',
    type: 'Accessories',
    image: '/glasses-1.jpg',
    caption: 'Minimalist designer eyewear styled on natural textured stone.',
    location: 'Eyewear Editorial',
    year: '2024',
    alt: 'Designer glasses styled on concrete slab',
  },
  {
    id: 'a4',
    title: 'Refined Silhouette',
    type: 'Accessories',
    image: '/glasses-2.jpg',
    caption: 'Tortoiseshell optical frames captured in balanced studio profile.',
    location: 'Lookbook Feature',
    year: '2024',
    alt: 'Tortoiseshell spectacles in refined composition',
  },
]

const filters = ['All', 'Weddings', 'Portraits', 'Commercial', 'Lifestyle', 'Beauty', 'Accessories']
const nav = ['Portfolio', 'About', 'Services', 'Approach', 'Contact']

const testimonials = [
  {
    quote:
      '“Brandon captured our Lagos wedding with such breathtaking intimacy and poise. Looking through our gallery brings every joyful emotion flooding right back.”',
    author: 'Tolu & Femi',
    location: 'Victoria Island, Lagos',
    event: 'Traditional & White Wedding',
  },
  {
    quote:
      '“Brandon’s eye for natural light and cultural depth made our Abuja destination celebration feel like pure cinema. Truly an exceptional artist.”',
    author: 'Zainab & Farouk',
    location: 'Abuja, Nigeria',
    event: 'Destination Wedding',
  },
  {
    quote:
      '“Collaborating with Brandon on our luxury campaign elevated our visual identity entirely. Meticulous, calm, and visionary on set.”',
    author: 'Creative Director, Maison Noir',
    location: 'Lagos / London',
    event: 'Commercial Campaign',
  },
]

const servicesList = [
  {
    number: '01',
    title: 'Weddings & Celebrations',
    summary: 'For couples who value genuine emotion, cultural richness, and timeless beauty.',
    details:
      'Comprehensive coverage for Nigerian traditional weddings, white weddings, and destination celebrations. Includes 35mm film captures, high-resolution digital negatives, online private client gallery, and handcrafted heirloom albums.',
    investment: 'Commissions across Lagos, Abuja & Worldwide',
  },
  {
    number: '02',
    title: 'Editorial & Brand Campaigns',
    summary: 'For brands and creative directors with a distinctive, modern story to tell.',
    details:
      'Art direction collaboration, multi-day studio or on-location production across Nigeria, full commercial licensing, product and lookbook styling, and refined post-production grading.',
    investment: 'Custom proposals based on project scope',
  },
  {
    number: '03',
    title: 'Fine Art Portraits & Private Sessions',
    summary: 'For individuals, artists, and milestones deserving of lasting preservation.',
    details:
      'Unhurried studio or natural light sessions in Lagos or destination locations, fine art direction, digital masters, and bespoke museum-grade archival prints.',
    investment: 'Sessions available in Lagos & Abuja',
  },
]

const approachSteps = [
  {
    num: '01',
    title: 'The Connection',
    desc: 'We begin with an intentional conversation to understand your story, personal dynamic, and the feeling you wish to preserve.',
  },
  {
    num: '02',
    title: 'The Space',
    desc: 'On the day, I cultivate a relaxed, unobtrusive presence so you can be fully immersed in the moment while authentic memories unfold.',
  },
  {
    num: '03',
    title: 'The Alchemy',
    desc: 'Every image is curated and graded with rich film-inspired tones, creating timeless heirlooms that outlast passing trends.',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [showAllInAllTab, setShowAllInAllTab] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [openServiceIdx, setOpenServiceIdx] = useState<number | null>(0)

  const videoRef = useRef<HTMLVideoElement>(null)

  // Ensure instant video autoplay on mount with zero buffer delay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true
            videoRef.current.play().catch(() => {})
          }
        })
      }
    }
  }, [])

  // Scroll reveal hook triggered on filter or expansion change
  useScrollReveal(filter + showAllInAllTab)

  // Auto-advance testimonials every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!selectedImage) return
      if (e.key === 'Escape') setSelectedImage(null)
      if (e.key === 'ArrowRight') navigateLightbox(1)
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filter, showAllInAllTab])

  // Filter computation: in 'All' tab, show initial 4 featured wedding & portrait works unless expanded
  const visibleWork =
    filter === 'All'
      ? showAllInAllTab
        ? workItems
        : workItems.filter((item) => item.featuredInAll)
      : workItems.filter((item) => item.type === filter)

  function navigateLightbox(dir: number) {
    if (!selectedImage) return
    const currentIdx = visibleWork.findIndex((item) => item.id === selectedImage.id)
    if (currentIdx === -1) return
    const nextIdx = (currentIdx + dir + visibleWork.length) % visibleWork.length
    setSelectedImage(visibleWork[nextIdx])
  }

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="overflow-hidden bg-charcoal text-ivory selection:bg-gold selection:text-charcoal font-body">
      {/* ── Header / Navigation (Faded Dark Mist Bar - Step 2 in Sequence) ── */}
      <header className="seq-header absolute inset-x-0 top-0 z-30 border-b border-ivory/10 dark-mist-header text-ivory transition-all duration-300">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          {/* Logo with BP Gold on Black Emblem */}
          <a
            href="#top"
            className="group flex items-center gap-3 transition-opacity hover:opacity-85"
            aria-label="Brandon Photography home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-gold/70 bg-[#15120F] text-gold font-serif text-sm font-semibold tracking-wider shadow-md">
              BP
            </div>
            <span className="font-serif text-xl tracking-tight text-ivory">
              Brandon<span className="text-gold">.</span>
            </span>
          </a>

          {/* Nav Tabs Aligned to the Right */}
          <nav className="hidden items-center gap-8 md:flex ml-auto" aria-label="Main navigation">
            {nav.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:text-gold"
              >
                <span className="mr-2 text-gold">0{index + 1}</span>
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="text-ivory md:hidden ml-auto p-1.5 rounded-[4px] bg-charcoal/40 border border-ivory/10 hover:border-gold/50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Faded Dark Mist Ambiance) */}
        {menuOpen && (
          <nav className="dark-mist-drawer px-6 py-6 md:hidden transition-all duration-300" aria-label="Mobile navigation">
            {nav.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-ivory/10 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-ivory hover:text-gold transition-colors"
              >
                <span>{item}</span>
                <span className="text-gold">0{index + 1}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-5 block w-full bg-gold py-3 text-center font-mono text-xs uppercase tracking-[0.22em] text-charcoal font-medium shadow-md transition-colors hover:bg-bright-gold"
            >
              Start a Conversation
            </a>
          </nav>
        )}
      </header>

      {/* ── 1. Hero Section (Full Viewport Screen with Raised Content Position) ── */}
      <section id="top" className="relative flex min-h-screen items-end bg-charcoal text-ivory">
        {/* Step 1 in Sequence: Ambient Video fades in first */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="seq-video absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle luminous color-grade overlay */}
        <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/10" />

        {/* Step 3 & 4 in Sequence: Title & Action Block */}
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-32 pb-24 md:px-12 md:pb-28 lg:px-16">
          <div className="seq-headline">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Brandon Photography — Nigeria
            </p>

            <h1 className="max-w-5xl font-serif text-[clamp(3.8rem,11vw,10.5rem)] leading-[0.82] tracking-[-0.05em]">
              The art of<br />
              <em className="font-serif italic text-gold">remembering.</em>
            </h1>
          </div>

          {/* Step 4 in Sequence: Subtitle on Left, CTA + Explore Link on Right */}
          <div className="seq-actions mt-8 flex flex-col items-start justify-between gap-6 border-t border-ivory/15 pt-7 md:flex-row md:items-end">
            <p className="max-w-xl font-body text-sm md:text-base leading-relaxed text-ivory/85">
              A fine-art, editorial studio for couples and brands. Weddings, portraits and campaigns made across Nigeria and beyond.
            </p>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-gold bg-gold/90 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal font-medium transition-all duration-300 hover:bg-gold hover:text-charcoal shadow-sm"
              >
                Book Session <ArrowUpRight size={14} />
              </a>

              <a
                href="#portfolio"
                className="group flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold transition-colors"
              >
                Explore the work{' '}
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Philosophy / What I Do (Full Screen Immersive Viewport) ── */}
      <section id="approach" className="relative flex min-h-screen flex-col justify-center bg-ivory px-6 py-24 md:px-12 md:py-32 lg:px-16 text-charcoal">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="reveal grid gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                01 / What I do
              </p>
              <div className="mt-8 space-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal/65">
                <p>· Lagos · Abuja · Worldwide</p>
                <p>· Fine Art &amp; Documentary</p>
                <p>· 35mm &amp; Medium Format Film</p>
              </div>
            </div>

            <div>
              <h2 className="max-w-3xl font-serif text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                Images with a pulse.<br />
                <em className="font-serif italic text-gold">Stories with a soul.</em>
              </h2>

              <p className="mt-8 max-w-xl font-body text-base leading-7 text-charcoal/70 md:text-lg">
                From the quiet in-between moments to grand cultural celebrations across Nigeria and destination spots worldwide, I create photographs that feel deeply genuine. Unrushed, artful, and entirely yours.
              </p>

              {/* 3-Step Narrative Approach */}
              <div className="mt-14 grid gap-8 border-t border-charcoal/15 pt-10 sm:grid-cols-3">
                {approachSteps.map((step) => (
                  <div key={step.num}>
                    <span className="font-mono text-xs text-gold">{step.num}</span>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">{step.title}</h3>
                    <p className="mt-2 font-body text-xs leading-relaxed text-charcoal/65">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#services"
                className="mt-12 inline-flex items-center gap-3 border-b border-gold pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal hover:text-gold transition-colors"
              >
                Discover my approach <ArrowUpRight size={15} className="text-gold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. The Archive / Portfolio Grid with Curated View & Show More ── */}
      <section id="portfolio" className="relative flex min-h-screen flex-col justify-center bg-charcoal px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Header & Filter Controls */}
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                02 / Selected work
              </p>
              <h2 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl tracking-[-0.04em] text-ivory">
                The archive
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item)
                    if (item !== 'All') setShowAllInAllTab(true)
                  }}
                  className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    filter === item ? 'text-gold underline underline-offset-4' : 'text-ivory/45 hover:text-ivory'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Editorial Grid */}
          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {visibleWork.map((item, index) => (
              <article
                key={item.id}
                className={`reveal reveal-delay-${(index % 4) + 1} group cursor-pointer ${
                  index % 2 === 1 && (showAllInAllTab || filter !== 'All') && visibleWork.length > 2 ? 'md:mt-12' : ''
                }`}
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1f1b17] rounded-[2px] border border-ivory/10">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-cover grayscale-[10%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover Overlay with story badge & expand icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-6">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                        {item.location} · {item.year}
                      </p>
                      <p className="font-serif text-lg text-ivory">{item.title}</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/80 text-gold backdrop-blur-md">
                      <Maximize2 size={15} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between border-t border-ivory/15 pt-3">
                  <div>
                    <h3 className="font-serif text-2xl text-ivory group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-sm italic text-ivory/50">{item.caption}</p>
                  </div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/40">
                    {item.type}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Show More / Show Less Toggle Button for Archive */}
          {filter === 'All' && (
            <div className="reveal mt-16 text-center">
              <button
                onClick={() => setShowAllInAllTab(!showAllInAllTab)}
                className="inline-flex items-center gap-3 border border-gold/70 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
              >
                <span>{showAllInAllTab ? 'Show Curated Selection' : 'View Complete Archive (+)'}</span>
                {showAllInAllTab ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. About Section (Full Screen Viewport for Nigerian Photographer) ── */}
      <section id="about" className="relative flex min-h-screen flex-col justify-center bg-[#181512] px-6 py-24 text-ivory md:px-12 md:py-36 lg:px-16 border-t border-ivory/10">
        <div className="reveal mx-auto w-full max-w-[1440px] grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-24">
          <div className="relative aspect-[4/5] md:max-w-md overflow-hidden rounded-[2px] border border-ivory/15 shadow-2xl">
            <Image
              src="/photographer.jpg"
              alt="Brandon, professional Nigerian photographer based in Lagos"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute bottom-4 left-4 bg-charcoal/90 px-3.5 py-2 border border-ivory/15 flex items-center gap-2.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-[2px] border border-gold/60 bg-charcoal text-gold font-serif text-[10px] font-semibold">
                BP
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">
                Brandon · Lagos, Nigeria
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              03 / A little about me
            </p>

            <h2 className="mt-5 font-serif text-5xl sm:text-6xl md:text-8xl leading-[0.9] tracking-[-0.04em]">
              Hi, I&apos;m<br />
              <em className="font-serif italic text-gold">Brandon.</em>
            </h2>

            <p className="mt-8 max-w-lg font-body text-base leading-7 text-ivory/85 md:text-lg">
              A Nigerian fine-art and editorial photographer based in Lagos. I believe the most enduring photographs are never rigidly posed — they are deeply felt, culturally rich, and naturally lit.
            </p>

            <p className="mt-4 max-w-lg font-body text-sm leading-6 text-ivory/65">
              From traditional Nigerian celebrations and luxury weddings in Lagos and Abuja to brand editorials and destination assignments across Africa and worldwide, my goal is to hold space for the authentic, unscripted moments that become heirlooms.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gold px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal font-medium hover:bg-bright-gold transition-colors"
              >
                Let&apos;s create together <ArrowUpRight size={15} />
              </a>
              <a
                href="#portfolio"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/75 hover:text-gold transition-colors"
              >
                View Selected Work →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Services & The Offering (Full Screen Viewport) ── */}
      <section id="services" className="relative flex min-h-screen flex-col justify-center bg-ivory px-6 py-24 text-charcoal md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
            04 / The offering
          </p>

          <h2 className="mt-4 max-w-3xl font-serif text-5xl sm:text-6xl md:text-8xl leading-[0.9] tracking-[-0.04em]">
            Made for the<br />
            <em className="font-serif italic text-gold">meaningful.</em>
          </h2>

          <div className="mt-16 divide-y divide-charcoal/15 border-y border-charcoal/15">
            {servicesList.map((service, index) => {
              const isOpen = openServiceIdx === index
              return (
                <div
                  key={service.number}
                  className="py-8 transition-colors duration-300 cursor-pointer group"
                  onClick={() => setOpenServiceIdx(isOpen ? null : index)}
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_3fr_2fr_auto] md:items-center">
                    <span className="font-mono text-xs text-gold">{service.number}</span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-charcoal group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="max-w-xs font-body text-sm leading-6 text-charcoal/70">
                      {service.summary}
                    </p>
                    <span className="font-mono text-xs text-gold font-bold">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>

                  {/* Expandable Inclusions Details */}
                  {isOpen && (
                    <div className="mt-6 grid gap-6 border-t border-charcoal/10 pt-6 md:grid-cols-[1fr_3fr_2fr_auto]">
                      <div />
                      <div className="font-body text-sm leading-relaxed text-charcoal/80">
                        <p className="font-semibold text-charcoal uppercase font-mono text-[10px] tracking-wider mb-2">
                          What is included:
                        </p>
                        <p>{service.details}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-mono text-xs text-gold font-medium">
                          {service.investment}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <a
                          href="#contact"
                          className="font-mono text-[9px] uppercase tracking-[0.2em] text-charcoal underline hover:text-gold"
                        >
                          Inquire Now
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials (Fixed Height Viewport Container — No Shifting / Jumping) ── */}
      <section className="relative flex min-h-screen flex-col justify-center bg-gold px-6 py-24 text-charcoal md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/70">
            05 / Kind words
          </p>

          {/* Fixed-Height Quote Box to Guarantee Window Ratio Stability */}
          <div className="mt-8 flex min-h-[260px] md:min-h-[220px] flex-col justify-center items-center">
            <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-[-0.02em] text-charcoal transition-opacity duration-300">
              {testimonials[testimonialIdx].quote}
            </blockquote>

            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] font-medium text-charcoal">
                — {testimonials[testimonialIdx].author}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/70">
                {testimonials[testimonialIdx].location} · {testimonials[testimonialIdx].event}
              </p>
            </div>
          </div>

          {/* Testimonial Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() =>
                setTestimonialIdx(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    testimonialIdx === i ? 'w-6 bg-charcoal' : 'w-2 bg-charcoal/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
              }
              className="p-2 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. Contact / Start a Conversation (Full Screen Viewport) ── */}
      <section id="contact" className="relative flex min-h-screen flex-col justify-center bg-charcoal px-6 py-24 md:px-12 md:py-36 lg:px-16 border-t border-ivory/10">
        <div className="reveal mx-auto w-full max-w-[1440px] grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-24 items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              06 / Start a conversation
            </p>

            <h2 className="mt-5 font-serif text-5xl sm:text-7xl md:text-9xl leading-[0.85] tracking-[-0.05em] text-ivory">
              Let&apos;s make<br />
              <em className="font-serif italic text-gold">magic.</em>
            </h2>

            <p className="mt-8 max-w-sm font-body text-sm leading-6 text-ivory/70">
              Tell me about what you&apos;re dreaming up. Whether it’s a wedding in Lagos, an editorial campaign in Abuja, or a destination project worldwide, I&apos;ll be in touch within 24 to 48 hours.
            </p>

            <div className="mt-8 space-y-2 border-t border-ivory/15 pt-6 font-mono text-xs text-ivory/70">
              <p>Email: <a href="mailto:hello@brandonphotography.ng" className="text-gold hover:underline">hello@brandonphotography.ng</a></p>
              <p>Studio: Victoria Island / Lekki, Lagos, Nigeria</p>
              <p>Available across Nigeria &amp; Worldwide</p>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="border border-gold/40 bg-[#1e1a16] p-8 md:p-12 text-center rounded-[2px]">
                <p className="font-serif text-4xl text-gold">Thank you.</p>
                <p className="mt-4 font-body text-sm leading-6 text-ivory/80">
                  Your note is on its way. I look forward to reading your vision and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-block border border-gold/60 px-6 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-charcoal transition-all"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className="border-t border-ivory/15 space-y-2">
                {[
                  ['name', 'Your name *', 'text'],
                  ['email', 'Email address *', 'email'],
                  ['date', 'Event date / project timeline', 'text'],
                  ['location', 'Location / City (e.g. Lagos, Abuja, Destination)', 'text'],
                ].map(([id, label, type]) => (
                  <label key={id} className="block border-b border-ivory/15 py-4">
                    <span className="sr-only">{label}</span>
                    <input
                      required={label.includes('*')}
                      type={type}
                      name={id}
                      placeholder={label}
                      className="w-full bg-transparent font-serif text-xl md:text-2xl text-ivory outline-none placeholder:text-ivory/35 focus:placeholder:text-ivory/20"
                    />
                  </label>
                ))}

                <label className="block border-b border-ivory/15 py-4">
                  <span className="sr-only">Tell me more about your story</span>
                  <textarea
                    required
                    name="message"
                    placeholder="Tell me about your vision, aesthetic, or questions *"
                    rows={4}
                    className="w-full resize-none bg-transparent font-serif text-xl md:text-2xl text-ivory outline-none placeholder:text-ivory/35 focus:placeholder:text-ivory/20"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-3 bg-gold px-8 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal font-medium transition-colors hover:bg-bright-gold"
                >
                  Send inquiry <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 8. Comprehensive Editorial Footer with Social Icons & Navigation ── */}
      <footer className="border-t border-ivory/15 bg-[#100e0c] px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 border-b border-ivory/10 pb-16 lg:grid-cols-12">
            {/* Col 1: Brand Emblem & Mission */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-gold/80 bg-charcoal text-gold font-serif text-base font-semibold tracking-wider">
                  BP
                </div>
                <span className="font-serif text-2xl tracking-tight text-ivory">
                  Brandon Photography<span className="text-gold">.</span>
                </span>
              </div>
              <p className="max-w-sm font-body text-sm leading-relaxed text-ivory/70">
                An editorial, fine-art photography practice documenting human intimacy, authentic culture, and refined aesthetics across Nigeria and destination locations globally.
              </p>

              {/* Social Icons Bar */}
              <div className="pt-2 flex items-center gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  aria-label="Pinterest"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12a4 4 0 0 1 8 0c0 2.5-2 4-4 4" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  aria-label="X Twitter"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2348030000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                  aria-label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Portfolios Navigation */}
            <div className="lg:col-span-2 space-y-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <p className="text-gold font-medium">Archive</p>
              <div className="flex flex-col gap-2 text-ivory/60">
                <a href="#portfolio" className="hover:text-gold transition-colors">Weddings</a>
                <a href="#portfolio" className="hover:text-gold transition-colors">Portraits</a>
                <a href="#portfolio" className="hover:text-gold transition-colors">Commercial</a>
                <a href="#portfolio" className="hover:text-gold transition-colors">Lifestyle</a>
                <a href="#portfolio" className="hover:text-gold transition-colors">Beauty</a>
              </div>
            </div>

            {/* Col 3: Studio Navigation */}
            <div className="lg:col-span-2 space-y-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <p className="text-gold font-medium">Studio</p>
              <div className="flex flex-col gap-2 text-ivory/60">
                <a href="#about" className="hover:text-gold transition-colors">About Brandon</a>
                <a href="#approach" className="hover:text-gold transition-colors">Philosophy</a>
                <a href="#services" className="hover:text-gold transition-colors">Offerings</a>
                <a href="#contact" className="hover:text-gold transition-colors">Inquiries</a>
              </div>
            </div>

            {/* Col 4: Studio Location & Direct Contact */}
            <div className="lg:col-span-3 space-y-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <p className="text-gold font-medium">Direct Line</p>
              <div className="flex flex-col gap-2 text-ivory/70">
                <p>Lagos Studio · VI / Lekki</p>
                <a href="mailto:hello@brandonphotography.ng" className="hover:text-gold transition-colors">
                  hello@brandonphotography.ng
                </a>
                <p className="text-ivory/50">Commissions: Nigeria &amp; Destination</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="mt-8 flex flex-col justify-between gap-4 text-center md:flex-row md:items-center md:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/45">
              © 2025 Brandon Photography · Lagos, Nigeria · All Rights Reserved
            </p>

            <a
              href="#top"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold hover:underline"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* ── Interactive Split-View Lightbox Modal (Picture on one side, subtext on the other) ── */}
      {selectedImage && (() => {
        const currentIdx = visibleWork.findIndex((item) => item.id === selectedImage.id)
        const countDisplay = `${String(currentIdx + 1).padStart(2, '0')} / ${String(visibleWork.length).padStart(2, '0')}`

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xl p-3 sm:p-6 md:p-10 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative flex flex-col md:flex-row w-full max-w-[1240px] max-h-[92vh] overflow-y-auto md:overflow-hidden rounded-[6px] border border-ivory/20 bg-[#171411] shadow-[0_25px_90px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(0,0,0,0.7)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Floating on Top Right */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/80 border border-ivory/20 text-ivory/80 hover:bg-charcoal hover:border-gold hover:text-gold transition-all shadow-lg"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* ── Side 1: Large Image Frame ── */}
              <div className="relative w-full md:w-[62%] lg:w-[66%] min-h-[42vh] sm:min-h-[50vh] md:min-h-[78vh] bg-black/60 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-ivory/15">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  fill
                  priority
                  className="object-contain p-2 md:p-6"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 850px"
                />
              </div>

              {/* ── Side 2: Subtext / Narrative Details Panel ── */}
              <div className="w-full md:w-[38%] lg:w-[34%] flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-[#171411] overflow-y-auto">
                {/* Header Category & Index */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-ivory/10 pb-4 pr-10">
                    <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold font-medium">
                      {selectedImage.type}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                      {countDisplay}
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="pt-2">
                    <h3 className="font-serif text-3xl sm:text-4xl leading-[1.05] tracking-tight text-ivory">
                      {selectedImage.title}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                      {selectedImage.location} <span className="text-gold">·</span> {selectedImage.year}
                    </p>
                  </div>

                  {/* Story Caption Narrative */}
                  <div className="py-4 border-y border-ivory/10">
                    <p className="font-body text-base sm:text-lg italic leading-relaxed text-ivory/85">
                      “{selectedImage.caption}”
                    </p>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">
                      35mm &amp; Medium Format Curation
                    </p>
                  </div>
                </div>

                {/* Footer Navigation & Inquiry Action */}
                <div className="mt-8 pt-4 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                      Navigate Archive
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateLightbox(-1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold transition-colors"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => navigateLightbox(1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 hover:border-gold hover:text-gold transition-colors"
                        aria-label="Next photo"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setSelectedImage(null)}
                    className="block w-full bg-gold py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal font-medium shadow-md transition-colors hover:bg-bright-gold"
                  >
                    Inquire About This Work
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </main>
  )
}
