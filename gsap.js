gsap.registerPlugin(ScrollTrigger);

// Heading animation - runs on page load
gsap.from("h1", {
  y: -150,
  opacity: 0,
  duration: 1.2,
  ease: "back.out(1.7)",
  stagger: 0.2,
  delay: 0.3,
});

// Paragraph fade in
gsap.from("section p", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.8,
  ease: "power2.out"
});

// Image scale animation (if you add id="scroll-scale-img" to an image)
const scrollImg = document.querySelector("#scroll-scale-img");
if (scrollImg) {
  gsap.to("#scroll-scale-img", {
    scale: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#scroll-scale-img",
      start: "top 70%",
      end: "bottom 20%",
      scrub: true,
    },
  });
}

// Function to animate newly added cards
function animateCards() {
  const cards = document.querySelectorAll(".card");
  
  // Set initial state for new cards that haven't been animated
  gsap.set(cards, {
    opacity: 0,
    y: 50,
    scale: 0.95
  });

  // Animate cards with stagger
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    clearProps: "all" // Clear inline styles after animation
  });
}

// Export the function so render.js can call it
window.animateCards = animateCards;

// Animate cards on initial load (with delay to ensure they're rendered)
setTimeout(() => {
  animateCards();
}, 100);

// Optional: Animate cards on scroll for sections with specific IDs
const whySection = document.querySelector("#why");
if (whySection) {
  const whyCards = whySection.querySelectorAll(".c");
  if (whyCards.length > 0) {
    gsap.set(".c", {
      opacity: 0,
      y: 100,
      scale: 0.8
    });

    gsap.to(".c", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#why",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  }
}

// Optional: Animate feature cards on scroll
const featuresSection = document.querySelector("#features");
if (featuresSection) {
  const featureCards = featuresSection.querySelectorAll(".f");
  if (featureCards.length > 0) {
    gsap.set(".f", {
      opacity: 0,
      y: 100,
      scale: 0.8
    });

    gsap.to(".f", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
  }
}