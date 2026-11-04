// ==========================================================================
// JAVASCRIPT: REAL-TIME SEARCH & PLATFORM FILTERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('gameSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  let currentPlatform = 'all';
  let searchQuery = '';

  // Function to filter games based on platform and search keyword
  function filterGames() {
    gameCards.forEach((card) => {
      const cardPlatform = card.getAttribute('data-platform') || '';
      const cardTitle = card.getAttribute('data-title') || '';
      const cardText = card.textContent.toLowerCase();

      const matchesPlatform = (currentPlatform === 'all') || cardPlatform.includes(currentPlatform);
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardText.includes(searchQuery);

      if (matchesPlatform && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Event listener for search box
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterGames();
    });
  }

  // Event listeners for category filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentPlatform = btn.getAttribute('data-platform') || 'all';
      filterGames();
    });
  });

  // Smooth scroll for Back to Top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Interactive Favorite / Heart toggle
function toggleFavorite(button) {
  button.classList.toggle('liked');
  const textSpan = button.querySelector('.like-count');
  if (button.classList.contains('liked')) {
    button.innerHTML = '❤️ <span class="like-count">Favorited!</span>';
  } else {
    button.innerHTML = '🤍 <span class="like-count">Favorite</span>';
  }
}
