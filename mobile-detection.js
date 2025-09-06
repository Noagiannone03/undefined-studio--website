// Détection mobile et affichage conditionnel
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 768;
}

function showMobilePage() {
  const mobilePage = document.getElementById('mobile-page');
  const mainContent = document.querySelector('body').children;
  
  if (isMobileDevice()) {
    mobilePage.style.display = 'flex';
    // Cacher tout le reste du contenu sauf la page mobile
    for (let i = 1; i < mainContent.length; i++) {
      if (mainContent[i].id !== 'mobile-page') {
        mainContent[i].style.display = 'none';
      }
    }
  }
}

// Vérifier au chargement et au redimensionnement
document.addEventListener('DOMContentLoaded', showMobilePage);
window.addEventListener('resize', showMobilePage);

// Vérification immédiate
showMobilePage();