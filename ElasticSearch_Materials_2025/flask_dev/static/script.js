// State management
let selectedFilter = 'all';
let searchQuery = '';

// DOM elements
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsSection = document.getElementById('resultsSection');
const resultsText = document.getElementById('resultsText');

// Filter button functionality
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update selected filter
        selectedFilter = btn.dataset.filter;
        
        // Update placeholder text based on filter
        updatePlaceholder();
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    });
});

// Update placeholder text based on selected filter
function updatePlaceholder() {
    const placeholders = {
        'all': 'Search for characters, weapons, artifacts, or quests...',
        'characters': 'Search for characters like Diluc, Zhongli, Ganyu...',
        'weapons': 'Search for weapons like Skyward Harp, Wolf\'s Gravestone...',
        'artifacts': 'Search for artifacts like Gladiator\'s Finale, Viridescent Venerer...',
        'quests': 'Search for quests like Archon Quest, World Quest...'
    };
    
    searchInput.placeholder = placeholders[selectedFilter];
}

// Search functionality
function performSearch() {
    searchQuery = searchInput.value.trim();
    
    if (searchQuery === '') {
        // Show empty search message
        showResults('Please enter a search term to begin your adventure!');
        return;
    }

    // Simulate search results
    const filterText = selectedFilter === 'all' ? 'all categories' : selectedFilter;
    const resultMessage = `Searching for "${searchQuery}" in ${filterText}...\n\nThis is a demo interface. In a real implementation, this would connect to a Genshin Impact database and return relevant ${selectedFilter === 'all' ? 'items' : selectedFilter} matching your search query.`;
    
    showResults(resultMessage);
}

// Show search results
function showResults(message) {
    resultsText.textContent = message;
    resultsSection.classList.add('show');
}

// Event listeners
searchButton.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Add input animation
searchInput.addEventListener('focus', () => {
    searchInput.style.transform = 'scale(1.02)';
});

searchInput.addEventListener('blur', () => {
    searchInput.style.transform = 'scale(1)';
});

// Add search button pulse animation
setInterval(() => {
    if (searchInput.value.trim() !== '') {
        searchButton.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            searchButton.style.animation = '';
        }, 500);
    }
}, 3000);

// Pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePlaceholder();
});