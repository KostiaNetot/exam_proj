'use strict';

const setCategData = () => {
  let dataPromise = new Promise((resolve, reject) => {
    fetch('categories.json')
      .then(data => {
        resolve(data.text());
      })
  });
  dataPromise.then(data => {
    categoriesData = JSON.parse(data);
    getValuesFormCategs(categoriesData);
  });
};

const getValuesFormCategs = (data) => {
  for (let item of data) {
    createCategListItem(item['name'], item['key'], item['icon']);
    showNewProductsSections(item['name'], item['key'], item['border-col']);
  }
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