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
    makeSettings();
  });
};

const getValuesFromCategs = (categories, products) => {
  for (let item of categories) {
    createCategListItem(item['name'], item['key'], item['icon'], products);
    showNewProductsSections(item['name'], item['key'], item['border-col'], products);
  }
  checkNewProdSection(products);
};

const createCategListItem = (name, dataName, icon, products) => {
  $('<div>', {
    class: 'menu-title',
    html: `<i class="fa ${icon}"></i> ${name}`,
    'data-name': dataName,
    click: function() {
      showCategoryPage(name, dataName, products);
    }
  }).appendTo('.v-megamenu');
};

const setEventListener = (el, funct) => {
  el.on('click', funct);
};

function testButtonFunction() {
  alert('Hello Dima, eventListener works! Check console))')
  console.log($(this));
}