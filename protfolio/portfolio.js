document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const portfolioData = [
    {
      id: 1,
      category: 'weddings',
      categoryLabel: 'Wedding',
      title: 'Aarav & Meera',
      location: 'Umaid Bhawan Palace, Jodhpur',
      guests: '450 Guests',
      timeline: '3-Day Royal Extravaganza',
      desc: 'A regal 3-day royal palace affair with traditional marigold entry, velvet mandap, and orchestral symphony.',
      story: 'EverAfter & Elan Weddings brought Rajputana royal heritage to life. From hand-crafted brass torchlit processional entrances to a consecrated mandap wrapped in 10,000 deep crimson roses, every second was orchestrated to royal perfection.',
      highlights: ['Palace Courtyard Vows', 'Velvet Mandap Artistry', 'Regal Torchlit Baraat', 'Royal Fireworks Finale'],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      category: 'weddings',
      categoryLabel: 'Wedding',
      title: 'Kabir & Rhea',
      location: 'Beachfront Lawn, South Goa',
      guests: '250 Guests',
      timeline: 'Sunset Barefoot Ceremony',
      desc: 'Sunset vows bathed in golden amber hues, minimalist driftwood decor, and acoustic bohemian melodies.',
      story: 'A breezy, deeply intimate seaside celebration along the warm Arabian waters. Featuring barefoot mandap vows under natural macramé drapery, fresh tropical floral accents, artisanal coconut drink bars, and an all-night seaside bonfire celebration.',
      highlights: ['Barefoot Beach Vows', 'Minimalist Driftwood Arch', 'Acoustic Sunset Sets', 'Seaside Bonfire Night'],
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      category: 'receptions',
      categoryLabel: 'Reception',
      title: 'Rohan & Ananya',
      location: 'Taj Lake Palace, Udaipur',
      guests: '350 Guests',
      timeline: 'Black-Tie Island Gala',
      desc: 'An evening of timeless glamour on the royal terrace, featuring floating candelabras and jazz ensembles.',
      story: 'Floating atop the historic waters of Lake Pichola, this black-tie evening banquet featured mirrored tablescapes, crystal champagne pyramids, bespoke jazz quartet performances, and private fireworks lighting up the Udaipur skyline.',
      highlights: ['Floating Island Terrace', 'Mirrored Tablescapes', 'Live Jazz Ensemble', 'Private Fireworks Show'],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      category: 'decor',
      categoryLabel: 'Floral & Decor',
      title: 'The Lotus Sanctum',
      location: 'The Oberoi Udaivilas',
      guests: 'Signature Installation',
      timeline: 'Pheras Ceremony Design',
      desc: 'Cascading tuberose, blush roses, and hand-carved stone arches reflected on serene infinity pools.',
      story: 'Our master floral architects sculpted a floating 16-pillar sanctum surrounded by fragrant lotus blossoms, cascading white orchids, and candlelit stepped pools created for an unforgettable, sacred wedding pheras ceremony.',
      highlights: ['Floating 16-Pillar Mandap', 'White Orchid Cascades', 'Candlelit Reflecting Pools', 'Handcrafted Stone Arches'],
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      category: 'prewedding',
      categoryLabel: 'Pre-Wedding',
      title: 'Dev & Simran',
      location: 'Stepwells & Havelis, Jaipur',
      guests: 'Editorial Story',
      timeline: '2-Day Heritage Shoot',
      desc: 'An intimate cinematic editorial capturing vintage royal architecture and timeless romantic nostalgia.',
      story: 'Styled in bespoke royal couture, our production and cinematography team captured quiet intimate glances against thousand-year-old carved stepwells and historic pink courtyards, resulting in a timeless heirloom pre-wedding documentary.',
      highlights: ['Heritage Stepwell Backdrop', 'Custom Royal Couture', 'Cinematic Drone Angles', 'Sunset Haveli Portraits'],
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      category: 'receptions',
      categoryLabel: 'Reception',
      title: 'Ishaan & Tanya',
      location: 'ITC Grand Bharat, Gurgaon',
      guests: '500 Guests',
      timeline: 'Grand Ballroom Banquet',
      desc: 'Black-tie banquet surrounded by cascading crystal chandeliers, bespoke cocktails, and live aerial performers.',
      story: 'An evening inspired by contemporary ballroom grandeur: towering botanical floral centerpieces, curated 7-course global culinary gastronomy, handcrafted artisanal cocktails, and a bespoke illuminated dance arena.',
      highlights: ['Cascading Crystal Canopies', '7-Course Gastronomy', 'Illuminated Dance Arena', 'Aerial Velvet Performers'],
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 7,
      category: 'decor',
      categoryLabel: 'Floral & Decor',
      title: 'The Starlight Canopy',
      location: 'Rambagh Palace, Jaipur',
      guests: 'Signature Installation',
      timeline: 'Open-Air Reception Decor',
      desc: 'Overhead glass canopy illuminated by 1,200 micro-fairy lights, hanging wisteria, and fragrant white jasmine.',
      story: 'Designed specifically for open-sky starlit banquets, this installation featured over 1,200 delicate pendant crystals, ethereal sheer drapery, and romantic warm amber illumination that turned the palace lawn into a fairy-tale cosmos.',
      highlights: ['1,200 Pendant Crystals', 'Hanging Wisteria & Jasmine', 'Ambient Amber Lighting', 'Bespoke Mirrored Stages'],
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 8,
      category: 'weddings',
      categoryLabel: 'Wedding',
      title: 'Vivaan & Pooja',
      location: 'Jai Mahal Palace, Jaipur',
      guests: '600 Guests',
      timeline: 'Traditional Royal Celebration',
      desc: 'Royal baraat entry with traditional dhol players, regal pink sandstone courtyards, and grand fireworks display.',
      story: 'A magnificent celebration in true Rajputana tradition. Featuring a regal vintage car processional, rose petal showers from centuries-old palace balconies, and 200 folk musicians playing sacred royal raags under the desert stars.',
      highlights: ['Vintage Car Processional', 'Rose Petal Balcony Showers', 'Traditional Folk Musicians', 'Grand Palace Courtyard'],
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 9,
      category: 'prewedding',
      categoryLabel: 'Pre-Wedding',
      title: 'Siddharth & Tara',
      location: 'Sam Sand Dunes, Jaisalmer',
      guests: 'Editorial Story',
      timeline: 'Golden Hour Desert Session',
      desc: 'Golden hour desert editorial with flowing silk ensembles, warm desert winds, and starlit campfire portraits.',
      story: 'Captured under the warm golden desert glow of western Rajasthan. Bohemian rugs, lantern-lit desert pathways, and heartwarming couple portraits that preserve the raw romance of the great Thar desert.',
      highlights: ['Golden Hour Desert Glow', 'Bohemian Lantern Paths', 'Flowing Silk Ensembles', 'Starlit Campfire Portraits'],
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 10,
      category: 'decor',
      categoryLabel: 'Floral & Decor',
      title: 'The Velvet Mirage',
      location: 'Fairmont Jaipur',
      guests: 'Sangeet Spectacular',
      timeline: 'Sangeet Night Stage & Lounge',
      desc: 'Vibrant marigold draping, moroccan brass lanterns, low velvet seating, and an electrified dance floor setup.',
      story: 'Vibrant jewel tones, rich fuchsia silks, and ornate brass lanterns transformed the courtyard into an electrifying celebratory carnival for an unforgettable Sangeet celebration packed with live performances and energy.',
      highlights: ['Ornate Moroccan Brass Lanterns', 'Jewel-Toned Velvet Lounges', 'Interactive LED Dancefloor', 'Artisanal Marigold Draping'],
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 11,
      category: 'receptions',
      categoryLabel: 'Reception',
      title: 'Arjun & Natasha',
      location: 'Taj West End, Bengaluru',
      guests: '300 Guests',
      timeline: 'Garden Al-Fresco Dinner',
      desc: 'An al-fresco garden dinner under centenary banyan trees with bespoke grazing tables and string quartet.',
      story: 'Lush manicured tropical botanical gardens lit by warm festoon lights, artisanal live cooking stations, handcrafted dessert bars, and heartfelt champagne toasts beneath centuries-old heritage banyan trees.',
      highlights: ['Century-Old Banyan Setting', 'Festoon String Lighting', 'Artisanal Grazing Tables', 'Classical String Quartet'],
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 12,
      category: 'prewedding',
      categoryLabel: 'Pre-Wedding',
      title: 'Neil & Kriti',
      location: 'Lake Pichola Ghats, Udaipur',
      guests: 'Editorial Story',
      timeline: 'Sunrise Water Editorial',
      desc: 'Sunrise boat portraits across tranquil waters reflecting ancient marble domes and misty Aravali hills.',
      story: 'Gliding silently across lake waters as dawn breaks over royal marble palaces. Our cinematography team captured breathtaking water reflections, pastel morning skies, and quiet romantic moments.',
      highlights: ['Lake Pichola Sunrise Sail', 'Marble Palace Reflections', 'Pastel Morning Horizons', 'Intimate Couple Portraits'],
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryEmpty = document.getElementById('galleryEmpty');

  const modal = document.getElementById('portfolioModal');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalPrevBtn = document.querySelector('.modal-arrow.prev');
  const modalNextBtn = document.querySelector('.modal-arrow.next');

  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  const modalGuests = document.getElementById('modalGuests');
  const modalTimeline = document.getElementById('modalTimeline');
  const modalStory = document.getElementById('modalStory');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalCounter = document.getElementById('modalCounter');
  let currentFilter = 'all';
  let currentModalIndex = 0;
  let currentlyVisibleItems = [...portfolioData];

  function applyFilter(category) {
    currentFilter = category;

    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let visibleCount = 0;

    galleryCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const matches = (category === 'all' || cardCategory === category);

      if (matches) {
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        });
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px) scale(0.96)';
        setTimeout(() => {
          if (currentFilter !== 'all' && card.getAttribute('data-category') !== currentFilter) {
            card.style.display = 'none';
          }
        }, 300);
      }
    });

    if (category === 'all') {
      currentlyVisibleItems = [...portfolioData];
    } else {
      currentlyVisibleItems = portfolioData.filter(item => item.category === category);
    }

    if (galleryEmpty) {
      galleryEmpty.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  
  function renderModalData(itemIndex) {
    if (!currentlyVisibleItems.length) return;

    
    if (itemIndex < 0) {
      itemIndex = currentlyVisibleItems.length - 1;
    } else if (itemIndex >= currentlyVisibleItems.length) {
      itemIndex = 0;
    }

    currentModalIndex = itemIndex;
    const item = currentlyVisibleItems[currentModalIndex];

   
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalBadge.textContent = item.categoryLabel;
    modalTitle.textContent = item.title;
    modalLocation.textContent = '📍 ' + item.location;
    modalGuests.textContent = '👥 ' + item.guests;
    modalTimeline.textContent = '📅 ' + item.timeline;
    modalStory.textContent = item.story;

    
    modalHighlights.innerHTML = '';
    item.highlights.forEach(highlight => {
      const tag = document.createElement('span');
      tag.className = 'modal-tag';
      tag.textContent = '✦ ' + highlight;
      modalHighlights.appendChild(tag);
    });

    
    modalCounter.textContent = `${currentModalIndex + 1} / ${currentlyVisibleItems.length}`;
  }

  function openModal(itemId) {
    
    const index = currentlyVisibleItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      renderModalData(index);
    } else {
      
      const globalIndex = portfolioData.findIndex(item => item.id === itemId);
      if (globalIndex !== -1) {
        currentlyVisibleItems = [...portfolioData];
        renderModalData(globalIndex);
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; 
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; 
  }

  function showNextModal() {
    renderModalData(currentModalIndex + 1);
  }

  function showPrevModal() {
    renderModalData(currentModalIndex - 1);
  }

  
  galleryGrid.addEventListener('click', (e) => {
    
    const trigger = e.target.closest('[data-id]');
    if (trigger) {
      const itemId = parseInt(trigger.getAttribute('data-id'), 10);
      if (!isNaN(itemId)) {
        openModal(itemId);
      }
    }
  });

  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevModal();
    });
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextModal();
    });
  }

  
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      showNextModal();
    } else if (e.key === 'ArrowLeft') {
      showPrevModal();
    }
  });

  
  applyFilter('all');
});
