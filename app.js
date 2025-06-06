document.addEventListener("DOMContentLoaded", () => {
    // Création d'une timeline GSAP pour orchestrer les animations
    const tl = gsap.timeline();
  
    // Animation du texte : chaque lettre de "undefined" remonte depuis le bas
    tl.to(".intro-text span", {
      duration: 0.8,
      opacity: 1,
      y: "0%",
      ease: "power3.out",
      stagger: 0.1
    });
  
    // Animation du point carré avec un effet "bounce in"
    tl.to(".dot", {
      duration: 0.6,
      opacity: 1,
      scale: [0, 1],
      ease: "bounce.out"
    }, "-=0.3"); // chevauchement léger avec la fin de l'animation des lettres
  
    // Dès que le point apparaît, déclencher l'explosion de couleur
    // qui transforme le fond en gradient (violet en bas vers noir en haut)
    tl.to(".background-overlay", {
      duration: 1.2,
      background: "linear-gradient(to top, #8a2be2, #000)",
      ease: "power2.inOut"
    }, "+=0.2");
  
    // Animation de la vague : faire osciller la courbe pour simuler des vagues
    gsap.to(".wave", {
      duration: 4,
      attr: { d: "M0,50 C480,0 960,100 1440,50 L1440,100 L0,100 Z" },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  
    // Animation continue des formes en bas
    gsap.to(".shape1", {
      duration: 3,
      x: 50,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(".shape2", {
      duration: 4,
      x: -50,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    gsap.to(".shape3", {
      duration: 2.5,
      x: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  
    // Animation de l'icône de flèche dans le bouton "Voir plus"
    gsap.to(".arrow", {
      duration: 1,
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  
    // Optionnel : Scroller vers le bas lors du clic sur le bouton
    document.getElementById("seeMoreBtn").addEventListener("click", () => {
      gsap.to(window, {duration: 1, scrollTo: {y: window.innerHeight}, ease: "power2.inOut"});
    });
  });