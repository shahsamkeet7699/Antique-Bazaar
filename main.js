let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Antique Floral Clock',
        tag: 'clock2',
        price: 7000,
        incart: 0
    },
    {
        name: 'Antique Artistic Clock',
        tag: 'clock3',
        price: 6500,
        incart: 0
    },
    {
        name: 'Antique Pocket Watch',
        tag: 'clock4',
        price: 4000,
        incart: 0
    },
    {
        name: 'Antique Center Chair',
        tag: 'furn1',
        price: 7500,
        incart: 0
    },
    {
        name: 'Antique Templesmac',
        tag: 'furn2',
        price: 15500,
        incart: 0
    },
    {
        name: 'Antique Bookshelf',
        tag: 'furn5',
        price: 17000,
        incart: 0
    },
    {
        name: 'Antique Brass Fan',
        tag: 'brass1',
        price: 5500,
        incart: 0
    },
    {
        name: 'Antique Brass Buddha',
        tag: 'brass2',
        price: 9500,
        incart: 0
    }
];

for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(products) {
    console.log("The product clicked is", products);
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);
}

function setItems(products){
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {

        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    } 
    else{
        products.incart = 1;
        cartItems = {
            [products.tag]: products
        }
    }

    localStorage.setItem("productsincart", JSON.stringify(cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem("totalCost");

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    }
    else{
        localStorage.setItem("totalCost", products.price);
    }
   
}

function displayCart(){
    let cartItems = localStorage.getItem("productsincart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem("totalCost");

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class = "products">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./images/${item.tag}.jpg">
            <span class="name">${item.name}</span>
            </div> 
            <div class = "others">  
            <div class = "price">₹${item.price}</div></div>
            <div class="other"><div class = "quantity">
                <ion-icon class="decrease" name= "arrow-dropleft-circle"></ion-icon>
                <span>${item.incart}</span>
                <ion-icon class="increase" name= "arrow-dropright-circle"></ion-icon>
            </div>
            <div class= "total">
            ₹${item.incart * item.price}
            </div>
            </div>
            `;
        });
        
        productContainer.innerHTML += `
        <div class= "basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class= "basketTotal">
                ₹${cartCost}
            </h4>

        `;
    }
}

onLoadCartNumbers();
displayCart();