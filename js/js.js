var listService = document.getElementsByClassName('service-list')[0];
var btnAddCarts = document.getElementsByClassName('btn-add-cart');
var carts;
if(localStorage.getItem('carts') === null){
    carts = [];
} else {
    carts = JSON.parse(localStorage.getItem('carts'));
}

var services = [
    {
        id: 1,
        name: "dda",
        content: "asdasdas",
        image: 'img_number_1.jpg',
        price: 1000
    },
    {
        id: 2,
        name: "asdasd",
        content: "asdasdas",
        image: 'img_number_2.jpg',
        price: 2000
    },
    {
        id: 3,
        name: "asdasd",
        content: "asdasdas",
        image: 'img_number_3.jpg',
        price: 1000
    },
    {
        id: 4,
        name: "asdasd",
        content: "asdasdas",
        image: 'img_number_4.jpg',
        price: 1000
    },
    {
        id: 5,
        name: "asdasd",
        content: "asdasdas",
        image: 'img_number_5.jpg',
        price: 3000
    },
    {
        id: 6,
        name: "asdasd",
        content: "asdasdas",
        image: 'img_number_6.jpg',
        price: 5000
    }
];
 
var contentServices = '';
for(var i = 0; i<services.length; i++){
    contentServices += `
        <li class="service-item">
            <a href="" class="service-inner">
                <img class="service-img" src="images/${services[i]['image']}" alt="">
                <h3>${services[i]['name']}</h3>
                <p class="content-service">${services[i]['content']}</p>
                <p>Price: <span class="price-service">${services[i]['price']}</span></p>
            </a>
            <button class ="btn-add-cart" data_id ="${services[i]['id']}" >add cart</button>
        </li>
    `;
}
listService.innerHTML=contentServices;


// add event click to service
for (let i = 0; i < btnAddCarts.length; i++) {
    const btnAddCart = btnAddCarts[i];
    btnAddCart.addEventListener('click',buyService);
}




// add card to storage
function buyService(event){
    // console.log(event.target);
    var service = event.target.parentElement;
    var serviceInfo = getInforService(service);
    saveCart(serviceInfo);
}

function getInforService(service){
    var serviceInfo = {
        id: service.querySelector('button.btn-add-cart').getAttribute('data_id'),
        name: service.querySelector('h3').textContent,
        content: service.querySelector('p.content-service').textContent,
        image: service.querySelector('img').src.match(/[\w-]+\.jpg/g)[0],
        price: service.querySelector('span.price-service').textContent,
        qty: 1
    };
    return serviceInfo;
}

function saveCart(serviceInfo){
    var status = true;
    carts.forEach(cart => {
        if (cart.id === serviceInfo.id) {
            cart.qty +=1;
            status = false;
        }
    });

    if (status) {
        carts.push(serviceInfo);
    }
    console.log(carts);
    localStorage.setItem('carts', JSON.stringify(carts));
}
//end add cart to storage;


