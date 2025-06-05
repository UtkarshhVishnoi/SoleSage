let menu_btn = document.getElementById("menu-btn");
let drop_menu = document.getElementById("drop_nav");

menu_btn.addEventListener("click", () => {
  drop_menu.classList.toggle("hidden");
});

let productName = "";
let productPrice = "";
let image = "";
let cartnum = 0;
let cartprice = 0;

const productsContainer = document.getElementById("product-container");
productsContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("add-t-cart")) {
    const productCard = clickedElement.closest(".pcard");
    if (productCard) {
      productName = productCard.querySelector(".product-title").textContent;
      productPrice = Number(
        productCard.querySelector(".product-price").textContent
      );
      image = productCard.querySelector(".product-image").src;
      cartnum += 1;
      cartprice += productPrice;
      targetElement = document.getElementById("crt");
      document.getElementById("cartp").innerText = cartprice;
      const newHtmlContent = `
        <div class='flex items-center gap-2 rounded-md p-2'>
            <img src=${image} class='h-28 w-28'/>
            <div class='flex gap-3 items-center'>
               <h1 class='text-md font-semibold'>${productName}</h1>
               <p>${"₹" + productPrice}</p>
            </div>
        </div>`;

      targetElement.innerHTML += newHtmlContent;

      console.log(
        `Adding to cart: Name: ${productName}, Price: ${productPrice} , cartprice: ${cartprice} , cart: ${cartnum} , src: ${image} `
      );

      document.getElementById("cart-num").innerText = cartnum;

      // --- PLACE TOASTIFY CODE HERE ---
      Toastify({
        text: "Item added to cart",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#603F26",
          borderRadius: "20px",
          color: "#f7f3e7",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      // --- END TOASTIFY CODE ---
    }
  }
  // The Toastify code was originally here, but it needs to be inside the 'if' block.
});

const cartContainer = document.getElementById("crt");
if (cartContainer) {
  cartContainer.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.id === "crt-btn") {
      document.getElementById("crt").classList.toggle("hidden");
    }
  });
}

document.getElementById("cart_icon_desktop").addEventListener("click", () => {
  document.getElementById("crt").classList.toggle("hidden");
});

document.getElementById("cart_icon_sm").addEventListener("click", () => {
  document.getElementById("crt").classList.toggle("hidden");
});

// --- ADD CAROUSEL JAVASCRIPT BELOW THIS LINE ---

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    // It's safer to calculate itemWidth dynamically, especially on page load
    const itemWidth = carouselItems.length > 0 ? carouselItems[0].clientWidth : 0; 

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Optional: Auto-slide
    setInterval(() => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds

    // Add a resize listener to recalculate itemWidth if the window is resized
    window.addEventListener('resize', () => {
        if (carouselItems.length > 0) {
            itemWidth = carouselItems[0].clientWidth;
            updateCarousel(); // Update carousel position after resize
        }
    });

    // Initial update in case of pre-loaded images causing initial misplacement
    updateCarousel(); 
});
