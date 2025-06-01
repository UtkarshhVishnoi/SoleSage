

let menu_btn = document.getElementById('menu-btn');
let drop_menu = document.getElementById('drop_nav');

menu_btn.addEventListener('click', () => {
    drop_menu.classList.toggle("hidden")

})



let productName = '';
let productPrice = '';
let image = '';
let cartnum = 0;
let cartprice = 0;

const productsContainer = document.getElementById('product-container');
productsContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;


    if (clickedElement.classList.contains('add-t-cart')) {

        const productCard = clickedElement.closest('.pcard');
        if (productCard) {
            productName = productCard.querySelector('.product-title').textContent;
            productPrice = Number(productCard.querySelector('.product-price').textContent);
            image = productCard.querySelector('.product-image').src;
            cartnum += 1;
            cartprice += productPrice;
            targetElement = document.getElementById('crt');
            document.getElementById('cartp').innerText = cartprice;
            const newHtmlContent = `
                       <div class='flex items-center gap-2 rounded-md p-2'>
                            <img src=${image} class='h-28 w-28'/>
                            <div class='flex gap-3 items-center'>
                               <h1 class='text-md font-semibold'>${productName}</h1>
                               <p>${'$' + productPrice}</p>
                            </div>
                        </div>`;


            targetElement.innerHTML += newHtmlContent;
            
            console.log(`Adding to cart: Name: ${productName}, Price: ${productPrice} , cartprice: ${cartprice} , cart: ${cartnum} , src: ${image} `);

            document.getElementById('cart-num').innerText = cartnum;

        }
    }

});



    const cartContainer = document.getElementById('crt'); 
    if (cartContainer) {
        
        cartContainer.addEventListener('click', function(event) {
            const clickedElement = event.target; 
            if (clickedElement.id === 'crt-btn') {
                document.getElementById('crt').classList.toggle("hidden")
            }
            
        });
    } 

document.getElementById('cart_icon_desktop').addEventListener(
    'click', () => {
        document.getElementById('crt').classList.toggle("hidden")

    }
)

document.getElementById('cart_icon_sm').addEventListener(
    'click', () => {
        document.getElementById('crt').classList.toggle("hidden")

    }
)

