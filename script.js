        document.addEventListener('DOMContentLoaded', function() {
            const letterButton = document.getElementById('letter-button');
            const originalLetter = document.getElementById('original-letter');
            const weekAfterButton = document.getElementById('one-week-button');
            const weekAfterContent = document.getElementById('week-after-content');
            const daysAfterButton = document.getElementById('days-after-button');
            const dayAfterContent = document.getElementById('day-after-content');

            daysAfterButton.addEventListener('click', function() {
                if (dayAfterContent.classList.contains('hidden')) {
                    dayAfterContent.classList.remove('hidden');
                    daysAfterButton.textContent = 'Hide Day After Content';
                } else {
                    dayAfterContent.classList.add('hidden');
                    daysAfterButton.textContent = 'day after';
                }
            });

            weekAfterButton.addEventListener('click', function() {
                if (weekAfterContent.classList.contains('hidden')) {
                    weekAfterContent.classList.remove('hidden');
                    weekAfterButton.textContent = 'Hide Week After Content';
                } else {
                    weekAfterContent.classList.add('hidden');
                    weekAfterButton.textContent = 'week after closure project';
                }
            });
            letterButton.addEventListener('click', function() {
                if (originalLetter.classList.contains('hidden')) {
                    originalLetter.classList.remove('hidden');
                    letterButton.textContent = 'Hide Letter';
                } else {
                    originalLetter.classList.add('hidden');
                    letterButton.textContent = 'Read the Original Letter';
                }
            });
        });

          const cloudBtn = document.getElementById('cloudBtn');
            const popup = document.getElementById('popup');
            const overlay = document.getElementById('overlay');

            cloudBtn.addEventListener('click', () => {
                popup.classList.add('show');
                overlay.classList.add('show');
            });

            overlay.addEventListener('click', () => {
                popup.classList.remove('show');
                overlay.classList.remove('show');
            });

        class ThoughtCloud {
            constructor(elementId, options = {}) {
                this.element = document.getElementById(elementId);
                this.options = {
                    clickUrl: options.clickUrl || 'random-thoughts.html',
                    loadingDuration: options.loadingDuration || 1000,
                    ...options
                };
                
                this.init();
            }

            init() {
                this.element.addEventListener('click', this.handleClick.bind(this));
                this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
                this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            }

            handleClick(e) {
                e.preventDefault();
                
                // Add ripple effect
                this.element.classList.add('clicked');
                setTimeout(() => {
                    this.element.classList.remove('clicked');
                }, 600);

                // Add loading state
                this.element.classList.add('loading');
                
                // Simulate loading and navigate
                setTimeout(() => {
                    this.element.classList.remove('loading');
                    // Replace with your actual navigation logic
                    console.log('Navigating to:', this.options.clickUrl);
                    // window.location.href = this.options.clickUrl;
                    
                    // For demo purposes, show an alert
                    alert('Would navigate to: ' + this.options.clickUrl);
                }, this.options.loadingDuration);
            }

            handleMouseEnter() {
                // Add any hover effects here
                this.element.style.setProperty('--hover-scale', '1.15');
            }

            handleMouseLeave() {
                // Reset hover effects
                this.element.style.setProperty('--hover-scale', '1');
            }

            // Public method to trigger the drawing animation again
            redraw() {
                const cloudPath = this.element.querySelector('.cloud-path');
                const bubbles = this.element.querySelectorAll('.cloud-bubble-1, .cloud-bubble-2');
                const emoji = this.element.querySelector('.thought-emoji');
                
                // Reset animations
                cloudPath.style.animation = 'none';
                bubbles.forEach(bubble => bubble.style.animation = 'none');
                emoji.style.animation = 'none';
                
                // Trigger reflow
                cloudPath.offsetHeight;
                
                // Restart animations
                setTimeout(() => {
                    cloudPath.style.animation = 'drawPath 2s ease-out forwards';
                    bubbles.forEach(bubble => {
                        bubble.style.animation = 'bubbleAppear 0.6s ease-out 1.5s forwards';
                    });
                    emoji.style.animation = 'emojiPulse 1s ease-out 2.2s forwards';
                }, 50);
            }
        }

        // Initialize the thought cloud
        const thoughtCloud = new ThoughtCloud('thoughtCloud', {
            clickUrl: 'random-thoughts.html',
            loadingDuration: 1200
        });

        // Demo: Redraw animation every 10 seconds
        setInterval(() => {
            thoughtCloud.redraw();
        }, 10000);
