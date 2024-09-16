document.addEventListener('DOMContentLoaded', () => {
  
    const carouselInner = document.querySelector('.carousel');
    const radios = document.querySelectorAll('.carousel-controls input[type="radio"]');
    const labels = document.querySelectorAll('.carousel-controls label');
    const carouselContainer = document.querySelector('.carousel-container');
    let isDragging = false;
    let startX, scrollLeft;
    
    function updateCarousel() {
        const checkedRadio = document.querySelector('.carousel-controls input[type="radio"]:checked');
        
        if (checkedRadio) {
            const index = Array.from(radios).indexOf(checkedRadio);
            const itemWidth = carouselInner.querySelector('.card').offsetWidth;
            carouselInner.style.transform = `translateX(-${index * itemWidth}px)`;
            labels.forEach(label => label.style.backgroundColor = '#ddd');
            const checkedLabel = document.querySelector(`label[for="${checkedRadio.id}"]`);
            if (checkedLabel) {
                checkedLabel.style.backgroundColor = '#007bff';
            }
        }
    }
    
    function updateRadioAfterDrag(index) {
        radios[index].checked = true;
        updateCarousel();
    }
    
    const dragStart = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        carouselContainer.classList.add('dragging');
    };
    
    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        carouselContainer.classList.remove('dragging');
    
        const itemWidth = carouselInner.querySelector('.card').offsetWidth;
        const walk = scrollLeft - carouselContainer.scrollLeft;
        let index = Math.round(scrollLeft / itemWidth);
    
        if (Math.abs(walk) > itemWidth / 2) {
            index += walk > 0 ? -1 : 1;
        }
    
        index = Math.max(0, Math.min(index, radios.length - 1));
    
        carouselContainer.scrollLeft = index * itemWidth;
        updateRadioAfterDrag(index);
    };
    
    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - carouselContainer.offsetLeft;
        const walk = (x - startX) * 1;
        carouselContainer.scrollLeft = scrollLeft - walk;
    };
    
    radios.forEach(radio => {
        radio.addEventListener('change', updateCarousel);
    });
    
    window.addEventListener('resize', updateCarousel);
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mousedown', dragStart);
        carouselContainer.addEventListener('mouseleave', dragEnd);
        carouselContainer.addEventListener('mouseup', dragEnd);
        carouselContainer.addEventListener('mousemove', drag);
    
        carouselContainer.addEventListener('touchstart', dragStart);
        carouselContainer.addEventListener('touchend', dragEnd);
        carouselContainer.addEventListener('touchmove', drag);
    }
    
    if (radios.length > 0) {
        radios[0].checked = true; 
        labels[0].style.backgroundColor = '#007bff'; 
    }
    
    updateCarousel();
    

    const menuIcon = document.querySelector('.menu-logo');
    const menuDropdown = document.querySelector('.menu-dropdown'); 

    const updateDropdownVisibility = () => {
        const width = window.innerWidth;
        if (width > 610) {
            menuDropdown.style.display = 'none';
            menuDropdown.classList.remove('active'); 
            menuIcon.classList.remove('active'); 
        } else {
            if (menuDropdown.classList.contains('active')) {
                menuDropdown.style.display = 'block';
            } else {
                menuDropdown.style.display = 'none';
            }
        }
    };

    updateDropdownVisibility();
    
    window.addEventListener('resize', updateDropdownVisibility);

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuDropdown.classList.toggle('active');
            menuIcon.classList.toggle('active');
            if (menuDropdown.classList.contains('active')) {
                menuDropdown.style.display = 'block';
            } else {
                menuDropdown.style.display = 'none';
            }
        });
    }

   
    const carousel2 = document.querySelector('.carousel2');
    const labels2 = document.querySelectorAll('.carousel-controls2 label');
    const radios2 = document.querySelectorAll('.carousel-controls2 input[type="radio"]');
    const carouselContainer2 = document.querySelector('.carousel-container2'); 
    let isDragging2 = false; 
    let startX2, scrollLeft2; 

    if (carousel2 && labels2.length && radios2.length) {
        radios2.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                const itemWidth = document.querySelector('.card2').offsetWidth;
                carousel2.style.transform = `translateX(-${itemWidth * index}px)`;
                labels2.forEach(lbl => lbl.classList.remove('active'));
                labels2[index].classList.add('active');
            });
        });

        const dragStart2 = (e) => {
            isDragging2 = true;
            startX2 = (e.pageX || e.touches[0].pageX) - carouselContainer2.offsetLeft;
            scrollLeft2 = carouselContainer2.scrollLeft;
            carouselContainer2.classList.add('dragging');
        };

        const dragEnd2 = () => {
            if (!isDragging2) return;
            isDragging2 = false;
            carouselContainer2.classList.remove('dragging');

            const itemWidth = carousel2.querySelector('.card2').offsetWidth;
            const walk = scrollLeft2 - carouselContainer2.scrollLeft;
            let index = Math.round(scrollLeft2 / itemWidth);

            if (Math.abs(walk) > itemWidth / 2) {
                index += walk > 0 ? -1 : 1;
            }

            index = Math.max(0, Math.min(index, radios2.length - 1));

            carouselContainer2.scrollLeft = index * itemWidth;
            radios2[index].checked = true;
        };

        const drag2 = (e) => {
            if (!isDragging2) return;
            e.preventDefault();
            const x2 = (e.pageX || e.touches[0].pageX) - carouselContainer2.offsetLeft;
            const walk2 = (x2 - startX2) * 1;
            carouselContainer2.scrollLeft = scrollLeft2 - walk2;
        };


        if (carouselContainer2) {
            carouselContainer2.addEventListener('mousedown', dragStart2);
            carouselContainer2.addEventListener('mouseleave', dragEnd2);
            carouselContainer2.addEventListener('mouseup', dragEnd2);
            carouselContainer2.addEventListener('mousemove', drag2);

            carouselContainer2.addEventListener('touchstart', dragStart2);
            carouselContainer2.addEventListener('touchend', dragEnd2);
            carouselContainer2.addEventListener('touchmove', drag2);
        }

        radios2[0].checked = true;
        labels2[0].classList.add('active');
    }

    document.querySelectorAll('.Reviews-container').forEach(container => {
        const carouselReview = container.querySelector('.Reviews-container-main');
        const labelsReview = container.querySelectorAll('.carousel-radio-buttons label');
        const radiosReview = container.querySelectorAll('.carousel-radio-buttons input[type="radio"]');
        const reviewCards = container.querySelectorAll('.Reviews-container-Grid');
        let isDraggingReview = false;
        let startXReview, scrollLeftReview;
    
        
        carouselReview.style.transition = 'none';
        carouselReview.style.width = `${reviewCards.length * 100}%`; 
    
        const scrollToCard = (index) => {
            const itemWidth = reviewCards[0].offsetWidth; 
            const scrollPosition = index * itemWidth; 
            carouselReview.scrollTo({
                left: scrollPosition,
                behavior: 'smooth' 
            });
            labelsReview.forEach(lbl => lbl.classList.remove('active'));
            if (labelsReview[index]) {
                labelsReview[index].classList.add('active');
            }
        };
    
    
        radiosReview.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                scrollToCard(index); 
            });
        });
    
 
        const dragStartReview = (e) => {
            isDraggingReview = true;
            startXReview = (e.pageX || e.touches[0].pageX) - carouselReview.offsetLeft;
            scrollLeftReview = carouselReview.scrollLeft;
            carouselReview.classList.add('dragging');
        };
    
        const dragEndReview = () => {
            if (!isDraggingReview) return;
            isDraggingReview = false;
            carouselReview.classList.remove('dragging');
    
            const itemWidth = reviewCards[0].offsetWidth;
            let index = Math.round(carouselReview.scrollLeft / itemWidth); 
            index = Math.max(0, Math.min(index, reviewCards.length - 1)); 
    
            scrollToCard(index); 
            radiosReview[index].checked = true; 
        };
    
        const dragReview = (e) => {
            if (!isDraggingReview) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - carouselReview.offsetLeft;
            const walk = (x - startXReview) * 1;
            carouselReview.scrollLeft = scrollLeftReview - walk; 
        };
 
        carouselReview.addEventListener('mousedown', dragStartReview);
        carouselReview.addEventListener('mouseleave', dragEndReview);
        carouselReview.addEventListener('mouseup', dragEndReview);
        carouselReview.addEventListener('mousemove', dragReview);
    
        carouselReview.addEventListener('touchstart', dragStartReview);
        carouselReview.addEventListener('touchend', dragEndReview);
        carouselReview.addEventListener('touchmove', dragReview);
    

        radiosReview[0].checked = true;
        labelsReview[0].classList.add('active');
    });
    
    
});
