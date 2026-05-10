import Link from "next/link";

export default function FixedContactButton() {
  return (
    <Link
      href="/contact"
      aria-label="Open contact page"
      className="group fixed right-0 top-1/2 z-50 flex h-16 w-16 -translate-y-1/2 items-center justify-start overflow-hidden rounded-l-2xl border border-white/10 bg-black/65 text-white shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-sm transition-[width,height,transform,box-shadow,background-color] duration-300 ease-out hover:h-20 hover:w-40 hover:-translate-y-1/2  hover:shadow-[0_24px_50px_rgba(15,23,42,0.34)]"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-0.5 rotate-45">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color="#ffffffc2"
        >
          <path d="M12 19V5" />
          <path d="m6 11 6-6 6 6" />
        </svg>
      </span>
      <span className="pr-5 text-sm text-white font-semibold uppercase tracking-[0.22em] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        Contact
      </span>
    </Link>
  );
}
