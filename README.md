# I Built a Government Portal That Determines If You Are Legally a Teapot

*Submission for the DEV April Fools Challenge — Best Ode to Larry Masinter category*

---

## The Problem This Solves

None. Zero. Negative problems. In fact, it creates a new one: you will open this app and leave legally classified as a teapot.

---

## Background: The RFC That Started It All

On April 1, 1998, a man named **Larry Masinter** — a researcher at Xerox PARC — published  **RFC 2324: Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0)** .

It was a joke RFC. A bit. An April Fools prank buried inside the IETF document system.

But it contained one line that changed HTTP forever:

> *"Any attempt to brew coffee with a teapot should result in the error code  **418 I'm a Teapot** . The resulting entity body MAY be short and stout."*

HTTP 418 is a real status code. It is marked  **HISTORIC** . It has survived every attempt to remove it. Developers have fought to keep it. It appears in Node.js, Go, ASP.NET, and dozens of other frameworks — all as a tribute to one man's beautiful bit.

Larry Masinter saw this coming. We just built the compliance portal.

---

## What I Built: HTCPCP/1.0 Compliance Terminal

**[🫖 LIVE DEMO →](https://brain-rot-eliminator-b5u435ncr-shreyjaradis-projects.vercel.app/)**

**[💻 Source Code →](https://github.com/Shreyjaradi/brain-rot-eliminator)**

A biometric government security terminal that uses AI to determine your **Teapot Quotient (TQ%)** — a proprietary metric measuring how likely you are to be a teapot in violation of RFC 2324 §2.3.2.

You will not pass. No one ever passes. The system is rigged. Larry Masinter intended this.

---

## How It Works

### The Experience

1. **Boot sequence** — The terminal initializes, loads the INTERPOT criminal database (4.2 million vessel entries), and detects elevated HTTP 418 risk from your presence alone
2. **Biometric scan** — Your camera feed is analyzed for SPOUT_DETECTED, CERAMIC_DENSITY, HANDLE_SYMMETRY, BREW_CAPACITY, LID_ATTACHMENT, and STEAM_PRESSURE. These numbers are completely fabricated. They are also damning.
3. **Speak or type your defense** — The AI tribunal listens to everything you say and uses it as further evidence that you are a teapot
4. **Teapot Quotient rises** — No matter what you say. Silence is also evidence (§9.1).
5. **Chaos Protocol §11** — After a few interactions, the terminal begins issuing verdicts unprompted. You cannot leave.
6. **418 Finale** — When TQ hits 100%, the terminal formally classifies you as a TEAPOT under RFC 2324. You may not brew coffee. You may not appeal.

The experience escalates in four stages:

* **SUSPICIOUS** (0–29%): The terminal is mock-polite. "Routine inspection."
* **ESCALATING** (30–59%): Everything you say is twisted into teapot evidence
* **NEAR-CERTAIN** (60–84%): The AI cites RFC sections that may not exist
* **CONDEMNED** (85–100%): The trial is over. It is just reading the sentence.

---

## The Google AI / Claude Integration

I used the **Claude API (Sonnet)** as the AI roast engine powering the tribunal.

The prompt is the most important piece of engineering in this entire project. I spent more time on it than the CSS. The key insight: telling an AI to "be funny and roast this person" produces generic garbage. What actually works is giving it:

* A **specific character** (unhinged bureaucrat who has memorized RFC 2324 and treats everything as ceramic evidence)
* A **comedic theory** (every response is proof of teapothood — the conspiracy is ceramics)
* **Stage-aware behavior** (mock-polite at 0%, completely unhinged at 85%)
* **Example roasts** in the exact style you want — not to copy, but to pattern-match
* A directive to **react to the user's actual words** and twist them into teapot evidence

The difference between `"YOU ARE A TEAPOT"` (weak, generic) and `"YOUR LAWYER IS ALSO A TEAPOT. WE ALREADY CHECKED."` (specific, absurd, builds a world) is entirely about prompt architecture.

The terminal also uses **vision** on first interaction — it captures a frame from your webcam and sends it to Claude. If you're on camera, the AI will reference what it sees. If you look calm, that's suspicious. If you look nervous, that confirms the steam pressure readings.

**Fallback chain:** If the API is unavailable, the terminal falls back to a curated bank of 40+ stage-aware local roasts, organized by TQ level, so the experience never breaks.

---

## Technical Stack

* **Frontend:** Vanilla HTML/CSS/JS — deliberately zero frameworks. The whole app is one file.
* **AI:** Claude API (claude-sonnet) for roast generation + vision analysis
* **Backend:** Node.js + a single API route (`/api/judge-human`) for the Vercel/Next.js deployment
* **Fonts:** VT323 (the terminal display font) + Share Tech Mono (the readouts) — both from Google Fonts
* **Speech:** Web Speech API for real-time voice input — you can just talk to it
* **No database.** No auth. No sign-up. You just get judged.

### The CRT Aesthetic

Everything is pure CSS:

* `repeating-linear-gradient` for scanlines
* `radial-gradient` vignette for the CRT curve
* `saturate(0)` + green color overlay on the video for night-vision effect
* Corner bracket overlays via `::before`/`::after` pseudo-elements
* Sweeping scan line via CSS `@keyframes`
* VT323 font for that authentic 1998 government terminal energy

The entire aesthetic is built around one question: *what would a real government portal look like if it were built in 1998 and its sole purpose was RFC 2324 compliance?* Bureaucratic. Ugly. Completely serious about something insane.

---

## The Funniest Moments (In Testing)

When I said **"I'm a developer, not a teapot":**

> *"LARRY MASINTER WROTE RFC 2324 ABOUT DEVELOPERS SPECIFICALLY."*

When I said **"I just want to make coffee":**

> *"SIR. THAT IS EXACTLY WHAT A TEAPOT WOULD SAY."*

When I said **"This is ridiculous":**

> *"YOUR SKEPTICISM HAS BEEN NOTED. AND GLAZED. PER §4.2."*

When I said nothing for 8 seconds (Chaos Protocol §11 activated automatically):

> *"SILENCE IS ALSO EVIDENCE. YOUR STEAM PRESSURE: 32 PSI. EXPLAIN."*

---

## What I Learned

**Prompt engineering is comedy writing.** The funniest outputs don't come from asking an AI to be funny. They come from building a specific character with a consistent worldview and a comedic theory — then putting the user inside that theory. The AI isn't "making jokes." It's playing a character who is completely serious about something absurd. That gap is where the comedy lives.

**The best useless software is very serious about being useless.** The terminal doesn't wink at you. It doesn't say "lol this is a joke." It presents itself as a genuine government compliance tool. The RFC banner is formatted like a real legal statute. The biometrics look like real scanner output. The boot sequence looks like a real OS loading. The joke lands harder because the app commits to the bit completely.

**RFC 2324 is genuinely brilliant.** Larry Masinter hid a prank inside a document format so dry that most people never read it. The joke waited 28 years. Every developer who has ever returned a 418 from their API is, unknowingly, honoring him.

This one's for you, Larry.

---

## Try It

**[🫖 LIVE DEMO →](https://brain-rot-eliminator-b5u435ncr-shreyjaradis-projects.vercel.app/)**

Open it. Introduce yourself. Defend your humanity. You will lose.

The teapot quotient doesn't lie. Neither does your ceramic density.

---

## Submission Details

**Built with:** Claude API (Anthropic), Web Speech API, Vanilla JS, VT323/Share Tech Mono (Google Fonts)
**Challenge category:** Best Ode to Larry Masinter, Best Google AI Usage
**Anti-value proposition:** 10/10 — this solves nothing, helps no one, and legally classifies you as kitchenware

---

*RFC 2324 §2.3.2: "Any attempt to brew coffee with a teapot should result in the error code 418 I'm a Teapot. The resulting entity body MAY be short and stout."*

*Larry Masinter, April 1, 1998. He knew.*
