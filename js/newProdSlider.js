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

function makeSettings() {
  setNewProdSlider();
  // setEventListener($('.prod-btn'), testButtonFunction);
  $('.new-products').on('click', '.prod-btn', testButtonFunction);
  $('.item-img-wrapper').on('mouseover', showSecondPic);
  $('.item-img-wrapper').on('mouseout', showFirstPic);
}

function setNewProdSlider() {
  setSectionsMeasuring($('.new-products-items-wrapper'));
  $('.new-products-items-wrapper').each(function () {
    let newCarouselProd = new CarouselNewProd({
      elem: `#${$(this).attr('id')}`,
    });
  });
}

function showSecondPic() {
  console.log('showSecondPic');
}

function showFirstPic() {
  console.log('showFirstPic');
}