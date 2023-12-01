gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
ScrollTrigger.normalizeScroll(true); // enable
const cardContainer = document.getElementById("cardcontainer");


const home = document.getElementById('home');
const skills = document.getElementById('skills');
const projects = document.getElementById('projects');
const about = document.getElementById('about');


gsap.set(
  "#ace-container",
  {
    y: -1836,
  },
);

// Define card values and suits (12 values and 12 suits)
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
];
const devicons = [
  "python",
  "javascript",
  "java",
  "go",
  "ruby",
  "php",
  "html5",
  "css3",
  "typescript",
  "nodejs",
  "react",
  "angular",
];

// Loop through each card value and create a card with a unique suit
for (let i = 0; i < cardValues.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Add content to the card
  card.innerHTML = `
    <span class="absolute top-[1rem] left-[1rem]">${cardValues[i]}</span>
    <i class="devicon-${devicons[i]}-plain absolute left-[1rem] top-[3rem]"></i>
    <span class="absolute bottom-[1rem] right-[1rem] rotate-180">${cardValues[i]}</span>
    <i class="devicon-${devicons[i]}-plain absolute right-[1rem] bottom-[3rem] rotate-180"></i>
    <div class="w-full h-full flex items-center justify-center">
      <i class="devicon-${devicons[i]}-plain scale-[5]"></i>
    </div>
  `;

  // Append the card to the container
  cardContainer.appendChild(card);
}




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
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Brush Script MT",
  "Comic Sans MS",
  "Futura",
  "Kodchasan",
];

function typeWriterWithCursor(text, elementId, delay = 100) {
  let index = 0;
  const element = document.getElementById(elementId);
  const cursor = document.createElement("span"); // Create a blinking cursor
  cursor.textContent = "_";
  cursor.classList.add("blinking-cursor");
  element.textContent = ""; // Clear the content
  element.appendChild(cursor); // Add the cursor to the target element

  function type() {
    if (index < text.length) {
      element.textContent = text.substring(0, index + 1); // Append the next character
      element.appendChild(cursor); // Ensure the cursor remains at the end
      index++;
      setTimeout(type, delay); // Continue typing
    } else {
      cursor.remove(); // Remove cursor when typing is complete
    }
  }

  type();
}

// Add blinking animation to cursor
function addBlinkingCursorAnimation() {
  const style = document.createElement("style");
  style.textContent = `
      .blinking-cursor {
        display: inline-block;
        margin-left: 2px;
        animation: blink 1s steps(2, start) infinite;
      }
      @keyframes blink {
        0%, 50% {
          opacity: 1;
        }
        51%, 100% {
          opacity: 0;
        }
      }
    `;
  document.head.appendChild(style);
}




