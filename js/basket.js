let closeModal = () => {
    let modal = document.querySelector('.basket-modal-container');
    modal.style.display = 'none';
}
let openBasket = () => {
    let basketContainer = document.querySelector('.basket-modal-container');
    basketContainer.style.display = 'block';
    showBasket();
}

document.querySelector('.basket-modal-wrap').onclick = closeModal;
document.querySelector('.basket-close-modal').onclick = closeModal;
document.querySelector('.cart-preview').onclick = openBasket;


$('#btnBuyCardProduct').on('click', '.add-to-basket', function (button){
        let quantity = document.querySelector('#quantityInput').value;
        let addButton = button.target;
        let idOfProducts = addButton.getAttribute('data-id');

        let productsData = new Promise( (resolve) => {
            fetch('data/products.json')
                .then(data => {
                    resolve(data.json());
                })
        });
        productsData.then(data => {
            data.forEach( (elem) => {
                if(elem.id === idOfProducts){
                    elem.quantityProducts = quantity;
                    let parseLocalStorage = JSON.parse(localStorage.getItem('products'));
                    if(parseLocalStorage === null){
                        parseLocalStorage = [];
                        parseLocalStorage.push(elem);
                    } else {
                        parseLocalStorage.push(elem);
                    }
                    localStorage.setItem('products', (JSON.stringify(parseLocalStorage)));
                    console.log(elem);
                    showBasket();
                }
            })
        })
})

let showBasket = () => {
    let b = [];
    let parseLocalStorage = JSON.parse(localStorage.getItem('products'));
    document.querySelector('.basket-container').innerHTML = `
<div class="empty-shopping-cart-container">
<img src="images/basket/empty_shopping-cart.png" alt="empty_shopping-cart" class="empty-shopping-cart">
<p class="empty-cart">There are no more items in your cart!</p>
</div>`;

    if (parseLocalStorage === null || parseLocalStorage.length == b){
        document.querySelector('.cart-menu').style.display = 'none';
        document.querySelector('.total-price-number').innerHTML = 0;
        document.querySelector('.cart-total-products').innerHTML = `&nbsp ${0} &nbsp`;
        document.querySelector('.cart-total-prise').innerHTML = 0;

    } else if(parseLocalStorage.length === 1 || parseLocalStorage.length === 2){
        createInCart();
        let basketContainer = document.querySelector('.basket-container');
        let basketheight = document.createElement('div');
        basketheight.setAttribute('class', 'heightBask');
        basketContainer.appendChild(basketheight);
    } else {
        createInCart();
    }
    function createInCart(){
        document.querySelector('.cart-menu').style.display = 'block';
        document.querySelector('.basket-container').innerHTML = '';
        let totalPrice = 0;
        let  amountProducts = 0;
        parseLocalStorage.forEach((element, index) => {
            amountProducts = index + 1;
            totalPrice += parseFloat((element.price) * (element.quantityProducts));
            let basketContainer = document.querySelector('.basket-container');
            let basketProductContainer = document.createElement('div');
            basketProductContainer.innerHTML = `
            <div class="basket-product-container">
            <div class="products-photo">
              <img src="./${element.images[0]}" class="img-size-bskt">
            </div>
            <div class="products-description">
              <p class="bold-text">${element.name}</p>
              <br>
              <div class="prise-quantity">
            <p>Prise: ${element.price} $</p>
            <input type="number" class="quantity" min="1" value="${element.quantityProducts}" data-id="${element.id}">

          </div>                                 
            </div>
            <img src="./images/basket/delete.png" class="delet-img" data-deleteIndex="${index}">
            
          </div>`
            basketContainer.appendChild(basketProductContainer);
        })

        document.querySelector('.total-price-number').innerHTML = totalPrice.toFixed(2);
        document.querySelector('.cart-total-products').innerHTML = `&nbsp ${amountProducts} &nbsp`;
        document.querySelector('.cart-total-prise').innerHTML = totalPrice.toFixed(2);

        document.querySelectorAll('.quantity').forEach( (quantity) => {
            quantity.addEventListener('change', function () {
                let id = this.getAttribute('data-id');
                let counter = -1;
                parseLocalStorage.forEach((elem) =>{
                    counter++;
                    if(elem.id == id){
                        elem.quantityProducts = this.value;
                        parseLocalStorage.splice(counter, 1, elem);
                        localStorage.setItem('products', (JSON.stringify(parseLocalStorage)));
                        showBasket();
                    }
                })
            })
        })

        document.querySelectorAll('.delet-img').forEach((element) => {
            element.addEventListener('mouseover', function() {
                element.src = './images/basket/delete2.png';
            })
            element.addEventListener('mouseout', function() {
                element.src = './images/basket/delete.png';
            })
            element.addEventListener('click', function () {
                let deleteIndex = this.getAttribute('data-deleteIndex');
                let parseLocalStorage = JSON.parse(localStorage.getItem('products'));
                parseLocalStorage.splice(deleteIndex, 1);
                localStorage.setItem('products', (JSON.stringify(parseLocalStorage)));
                showBasket();
            })
        })
    }
}


