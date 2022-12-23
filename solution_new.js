//track the current food item in the global scale
let currentItem;

//fetch request to get data from server
fetch("http://localhost:3000/menu")
    .then(response => response.json())
    .then(data => {
        //wishlist of functions
        //render our titles to the menu as a span
        renderMenu(data);
        //show the details and image
        showDetails(data[0]);
        //function to add numbers to the cart
        addToCart();
    })


function renderMenu(data) {
    let menu = document.querySelector('#menu-items')
    data.forEach(item => {
        let menuItem = document.createElement('span')
        menuItem.textContent = item.name
        menu.append(menuItem)

        //challenge 3: add event listener to run showdetails
        menuItem.addEventListener('click', () =>{
            showDetails(item);
        })
    })
}

//challenge 2: show details
function showDetails(data) {
    currentItem = data;

    let image = document.querySelector('#dish-image')
    let name = document.querySelector('#dish-name')
    let price = document.querySelector('#dish-price')
    let description = document.querySelector("#dish-description")
    let bagNumber = document.querySelector('#number-in-cart')

    bagNumber.textContent =data.number_in_bag
    image.src = data.image;
    name.textContent = data.name;
    price.textContent = data.price
    description.textContent = data.description
}

function addToCart(){
    //query selector for the cart form
    let cartForm = document.querySelector('#cart-form')
    //event listener for the cart form

    cartForm.addEventListener('submit', (e) =>{
        //prevent default
        e.preventDefault();
        //track the current objects number in the bag and ad the current number to it
        currentItem.number_in_bag += parseInt(e.target['cart-amount'].value)
        showDetails(currentItem);
    });

}