document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline();
  const cards = document.querySelectorAll(".card");
  document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';


  // set logo animation pos and scale
  tl.set("#skills-text", { opacity: 0 });

  tl.set("#logo", {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    scale: 5,
  });



  // Run your logo animation
  fonts.forEach((font) => {
    tl.to(".logo-text", {
      fontFamily: font,
      duration: 0.075,
      ease: "none",
    });
  });

  // put logo back in navbar
  tl.to("#logo", {
    position: "absolute",
    top: "4rem",
    left: "7rem",
    scale: 1,
    duration: 1,
    ease: "power2.inOut",
    
  });

  // bring in the rest of navbar from the top
  tl.from("#nav, #icons", {
    y: -24,
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  });

  // bring in the rest of navbar from the top
  tl.from("#hero-text", {
    x: -24,
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
    onStart: () => {
      addBlinkingCursorAnimation();
      typeWriterWithCursor("Farah Abdi,", "name", 150);
      document.getElementById("name").style.visibility = "visible";
    },
    onComplete: () => {
      document.getElementsByTagName('html')[0].style.overflow = 'visible'
      document.getElementsByTagName('body')[0].style.overflow = 'visible'
    }
  });

  // Adding '#cardcontainer' to the timeline at the same time as '#hero-text'
  tl.from(
    "#cardcontainer",
    {
      x: 24,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    },
    "<"
  ); // Start at the same time as '#hero-text'
  tl.from("progress", {
    x: -24,
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      tl.to("progress", {
        value: 100,
        ease: "none",
        scrollTrigger: { scrub: 1 }
      });
    },
  });

  home.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 0
    });
  });
  
  skills.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 360
    });
  });

  about.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 660
    });
  })
  
  projects.addEventListener('click', () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: 1000
    });
  })

  
  

  
  

  const tl2 = gsap.timeline({
    scrollTrigger: {
      scrub: 2,
      trigger: "#main",
      toggleActions: "play none none reverse",
      pin: true,
    },
  
  });

  tl2.to(cards, {
    rotation: (i) => {
      const anglePerCard = 112 / (cards.length - 1); // 180 degrees for the arc
      return (i - (cards.length - 1) / 2) * anglePerCard;
    },
    x: (i) => {
      const spread = 24; // Adjust the spread to control how far the cards are apart
      return (i - (cards.length - 1) / 2) * (spread / 6); // Adjust the spacing per card
    },
    ease: "none",
    duration: 400,
    transformOrigin: "bottom center", // Set the transform origin to the center of the card
    stagger: {
      amount: 0.5, // Stagger effect
      from: "start", // Animation starts from the top-left corner
    },
  });

  // Hover effect integration with GSAP
  // cards.forEach((card) => {
  //   card.addEventListener("mouseenter", () => {
  //     gsap.to(card, {
  //       y: -36, // Move the card up on hover
  //       duration: 0.3,
  //       ease: "power1.out",
  //     });
  //   });

  //   card.addEventListener("mouseleave", () => {
  //     gsap.to(card, {
  //       y: 0, // Return the card to its original position
  //       duration: 0.3,
  //       ease: "power1.out",
  //     });
  //   });
  // });

  tl2.to("#hero-text", {
    y: -1000,
    duration: 800,
    ease: "power2.inOut",
  });
  tl2.to(
    "#skills-text",
    {
      y: -620,
      opacity: 1,
      duration: 800,
      ease: "power2.inOut",
    },
    "<"
  );

  const container = document.getElementById("cardcontainer");
  // Get parent dimensions
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  // Define grid
  const rows = 3;
  const columns = 4;
  const cardWidth = containerWidth / columns; // Width of each card
  const cardHeight = containerHeight / rows;

  const verticalGap = 64; // Height of each card

  // Turn cards into grid
  tl2.to(
    cards,
    {
      rotation: 0,
      ease: "power2.inOut",
      x: (i) => (i % columns) * cardWidth - 312, // X position based on column
      y: (i) => Math.floor(i / columns) * (cardHeight + verticalGap) - 296, // Add vertical gap
      scale: 0.5, // Set card height
      stagger: {
        amount: 0.5, // Stagger effect
        from: "start", // Animation starts from the top-left corner
      },
      duration: 800,
    },
    "<"
  );

  const cardarr = Array.from(cards);
  const half = Math.ceil(cards.length / 2); // Determine the split point
  const group1 = cardarr.slice(0, half); // First group of cards
  const group2 = cardarr.slice(half); // Second group of cards
  let isReversed = false;
  // Timeline for splitting and shuffling
  tl2.to(group1, {
    x: (i) => -150 - i * 10, // Move group1 to the left
    y: (i) => -i * 10, // Slight stagger upward
    duration: 400,
    scale: 1,
    ease: "power2.inOut",
    stagger: 0.1,
  });

  // Move group2 to the right
  tl2.to(
    group2,
    {
      x: (i) => 150 + i * 10, // Move group2 to the right
      y: (i) => -i * 10, // Slight stagger upward
      duration: 400,
      scale: 1,
      ease: "power2.inOut",
      stagger: 0.1,
    },
    "<"
  ); // Sync with group1 movement

  // Interleave function
  const interleave = (group1, group2) => {
    const maxLength = Math.max(group1.length, group2.length);
    const interleaved = [];

    for (let i = 0; i < maxLength; i++) {
      if (group1[i]) interleaved.push(group1[i]); // Add one from group1
      if (group2[i]) interleaved.push(group2[i]); // Add one from group2
    }
    return interleaved;
  };

  // Create interleaved array
  const interleavedCards = interleave(group1, group2);

  // Animate interleaving with z-index updates
  tl2.to(interleavedCards, {
    x: 0,
    y: 0,
    rotation: 0,
    z: (index) => index, // Incremental z-index for proper stacking
    duration: 400,
    ease: "power2.inOut",
    stagger: 0.1, // Create interleaving effect
    onStart: () => {
      // Ensure zIndex matches during the animation (optional for modern browsers)
      interleavedCards.forEach((card, index) => {
        gsap.set(card, { zIndex: index });
      });
    },
    onReverseComplete: () => {
      // Reset z-index when reversing
      interleavedCards.forEach((card) => {
        gsap.set(card, { zIndex: 0 });
      });
    },
  });
  tl2.to(
    "#skills-text",
    {
      y: -2000,
      duration: 400,
      ease: "power2.inOut",
    },
    "<"
  );
  tl2.to(
    "#about-text",
    {
      y: -1240,
      opacity: 1,
      duration: 400,
      ease: "power2.inOut",
    },
    "<"
  );
  tl2.to("#about-text", {
    y: -2000,
    duration: 400,
    ease: "power2.inOut",
  });
  tl2.to(
    "#cardcontainer",
    {
      y: -2000,
      duration: 600,
      ease: "power2.inOut",
    },
    "<"
  );
  
  tl2.from('.ace-card', {
    x:-240,
    opacity: 0,
    duration: 1000,
    ease: "power2.inOut",
  }, '<3')
  tl2.from('#ace-display', {
    x:240,
    opacity: 0,
    duration: 1000,
    ease: "power2.inOut",
  }, '<')

  
});
