// Typing animation ----------------------------------------------------------------
const words = [
    "IMPULSA",
    "EXPANDE",
    "MEJORA",
    "IMPULSA",
    "ELEVA",
    "FORTALECE",
    "IMPULSA",
    "DESCUBRE",
    "POTENCIA"
  ];
const titleElement = document.querySelector(".hero-container h1:nth-child(1)");
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[currentWordIndex];
    if (isDeleting) {
        currentCharIndex--;
    } else {
        currentCharIndex++;
    }

    titleElement.textContent = currentWord.substring(0, currentCharIndex);

    if (!isDeleting && currentCharIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1000); // Pause before deleting
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length; // Move to the next word
        setTimeout(type, 500); // Pause before typing the next word
    } else {
        setTimeout(type, isDeleting ? 100 : 200); // Speed of typing and deleting
    }
    if (currentWord == "IMPULSA") {
        titleElement.classList.add("neonText");
    } else {
        titleElement.classList.remove("neonText");
    }
}

// Start the typing animation
type();






// cart funtions ---------------------------------------------------------------------

const cartDropdown = document.querySelector(".cart-dropdown");
const courses = document.querySelector(".courses-container");
const cartButton = document.querySelector(".shopping-cart-button");
const cartDropdownContent = document.querySelector("#cart-table tbody");
let cart = []
let totalPrice = 0;


// toogle cart dropdown----------------------------------------------------------------
cartButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target)
    if (e.target.classList.contains("action") || e.target.parentElement.classList.contains("action")) {
        cartDropdown.classList.toggle("show");
        cartButton.classList.toggle("selected");
    }

});

// detect the add to cart action ------------------------------------------------------------------
courses.addEventListener("click", (e) => {
    if (e.target.classList.contains("add")){
        e.preventDefault();
        // console.log(e.target);
        readData(e)
    }
})

// read and add cart data ------------------------------------------------------------------

function readData(e) {
    // console.log(e.target.parentElement)
    const product = {
        course: e.target.parentElement.querySelector("h4").textContent,
        price: e.target.parentElement.querySelector("p:nth-child(3)").textContent,
        quantity: 1,
        id: 0
    }
    // check if the product is already in the cart
    const index = cart.findIndex( (e) => e.course === product.course);
    if (index!== -1){
        cart[index].quantity++;
    } else {
        cart.push(product);
    }
    // printData()
    // cart.push(product);
    printData()
}

// print cart data ------------------------------------------------------------------
function printData() {
    //clean the cart
    totalPrice = 0;
    cartDropdownContent.innerHTML = "";
    // print the cart data
    cart.forEach( (e) => {
        // delete the dollar sign from the price element
        let priceCleaned = e.price.replace("$", "");
        // create a new row element with the data
        const row = document.createElement("tr");
        // set the ID to each product
        e.id = cart.indexOf(e);

        // set the row inner HTML with the data
        row.innerHTML = `
            <td>${e.course}</td>
            <td>$${priceCleaned}</td>
            <td>${e.quantity}</td>
            <td>$${priceCleaned * e.quantity}</button></td>
            <td><button class="remove" onclick="removeProduct(${e.id})">X</button></td>
        `;
        totalPrice = totalPrice + (parseInt(priceCleaned) * parseInt(e.quantity));
        cartDropdownContent.appendChild(row);
    })
    // add the total price to the the cart
    const rowTotal = document.createElement("tr");
    rowTotal.innerHTML =`
    <td></td>
    <td></td>
    <td>Total:</td>
    <td>$${totalPrice}</td>
    `;
    cartDropdownContent.appendChild(rowTotal);
}

// remove product from the cart ------------------------------------------------------------------
function removeProduct(id) {
    cart.splice(id, 1);
    printData();
}

// empty cart ------------------------------------------------------------------
cartDropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("empty-cart")){
        e.preventDefault();
        cart = [];
        printData();
    }
})



// Form starts ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // get the form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const reasonInput = document.getElementById("reason");
    const messageInput = document.getElementById("message");
    const submitButton = document.getElementById("contact-submit");

    // add event listener to the inputs to validate the form
    nameInput.addEventListener("input", validate)
    emailInput.addEventListener("input", validate)
    reasonInput.addEventListener("input", validate)
    messageInput.addEventListener("input", validate)


    // add event listener to the input to avoid them to be empty
    nameInput.addEventListener("blur", validate)
    emailInput.addEventListener("blur", validate)
    reasonInput.addEventListener("blur", validate)
    messageInput.addEventListener("blur", validate)

    function validate(e){
        if (e.target.value == ""){
            e.target.classList.add("error");
        } else {
            return
    }

}})
