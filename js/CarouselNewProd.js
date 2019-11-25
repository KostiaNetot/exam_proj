'use strict';

function CarouselNewProd(options) {
  let counterRight = 0;
  let counterLeft = 0;
  let wrapper = $(`${options.elem}`);
  let section = wrapper.closest('.new-products');
  let item = wrapper.children('.new-products-item');
  let step = item.outerWidth();
  let farSide = (item.length - 3) * step;

  section.on('click', '.products-arrow-right', newProdSlideRight);
  section.on('click', '.products-arrow-left', newProdSlideLeft);

  function newProdSlideRight () {
    if (counterRight === farSide) {
      counterRight = 0;
    }
    else {
      counterRight += step;
    }
    wrapper.css({
      transform: `translateX(-${counterRight}px)`
    });
  }

  function newProdSlideLeft() {
    if (counterLeft === 0) {
      counterLeft = farSide;
    }
     else {
      counterLeft -= step;
    }
    wrapper.css({
      transform: `translateX(-${counterLeft}px)`
    });
  }
}