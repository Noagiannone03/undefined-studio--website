gsap.registerPlugin(ScrollTrigger);

// Loading Screen Management
let loadingProgress = 0;
const loadingBar = document.getElementById('loadingProgress');
const loadingScreen = document.getElementById('loadingScreen');

function updateLoadingProgress(percent) {
  loadingProgress = percent;
  loadingBar.style.width = percent + '%';
}

function hideLoadingScreen() {
  gsap.to(loadingScreen, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    onComplete: () => {
      loadingScreen.style.display = 'none';
      initAnimations();
    }
  });
}

// Simulation du chargement plus fluide
function simulateLoading() {
  const interval = setInterval(() => {
    loadingProgress += Math.random() * 8 + 3;
    if (loadingProgress >= 100) {
      loadingProgress = 100;
      updateLoadingProgress(100);
      clearInterval(interval);
      setTimeout(hideLoadingScreen, 800);
    } else {
      updateLoadingProgress(loadingProgress);
    }
  }, 120);
}

// Variables globales pour YOU CAN
const wordsList = [
  'inspirent.', 'simplifient.', 'connectent.', 'révolutionnent.',
  'optimisent.', 'automatisent.', 'protègent.', 'stimulent.',
  'transforment.', 'dynamisent.', 'facilitent.', 'catalysent.',
  'modernisent.', 'accélèrent.', 'renforcent.', 'fluidifient.',
  'harmonisent.', 'bousculent.', 'innovent.', 'valorisent.',
  'libèrent.', 'unissent.'
];

// Fonction principale d'initialisation des animations
function initAnimations() {
  
// Animation d'intro HERO ULTRA
const tlHero = gsap.timeline();

// Animation explosive des lettres UNDE
tlHero.to("#line1 span", {
  duration: 1.2,
  opacity: 1,
  y: 0,
  rotationX: 0,
  stagger: 0.15,
  ease: "back.out(2)"
});

// Animation explosive des lettres FINED
tlHero.to("#line2 .letter", {
  duration: 1.2,
  opacity: 1,
  y: 0,
  rotationX: 0,
  stagger: 0.15,
  ease: "back.out(2)"
}, "-=0.6");

// Animation ultra du carré avec glow
tlHero.to("#line2 .square", {
  duration: 1,
  opacity: 1,
  scale: 1,
  rotation: 0,
  ease: "elastic.out(1, 0.5)"
}, "-=0.4");

// Animation de "studio"
tlHero.to("#line3", {
  duration: 1,
  opacity: 1,
  y: 0,
  ease: "power3.out"
}, "-=0.5");

// Animation du cercle (apparition + rotation)
tlHero.to("#circleWrapper", {
  duration: 1.5,
  opacity: 1,
  scale: 1,
  ease: "power3.out"
}, "-=0.8");

// Rotation continue du cercle
gsap.to("#circleContainer", {
  rotation: 360,
  duration: 25,
  ease: "none",
  repeat: -1
});

// Pin HERO avec parallax ultra
gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
    pin: true,
    pinSpacing: true
  }
})
.to(".hero-content", { y: -150, opacity: 0.6, scale: 0.9, ease: "power2.inOut" })
.to(".grid-bg", { opacity: 0.3, ease: "power2.inOut" }, 0);

// Section YOU CAN avec alignement parfait initial et final
const wordsContainer = document.getElementById('scrollingWordsList');
const wordItems = document.querySelectorAll('.word-item');

