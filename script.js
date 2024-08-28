document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel');
    const radios = document.querySelectorAll('.carousel-controls input[type="radio"]');
    const labels = document.querySelectorAll('.carousel-controls label');
    const carouselContainer = document.querySelector('.carousel-container');
    let isDragging = false;
    let startX, scrollLeft;

    function updateCarousel() {
        const checkedRadio = document.querySelector('.carousel-controls input[type="radio"]:checked');
        labels.forEach(label => label.style.backgroundColor = '#ddd');
        const index = Array.from(radios).indexOf(checkedRadio);
        const itemWidth = carouselInner.querySelector('.card').offsetWidth;
        carouselInner.style.transform = `translateX(-${index * itemWidth}px)`;
        if (checkedRadio) {
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

        // Snap to the closest card
        const itemWidth = carouselInner.querySelector('.card').offsetWidth;
        const walk = scrollLeft - carouselContainer.scrollLeft;
        let index = Math.round(scrollLeft / itemWidth);

        if (Math.abs(walk) > itemWidth / 2) {
            index += walk > 0 ? -1 : 1;
        }

        index = Math.max(0, Math.min(index, radios.length - 1));

        // Snap to the final position
        carouselContainer.scrollLeft = index * itemWidth;
        updateRadioAfterDrag(index);
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - carouselContainer.offsetLeft;
        const walk = (x - startX) * 1; // Adjust this factor if needed
        carouselContainer.scrollLeft = scrollLeft - walk;
    };

    radios.forEach(radio => {
        radio.addEventListener('change', updateCarousel);
    });

    window.addEventListener('resize', updateCarousel);

    carouselContainer.addEventListener('mousedown', dragStart);
    carouselContainer.addEventListener('mouseleave', dragEnd);
    carouselContainer.addEventListener('mouseup', dragEnd);
    carouselContainer.addEventListener('mousemove', drag);

    carouselContainer.addEventListener('touchstart', dragStart);
    carouselContainer.addEventListener('touchend', dragEnd);
    carouselContainer.addEventListener('touchmove', drag);
    
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-logo');
    const menuDropdown = document.querySelector('.menu-dropdown'); 

    const updateDropdownVisibility = () => {
        const width = window.innerWidth;
        if (width > 610) {
            menuDropdown.style.display = 'none';
            menuDropdown.classList.remove('active'); 
            menuIcon.classList.remove('active'); 
        } else {
            menuDropdown.style.display = 'block';
            if (menuDropdown.classList.contains('active')) {
                menuDropdown.style.display = 'block';
            } else {
                menuDropdown.style.display = 'none';
            }
        }
    };

    updateDropdownVisibility();
    
    window.addEventListener('resize', updateDropdownVisibility);

    menuIcon.addEventListener('click', () => {
        menuDropdown.classList.toggle('active');
        menuIcon.classList.toggle('active');
        if (menuDropdown.classList.contains('active')) {
            menuDropdown.style.display = 'block';
        } else {
            menuDropdown.style.display = 'none';
        }
    });
});
