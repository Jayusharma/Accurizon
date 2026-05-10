"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Track mouse for the dynamic inner glow
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stagger text elements on left
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        });
      }

      // Fade in right side text
      if (rightSideRef.current) {
        gsap.from(rightSideRef.current.children, {
          scrollTrigger: {
            trigger: rightSideRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        });
      }

      // Pop in magnetic button
      if (buttonWrapperRef.current) {
        gsap.fromTo(buttonWrapperRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "back.out(1.5)"
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!circleRef.current || !contentRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    
    // Distance from center of the circle
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Percentage for background glow position
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: pctX, y: pctY });

    // Magnetic pull for the circle
    gsap.to(circleRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: "power2.out",
    });

    // Parallax effect for the inner text
    gsap.to(contentRef.current, {
      x: x * 0.5,
      y: y * 0.5,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!circleRef.current || !contentRef.current) return;
    
    // Reset glow position to center
    setMousePos({ x: 50, y: 50 });

    // Bounce back to original position
    gsap.to([circleRef.current, contentRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-40 overflow-hidden ">
      {/* Top Divider Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 lg:gap-8">
          
          {/* Left Side: Huge Typography */}
          <div ref={textRef} className="flex-1 w-full uppercase font-bold text-black leading-[0.85] tracking-tighter text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] xl:text-[11rem] pointer-events-none">
            {/* First Line */}
            <div className="flex items-center">
              LET&apos;S WORK
              <div className="w-3 h-3 md:w-5 md:h-5 lg:w-7 lg:h-7 bg-blue-600 rounded-full ml-4 md:ml-6 lg:ml-8 translate-y-2 md:translate-y-4" />
            </div>
            
            {/* Second Line with Inline Image */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-4">
              <div className="relative w-20 h-12 sm:w-28 sm:h-16 md:w-40 md:h-24 lg:w-48 lg:h-32 rounded-xl md:rounded-2xl border-4 overflow-hidden shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <span>TOGETHER</span>
            </div>
          </div>

          {/* Right Side: Text & Magnetic Button */}
          <div ref={rightSideRef} className="w-full lg:w-auto flex flex-col justify-start items-start z-20 mt-8 lg:mt-0 lg:ml-12 lg:pt-12">
           

            <div ref={buttonWrapperRef} className="relative -ml-4 md:-ml-8">
              <Link href="/contact" className="block relative z-10">
                <div 
                  ref={circleRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="group relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-[10rem] lg:h-[10rem] rounded-full border border-black/10 overflow-hidden cursor-pointer bg-[#0a0a0a] transition-all duration-500 hover:bg-black shadow-2xl"
                >
                  
                  {/* Dynamic subtle background glow that follows the mouse */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
                    }}
                  />

                  {/* Inner ring that scales up on hover */}
                  <div className="absolute inset-4 rounded-full border border-white/5 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none" />

                  {/* Inner text and icon container with parallax */}
                  <div ref={contentRef} className="relative flex items-center justify-center w-full h-full z-10 pointer-events-none">
                    <span className="absolute text-white font-medium tracking-wide text-sm md:text-base lg:text-lg opacity-100 group-hover:opacity-0 transition-all duration-500 uppercase transform group-hover:scale-75 group-hover:translate-y-4">
                      Say Hello
                    </span>
                    <ArrowRight className="absolute w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100 -translate-y-4 group-hover:translate-y-0 -rotate-45 group-hover:rotate-0" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
