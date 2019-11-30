'use strict';

let categoriesData = [];
let productsData = [];
let selectProduct = {};

const setDefaultData = () => {
  let fetchCategs = fetch('data/categories.json');
  let fetchProds = fetch('data/products.json');

  Promise.all([fetchCategs, fetchProds]).then(values => {
    return Promise.all(values.map(i => i.json()));
  }).then(([categories, products]) => {
    makeSettings(categories, products);
  }).catch(function (err) {
      console.log('Error', err);
  });
};

const getValuesFromCategs = (categories, products) => {
  for (let item of categoriesData) {
    createCategListItem(item['name'], item['key'], item['icon'], productsData);
    createCategColumnList(item['name'], item['key'], productsData);
    showNewProductsSections(item['name'], item['key'], item['border-col'], productsData);
  }
  checkNewProdSection();
};

const createCategColumnList = (name, dataName, products) => {
  console.log(name, dataName, products);
  let listItem = $('<a>', {
    text: name,
    'data-name': dataName,
    click: function(e) {
      e.preventDefault();
      showCategoryPage(name, dataName, products);
    }
  });
  $('<li>', {
      html: listItem
    }
  ).appendTo('.category-column-menu');
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

// const setEventListener = (el, funct) => {
//   el.on('click', funct);
// };

function testButtonFunction() {
  alert('Hello Dima, eventListener works! Check console))')
  console.log($(this));
}