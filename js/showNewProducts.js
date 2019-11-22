'use strict';

const setProductsData = () => {
  let productsDataPromise = new Promise((resolve, reject) => {
    fetch('products.json')
      .then(dataProd => {
        resolve(dataProd.text());
      })
  });
  productsDataPromise.then(dataProd => {
    productsData = JSON.parse(dataProd);
  });
};

const showNewProductsSections = (name, dataName, borderCol) => {

  const NewProdhtmlContent = `
    <div class="new-products-header">
      <h4>New ${name}</h4>
      <div class="products-arrow products-arrow-left"></div>
      <div class="products-arrow products-arrow-right"></div>
    </div>
    <div class="new-products-items-wrapper row"></div>
`;

  $('<section>', {
    class: 'new-products',
    html: NewProdhtmlContent,
    'data-name': dataName,
    css: {
      borderTop: `2px solid ${borderCol}`
    }
  }).appendTo('.main-pg-container');
};