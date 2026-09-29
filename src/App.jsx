import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const statsRef = useRef(null);
    const imageRef = useRef(null);

    // Initialize smooth scrolling with Lenis 
    // strictly bound to GSAP ticker to prevent duplicate RAF loops
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            direction: 'vertical',
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const tickerFn = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0, 0);

        return () => {
            // Clean up to prevent memory leaks and duplicate instances
            lenis.destroy();
            gsap.ticker.remove(tickerFn);
        };
    }, []);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        // Use matchMedia to cleanly separate mobile vs desktop scaling constraints
        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            // 1. Initial Load Animation
            const tl = gsap.timeline();

            // Animate headline letters in with stagger and refined 3D easing
            tl.fromTo('.headline-word', {
                y: 100,
                rotateX: -90,
                opacity: 0,
            }, {
                y: 0,
                rotateX: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power4.out',
            })
                // Animate stats in one by one overlapping slightly
                .fromTo('.stat-item', {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                }, "-=0.7");

            // 2. Scroll-Based Animation (Tied linearly to scroll using scrub: 1)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1, // Linear 1:1 scrub interpolation 
                }
            });

            // "none" easing ensures motion feels explicitly linked to the user's scroll
            scrollTl.to(imageRef.current, {
                scale: isMobile ? 2.5 : 4.5, // Adjusted to avoid breaking mobile overflow
                y: isMobile ? "5vh" : "25vh",
                ease: 'none'
            }, 0)
                .to('.hero-content', {
                    opacity: 0,
                    y: -150,
                    scale: 0.95,
                    ease: 'none'
                }, 0)
                .to('.bg-overlay', {
                    opacity: 1,
                    ease: 'none'
                }, 0);

        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full h-[350vh] bg-[#030303] text-white font-inter">
            {/* Scroll Progress Container (Sticky) */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center perspective-[1000px]">

                {/* Abstract Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none transform-gpu"></div>
                <div className="bg-overlay absolute inset-0 bg-[#030303] opacity-0 z-0 pointer-events-none transform-gpu"></div>

                {/* The Main Visual Object (Car/Image) */}
                <div ref={imageRef} className="absolute inset-0 z-10 flex justify-center items-center pointer-events-none transform-gpu origin-center mt-[10vh] md:mt-[15vh]">
                    <div className="relative w-[90vw] md:w-[60vw] max-w-[1000px] aspect-[4/3] md:aspect-[16/9] rounded-[2rem] md:rounded-[3xl] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] border border-white/5 transform-gpu">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-70 md:opacity-90"></div>
                        <img
                            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
                            alt="Luxury Sports Car"
                            className="w-full h-full object-cover select-none transform-gpu"
                        />
                    </div>
                </div>

                {/* Foreground Title & Stats */}
                <div className="hero-content relative z-20 w-full flex flex-col items-center text-center px-4 mt-auto mb-[8vh] md:mb-[15vh] transform-gpu">
                    {/* Headline */}
                    <h1 ref={headlineRef} className="text-white text-[11vw] md:text-7xl lg:text-8xl font-orbitron font-black tracking-widest flex justify-center flex-wrap mb-8 md:mb-14 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] leading-[1.1] max-w-[1200px]">
                        {"WELCOME ITZ FIZZ".split('').map((char, index) => (
                            <span key={index} className="block overflow-visible" style={{ perspective: '800px' }}>
                                {char === ' ' ? (
                                    <span className="w-[3vw] md:w-8 block">&nbsp;</span>
                                ) : (
                                    <span className="headline-word block transform-gpu origin-bottom filter drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 will-change-transform">
                                        {char}
                                    </span>
                                )}
                            </span>
                        ))}
                    </h1>

                    {/* Stats Section */}
                    <div ref={statsRef} className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-16 backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl md:rounded-full py-6 px-6 md:px-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu">
                        <div className="stat-item flex flex-col items-center min-w-[70px]">
                            <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-200 transform-gpu">98%</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-2 tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold">Aerodynamics</span>
                        </div>
                        {/* Divider */}
                        <div className="stat-item hidden md:block w-px h-12 bg-white/10 mx-2"></div>
                        <div className="stat-item flex flex-col items-center min-w-[70px]">
                            <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-200 transform-gpu">1.8s</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-2 tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold">0-60 MPH</span>
                        </div>
                        {/* Divider */}
                        <div className="stat-item hidden md:block w-px h-12 bg-white/10 mx-2"></div>
                        <div className="stat-item flex flex-col items-center min-w-[70px]">
                            <span className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-yellow-200 transform-gpu">250+</span>
                            <span className="text-[9px] md:text-xs text-gray-400 mt-2 tracking-[0.2em] md:tracking-[0.3em] uppercase font-semibold">Top Speed</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* End section for extended scrolling area */}
            <div className="relative z-10 w-full h-[100vh] bg-[#030303] flex justify-center items-start pt-[30vh]">
                <h2 className="text-3xl md:text-6xl font-orbitron font-bold text-gray-700 uppercase tracking-widest text-center px-4">
                    Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Motion</span>
                </h2>
            </div>
        </div>
    )
}