// Pin de la section YOU CAN avec alignement initial ET final parfait
ScrollTrigger.create({
  trigger: ".you-can-section",
  start: "top top",
  end: "bottom bottom",
  pin: ".you-can-container",
  pinSpacing: false,
  onUpdate: (self) => {
    const progress = self.progress;
    
    // Calcul des dimensions
    const containerHeight = document.querySelector('.words-container').offsetHeight;
    const containerCenter = containerHeight / 2;
    const wordHeight = wordItems[0] ? wordItems[0].offsetHeight : 120;
    const totalWords = wordItems.length;
    
    // Distance totale à parcourir
    const totalScrollDistance = (totalWords - 1) * wordHeight;
    
    // Position actuelle du scroll
    const currentScrollY = progress * totalScrollDistance;
    
    // Animation du conteneur (sens normal)
    gsap.to(wordsContainer, {
      y: -currentScrollY + 'px',
      duration: 0.2,
      ease: "power2.out"
    });
    
    // Gestion des états des mots - alignement ultra précis
    
    wordItems.forEach((word, index) => {
      // Position réelle du mot dans la viewport
      const wordRect = word.getBoundingClientRect();
      const wordsContainerRect = document.querySelector('.words-container').getBoundingClientRect();
      const wordCenterInContainer = wordRect.top + wordRect.height / 2 - wordsContainerRect.top;
      
      // Distance par rapport au centre du conteneur (ligne de "des apps qui")
      const distanceFromCenter = Math.abs(wordCenterInContainer - containerCenter);
      
      // Reset des classes
      word.classList.remove('active', 'visible');
      
      // Mot parfaitement aligné avec "des apps qui" - tolérance ultra faible
      if (distanceFromCenter < 15) {
        word.classList.add('active');
      }
      // Mots proches mais pas alignés
      else if (distanceFromCenter < wordHeight * 0.6) {
        word.classList.add('visible');
      }
    });
  },
  onEnter: () => {
    // S'assurer du bon état initial - vérification de l'alignement réel
    setTimeout(() => {
      const containerCenter = document.querySelector('.words-container').offsetHeight / 2;
      wordItems.forEach((word, index) => {
        const wordRect = word.getBoundingClientRect();
        const wordsContainerRect = document.querySelector('.words-container').getBoundingClientRect();
        const wordCenterInContainer = wordRect.top + wordRect.height / 2 - wordsContainerRect.top;
        const distanceFromCenter = Math.abs(wordCenterInContainer - containerCenter);
        
        word.classList.remove('active', 'visible');
        if (distanceFromCenter < 20) {
          word.classList.add('active');
        } else if (distanceFromCenter < 100) {
          word.classList.add('visible');
        }
      });
    }, 100);
  }
});

// SECTION MOTION DESIGN avec animation word par word
ScrollTrigger.create({
  trigger: ".motion-section",
  start: "top top",
  end: "+=300%",
  pin: true,
  pinSpacing: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const sloganWords = document.querySelectorAll('.slogan-word');
    
    // Animation des mots du slogan de manière séquentielle
    gsap.to("#slogan", {
        opacity: 1, 
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Animation word by word basée sur le progress
    sloganWords.forEach((word, index) => {
      const wordProgress = Math.max(0, Math.min(1, (progress * 4) - index * 0.5));
      
      if (wordProgress > 0) {
        word.classList.add('animate');
      } else {
        word.classList.remove('animate');
      }
    });
    
    // Animation des formes avec délai après le texte - commence à 70% du scroll
    if (progress > 0.7) {
      const shapesProgress = (progress - 0.7) / 0.3; // Normalise à 0-1
      const shapes = document.querySelectorAll('.shape');
      
      shapes.forEach((shape, i) => {
        const pairIndex = Math.floor(i / 2); // 2 formes par paire
        const totalPairs = Math.ceil(shapes.length / 2);
        const pairProgress = Math.max(0, Math.min(1, (shapesProgress * totalPairs) - pairIndex));
        
        gsap.to(shape, {
          opacity: pairProgress * 0.9,
          scale: pairProgress,
          duration: 0.4,
          ease: "back.out(1.8)"
        });
      });
    }
  }
});

     // Génération des formes style autocollants
 function createFloatingShapes() {
   const container = document.getElementById('floatingShapes');
   const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];

   for (let i = 0; i < 12; i++) {
     const shape = document.createElement('div');
     const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
     const size = Math.random() * 180 + 120;
     
     shape.className = `shape ${shapeType}`;
     shape.style.width = size + 'px';
     shape.style.height = size + 'px';
     
     // Positionnement autour du texte, pas en dessous
     let left, top;
     if (i % 4 === 0) {
       // Côté gauche
       left = Math.random() * 25 + 5;
       top = Math.random() * 80 + 10;
     } else if (i % 4 === 1) {
       // Côté droit  
       left = Math.random() * 25 + 70;
       top = Math.random() * 80 + 10;
     } else if (i % 4 === 2) {
       // En haut
       left = Math.random() * 60 + 20;
       top = Math.random() * 25 + 5;
     } else {
       // En bas (mais pas trop bas)
       left = Math.random() * 60 + 20;
       top = Math.random() * 25 + 70;
     }
     
     shape.style.left = left + '%';
     shape.style.top = top + '%';
    
     // Initialise invisible
     gsap.set(shape, { opacity: 0, scale: 0 });
     
     container.appendChild(shape);

     // Animation flottante douce
     gsap.to(shape, {
       x: (Math.random() - 0.5) * 100,
       y: (Math.random() - 0.5) * 100,
       rotation: (Math.random() - 0.5) * 20,
       duration: Math.random() * 4 + 3,
       repeat: -1,
       yoyo: true,
       ease: "sine.inOut"
     });
  }
}

