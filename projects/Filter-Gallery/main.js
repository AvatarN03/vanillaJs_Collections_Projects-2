const filterButtons = document.querySelectorAll('.btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const itemCount = document.getElementById('item-count');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                let visibleCount = 0;
                
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                        item.style.visibility = 'visible';
                        item.style.pointerEvents = 'auto';
                        visibleCount++;
                    } else {
                        item.classList.add('hide');
                        item.classList.remove('show');
                        item.style.pointerEvents = 'none';
                        setTimeout(() => {
                            item.style.visibility = 'hidden';
                        }, 500);
                    }
                });
                
                // Update counter
                itemCount.textContent = visibleCount;
            });
        });

        // Add 3D tilt effect on mouse move
        galleryItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                // Don't apply effect if item is hidden
                if (item.classList.contains('hide')) return;
                
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                item.style.transition = 'box-shadow 0.3s ease';
                item.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            item.addEventListener('mouseout', () => {
                item.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                item.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });