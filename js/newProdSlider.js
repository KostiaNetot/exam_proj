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

  // wrapper.closest('.new-products').on('click', '.products-arrow-right', () => {
  //   newProdSlideRight(wrapper, itemCard.outerWidth());
  // });
}

// const newProdSlideRight = (wrapper, cardWidth) => {
//   console.log(cardWidth);
//   wrapper.css('transform',`translateX(-${cardWidth}px)`);
// };

const setNewProdSlider = () => {
  $('.new-products').on('click', '.products-arrow', );
};