// SECTION CARDS ULTRA avec empilement
const cards = document.querySelectorAll('.card');

// Pin des cards avec empilement
ScrollTrigger.create({
  trigger: ".cards-section",
  start: "top top",
  end: "bottom bottom",
  pin: ".cards-container",
  pinSpacing: false,
  onUpdate: (self) => {
    const progress = self.progress;
    const totalCards = cards.length;
    
    cards.forEach((card, index) => {
      const cardProgress = Math.max(0, Math.min(1, (progress * totalCards) - index));
      
      gsap.to(card, {
        y: (1 - cardProgress) * window.innerHeight,
        rotationX: (1 - cardProgress) * 15,
        scale: 0.8 + (cardProgress * 0.2),
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Z-index pour l'empilement
      card.style.zIndex = index + 1;
    });
  }
});

// SECTION TEXT ANIMATION PRO STYLE
function initTextAnimationSection() {
  const textSequence = document.getElementById('textSequence');
  
  // Timeline principale avec scroll horizontal
  ScrollTrigger.create({
    trigger: ".text-animation-section",
    start: "top top",
    end: "bottom bottom",
    pin: ".text-animation-container",
    pinSpacing: false,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      animateTextSequence(progress);
    }
  });
  
  function animateTextSequence(progress) {
    // Scroll horizontal fluide - 3 sections avec décalage initial
    const translateX = 20 + (progress * -220); // Commence à 20vw (plus décalé) puis scroll 220vw
    gsap.to(textSequence, {
      x: `${translateX}vw`,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Intro (0-40%) - Commence plus tôt
    if (progress <= 0.40) {
      animateIntro(progress / 0.40);
    }
    
    // Middle (35-65%)
    if (progress > 0.35 && progress <= 0.65) {
      animateMiddle((progress - 0.35) / 0.3);
    }
    
    // End (65-90%) - On arrête à 90% pour bien voir la fin
    if (progress > 0.65 && progress <= 0.90) {
      animateEnd((progress - 0.65) / 0.25);
    }
  }
  
  // Animation Intro
  function animateIntro(progress) {
    const words = document.querySelectorAll('.intro-text .word');
    const shapes = document.querySelectorAll('.intro-shape');
    
    // Apparition immédiate dès le début
    const adjustedProgress = progress;
    
    // Animation des mots avec stagger
    words.forEach((word, index) => {
      const delay = parseFloat(word.dataset.delay);
      const wordProgress = Math.max(0, Math.min(1, (adjustedProgress * 2) - delay));
      
      gsap.to(word, {
        opacity: wordProgress,
        y: (1 - wordProgress) * 100,
        rotation: (1 - wordProgress) * 10,
        duration: 0.4,
        ease: "power3.out"
      });
      
      // Underline animation
      if (wordProgress > 0.5) {
        word.classList.add('visible');
      }
    });
    
    // Shapes animation - apparaissent en même temps que le texte
    shapes.forEach((shape, index) => {
      const shapeProgress = Math.max(0, Math.min(1, (adjustedProgress * 1.5) - index * 0.1));
      
      gsap.to(shape, {
        opacity: shapeProgress * 0.8,
        scale: shapeProgress,
        rotation: index === 1 ? 45 : 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    });
  }
  
  // Animation Middle
  function animateMiddle(progress) {
    const transformText = document.querySelector('.transform-text');
    const transformShapes = document.querySelectorAll('.transform-shape');
    const secondaryWords = document.querySelectorAll('.secondary-word');
    
    // Texte principal
    gsap.to(transformText, {
      opacity: Math.min(1, progress * 2),
      scale: 0.5 + (Math.min(1, progress * 1.5) * 0.5),
      duration: 0.3,
      ease: "power3.out"
    });
    
    // Shapes qui tournent
    if (progress > 0.3) {
      transformShapes.forEach((shape, index) => {
        const shapeProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2));
        
        gsap.to(shape, {
          opacity: shapeProgress * 0.9,
          scale: shapeProgress,
          rotation: shapeProgress * (180 + index * 45),
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      });
    }
    
    // Mots secondaires
    if (progress > 0.5) {
      secondaryWords.forEach((word, index) => {
        const wordProgress = Math.max(0, Math.min(1, (progress - 0.5) * 3));
        
        gsap.to(word, {
          opacity: wordProgress,
          x: (1 - wordProgress) * -50,
          duration: 0.4,
          ease: "power3.out"
        });
      });
    }
  }
  
  // Animation End
  function animateEnd(progress) {
    const finalWords = document.querySelectorAll('.final-word');
    const impactRing = document.querySelector('.impact-ring');
    const particlesContainer = document.querySelector('.impact-particles');
    
    // Animation des mots finaux
    finalWords.forEach((word, index) => {
      const wordProgress = Math.max(0, Math.min(1, (progress * 3) - index * 0.3));
      
      gsap.to(word, {
        opacity: wordProgress,
        scale: 0.8 + (wordProgress * 0.2),
        rotation: (1 - wordProgress) * -5,
        duration: 0.4,
        ease: "back.out(1.5)"
      });
    });
    
    // Impact ring
    if (progress > 0.6) {
      gsap.to(impactRing, {
        opacity: 0.6,
        scale: 1.2,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Créer des particules d'impact
      createImpactParticles(particlesContainer, progress);
    }
  }
  
  function createImpactParticles(container, progress) {
    if (container.children.length > 15) return;
    
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'impact-particle';
      
      const angle = (i / 5) * Math.PI * 2;
      const distance = 150 + Math.random() * 100;
      
      particle.style.left = '50%';
      particle.style.top = '50%';
      
      container.appendChild(particle);
      
      gsap.fromTo(particle,
        { 
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0
        },
        {
          opacity: 0,
          scale: 0.5,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => particle.remove()
        }
      );
    }
  }
}

     // Initialisation
 createFloatingShapes();
 initTextAnimationSection();

  // Animation Contact Section
  gsap.fromTo(".contact-title", 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        once: true
      }
    }
  );

  gsap.fromTo(".contact-button-container", 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1.2,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        once: true
      }
    }
  );

  // Animation Footer
  const footerSections = document.querySelectorAll('.footer-section');
  gsap.fromTo(footerSections,
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        once: true
      }
    }
  );

  gsap.fromTo(".footer-logo",
    { opacity: 0, scale: 0.8 },
    { 
      opacity: 1, 
      scale: 1, 
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        once: true
      }
    }
  );
  
 

  // Animation du bouton contact au hover
  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('mouseenter', () => {
      gsap.to(contactBtn, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    contactBtn.addEventListener('mouseleave', () => {
      gsap.to(contactBtn, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Refresh après chargement
  ScrollTrigger.refresh();

  // Resize handler
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

// Démarrage du loading au chargement de la page
window.addEventListener('load', () => {
  simulateLoading();
});

// Démarrage immédiat si le DOM est déjà chargé
if (document.readyState === 'complete') {
  simulateLoading();
}