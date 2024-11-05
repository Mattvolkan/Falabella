document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let interval;
  let isAnimating = false;

  // Crear dots
  images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
          if (!isAnimating) goToSlide(index);
      });
      dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
      isAnimating = true;
      
      // Quitar clase active de todas las imágenes y dots
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Agregar clase active a la imagen y dot actual
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');

      // Permitir nueva animación después de la transición
      setTimeout(() => {
          isAnimating = false;
      }, 800); // Igual al tiempo de transición en CSS
  }

  function goToSlide(index) {
      if (currentIndex === index) return;
      currentIndex = index;
      updateCarousel();
      resetInterval();
  }

  function nextSlide() {
      if (!isAnimating) {
          currentIndex = (currentIndex + 1) % images.length;
          updateCarousel();
      }
  }

  function prevSlide() {
      if (!isAnimating) {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateCarousel();
      }
  }

  function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
      if (!isAnimating) {
          prevSlide();
          resetInterval();
      }
  });

  nextBtn.addEventListener('click', () => {
      if (!isAnimating) {
          nextSlide();
          resetInterval();
      }
  });

  // Iniciar autoplay
  resetInterval();

  // Pausar autoplay cuando el mouse está sobre el carousel
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', resetInterval);

  // Inicializar primera imagen
  images[0].classList.add('active');
});



  //Productos 50%
  document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for lazy loading and animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
  
    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
      observer.observe(card);
    });
  
    // Add to cart button animation
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.add('clicked');
        
        // Show feedback
        const originalText = button.textContent;
        button.textContent = 'Agregado ✓';
        
        // Reset button state
        setTimeout(() => {
          button.classList.remove('clicked');
          button.textContent = originalText;
        }, 1500);
      });
    });
  });