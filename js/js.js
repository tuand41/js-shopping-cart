var listService = document.getElementsByClassName('service-list')[0];
var btnAddCarts = document.getElementsByClassName('btn-add-cart');
var carts;
var services = [
    {
        id: 1,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_1.jpg',
        price: 1000
    },
    {
        id: 2,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_2.jpg',
        price: 2000
    },
    {
        id: 3,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_3.jpg',
        price: 1000
    },
    {
        id: 4,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_4.jpg',
        price: 1000
    },
    {
        id: 5,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_5.jpg',
        price: 3000
    },
    {
        id: 6,
        name: "slow say",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_6.jpg',
        price: 5000
    },
    {
        id: 7,
        name: "slow say",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_7.jpg',
        price: 1000
    },
    {
        id: 8,
        name: "neck shoulder pain",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_8.jpg',
        price: 3000
    },
    {
        id: 9,
        name: "slow say",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, animisapiente.Et nesciunt natus delectus numquam quaerat fugiat dolorem? Inventore quasiprovident",
        image: 'img_number_9.jpg',
        price: 5000
    }
];

document.addEventListener('DOMContentLoaded', function () {
    getCart();

    getServices();
    // add event click to service
    for (let i = 0; i < btnAddCarts.length; i++) {
        btnAddCarts[i].addEventListener('click', buyService);
    }

});

// add card to storage
function buyService(event) {
    let service = event.target.parentElement.parentElement;
    let serviceInfo = getInforService(service);
    console.log(service);

    saveCart(serviceInfo);
}

function getInforService(service) {
    let serviceInfo = {
        id: service.querySelector('button.btn-add-cart').getAttribute('data_id'),
        name: service.querySelector('h3').textContent,
        image: service.querySelector('img').src.match(/[\w-]+\.jpg/g)[0],
        price: service.querySelector('span.price-service').textContent,
        qty: 1
    };
    return serviceInfo;
}

function saveCart(serviceInfo) {
    let status = true;
    carts.forEach(cart => {
        if (cart.id !== serviceInfo.id)
            return;
        cart.qty += 1;
        if (cart.qty > 20) {
            cart.qty = 20;
            alert('so luong service phai duoi 20');
        }
        status = false;
    });

    if (status)
        carts.push(serviceInfo);

    localStorage.setItem('carts', JSON.stringify(carts));
}

function getCart() {
    if (localStorage.getItem('carts') === null) 
        carts = [];
    else 
        carts = JSON.parse(localStorage.getItem('carts'));
}

function getServices() {
    for (let i = 0; i < services.length; i++) {
        listService.innerHTML += `
            <li class="service-item">
                <a href="" class="service-inner">
                    <img class="service-img" src="images/${services[i]['image']}" alt="">
                    <div class="container-service">
                        <h3>${services[i]['name']}</h3>
                        <p class="content-service">${services[i]['content']}</p>
                        <p>Price: <span class="price-service">${services[i]['price']}</span></p>
                    </div>
                </a>
                <div class="container">
                    <button class ="btn-add-cart" data_id ="${services[i]['id']}" >add cart</button>
                </div>
            </li>
        `;
    }
}
