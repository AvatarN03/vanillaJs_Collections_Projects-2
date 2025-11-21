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

// Container slide up animation only
function animateCardsContainer() {
  const container = document.querySelector("#card-container");
  if (container) {
    gsap.from(container, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  }
}

window.animateCardsContainer = animateCardsContainer;

setTimeout(() => {
  animateCardsContainer();
}, 100);

// Optional: Animate feature cards on scroll
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