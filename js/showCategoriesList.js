'use strict';

const setData = () => {
  let dataPromise = new Promise((resolve, reject) => {
    fetch('categories.json')
      .then(data => {
        resolve(data.text());
      })
  });
  dataPromise.then(data => {
    categoriesData = JSON.parse(data);
    // createCategList(categoriesData);
    getValuesFormCategs(categoriesData);
  });
};

// const createCategList = (data) => {
//   $('.v-megamenu').html('<div class="menu-title">Link 1</div>');
// };

const getValuesFormCategs = (data) => {
  for (let item of data) {
    createCategListItem(item['name'], item['key'], item['icon']);
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