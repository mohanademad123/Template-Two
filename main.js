function animateCount(element, targetNumber) {
        let currentNumber = 0;
        const increment = Math.ceil(targetNumber / 100);
        const interval = setInterval(function () {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(interval);
            }
            element.textContent = currentNumber.toLocaleString();
        }, 20);
    }

    function startAnimationOnScroll() {
        const elements = document.querySelectorAll('.number');
        const options = {
            threshold: 0.5 
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetNumber = parseInt(entry.target.dataset.target, 10);
                    animateCount(entry.target, targetNumber);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    document.addEventListener('DOMContentLoaded', startAnimationOnScroll);