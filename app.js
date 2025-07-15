// app.js - Optimized GSAP animations

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
ScrollTrigger.normalizeScroll(true);
// --- Featured Projects: reveal on scroll ---
const featHeading = document.querySelector("#featured-projects .hero-text");
const projectCards = gsap.utils.toArray("#featured-projects .project-card");
const revealEls = [featHeading, ...projectCards];
// grab the elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav");

// on click, flip hidden ↔ visible
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});
// Generate tech cards
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
const devicons = [
  "python",
  "javascript",
  "java",
  "csharp",
  "mongodb",
  "tailwindcss",
  "html5",
  "css3",
  "typescript",
  "docker",
  "vscode",
  "git",
  "amazonwebservices"
];

const cardContainer = document.getElementById("cardcontainer");
cardValues.forEach((val, i) => {
  const icon = devicons[i];
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <span class="absolute top-[1rem] left-[1rem]">${val}</span>
    <i class="devicon-${icon}-plain absolute left-[1rem] top-[3rem]"></i>
    <span class="absolute bottom-[1rem] right-[1rem] rotate-180">${val}</span>
    <i class="devicon-${icon}-plain absolute right-[1rem] bottom-[3rem] rotate-180"></i>
    <div class="w-full h-full flex items-center justify-center">
      <i class="devicon-${icon}-plain scale-[5]"></i>
    </div>`;
  cardContainer.appendChild(card);
});

// Typewriter effect with blinking cursor
function typeWriterWithCursor(text, id, delay = 100) {
  const el = document.getElementById(id);
  let idx = 0;
  const cursor = document.createElement("span");
  cursor.textContent = "_";
  cursor.className = "blinking-cursor";
  el.textContent = "";
  el.append(cursor);
  (function type() {
    if (idx < text.length) {
      el.textContent = text.slice(0, ++idx);
      el.append(cursor);
      setTimeout(type, delay);
    } else {
      cursor.remove();
    }
  })();
}
(function addCursorStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .blinking-cursor { display:inline-block; margin-left:2px; animation:blink 1s steps(2,start) infinite; }
    @keyframes blink { 0%,50% { opacity:1;} 51%,100% { opacity:0;} }
  `;
  document.head.append(style);
})();

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement,
    body = document.body;
  // capture current scroll (should be 0)
  window.scrollY = 0;

  // 1a) freeze the body in place
  Object.assign(body.style, {
    position: "fixed",
    top: `-${scrollY}px`,
    left: "0",
    right: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  });

  // 1b) block wheel & touchmove
  const preventScroll = (e) => e.preventDefault();
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });

  // 2) build your intro timeline
  const intro = gsap
    .timeline({
      // you can add defaults here if you want
    })
    .set("#logo", {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 5,
    });

  const fonts = [
    "Kodchasan",
    "Arial",
    "Verdana",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Brush Script MT",
    "Comic Sans MS",
    "Lucida Console",
    "Tahoma",
    "Impact",
    "Trebuchet MS",
    "Futura",
  ];

  // cycle fonts…
  fonts.forEach((font) => {
    intro.to(".logo-text", { fontFamily: font, duration: 0.075, ease: "none" });
  });

  // fade & remove the logo
  intro
    .to("#logo", { autoAlpha: 0, duration: 0.5, ease: "power1.out" })
    .call(() => document.getElementById("logo").remove());

  // 1c) when intro completes, unlock
  intro.eventCallback("onComplete", () => {
    // remove the scroll blockers
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);

    // un‑fix the body
    Object.assign(body.style, {
      position: "",
      top: "",
      left: "",
      right: "",
      width: "",
      overflow: "",
    });

    // jump back to where we were (still 0)
    window.scrollTo(0, scrollY);

    // now kick off your main timeline
    mainTimeline.play();
  });

  // 4) build your main timeline, but keep it paused
  const mainTimeline = gsap.timeline({ paused: true });

  mainTimeline
    .from("#navbar", { y: -24, opacity: 0, duration: 1, ease: "power2.inOut" })
    .from(
      "#hero-text",
      {
        x: -24,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          typeWriterWithCursor("Farah Abdi,", "name", 150);
          document.getElementById("name").style.visibility = "visible";
        },
        // **remove** any onComplete here that touches overflow
      },
      "<"
    )
    .from(
      "#cardcontainer",
      { x: 24, opacity: 0, duration: 1, ease: "power2.inOut" },
      "<"
    );

  // Cards animation on scroll
  const cards = gsap.utils.toArray(".card");
  const cols = 4,
    rows = 3;
  const { width, height } = cardContainer.getBoundingClientRect();
  const cardW = width / cols,
    cardH = height / rows + 64;

  // Tailwind 2xl breakpoint is 1536px
  if (window.matchMedia("(min-width: 1536px)").matches) {
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#main",
        start: "top top",
        end: "center",
        pin: "#hero",
        pinSpacing: true,
        scrub: 1,
        // markers: true, // optional
      },
    });

    tl2.to(cards, {
      rotation: (i) =>
        (i - (cards.length - 1) / 2) * (112 / (cards.length - 1)),
      x: (i) => (i - (cards.length - 1) / 2) * (24 / 6),
      duration: 100,
      ease: "none",
      transformOrigin: "bottom center",
      stagger: { amount: 0.5, from: "start" },
    });
  }

  // grab title + all skill pills
  const revealEls2 = document.querySelectorAll(
    "#skills .hero-text, #skills .skill"
  );

  revealEls2.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50, // come up from bottom
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // when el top hits 80% down viewport
        toggleActions: "play none none none",
        // markers: true,    // uncomment to debug
      },
    });
  });

  revealEls.forEach((el, i) => {
    // Heading = index 0; cards start at 1
    const isHeading = i === 0;
    const vars = {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // when el top hits 80% of viewport
        toggleActions: "play none none none",
      },
    };

    if (isHeading) {
      vars.y = 50; // come up from bottom
    } else {
      // alternate cards: 1st card (i=1) from left, next from right, etc.
      const cardIndex = i - 1;
      vars.x = cardIndex % 2 === 0 ? -100 : 100;
    }

    gsap.from(el, vars);
  });

  // 1) Force initial state: hidden & 50px down
  gsap.set("#experience .exp-card", { opacity: 0, y: 50 });

  // 2) Create one ScrollTrigger per card
  document.querySelectorAll("#experience .exp-card").forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%", // when the top of card hits 85% viewport
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          // optional stagger if you want a tiny delay
          // delay: i * 0.1
        });
      },
      // markers: true     // <-- uncomment to debug positions
    });
  });
  // smooth-scroll nav
const navItems = document.querySelectorAll("#nav p");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.id;
    // scroll so the top of that section lands just under the navbar
    gsap.to(window, {
      duration: 0.8,
      ease: "power2.out",
      scrollTo: {
        y: `#${targetId}`,
        offsetY: 80  // adjust if your navbar height changes
      }
    });

    // if mobile menu is open, close it
    navMenu.classList.add("hidden");
  });
});

});

