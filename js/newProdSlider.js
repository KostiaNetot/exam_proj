'use strict';

$(window).resize(() => {
  $('.new-products-items-wrapper').each(function() {
    setSectionsMeasuring($(this));
  });
});

function setSectionsMeasuring(wrapper) {
  let sectionWidth = wrapper.closest('.new-products').outerWidth();
  let itemCard = wrapper.children('.new-products-item');
  itemCard.width(sectionWidth / 3);
  wrapper.width(itemCard.outerWidth() * itemCard.length);
}

function setNewProdSlider() {
  $('.new-products-items-wrapper').each(function () {
    let newCarouselProd = new CarouselNewProd({
      elem: `#${$(this).attr('id')}`,
    });
  });
}