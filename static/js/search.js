// Global search functionality
function performGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    const query = searchInput.value.trim();
    
    if (query) {
        // Redirect to mods page with search query
        window.location.href = `/mods?search=${encodeURIComponent(query)}`;
    }
}

// Mod-specific search
function searchMods() {
    const searchInput = document.getElementById('mod-search');
    const query = searchInput.value.trim();
    
    if (query) {
        window.location.href = `/mods?search=${encodeURIComponent(query)}`;
    } else {
        window.location.href = '/mods';
    }
}

// Handle Enter key in search inputs
document.addEventListener('DOMContentLoaded', function() {
    const globalSearch = document.getElementById('global-search');
    const modSearch = document.getElementById('mod-search');
    
    if (globalSearch) {
        globalSearch.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performGlobalSearch();
            }
        });
    }
    
    if (modSearch) {
        modSearch.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchMods();
            }
        });
    }
});

// Live search suggestions (placeholder for future implementation)
function showSearchSuggestions(query) {
    // This would typically make an API call to get search suggestions
    // For now, it's a placeholder for future enhancement
    console.log('Searching for:', query);
}