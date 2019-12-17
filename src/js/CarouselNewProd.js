'use strict';

function CarouselNewProd(options) {
  let counter = 0;
  let wrapper = $(`${options.elem}`);
  let section = wrapper.closest('.new-products');
  let item = wrapper.children('.new-products-item');
  let step = item.outerWidth();
  let farSide = Math.floor((item.length - 3) * step);

  section.on('click', '.products-arrow-right', newProdSlideRight);
  section.on('click', '.products-arrow-left', newProdSlideLeft);

  function newProdSlideRight() {
    if (counter <= farSide*-1) {
      counter = 0;
    } else {
      counter -= step;
    }
    wrapper.css({
      transform: `translateX(${counter}px)`
    });
  }

  function newProdSlideLeft() {
    if (counter >= 0) {
      counter = farSide*-1;
    } else {
      counter += step;
    }
    wrapper.css({
      transform: `translateX(${counter}px)`
    });
  }
}