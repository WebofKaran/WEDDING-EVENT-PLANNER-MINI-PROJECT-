const filters = document.querySelectorAll('input[name="gallery-filter"]');
const cards = document.querySelectorAll('.gallery-card');

filters.forEach(function(filter) {
    filter.addEventListener('change', function() {
        const category = this.id.replace('filter-', '');

        cards.forEach(function(card) {
            if (category === 'all' || card.classList.contains('cat-' + category)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});