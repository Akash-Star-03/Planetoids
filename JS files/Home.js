document.addEventListener("DOMContentLoaded", function() {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    }, options);

    let targets = document.querySelectorAll('.info-box');
    targets.forEach(target => {
        observer.observe(target);
    });

    function startCounter() {
        let counter = document.getElementById('customerCounter');
        let count = 0;
        let target = 30000;
        let speed = 20;

        let updateCounter = () => {
            if (count < target) {
                count += Math.ceil(target / (1000 / speed));
                counter.textContent = count.toLocaleString();
                setTimeout(updateCounter, speed);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    const comments = document.querySelectorAll('.comment');
    const totalComments = comments.length;

    function showNextComment() {
        comments[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalComments;
        comments[currentIndex].classList.add('active');
    }

    setInterval(showNextComment, 5000);
});
document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');

    // Clear previous results
    searchResultsContainer.innerHTML = '';

    if (searchQuery.trim() === '') {
        return;
    }

    // Fetch and display results from movies.html and series.html
    Promise.all([
        fetch('/Components/Product.html').then(response => response.text())
    ]).then(pages => {
        pages.forEach(pageContent => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(pageContent, 'text/html');
            const movieCards = doc.querySelectorAll('.card-custom');

            movieCards.forEach(card => {
                if (card.getAttribute('data-title').toLowerCase().includes(searchQuery)) {
                    searchResultsContainer.innerHTML += card.outerHTML;
                }
            });
        });
    });
});