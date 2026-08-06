import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function ClarityPro() {
  usePageMeta({
    title: "Clarity Pro™ — Strategic Clarity & Content System | Kingdom Solutions AI™",
    description: "Clarity Pro™ helps new coaches, founders, and consultants clarify their niche, build a strong offer, develop their business voice, and create a content strategy. Three tiers from self-guided to full buildout.",
    canonicalUrl: "https://kingdomsolutionsai.com/clarity-pro",
    ogImage: "https://kingdomsolutionsai.com/assets/clarity-visual_f897fefc.png",
  });
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    clarityNeed: "",
    background: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.forms.submitClarityProIntake.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div ref={revealRef}>
      {/* Hero — dark, matching Constance's visual system */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url(/assets/clarity-visual_f897fefc.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 fade-up">
              <p className="editorial-label mb-6">AI Business Clarity Strategist</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-cream-dark leading-
