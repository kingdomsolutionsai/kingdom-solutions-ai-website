import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { usePageMeta } from "@/hooks/usePageMeta";

const mainButton = "inline-flex items-center justify-center gap-3 bg-[#c9a358] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#111114] transition hover:bg-[#e0bc75] disabled:opacity-55";

export default function VideoExperience() {
  usePageMeta({
    title: "Build in the Right Order™ | Free Video Experience | Kingdom Solutions AI",
    description: "Watch a selected educational experience from Tabitha Rector's webinar and learn how to identify your business's next right step.",
    canonicalUrl: "https://www.kingdomsolutionsai.com/video-experience",
    ogImage: "https://www.kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const [form, setForm] = useState({ firstName: "", email: "", marketingConsent: false, companyUrl: "" });
  const [sent, setSent] = useState(false);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const source = (params.get("utm_source") || params.get("source") || "website").slice(0, 60);
  const mutation = trpc.videoExperience.requestAccess.useMutation({
    onSuccess: () => setSent(true),
  });
  return <div className="min-h-screen bg-[#101012] text-[#f6f2e9]">
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-44">
      <div>
        <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[#c9a358]">Kingdom Solutions AI™ · Complimentary teaching</p>
        <div className="mb-8 h-px w-20 bg-[#c9a358]" />
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">You've been building your business. <em className="text-[#c9a358]">But have you been building it in the right order?</em></h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#dad2c4]">More effort, more platforms, and more tools won't always solve the problem that matters most. Discover how to identify where to begin, with clarity and human authority intact.</p>
        <p className="mt-7 text-sm leading-relaxed text-[#bdaf95]">A selected, approximately 18-minute educational experience from the October 20 webinar with Tabitha Rector. Includes an exercise you can apply to your own business.</p>
        <p className="mt-8 text-sm font-medium tracking-wide text-[#c9a358]">Clarity before complexity. Capacity before scale. Human authority throughout.</p>
      </div>
      <div className="border border-[#b18b46]/50 bg-[#1b1b1d] p-7 shadow-2xl sm:p-10">
        {sent ? <div role="status">
          <CheckCircle2 className="mb-6 text-[#c9a358]" size={36} />
          <h2 className="font-display text-3xl">Check your email.</h2>
          <p className="mt-5 leading-relaxed text-[#d9d2c7]">We sent a confirmation link to the address you entered. Open the email and select <strong>Confirm and watch</strong> to access your private video experience.</p>
          <p className="mt-5 text-sm text-[#bdb4a7]">If you don't see it, check your spam or promotions folder.</p>
        </div> : <>
          <LockKeyhole className="mb-5 text-[#c9a358]" size={28}/>
          <h2 className="font-display text-3xl">Watch the free experience</h2>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-[#d9d2c7]">Enter your first name and email. We'll send a verification link so you can watch.</p>
          <form onSubmit={e => { e.preventDefault(); mutation.mutate({ ...form, source }); }} className="space-y-5">
            <label className="block text-sm">First name
              <input autoComplete="given-name" required maxLength={80} value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} className="mt-2 w-full border border-[#706348] bg-[#101012] p-3 text-[#fff] focus:outline-[#c9a358]" />
            </label>
            <label className="block text-sm">Email
              <input type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-2 w-full border border-[#706348] bg-[#101012] p-3 text-[#fff] focus:outline-[#c9a358]" />
            </label>
            <input aria-hidden="true" tabIndex={-1} autoComplete="off" name="companyUrl" className="absolute -left-[9999px]" value={form.companyUrl} onChange={e=>setForm({...form,companyUrl:e.target.value})}/>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-[#e5decf]">
              <input type="checkbox" checked={form.marketingConsent} onChange={e=>setForm({...form,marketingConsent:e.target.checked})} className="mt-1 accent-[#c9a358]"/>
              <span>I'd also like occasional business-building insights and invitations from Kingdom Solutions AI. <strong>Optional.</strong></span>
            </label>
            <button type="submit" disabled={mutation.isPending} className={mainButton}>{mutation.isPending ? "Sending your link…" : "Send my viewing link"} <ArrowRight size={16}/></button>
            {mutation.error && <p role="alert" className="text-sm text-rose-300">{mutation.error.message}</p>}
          </form>
          <p className="mt-6 text-xs leading-relaxed text-[#bdb4a7]">Your viewing link is sent only to verify your email and grant access. Optional updates are not required. <Link href="/privacy" className="underline hover:text-[#c9a358]">Privacy policy</Link>.</p>
        </>}
      </div>
    </section>
    <section className="border-t border-[#9a7d46]/30 bg-[#171719] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c9a358]">Inside the experience</p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {[
            ["01","See the gaps","Understand what can keep a capable entrepreneur working hard without seeing progress."],
            ["02","Identify your first fix","Explore eight business systems and rate what's strongest and weakest today."],
            ["03","Build in the right order","Learn how Diagnose → Clarify → Build → Activate creates a more focused next step."],
          ].map(([number,title,body])=><div key={number} className="border-t border-[#c9a358]/50 pt-6"><p className="text-xs text-[#c9a358]">{number}</p><h3 className="mt-3 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#d2c9b9]">{body}</p></div>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-6 py-16 text-center">
      <h2 className="font-display text-3xl">Prefer a live experience?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-[#d0c7b8]">Our live webinar registration is separate from this on-demand experience, so you can choose the format that suits you.</p>
      <a href="https://whatentrepreneursneedtoknow.com" className="mt-7 inline-flex items-center gap-2 text-[#c9a358] underline">Explore the upcoming live webinar <ArrowRight size={16}/></a>
    </section>
  </div>;
}

export function VideoExperienceWatch() {
  usePageMeta({
    title: "Your Private Viewing | Build in the Right Order™",
    description: "Your private Kingdom Solutions AI video experience.",
    canonicalUrl: "https://www.kingdomsolutionsai.com/video-experience/watch",
    ogImage: "https://www.kingdomsolutionsai.com/assets/ksai-logo-transparent-400_82fa1f46.png",
  });
  const ticket = new URLSearchParams(window.location.search).get("ticket") || "";
  const mutation = trpc.videoExperience.redeemAccess.useMutation();
  useEffect(() => {
    const robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex,nofollow");
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);
  useEffect(() => {
    if (ticket) mutation.mutate({ticket});
    // Only redeem on initial navigation, not upon mutation state updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);
  return <main className="min-h-screen bg-[#101012] px-6 pb-24 pt-36 text-[#f6f2e9]">
    <div className="mx-auto max-w-5xl">
      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#c9a358]">Kingdom Solutions AI™ · Verified access</p>
      <h1 className="font-display text-4xl md:text-5xl">Build in the Right Order™</h1>
      {(!ticket || mutation.error) && <div role="alert" className="mt-8 border border-[#9a7d46] p-6">
        <p>{mutation.error?.message || "A confirmation link is required."}</p>
        <Link href="/video-experience" className="mt-5 inline-flex text-[#c9a358] underline">Request an access link</Link>
      </div>}
      {mutation.isPending && <p role="status" className="mt-8">Verifying your access…</p>}
      {mutation.data && <div className="mt-9">
        <p className="mb-6 text-lg text-[#d8cdbb]">Welcome, {mutation.data.firstName}. Your email is confirmed.</p>
        {mutation.data.ready ?
          <div className="overflow-hidden border border-[#c9a358]/50 bg-black">
            <video className="w-full" controls playsInline preload="metadata" controlsList="nodownload" src={mutation.data.videoUrl}>Your browser doesn't support HTML5 video.</video>
          </div> :
          <div className="rounded-sm border border-[#c9a358]/50 bg-[#1b1b1d] p-8">
            <PlayCircle size={38} className="text-[#c9a358]"/>
            <h2 className="mt-4 font-display text-3xl">Your access is confirmed.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#d8cdbb]">The curated video is being prepared. Your registration is separate from the live webinar. We'll post the final reviewed experience here as soon as the video is ready.</p>
          </div>}
        <div className="mt-12 border-t border-[#c9a358]/30 pt-9">
          <p className="text-xs uppercase tracking-[0.16em] text-[#c9a358]">Your next right step</p>
          <h2 className="mt-4 font-display text-3xl">Ready to move from insight into implementation?</h2>
          <p className="mt-3 text-[#d8cdbb]">Explore the 30-Day Business Fast Track™ and build a clear offer, sales-ready message, and practical revenue path.</p>
          <Link href="/business-fast-track" className={mainButton+" mt-6"}>Explore Business Fast Track <ArrowRight size={16}/></Link>
        </div>
      </div>}
    </div>
  </main>;
}
