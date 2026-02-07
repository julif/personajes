       // MODAL LOGIC
        let slideIndex = 1;
        let scale = 1;
        let startDist = 0;

        function openModal(n) {
            const slides = document.getElementsByClassName("mySlides");
            const navButtons = [document.getElementById("prevBtn"), document.getElementById("nextBtn")];
            
            // Ocultar flechas si solo hay una imagen (independiente del dispositivo)
            if (slides.length <= 1) {
                navButtons.forEach(btn => btn.style.display = "none");
            }

            document.getElementById("myModal").style.display = "block";
            document.body.classList.add("modal-open");
            currentSlide(n);
        }

        function closeModal() {
            document.getElementById("myModal").style.display = "none";
            document.body.classList.remove("modal-open");
            resetZoom();
        }

        function plusSlides(n) { showSlides(slideIndex += n); }
        function currentSlide(n) { showSlides(slideIndex = n); }

        function showSlides(n) {
            let slides = document.getElementsByClassName("mySlides");
            if (n > slides.length) slideIndex = 1;
            if (n < 1) slideIndex = slides.length;
            for (let i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
            resetZoom();
            slides[slideIndex - 1].style.display = "flex";
        }

        function resetZoom() {
            scale = 1;
            document.querySelectorAll('.mySlides img').forEach(img => img.style.transform = `scale(1)`);
        }

        // CIERRE FONDO
        document.getElementById('myModal').addEventListener('click', (e) => {
            if (e.target.id === 'modalContent' || e.target.className === 'mySlides') closeModal();
        });

        // ZOOM RUEDA
        document.getElementById('myModal').addEventListener('wheel', (e) => {
            e.preventDefault();
            scale = Math.min(Math.max(1, scale + (e.deltaY > 0 ? -0.2 : 0.2)), 4);
            const activeImg = document.querySelector('.mySlides[style*="flex"] img');
            if(activeImg) activeImg.style.transform = `scale(${scale})`;
        }, { passive: false });

        // MOBILE GESTURES (SWIPE & PINCH)
        let touchStartX = 0;
        const modalContainer = document.getElementById('myModal');

        modalContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                startDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
            } else {
                touchStartX = e.changedTouches[0].screenX;
            }
        });

        modalContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                let dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                let newScale = Math.min(Math.max(1, scale * (dist / startDist)), 4);
                const activeImg = document.querySelector('.mySlides[style*="flex"] img');
                if(activeImg) activeImg.style.transform = `scale(${newScale})`;
            }
        }, { passive: false });

        modalContainer.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                let touchEndX = e.changedTouches[0].screenX;
                if (scale === 1) {
                    if (touchEndX < touchStartX - 60) plusSlides(1);
                    if (touchEndX > touchStartX + 60) plusSlides(-1);
                }
                const activeImg = document.querySelector('.mySlides[style*="flex"] img');
                if(activeImg) {
                    const transform = window.getComputedStyle(activeImg).transform;
                    if (transform !== 'none') scale = parseFloat(transform.split('(')[1].split(',')[0]);
                }
            }
        });