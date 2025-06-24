// MOBILE INTERACTIONS - UNDEFINED STUDIO
// Gestion des interactions spécifiques mobile/tablette

document.addEventListener('DOMContentLoaded', function() {
  
  // Détection du device
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Gestion du viewport height sur mobile (fix pour la barre d'adresse)
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  // ScrollTrigger refresh sur changement d'orientation
  if (isMobile || isTablet) {
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
  }
  
  // Optimisation des animations GSAP pour mobile
  if (isMobile) {
    // Réduire la complexité des animations
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false
    });
    
    // Ajuster les durées d'animation pour mobile
    gsap.globalTimeline.timeScale(1.2); // Accélère légèrement les animations
  }
  
  // Touch interactions pour les shapes
  if (isTouchDevice) {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach(shape => {
      let touchStartX = 0;
      let touchStartY = 0;
      
      shape.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // Animation au touch
        gsap.to(shape, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      shape.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        // Calculer la distance du swipe
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Animation de release avec inertie
        gsap.to(shape, {
          x: `+=${deltaX * 0.5}`,
          y: `+=${deltaY * 0.5}`,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
        
        // Retour à la position après un délai
        gsap.to(shape, {
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  }
  
  // Smooth scroll pour mobile
  if (isMobile || isTablet) {
    // Désactiver le smooth scroll natif qui peut causer des problèmes
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Implémenter un smooth scroll custom pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          gsap.to(window, {
            duration: 1,
            scrollTo: target,
            ease: "power2.inOut"
          });
        }
      });
    });
  }
  
  // Gestion du menu burger pour mobile (si ajouté plus tard)
  if (isMobile || isTablet) {
    // Préparation pour un futur menu burger
    const body = document.body;
    body.setAttribute('data-device', isMobile ? 'mobile' : 'tablet');
  }
  
  // Optimisation du loading screen pour mobile
  if (isMobile) {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Accélérer le loading sur mobile
    if (loadingProgress) {
      const originalDuration = 4000; // 4 secondes originales
      const mobileDuration = 2500; // 2.5 secondes sur mobile
      
      // Override de la fonction simulateLoading si elle existe
      if (window.simulateLoading) {
        const originalSimulateLoading = window.simulateLoading;
        window.simulateLoading = function() {
          // Appeler la fonction originale avec des timings ajustés
          originalSimulateLoading();
        };
      }
    }
  }
  
  // Animation spéciale pour la hero section mobile
  if (isMobile) {
    // Attendre que GSAP soit chargé
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation du titre principal sur mobile
    const heroTimeline = gsap.timeline({
      delay: 0.5,
      defaults: { ease: "power3.out" }
    });
    
    // Animer UNDEFINED et STUDIO séparément
    heroTimeline
      .fromTo(".line1::before", 
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      )
      .fromTo(".line1::after",
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(".hero-content::after",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(".line3",
        { opacity: 0, y: 30 },
        { opacity: 0.8, y: 0, duration: 0.8 },
        "-=0.4"
      );
    
    // Effet de parallax léger sur scroll
    gsap.to(".line1", {
      y: -50,
      opacity: 0.6,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }
  
  // Gestion des cards swipe sur mobile
  if (isMobile && isTouchDevice) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      
      card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        card.style.transition = 'none';
      });
      
      card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        
        // Limiter le mouvement
        const limitedDelta = Math.max(-100, Math.min(100, deltaX));
        
        gsap.set(card, {
          x: limitedDelta,
          rotation: limitedDelta * 0.1,
          ease: "none"
        });
      });
      
      card.addEventListener('touchend', (e) => {
        isDragging = false;
        
        gsap.to(card, {
          x: 0,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  }
  
  // Adaptation de la section "You Can" pour mobile
  if (isMobile) {
    const wordItems = document.querySelectorAll('.word-item');
    
    // Ajouter un indicateur de scroll
    const wordsContainer = document.querySelector('.words-container');
    if (wordsContainer && !document.querySelector('.scroll-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'scroll-indicator';
      indicator.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      wordsContainer.appendChild(indicator);
      
      // Animation de l'indicateur
      gsap.to(indicator, {
        y: 10,
        opacity: 0.5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }
  
  // Performance : Désactiver les animations complexes sur les devices bas de gamme
  if (isMobile) {
    // Vérifier les performances
    const checkPerformance = () => {
      const fps = gsap.ticker.frame;
      if (fps < 30) { // Si moins de 30 FPS
        // Simplifier les animations
        document.body.classList.add('reduce-motion');
        
        // Désactiver certains effets
        gsap.set('.shape', { willChange: 'auto' });
        gsap.set('.word-item', { willChange: 'auto' });
      }
    };
    
    // Vérifier après 2 secondes
    setTimeout(checkPerformance, 2000);
  }
  
  // Gestion du formulaire de contact sur mobile
  if (isMobile || isTablet) {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
      // Focus amélioré sur mobile
      input.addEventListener('focus', () => {
        // Scroll vers l'input avec un offset
        setTimeout(() => {
          const rect = input.getBoundingClientRect();
          const offset = window.innerHeight / 3;
          
          if (rect.top < offset || rect.bottom > window.innerHeight - offset) {
            gsap.to(window, {
              duration: 0.5,
              scrollTo: {
                y: input,
                offsetY: offset
              },
              ease: "power2.out"
            });
          }
        }, 300); // Délai pour laisser le clavier s'ouvrir
      });
    });
  }
  
  // Ajuster les z-index pour mobile si nécessaire
  if (isMobile) {
    // S'assurer que les éléments interactifs sont au-dessus
    gsap.set('.store-button', { zIndex: 10 });
    gsap.set('.submit-btn', { zIndex: 10 });
  }
  
  // Debug helper pour mobile
  if (isMobile && window.location.hash === '#debug') {
    const debugInfo = document.createElement('div');
    debugInfo.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      font-size: 12px;
      z-index: 9999;
      font-family: monospace;
    `;
    debugInfo.innerHTML = `
      Viewport: ${window.innerWidth}x${window.innerHeight}<br>
      Device: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}<br>
      Touch: ${isTouchDevice ? 'Yes' : 'No'}
    `;
    document.body.appendChild(debugInfo);
  }
});

// Export des utilitaires pour utilisation externe
window.mobileUtils = {
  isMobile: () => window.matchMedia('(max-width: 767px)').matches,
  isTablet: () => window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches,
  isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  refreshScrollTrigger: () => ScrollTrigger.refresh()
}; 