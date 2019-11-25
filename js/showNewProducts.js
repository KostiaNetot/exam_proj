'use strict';

const showNewProductsSections = (name, dataName, borderCol, productsData) => {
  let NewProdHtmlContent = `
    <div class="new-products-header">
      <h4>New ${name}</h4>
      <div class="products-arrow products-arrow-left"></div>
      <div class="products-arrow products-arrow-right"></div>
    </div>
`;

  $('<section>', {
    class: 'new-products',
    html: NewProdHtmlContent,
    'data-name': dataName,
    append: $('<div>', {
      class: 'new-products-items-wrapper row',
      'data-name': dataName,
      'id': `slider-new-${dataName}`
    }),
    css: {
      borderTop: `2px solid ${borderCol}`
    }
  }).appendTo('.main-pg-container');
};

const checkNewProdSection = (products) => {
  let newProdSections = $('.new-products');
  newProdSections.each(function () {
    appendNewProdItem($(this), products);
  });
};

function appendNewProdItem(item, products) {
  let wrapper = item.children('.new-products-items-wrapper');
  let categName = wrapper.data('name');
  let categoriesArr = sortArrayDataByCategory(products, categName);
      categoriesArr.forEach((item) => {
        $(wrapper).append(createNewProdItem(item));
      });
  setSectionsMeasuring(item.children('.new-products-items-wrapper'));
}

const sortArrayDataByCategory = (array, category) => {
  return array.filter((item) => {
    return item.category === category;
  });
};

const createNewProdItem = (prodObj) => {
  return `
    <div class="new-products-item">
      <div class="top-side">
        <div class="item-img-wrapper">
          <img src=${prodObj.images[0]} alt="pic" class="item-pic">
          <img src=${prodObj.images[1]} alt="pic" class="second-pic">
        </div>
        <div class="item-text-wrapper">
          <h5>${prodObj.name}</h5>
          <p class="item-price">$<span class="price-digit">${prodObj.price}</span></p>
        </div>
      </div>
      <div class="bottom-side">
        <button type="button" class="quick-view-item" data-id=${prodObj.id}><i class="fa fa-eye"></i> Buy it</button>
      </div>
    </div>
  `;
};