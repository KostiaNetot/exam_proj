'use strict';

let categoriesData = [];
let productsData = [];
let selectProduct = {};
let commentsData = [];

const setDefaultData = () => {
  let fetchCategs = fetch('data/categories.json');
  let fetchProds = fetch('data/products.json');
//load comments
  let fetchComments = fetch('data/comments.json');

  Promise.all([fetchCategs, fetchProds, fetchComments]).then(values => {
    return Promise.all(values.map(i => i.json()));
  }).then(([categories, products, comments]) => {
    makeSettings(categories, products);
    loadComments(comments);
  }).catch(function (err) {
      console.log('Error', err);
  });
};

let loadComments = (m) => {
  commentsData = m;
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

function testButtonFunction() {
  alert('Hello Dima, eventListener works! Check console))')
  console.log($(this));
}