showBasket();

document.querySelector('.checkout-oder').onclick = () => {
    document.querySelector('.basket-slider').style.marginLeft = "-101%";
}

document.querySelector('.back-to-cart').onclick = () => {
    document.querySelector('.basket-slider').style.marginLeft = "0px";
}


document.querySelectorAll('.delivery').forEach( function (element) {
    element.onchange = delivery;
})

function delivery() {
    if(this.value === 'newP'){
        document.querySelector('.delivery-img').style.backgroundImage = `url("images/basket/New-post.png")`;
    } else {
        document.querySelector('.delivery-img').style.backgroundImage = `url("images/basket/ukrposhta.png")`;
    }
}

let getPaymentMethod = () => {
    document.querySelectorAll('.payment').forEach( function (element) {
        element.onchange = payment;
        return element
    })
}

getPaymentMethod();

function payment() {
    if(this.value === 'Privat24'){
        document.querySelector('.payment-img').style.backgroundImage = `url("images/basket/privat24.png")`;
    } else if(this.value === 'VisaMastercard') {
        document.querySelector('.payment-img').style.backgroundImage = `url("images/basket/visa.png")`;
    } else {
        document.querySelector('.payment-img').style.backgroundImage = `url("images/basket/pay.png")`;
    }

}

let emailVaidate = (email) => {
    let emailVaid = email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
    if (emailVaid === null){
        document.forms.makeorder.elements.email.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.email.setAttribute('class', 'form-control is-valid');
        return true
    }
}

let nameValidate = (name) => {
    let nameValid =  name.match(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i);
    if (nameValid === null) {
        document.forms.makeorder.elements.firstname.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.firstname.setAttribute('class', 'form-control is-valid');
        return true
    }
}

let lastNameValidate = (lastName) => {
    let lastNameValid =  lastName.match(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i);
    if (lastNameValid === null) {
        document.forms.makeorder.elements.lastname.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.lastname.setAttribute('class', 'form-control is-valid');
        return true
    }
}

let phoneValidate = (phone) => {
    let phoneValid = phone.match(/^\+380\d{3}\d{2}\d{2}\d{2}$/);
    if (phoneValid === null) {
        document.forms.makeorder.elements.phone.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.phone.setAttribute('class', 'form-control is-valid');
        return true
    }
}

let paymentMethodValidate = (paymentMethod) => {
    if(paymentMethod === 'Privat24' || paymentMethod === 'VisaMastercard' || paymentMethod === 'uponReceipt'){
        return true
    }
}

let cityValidate = (city) => {
    let cityValid =  city.match(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i);
    if (cityValid === null) {
        document.forms.makeorder.elements.city.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.city.setAttribute('class', 'form-control is-valid');
        return true
    }
}

let addressValidate = (address) => {
    if (!address) {
        document.forms.makeorder.elements.address.setAttribute('class', 'form-control is-invalid');
        return false
    } else {
        document.forms.makeorder.elements.address.setAttribute('class', 'form-control is-valid');
        return true
    }
}
let deliveryValidate = (delivery) => {
    if (delivery === ''){
        document.querySelector('.invalid-delivery').style.color = 'red';
        return false
    } else {
        document.querySelector('.invalid-delivery').style.color = 'green';
        return true
    }
}

let paymentValidate = (paymentMethod) => {
    if (paymentMethod === ''){
        document.querySelector('.invalid-payment').style.color = 'red';
        return false
    } else {
        document.querySelector('.invalid-payment').style.color = 'green';
        return true
    }
}

let confirmOder = () => {
    let personalForm = document.forms.makeorder;
    let firstName = personalForm.elements.firstname.value;
    let lastName = personalForm.elements.lastname.value;
    let phone = personalForm.elements.phone.value;
    let email = personalForm.elements.email.value;
    let city = personalForm.elements.city.value;
    let address = personalForm.elements.address.value;
    let delivery = personalForm.elements.delivery.value;
    let paymentMethod = personalForm.elements.payment.value;

    emailVaidate(email);
    nameValidate(firstName);
    lastNameValidate(lastName);
    phoneValidate(phone);
    paymentMethodValidate(paymentMethod);
    cityValidate(city);
    addressValidate(address);
    deliveryValidate(delivery);
    paymentValidate(paymentMethod);
    if(emailVaidate(email) && nameValidate(firstName) && lastNameValidate(lastName) && phoneValidate(phone) && paymentMethodValidate(paymentMethod) && cityValidate(city) && addressValidate(address) && deliveryValidate(delivery) && paymentValidate(paymentMethod)){

        document.querySelector('.right-bsk-50').innerHTML = `<div class="for-processing"><div class="processingorder">Your order has been sent for processing.</div></div>`;
        let remoteLocalStorage = [];
        localStorage.setItem('products', (JSON.stringify(remoteLocalStorage)));
        setTimeout(() => {location.reload()}, 4000);
    }
}

document.querySelector('.сonfirm').onclick = confirmOder;



