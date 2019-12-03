'use strict';

const showCategoryPage = (name, dataName, products) => {
  changePageContent('category-page-container');

  let checkedCategoryProds = sortArrayDataByCategory(dataName);
  let categoryPic = document.getElementById('category-main-pic');
  let imgPath = getValueFromArr(categoriesData, dataName, 'picture');
  categoryPic.src = imgPath;
  document.getElementById('breadcrumb-categ').innerHTML = dataName;
  fillCategoryContainer(checkedCategoryProds);
};

const fillCategoryContainer = (arr) => {
  let categProdWrapper = $('#category-products-grid');
  categProdWrapper.html('');
  arr.forEach((obj) => {
    categProdWrapper.append(createProdItemWrapper(obj));
  });
};

const createProdItemWrapper = (obj) => {
  return $('<div>', {
    class: 'item col-xs-12 col-sm-6 col-md-4',
    append: createCategProdItem(obj)
  });

};

const createCategProdItem = (obj) => {
  console.log(obj);
  return `
    <div class="img-item-wrap">
      <img alt="item-pic" src="${obj.images[0]}"></img>
    </div>
    <p class="item-name">${obj.name}</p>
    <p class="item-price">${obj.price}</p>    
  `;
};

const getValueFromArr = (arr, key, need) => {
  let result;
  arr.forEach((obj) => {
    if (obj.key === key) {
      result = obj[need];
    }
  });
  return result;
};