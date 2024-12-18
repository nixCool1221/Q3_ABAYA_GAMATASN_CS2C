// Sellers authentication data (username: password)
const users = {
    "sophia": "maliit123",
    "xyxy1": "edigoods28"
};

// Categories for products
const categories = {
    'Pasta': [{ name: 'Spaghetti', price: 150 }, { name: 'Penne', price: 120 }, { name: 'Lasagna', price: 200 }],
    'Desserts': [{ name: 'Cake', price: 100 }, { name: 'Pie', price: 80 }, { name: 'Ice Cream', price: 60 }],
    'Drinks': [{ name: 'Soda', price: 40 }, { name: 'Water', price: 20 }, { name: 'Coffee', price: 60 }]
};

// Cart object for customers
class Cart {
    constructor() {
        this.items = [];
    }

    addToCart(item, quantity) {
        this.items.push({ name: item.name, price: item.price, quantity, total: item.price * quantity });
        alert(${quantity} x ${item.name} added to cart.);
    }

    removeFromCart(itemName) {
        const index = this.items.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (index !== -1) {
            this.items.splice(index, 1);
            alert(${itemName} removed from cart.);
        } else {
            alert(${itemName} not found in cart.);
        }
    }

    printCart() {
        let totalPrice = 0;
        let cartDetails = '';
        this.items.forEach(item => {
            cartDetails += ${item.name} | ${item.price} | Quantity: ${item.quantity} | Total: ${item.total}\n;
            totalPrice += item.total;
        });
        alert(cartDetails + Total Price: ${totalPrice});
    }
}

// Function to display the main menu and get user choice
function displayMenu() {
    return prompt("Welcome to the Kiosk Ordering System!\n1. SELLER\n2. CUSTOMER\n3. EXIT\nPlease select your role (1, 2 or 3):");
}

// Seller authentication function
function authenticateUser() {
    const username = prompt("Enter username: ");
    const password = prompt("Enter password: ");
    if (users[username] === password) {
        alert("Authentication successful.");
        return true;
    } else {
        alert("Invalid credentials.");
        return false;
    }
}

// Seller functionalities (Add/Remove items)
function addItem() {
    const category = prompt("Enter the category to add item (Pasta, Desserts, Drinks):");
    if (categories[category]) {
        const nameItem = prompt("Enter the name of the item:");
        const price = parseFloat(prompt("Enter the price per item:"));
        categories[category].push({ name: nameItem, price });
        alert(${nameItem} added to ${category} category.);
    } else {
        alert("Invalid category!");
    }
}

function removeItem() {
    const category = prompt("Enter the category to remove item (Pasta, Desserts, Drinks):");
    if (categories[category]) {
        const nameItem = prompt("Enter the name of the item to remove:");
        const index = categories[category].findIndex(item => item.name.toLowerCase() === nameItem.toLowerCase());
        if (index !== -1) {
            categories[category].splice(index, 1);
            alert(${nameItem} removed from ${category} category.);
        } else {
            alert(${nameItem} not found in ${category}.);
        }
    } else {
        alert("Invalid category!");
    }
}

// Seller logout function
function logout() {
    alert("Logging out...");
}

// Main program logic
function main() {
    let role;
    let sellerLoggedIn = false;
    let cart = new Cart();

    while (true) {
        role = displayMenu();
        
        if (role === '1') {  // Seller Role
            if (authenticateUser()) {
                sellerLoggedIn = true;
                while (sellerLoggedIn) {
                    const action = prompt("SELLER MENU:\n1. LOGOUT\n2. ADD ITEM\n3. REMOVE ITEM\n4. EXIT\nChoose an action (1-4):");
                    if (action === '1') {
                        logout();
                        sellerLoggedIn = false; // Log out and return to main menu
                    } else if (action === '2') {
                        addItem();
                    } else if (action === '3') {
                        removeItem();
                    } else if (action === '4') { // Exit option for seller
                        alert("Thank you for using the Kiosk Ordering System. Goodbye!");
                        return; // Exit the program
                    } else {
                        alert("Invalid choice.");
                    }
                }
            }
        } else if (role === '2') {  // Customer Role
            let customerChoice;
            while (true) {
                customerChoice = prompt("CUSTOMER MENU:\n1. ORDER\n2. CART\n3. CANCEL\n4. EXIT\nChoose an action (1-4):");

                if (customerChoice === '1') {  // Order items
                    const category = prompt("Choose a category (Pasta, Desserts, Drinks):");
                    if (categories[category]) {
                        let categoryItems = "";
                        categories[category].forEach((item, index) => {
                            categoryItems += ${index + 1}. ${item.name} - ${item.price}\n;
                        });
                        const itemChoice = parseInt(prompt(Select item number (1-${categories[category].length}):\n${categoryItems}));
                        if (itemChoice >= 1 && itemChoice <= categories[category].length) {
                            const item = categories[category][itemChoice - 1];
                            const quantity = parseInt(prompt(How many ${item.name} would you like to order?));
                            cart.addToCart(item, quantity);
                        } else {
                            alert("Invalid item number.");
                        }
                    } else {
                        alert("Invalid category.");
                    }
                } else if (customerChoice === '2') {  // View cart
                    if (cart.items.length > 0) {
                        cart.printCart();
                        const cartAction = prompt("Options: 1. ADD  2. REMOVE  3. CANCEL 4. EXIT");
                        if (cartAction === '1') {
                            continue;
                        } else if (cartAction === '2') {
                            const itemName = prompt("Enter the item name to remove:");
                            cart.removeFromCart(itemName);
                        } else if (cartAction === '3') {
                            break; // Return to customer menu
                        } else if (cartAction === '4') { // Exit from cart menu
                            alert("Thank you for using the Kiosk Ordering System. Goodbye!");
                            return; // Exit the program
                        }
                    } else {
                        alert("Your cart is empty.");
                    }
                } else if (customerChoice === '3') {  // Cancel and exit
                    break; // Return to main menu
                } else if (customerChoice === '4') { // Exit option for customer
                    alert("Thank you for using the Kiosk Ordering System. Goodbye!");
                    return; // Exit the program
                } else {
                    alert("Invalid choice.");
                }
            }
        } else if (role === '3') { // Exit option from main menu
            alert("Thank you for using the Kiosk Ordering System. Goodbye!");
            return; // Exit the program
        } else {
            alert("Invalid role. Please try again.");
        }
    }
}

// Start the program
main();