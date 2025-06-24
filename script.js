let menu_btn = document.getElementById("menu-btn");
let drop_menu = document.getElementById("drop_nav");

menu_btn.addEventListener("click", () => {
    drop_menu.classList.toggle("hidden");
});

let productName = "";
let productPrice = ""; // This will now be the discounted price
let actualPrice = ""; // New variable for the actual price
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

            // Get the discounted price (current product-price)
            productPrice = Number(
                productCard.querySelector(".product-price").textContent
            );

            // Get the actual/original price from the <s> tag
            const actualPriceElement = productCard.querySelector("s");
            if (actualPriceElement) {
                // Remove '₹' and then convert to number
                actualPrice = Number(actualPriceElement.textContent.replace('₹', ''));
            } else {
                // If no <s> tag (no discount), the actual price is the same as the product price
                actualPrice = productPrice;
            }

            // Get the product ID from the data-product-id attribute
            const productId = productCard.dataset.productId;
            // Get the brand name from the data-brand-name attribute
            const brandName = productCard.dataset.brandName;

            image = productCard.querySelector(".product-image").src;
            cartnum += 1;
            cartprice += productPrice; // cartprice still uses the discounted price
            let targetElement = document.getElementById("crt");
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
                `Adding to cart: Name: ${productName}, Discounted Price: ${productPrice}, Actual Price: ${actualPrice}, Product ID: ${productId}, Brand: ${brandName}, Cart Total: ${cartprice}, Items: ${cartnum}, Image: ${image}`
            );

            document.getElementById("cart-num").innerText = cartnum;
            document.getElementById("cart-num-sm").innerText = cartnum;

            // --- Google Analytics Event Tracking using dataLayer.push ---
            // This is the correct way to send events when using Google Tag Manager.
            // GTM will listen for this 'add_to_cart' event and fire the corresponding GA4 tag.
            window.dataLayer.push({
                event: 'add_to_cart', // This is the custom event name GTM will listen for
                ecommerce: { // Use ecommerce object for structured GA4 e-commerce data
                    items: [{
                        item_name: productName,
                        item_id: productId,
                        price: productPrice,     // discounted price
                        item_brand: brandName,
                        quantity: 1
                    }],
                    currency: "INR" // Assuming Indian Rupees, adjust if needed
                },
                // You can also pass individual parameters outside the ecommerce object if desired,
                // for simpler custom reporting if not fully leveraging e-commerce reports.
                item_name_flat: productName,
                item_id_flat: productId,
                brand_flat: brandName,
                price_flat: productPrice,
                actual_price_flat: actualPrice,
                quantity_flat: 1
            });
            console.log(`dataLayer.push for add_to_cart - Product: ${productName}, ID: ${productId}`);

            Toastify({
                text: "Item added to cart",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#603F26",
                    borderRadius: "20px",
                    color: "#f7f3e7",
                },
                onClick: function () {},
            }).showToast();
        }
    }
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

// Ensure these elements exist before adding listeners to avoid errors
const cartDesktopIcon = document.getElementById("cart_icon_desktop");
const cartSmIcon = document.getElementById("cart_icon_sm");

if (cartDesktopIcon) {
    cartDesktopIcon.addEventListener("click", () => {
        document.getElementById("crt").classList.toggle("hidden");
    });
}

if (cartSmIcon) {
    cartSmIcon.addEventListener("click", () => {
        document.getElementById("crt").classList.toggle("hidden");
    });
}


// --- ADD CAROUSEL JAVASCRIPT BELOW THIS LINE ---

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let itemWidth = 0; // Initialize itemWidth

    // It's safer to calculate itemWidth dynamically, especially on page load
    if (carouselItems.length > 0) {
        itemWidth = carouselItems[0].clientWidth;
    }

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
    // Also, update if images load later (though DOMContentLoaded handles most cases)
    window.addEventListener('load', updateCarousel);
    updateCarousel();
});
