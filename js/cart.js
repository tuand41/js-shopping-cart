var carts;
var cartTable = document.querySelector('table#cart-table tbody');
var inputQtyCarts = cartTable.getElementsByClassName('cart-qty');
var deleteCart = cartTable.getElementsByClassName('cart-remove-one');
var btnDeleteAll = document.querySelector('button#remove-all');
var totalOutput = document.getElementById('total');

document.addEventListener('DOMContentLoaded', function () {
    getCartFromLocalStorage();
    getTotalCart();
    //add event to input qty
    for (let i = 0; i < inputQtyCarts.length; i++) {
        inputQtyCarts[i].addEventListener('change', setQtyService);
    }
    //add event delete row cart
    for (let i = 0; i < deleteCart.length; i++) {
        deleteCart[i].addEventListener('click', deleteCartfunction);
    }
    // delete all cart;
    btnDeleteAll.addEventListener('click', deleteAllCart);
});


function setQtyService(e) {
    let id = e.target.getAttribute('data_id');
    let qty = Number(e.target.value);
    let newCarts;

    if (qty > 20 || qty < 0)
        alert("the qty must be between 0 and 10");
    if (qty > 20)
        location.reload();
    if (qty <= 0)
        e.target.parentElement.parentElement.remove();

    newCarts = setQtyCart(carts, id, qty);
    localStorage.setItem('carts', JSON.stringify(newCarts));
    getTotalCart();
}

function deleteCartfunction(e) {
    let id = e.target.getAttribute('data_id');
    let newCart;

    e.target.parentElement.parentElement.remove();
    newCart = removeCartById(carts, id);
    localStorage.setItem('carts', JSON.stringify(newCart));
    getTotalCart();
}

function deleteAllCart(e) {
    localStorage.removeItem('carts');
    carts = [];
    cartTable.querySelectorAll('tr.row-cart').forEach(element => {
        element.remove();
    });
    getTotalCart();
}


function removeCartById(arrCart, idDelete) {
    for (let i = 0; i < arrCart.length; i++) {
        if (arrCart[i]['id'] === idDelete) 
            arrCart.splice(i, 1);
    }

    return arrCart;
}

function setQtyCart(arrCart, id, qty) {
    for (let i = 0; i < arrCart.length; i++) {
        if (arrCart[i].id != id)
            continue;
        if (qty <= 0) {
            arrCart.splice(i, 1);
            break;
        }
        if (qty > 20)
            break;

        arrCart[i].qty = qty;
    }

    return arrCart;
}

function getCartFromLocalStorage() {
    if (localStorage.getItem('carts') === null) {
        carts = [];
    } else {
        carts = JSON.parse(localStorage.getItem('carts'));
    }

    if (carts !== null) {
        carts.forEach(element => {
            cartTable.innerHTML += `
                <tr class="row-cart">
                    <td>${element['name']}</td>
                    <td><img class="cart-img" src="images/${element['image']}" alt=""></td>
                    <td>${element['price']}</td>
                    <td><input class="cart-qty" type="number" min="0" max="20" data_id = ${element['id']} value="${element['qty']}"></td>
                    <td><button class="cart-remove-one" data_id = ${element['id']}>delete</button></td>
                </tr>
            `
        });
    }
}

function getTotalCart() {
    let total = 0;
    carts.forEach(element => {
        total += Number(element.qty) * Number(element.price);
    });
    totalOutput.innerText = total;
}
