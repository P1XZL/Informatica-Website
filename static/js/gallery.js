document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    let currentImageIndex = 0;
    let currentFilter = 'all';
    let visibleItems = [];

    // Get all gallery items
    function getVisibleItems() {
        const allItems = Array.from(document.querySelectorAll('.gallery-item'));
        if (currentFilter === 'all') {
            return allItems.filter(item => !item.classList.contains('filter-hidden'));
        } else {
            return allItems.filter(item => 
                item.dataset.category === currentFilter && 
                !item.classList.contains('filter-hidden')
            );
        }
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            currentFilter = filter;
            const items = document.querySelectorAll('.gallery-item');
            
            items.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('filter-hidden');
                    item.classList.add('filter-show');
                    // Stagger animation
                    setTimeout(() => {
                        item.style.animationDelay = (index * 0.1) + 's';
                    }, 50);
                } else {
                    item.classList.add('filter-hidden');
                    item.classList.remove('filter-show');
                }
            });
            
            // Update visible items for lightbox
            setTimeout(() => {
                visibleItems = getVisibleItems();
            }, 400);
        });
    });

    // Initialize visible items
    visibleItems = getVisibleItems();

    // Lightbox functionality
    function openLightbox(index) {
        currentImageIndex = index;
        const item = visibleItems[index];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = overlay.querySelector('h3').textContent;
        lightboxDescription.textContent = overlay.querySelector('p').textContent;
        
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        openLightbox(currentImageIndex);
    }

    // Event listeners for lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside image
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxOverlay.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Gallery item click handlers
    function attachGalleryItemListeners() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                visibleItems = getVisibleItems();
                const visibleIndex = visibleItems.indexOf(item);
                if (visibleIndex !== -1) {
                    openLightbox(visibleIndex);
                }
            });
        });
    }

    // Initialize gallery item listeners
    attachGalleryItemListeners();

    // Load more functionality
    let loadMoreCount = 0;
    const additionalImages = [
        {
            src: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "builds",
            title: "Gothic Cathedral",
            description: "Magnificent gothic cathedral with flying buttresses"
        },
        {
            src: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "landscapes",
            title: "Desert Oasis",
            description: "Beautiful desert landscape with hidden oasis"
        },
        {
            src: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "pixel-art",
            title: "Logo Recreation",
            description: "Pixel perfect recreation of famous game logo"
        },
        {
            src: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "redstone",
            title: "Music Box",
            description: "Redstone-powered music box playing melodies"
        }
    ];

    loadMoreBtn.addEventListener('click', function() {
        const startIndex = loadMoreCount * 4;
        const endIndex = Math.min(startIndex + 4, additionalImages.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const imageData = additionalImages[i];
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item loading';
            galleryItem.dataset.category = imageData.category;
            
            galleryItem.innerHTML = `
                <img src="${imageData.src}" alt="${imageData.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.description}</p>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Trigger animation
            setTimeout(() => {
                galleryItem.classList.remove('loading');
            }, 100);
        }
        
        loadMoreCount++;
        
        // Hide load more button if no more images
        if (endIndex >= additionalImages.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Reattach event listeners to new items
        setTimeout(() => {
            attachGalleryItemListeners();
            visibleItems = getVisibleItems();
        }, 500);
    });

    // Smooth scroll animation for gallery items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Touch/swipe support for mobile lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxOverlay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxOverlay.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                showNextImage();
            } else {
                // Swipe right - previous image
                showPrevImage();
            }
        }
    }
});