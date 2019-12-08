'use strict';

const showCategoryPage = (dataName) => {
  changePageContent('category-page-container');
  $('.box-sort-by').html(formSelect());

  let checkedCategoryProds = sortArrayDataByCategory(dataName);
  let categoryPic = document.getElementById('category-main-pic');
  let imgPath = getValueFromArr(categoriesData, dataName, 'picture');
      categoryPic.src = imgPath;
  $('#breadcrumb-categ').html(dataName);
  $('#prod-amount-text').html(`There are ${checkedCategoryProds.length} products`);

  fillCategoryContainer(checkedCategoryProds);
  checkSelectSort(checkedCategoryProds);
  checkFilters();
};

const checkSelectSort = (arr) => {
  let selectSort = document.forms['sort-by-form']['sort-by'];
  selectSort.addEventListener('change', function () {
    checkSelectValue(selectSort.value, arr);
  })
};

const checkFilters = () => {
  let colorsFilter = document.forms["filter-colors"];
  colorsFilter.addEventListener('change', () => {
    console.log(colorsFilter.elements);
  });
};

const checkSelectValue = (val, arr) => {
  let sortedArr;
  switch (val) {
    case 'low-high':
      sortedArr = arr.sort((a, b) => {
        return a.price - b.price;
      });
      fillCategoryContainer(sortedArr);
      break;
    case 'high-low':
      sortedArr = arr.sort((a, b) => {
        return a.price - b.price;
      });
      fillCategoryContainer(sortedArr.reverse());
      break;
    case 'a-z':
      sortedArr = arr.sort((a, b) => {
        let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      fillCategoryContainer(sortedArr);
      break;
    case 'z-a':
      sortedArr = arr.sort((a, b) => {
        let nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      fillCategoryContainer(sortedArr.reverse());
      break;
  }
};

const fillCategoryContainer = (arr) => {
  let categProdWrapper = $('#category-products-grid');
  let colorsCategory = [];
  categProdWrapper.html('');
  arr.forEach((obj) => {
    categProdWrapper.append(createProdItemWrapper(obj));
    colorsCategory.push(obj.color);
  });
  setColorFilter(colorsCategory);
};

const setColorFilter = (arr) => {
  arr = removeSpareFromArray(arr);
  $('form[name="filter-colors"]').html('');
  arr.forEach((color) => {
    $('form[name="filter-colors"]').append(colorCheckboxes(color));
  });
};

const removeSpareFromArray = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const createProdItemWrapper = (obj) => {
  return $('<div>', {
    class: 'item col-xs-12 col-sm-6 col-md-4',
    append: createCategProdItem(obj)
  });

};

const createCategProdItem = (obj) => {
  return `
    <div class="img-item-wrap" data-id="${obj.id}">
      <img alt="item-pic" src="${obj.images[0]}"></img>
    </div>
    <div class="text-item-wrap" data-id="${obj.id}">
      <p class="item-name">${obj.name}</p>
      <p class="item-price">$<span>${obj.price}</span></p>
    </div>    
  `;
};

const formSelect = () => {
  return `
    <form name="sort-by-form">
              <span>Sort by: </span>
              <select name="sort-by" id="sort-by">
                <option value="relevance">Relevance</option>
                <option value="a-z">Name, A to Z</option>
                <option value="z-a">Name, Z to A</option>
                <option value="low-high">Price, low to high</option>
                <option value="high-low">Price, high to low</option>
              </select>
            </form>
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

const colorCheckboxes = (color) => {
  return `
    <label><input value="${color}" type="checkbox"><span class="color-square" style="background-color: ${color}"></span>${color}</label>
   `;
};
