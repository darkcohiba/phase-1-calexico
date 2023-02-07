//global variable for current meal option
let currentDish;

fetch("http://localhost:3000/menu")
    .then(response => response.json())
    .then(menuData =>{
        //wishlist of functions
        //render menu items to menu-items div
        renderMenu(menuData)
        //render item details, should start with first item
        renderDetails(menuData[0])
        //function to add number of items to the cart
        addToCart()
    })

function renderMenu(menuData){
    let menu = document.querySelector('#menu-items')
    menuData.forEach(item => {
        let menuItem = document.createElement("span")
        menuItem.textContent = item.name
        menu.append(menuItem)

        //challenge #3
        menuItem.addEventListener("click", ()=>{
            renderDetails(item)
        })
    })
}

function renderDetails(menuItem) {
    currentDish = menuItem;
    //selectors for details
    let image = document.querySelector("#dish-image")
    let name = document.querySelector("#dish-name")
    let price = document.querySelector("#dish-price")
    let description = document.querySelector("#dish-description")
    let numberInBag = document.querySelector("#number-in-cart")

    image.src = currentDish.image
    numberInBag.textContent = currentDish.number_in_bag
    price.textContent = currentDish.price
    description.textContent = currentDish.description
    name.textContent = currentDish.name
}


function addToCart(){
    //query selector for cart form
    let cartForm = document.querySelector("#cart-form")

    cartForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(currentDish.number_in_bag)
        console.log(e)
        currentDish.number_in_bag += parseInt(e.target['cart-amount'].value)
        renderDetails(currentDish)
    })
}