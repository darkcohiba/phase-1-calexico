//set global variable
let currentDish;
//fetch request
fetch("http://localhost:3000/menu")
.then(response => response.json())
.then(menuData => {
    buildMenu(menuData);
    setDish(menuData[0])
    setupCart();
});

function buildMenu(menuData) {
    let menuList = document.querySelector("#menu-items");
    menuData.forEach(item => {
        let menuListItem = document.createElement("span");
        menuListItem.textContent = item.name;
        menuList.appendChild(menuListItem);

        menuListItem.addEventListener('click', () => {
            setDish(item)
        })
    });
}

function setDish(dish) {
        //updating global varaible to the current dish that is set

    currentDish = dish;
    //variables for dish

    let dishImage = document.querySelector("#dish-image");
    let dishName = document.querySelector("#dish-name");
    let dishDescription = document.querySelector("#dish-description");
    let dishPrice = document.querySelector("#dish-price");
    let numberInCart = document.querySelector("#number-in-cart");
        //updating text to be the current dish

    dishImage.src = dish.image;
    dishName.textContent = dish.name;
    dishDescription.textContent = dish.description;
    dishPrice.textContent = `$${dish.price}`;
    numberInCart.textContent = dish.number_in_bag;
}
//add the cart functionality
function setupCart() {
    let addToCartForm = document.querySelector("#cart-form")
    addToCartForm.addEventListener('submit', (event) => {
        event.preventDefault();
        currentDish.number_in_bag += parseInt(event.target["cart-amount"].value);
        setDish(currentDish);
        addToCartForm.reset();
    });
}




fetch("http://localhost:3000/menu")
.then(response => response.json())
.then(menuData => {
    buildMenu(menuData);
    setDish(menuData[0])
    setupCart();
});



//building out menu on the side
function buildMenu(menuItems) {
    let menuList = document.querySelector("#menu-items");
    menuItems.forEach(item => {
        let menuListItem = document.createElement("span");
        menuListItem.textContent = item.name;
        menuList.appendChild(menuListItem);

        menuListItem.addEventListener('click', () => {
            setDish(item)
        })
    });
}


function setDish(dish) {

    //updating global varaible to the current dish that is set
    currentDish = dish;

    //variables for dish
    let dishImage = document.querySelector("#dish-image");
    let dishName = document.querySelector("#dish-name");
    let dishDescription = document.querySelector("#dish-description");
    let dishPrice = document.querySelector("#dish-price");
    let numberInCart = document.querySelector("#number-in-cart");
    

    //updating text to be the current dish
    dishImage.src = dish.image;
    dishName.textContent = dish.name;
    dishDescription.textContent = dish.description;
    dishPrice.textContent = `$${dish.price}`;
    numberInCart.textContent = dish.number_in_bag;
}

//add the cart functionality