'use strict';

let categoriesData = [];
let productsData = [];

const setDefaultData = () => {
  let fetchCategs = fetch('categories.json');
  let fetchProds = fetch('products.json');

  Promise.all([fetchCategs, fetchProds]).then(values => {
    return Promise.all(values.map(i => i.json()));
  }).then(([categories, products]) => {
    getValuesFromCategs(categories, products);
  }).then(() => {
    setNewProdSlider();
  });
};

const getValuesFromCategs = (categories, products) => {
  for (let item of categories) {
    createCategListItem(item['name'], item['key'], item['icon']);
    showNewProductsSections(item['name'], item['key'], item['border-col'], products);
  }
  checkNewProdSection(products);
};

const createCategListItem = (name, dataName, icon) => {
  $('<div>', {
    class: 'menu-title',
    html: `<i class="fa ${icon}"></i> ${name}`,
    'data-name': dataName,
    click: function() {
      alert('hello Dima and Lera!');
    }
  }).appendTo('.v-megamenu');
};