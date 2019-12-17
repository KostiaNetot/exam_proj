'use strict';

$(window).resize(function() {
  setNewProdSlider();
});

function setSectionsMeasuring(wrapper) {
  let sectionWidth = wrapper.closest('.new-products').outerWidth();
  let itemCard = wrapper.children('.new-products-item');
  itemCard.width((sectionWidth - 19) / 3);
  wrapper.width((itemCard.outerWidth() * itemCard.length) + 40);
  wrapper.css({
    transform: 'translateX(0)'
  });
}

function makeSettings(categories, products) {
  categoriesData = categories;
  productsData = products;
  getValuesFromCategs();
  setNewProdSlider();
  $('.new-products').on('click', '.prod-btn', function () {
    let dataId = this.getAttribute('data-id');
    findSelectedProductNumber(dataId);
  });
  $('.new-products').off().on('mouseenter', '.item-img-wrapper', togglePicture);
  $('.new-products').on('mouseleave', '.item-img-wrapper', togglePicture);
}

function setNewProdSlider() {
  setSectionsMeasuring($('.new-products-items-wrapper'));
  $('.new-products-items-wrapper').each(function () {
    let newCarouselProd = new CarouselNewProd({
      elem: `#${$(this).attr('id')}`,
    });
  });
}

function togglePicture() {
  let pictures = this.querySelectorAll('img');
  pictures.forEach((img) => {
    img.classList.toggle('transparent');
  })
}

// function showSecondPic() {
//   console.log(this);
// }
//
// function showFirstPic() {
//   console.log('showFirstPic');
// }
