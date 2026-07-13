import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Gold accent */}
        <div className="w-12 h-[2px] bg-gold mx-auto mb-10" />



        <h1 className="font-display text-5xl sm:text-6xl font-medium text-charcoal mb-4">
          404
        </h1>

        <h2 className="font-display text-2xl sm:text-3xl font-medium text-charcoal mb-6">
          Page Not Found
        </h2>

        <p className="font-body text-lg text-charcoal-light leading-relaxed mb-12 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved. Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href="/"
            className="bg-charcoal text-cream-dark font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase px-8 py-4 inline-flex items-center gap-3 transition-all duration-300 hover:bg-charcoal/90 active:scale-[0.97]"
          >
            Return Home <ArrowRight size={15} />
          </Link>
          <Link
            href="/capacity-leak-audit"
            className="font-body text-[0.82rem] font-medium text-charcoal/60 hover:text-gold inline-flex items-center gap-2 transition-colors duration-300"
          >
            Take the Capacity Leak Audit™ <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
