# Victor's Circle Leadership Academy — Copy Update

File: `client/src/pages/VictorsCircleLeadershipAcademy.tsx`
Scope: Eyebrow text, hero description, "Is This You?" section, new "What You'll Walk Away With" section, and "What's Included" list only.
**Unchanged, do not touch:** page title, tagline ("Grow in wisdom. Lead with peace. Rise with strength."), "30-day" program length, the Four-Week Journey section, pricing, application form, footer.

`className` values below are placeholders — swap them for whatever classNames the existing JSX in that file uses so styling doesn't break. Structure is what matters. (Send me the current JSX for these 5 spots if you want an exact line-for-line diff instead of a drop-in block.)

---

## 1. Eyebrow text

```tsx
<div className="eyebrow">Premier Program · For Christian Women Carrying Real Leadership Responsibility</div>
```

---

## 2. Hero description

```tsx
<p className="hero-description">
  A Christ-centered formation space for Christian women carrying real leadership
  responsibility — founders, executives, coaches, and ministry leaders
  navigating growth and transition. A 30-day reset that strengthens your decisions,
  your boundaries, and your leadership presence — so you lead from a settled
  place instead of overextension.
</p>
```

---

## 3. "Is This You?" section

```tsx
<section className="is-this-you">
  <h2>Is This You?</h2>
  <p className="lead-in">
    This is for you if you're already carrying real responsibility — as a
    founder, an executive, a coach or consultant, or a leader in your ministry
    or organization.
  </p>
  <ul className="checklist">
    <li>You're the one people come to when a decision has to get made.</li>
    <li>You're leading through real pressure — growth, transition, or a season asking more of you than the last one did.</li>
    <li>You want to lead from decisiveness and settled confidence, not second-guessing or overextension.</li>
    <li>You want your leadership to be sustainable — not something that quietly costs you your peace.</li>
    <li>You're looking for a faith-rooted space built specifically for women carrying this kind of weight.</li>
  </ul>
</section>
```

---

## 4. New section — "What You'll Walk Away With"

Placement: insert this whole `<section>` between "Is This You?" and "The Four-Week Journey."

```tsx
<section className="walk-away-with">
  <h2>What You'll Walk Away With</h2>
  <p className="lead-in">
    Built from years of setting goals and strategy for individuals and entire
    teams — this isn't theory.
  </p>
  <p>By the end of 30 days, you'll have:</p>
  <ul className="checklist">
    <li>A decision-making practice you can actually use under pressure</li>
    <li>One boundary or hard conversation finally had — not just planned</li>
    <li>Clarity on whether what's holding you back is a belief, a boundary, or a structural gap — and what to do about it</li>
    <li>A personal growth strategy built to protect your capacity — mentally, physically, and financially</li>
    <li>A rhythm that outlasts the 30 days</li>
  </ul>
</section>
```

---

## 5. "What's Included"

```tsx
<section className="whats-included">
  <h2>What's Included</h2>
  <ul className="included">
    <li>4 live group coaching &amp; formation calls (weekly)</li>
    <li>2 private 1:1 sessions with Tabitha (30 minutes each)</li>
    <li>Community access with weekly office hours for questions and support</li>
    <li>Pop-up "Quick Lives" — short, powerful live sessions</li>
    <li>Fearless Faith Video Course (3 hours, lifetime access)</li>
    <li>Fearless Faith Workbook — reflection prompts and journaling space</li>
    <li>Private community access</li>
  </ul>
  <p className="value">A package valued at over $3,000</p>
</section>
```

**Note on this change:** private sessions drop from 4/month to 2 total, and "direct community chat access to Tabitha" (implying unlimited, on-demand access) becomes "weekly office hours" (structured, bounded access). This is the one substantive delivery change in the set — everything else is framing/positioning.

---

## Why these changes (for whoever's reviewing the PR)

- Eyebrow + hero + "Is This You?": narrows the buyer definition to match the premium positioning (founders, executives, coaches/consultants, ministry/nonprofit leaders carrying real responsibility) instead of an open "anyone feeling overwhelmed" framing, and removes anxiety-relief language in favor of decision/boundary/leadership-presence language.
- New "What You'll Walk Away With" section: the page currently names week themes (Grounded, Clear, Confident, Strong) but never states a concrete outcome. This closes that gap with checkable results drawn from Tabitha's actual background setting goals and strategy for individuals and branches/teams.
- "What's Included": reduces the delivery commitment to something sustainable for a single facilitator, without lowering the perceived value (same $3,000+ anchor, same list length).
- Deliberately **not** touching "30-day," the Four-Week Journey, or pricing — those change only once the full 90-day program curriculum is built.

