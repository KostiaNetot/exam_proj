"use strict";

// index page
let addToCartProductData =[];

function findSelectedProductNumber(dataId) {
    changePageContent('wrapper-product-card');
    let prodIndex = productsData.map(function (obj) {
        return obj.id;
    }).indexOf(dataId);
    selectProduct = productsData[prodIndex];
    setInfoByProduct();
    scrollOnTop();
}

// Change content on the page:
const changePageContent = (className) => {
    let wrappers = document.querySelector('main').children;
    [].forEach.call(wrappers, function (wrapper) {
        if (wrapper.classList.contains(className)) {
            wrapper.classList.remove('hidden')
        } else {
            wrapper.classList.add('hidden');
        }
    });
};

let showBigImage = (number = 0) => {
    $('#slider-base-image').html('');
    $('<img/>', {
        src: `${selectProduct.images[number]}`,
        alt: `${selectProduct.name}`,
    }).appendTo('#slider-base-image');
};

function setInfoByProduct() {
    // clear area
    $('#blck-prod').html('');
    $('#btnBuyCardProduct').html('');
    $('#content-description').html('');
    $('#group-color').html('');
    $('#slider-carousel-images').html('');
    //breadcrumb
    $('#breadcrumb-link-category').html(`${selectProduct.category}`).on('click', function() {
        showCategoryPage(selectProduct.category);
    });
    
    $('#breadcrumb-link-products').html(`${selectProduct.name}`);
    // info about products



    showBigImage();
    addToCartProductData.push(selectProduct.id);

    $('<h1/>', {
        text: `${selectProduct.name}`,
        "class": 'h1',
    }).appendTo('#blck-prod');

    $('<div/>', {
        text: `$${selectProduct.price}`,
        "class": 'product-prices',
    }).appendTo('#blck-prod');

    $('<button/>', {
        html: '<i class="fa fa-shopping-cart"></i> ADD TO CART',
        "class": 'btnBuyProduct add-to-basket',
        "data-id": `${selectProduct.id}`,
    }).appendTo('#btnBuyCardProduct');




    // Cut text description
    let shortDescription = selectProduct.description.slice(0, 100);

    $('<div/>', {
        html: `${shortDescription} ...`,
        "class": 'product-description-short',
    }).appendTo('#blck-prod');

    $('<p/>', {
        html: `${selectProduct.description}`,
        "class": '',
    }).appendTo('#content-description');

    let similarProducts = checkSimilarProduct(selectProduct);

    similarProducts.forEach(function (item) {
        if (item.id === selectProduct.id) {
            $('<div/>', {
                "data-id": item.id,
                "style": `background-color: ${item.color}`,
                "class": 'color checkColor',
                click: (event) => {
                    findSelectedProductNumber(item.id)
                }
            }).appendTo('#group-color');
        } else {
            $('<div/>', {
                "data-id": item.id,
                "style": `background-color: ${item.color}`,
                "class": 'color',
                click: (event) => {
                    findSelectedProductNumber(item.id)
                }
            }).appendTo('#group-color');
        }
    });

    selectProduct.images.forEach(function (item, i) {
        let slideItem = $('<div/>', {
            "data-imgSlider": `${i}`,
            "class": 'item img-tmbl',
            click: (event) => {
                showBigImage(i);
            }
        }).appendTo('#slider-carousel-images');

        $('<img/>', {
            "class": 'img-tmbl',
            src: `${item}`,
            alt: `${selectProduct.name}`,
        }).appendTo(slideItem);
    });

    startOwlCarousel();
    showComments(selectProduct.id);
}

let startOwlCarousel = () => {
    $('.owl-carousel').trigger('destroy.owl.carousel');
    $('.owl-carousel').removeClass('owl-hidden');
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["&#10094;", "&#10095;"],
        responsive: {
            0: {
                items: 3
            },
        }
    })

}


let findIndexCommentOnData = (id) => {
    let comIndex = commentsData.map(function (obj) {
        return obj.id;
    }).indexOf(id);

    return comIndex;
}

// Show comments on page product
let showComments = (id) => {
    //clear
    $('#content-comments').html('');
    $('#nameCom').val('');
    $('#textCom').val('');

    let indexComment = findIndexCommentOnData(id);

    if (indexComment >= 0) {
        commentsData[indexComment].comments.forEach(function (item, i) {

            let commentsBlock = $('<div/>', {
                "class": 'comment-block',
            }).appendTo('#content-comments');

            $('<div/>', {
                html: `${item.name}`,
                "class": 'user-commentBlock',
            }).appendTo(commentsBlock);

            $('<div/>', {
                html: `${item.comment}`,
                "class": 'message-commentBlock',
            }).appendTo(commentsBlock);
        });
    } else {
        $('<div/>', {
            html: 'No comments',
            "class": 'noComment-block',
        }).appendTo('#content-comments');
    }
}

// button for add comment 
$('#btnCom').off('click').on('click', function () {
    let nameInput = $('#nameCom').val();
    let textInput = $('#textCom').val();
    let nameCommentator = validationComments(nameInput, '#wrongName', 'Please enter name!');
    let textCommentator = validationComments(textInput, '#wrongText', 'Please enter text!');

    if (nameCommentator && textCommentator) {
        let msg = {
            name: nameCommentator,
            comment: textCommentator
        }
        let idComProd = findIndexCommentOnData(selectProduct.id);

        commentsData[idComProd].comments.push(msg);
        showComments(selectProduct.id);
        addCommentsToLOcalStorage();
    }
});

let addCommentsToLOcalStorage = () => {
   let jsonComments = JSON.stringify(commentsData);
   localStorage.setItem('comments', jsonComments);
   console.log(jsonComments);
}

let validationComments = (value, id, text) => {
    if (!value) {
        $(id).html(text);

    } else {
        $(id).html('');
        return value;
    }
}

let checkSimilarProduct = (product) => {
    let similarProd = [];
    productsData.forEach(function (item) {
        if (item.groups === product.groups) {
            similarProd.push(item);
        }
    });

    return (similarProd);
}

$('.bannerAds').on('click', function() {
    findSelectedProductNumber('6294331677');
});
