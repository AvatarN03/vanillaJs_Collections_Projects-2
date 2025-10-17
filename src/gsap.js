gsap.registerPlugin(ScrollTrigger);

// Heading animation
gsap.from("#heading", {
  y: -150,
  opacity: 0,
  duration: 1.2,
  ease: "bounce.out",
  delay: 0.3,
});

// Image scale on scroll
gsap.to("#scroll-scale-img", {
  scale: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#scroll-scale-img",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
  },
});

gsap.set(".c", {
            opacity: 0,
            y: 100,
            scale: 0.8
        });

        // Animate cards with stagger effect on scroll
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
            },
            scrub: true
        });

gsap.set(".f", {
            opacity: 0,
            y: 100,
            scale: 0.8
        });

        // Animate cards with stagger effect on scroll
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
            },
            scrub: true
        });