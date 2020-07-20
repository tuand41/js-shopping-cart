var carts;
var cartTable = document.querySelector('table#cart-table tbody');
var inputQtyCarts = cartTable.getElementsByClassName('cart-qty');
var deleteCart = cartTable.getElementsByClassName('cart-remove-one');
var btnDeleteAll = document.querySelector('button#remove-all');
// document.addEventListener('DOMContentLoaded', getCartFromLocalStorage);
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
                <td><input class="cart-qty" type="number" min="0" max="10" data_id = ${element['id']} value="${element['qty']}"></td>
                <td><button class="cart-remove-one" data_id = ${element['id']}>delete</button></td>
            </tr>
        `
    });
}

document.addEventListener('DOMContentLoaded', function () {
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
    var id = e.target.getAttribute('data_id');
    var qty = Number(e.target.value);

    if (qty > 10 || qty < 0) {
        alert("the qty must be between 0 and 10");
        e.target.setAttribute('value', e.target.getAttribute('value'));
    }
    console.log(id, qty);
    if (qty <= 0) {
        e.target.parentElement.parentElement.remove();
    }
    var newCarts = setQtyCart(carts, id, qty);
    localStorage.setItem('carts', JSON.stringify(newCarts));
}

function deleteCartfunction(e) {
    var id = e.target.getAttribute('data_id');
    // console.log(id);
    var newCart = removeCartById(carts, id);
    console.log(newCart);
    e.target.parentElement.parentElement.remove();
    localStorage.setItem('carts', JSON.stringify(newCart));
}

function deleteAllCart(e) {
    localStorage.removeItem('carts');
    cartTable.querySelectorAll('tr.row-cart').forEach(element => {
        element.remove();
    });
}


function removeCartById(arrCart, idDelete) {
    var i = arrCart.length;
    while (i--) {
        if (arrCart[i]['id'] === idDelete) {
            arrCart.splice(i, 1);
        }
    }
    return arrCart;
}

function setQtyCart(arrCart, id, qty) {
    for (let i = 0; i < arrCart.length; i++) {
        if (arrCart[i].id != id) 
            continue;            
        if (qty<=0) {
            arrCart.splice(i, 1);
            break;
        }
        if (qty > 10) 
            qty = 10;

        arrCart[i].qty = qty;
    }

    return arrCart;
}
