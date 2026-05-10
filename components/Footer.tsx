import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 lg:pt-32 overflow-hidden flex flex-col relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          
          {/* Left: Contact Info & Socials */}
          <div className="flex flex-col gap-10">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <Link href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Link>
              {/* Using X / Twitter */}
              <Link href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <span className="font-bold text-lg leading-none">X</span>
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </Link>
            </div>

            {/* Address */}
            <div className="text-white/80 font-light text-lg space-y-1">
              <p>9 Pearse Street, Kinsale</p>
              <p>York, China</p>
            </div>
          </div>

          {/* Right: Links & Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            
            {/* Col 1: Our Pages */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium tracking-widest uppercase mb-4 text-white">Our Pages</h4>
              <Link href="#" className="text-white/60 hover:text-white transition-colors font-light">About</Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors font-light">Services</Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors font-light">Industries</Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors font-light">Contact</Link>
            </div>

            {/* Col 2: Contact Number */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium tracking-widest uppercase mb-4 text-white">Contact</h4>
              <p className="text-white/60 font-light">(+12) 808 130 1190</p>
            </div>

            {/* Col 3: Email */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium tracking-widest uppercase mb-4 text-white">Email</h4>
              <p className="text-white/60 font-light break-all">info@accurizon.com</p>
            </div>

          </div>
        </div>

        {/* Divider line with centered button */}
        <div className="relative w-full h-[1px] bg-white/20 mb-12">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0a0a0a] pl-6">
            <Link href="#" className="inline-flex bg-white  px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors">
              <span className="text-black">Get Started</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-4">
          
          {/* Bottom Paragraph */}
          <div className="max-w-[35vw]">
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Transforming complex challenges into scalable digital solutions. Our expert team is here to elevate your brand and connect you with your audience.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-8 text-white/60 text-xs font-medium tracking-widest uppercase">
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>

      {/* Massive Bottom Text */}
      <div className="w-full flex justify-center items-end mt-auto pointer-events-none select-none translate-y-[15%]">
        <h1 className="text-[18vw] leading-[0.75] font-black tracking-tighter text-white/[0.4]  whitespace-nowrap">
          Accurizon.
        </h1>
      </div>
    </footer>
  );
}
