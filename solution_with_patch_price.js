//global variable for current item we are viewing
let currentItem;
let totalPrice = 0;
let total = document.querySelector('#total-cost-digit')

//challenge 1 fetch request

fetch("http://localhost:3000/menu")
    .then(response => response.json())
    .then(data => {
        //wishlist of all the functionality
        //render our titles to the menu as a span
        renderMenu(data);
        //when the page loads render details
        renderDetails(data[0]);

        //call our add to cart function
        addToCart()
        renderTotal(data)
    })

function renderMenu(allMenu) {
    let menu = document.querySelector("#menu-items")

    allMenu.forEach(singleMenuItem => {
        //create our new element
        let menuItem = document.createElement('span')
        menuItem.textContent = singleMenuItem.name
        menu.append(menuItem)

        //challenge 3 add eventlistener to each menuitem on display
        menuItem.addEventListener("click", ()=> {
            renderDetails(singleMenuItem)
        })



    })


}

function renderDetails(data) {
    currentItem = data

    let image = document.querySelector('#dish-image')
    let name = document.querySelector('#dish-name')
    let price = document.querySelector('#dish-price')
    let description = document.querySelector('#dish-description')
    let bagNumber = document.querySelector('#number-in-cart')

    image.src = data.image
    bagNumber.textContent = data.number_in_bag
    price.textContent = data.price
    name.textContent = data.name
    description.textContent = data.description

}


//challenge 4 adding items to cart, not replacing existing amount in cart

function addToCart(){
    //query selector for the cart
    let cartForm = document.querySelector('#cart-form')
    //event listener for the cart form
    cartForm.addEventListener('submit', (e) => {
        e.preventDefault()
        //track the current objects number in the bag and add the current number to it
        // console.log(e.target['cart-amount'].value)
        currentItem.number_in_bag += parseInt(e.target['cart-amount'].value)
        renderDetails(currentItem)
        updateTotalPrice(e.target['cart-amount'].value)
        // totalPrice += currentItem.price * e.target['cart-amount'].value
        // total.textContent = "$" + totalPrice
        let updatedCount = {
            number_in_bag: currentItem.number_in_bag
        }
        fetch(`http://localhost:3000/menu/${currentItem.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCount)
        })
        e.target.reset()

    })

}

// render total price of items in cart
function renderTotal(data){
    data.forEach(singleItem => {
        totalPrice += singleItem.price * singleItem.number_in_bag
    })
    totalPrice = totalPrice.toFixed(2)
    total.textContent = "$" + totalPrice
}

function updateTotalPrice(quantity){
    newCost = currentItem.price * quantity
    console.log(newCost)
    console.log(parseInt(totalPrice))
    let newTotal = parseInt(totalPrice) + newCost
    total.textContent = "$" + newTotal.toFixed(2)
}