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
document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel');
    const radios = document.querySelectorAll('.carousel-controls input[type="radio"]');
    const labels = document.querySelectorAll('.carousel-controls label');
  
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
    
    radios.forEach(radio => {
      radio.addEventListener('change', updateCarousel);
    });
  
    window.addEventListener('resize', updateCarousel);
  
    updateCarousel();
  });
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    let isDragging = false;
    let startX, scrollLeft;

    const dragStart = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.classList.add('dragging');
    };

    const dragEnd = () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    };

    const drag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        const walk = (x - startX) * 1; 
        carousel.scrollLeft = scrollLeft - walk;
    };

    // Mouse events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mousemove', drag);

    // Touch events
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('touchmove', drag);
});

