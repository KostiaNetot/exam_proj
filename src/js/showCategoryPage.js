'use strict';

const handlerItems = () => {
  $('.item-name').off('click').on('click', function () {
    let itemId = $(this).data('id');
    findSelectedProductNumber(String(itemId));
  });
  $('.img-item-wrap').off('click').on('click', function () {
    let itemId = $(this).data('id');
    findSelectedProductNumber(String(itemId));
  });
};

const showCategoryPage = (dataName) => {
  filtered = false;
  changePageContent('category-page-container');
  $('.box-sort-by').html(formSelect());
  checkedCateg = sortArrayDataByCategory(dataName);
  changedCateg = sortArrayDataByCategory(dataName);
  let categoryPic = document.getElementById('category-main-pic');
  let imgPath = getValueFromArr(categoriesData, dataName, 'picture');
  categoryPic.src = imgPath;
  $('#breadcrumb-categ').html(dataName);
  setAmountHeader(checkedCateg);
  setViewBtns();
  fillCategoryContainer(checkedCateg, dataName);
  setSortNFilter(checkedCateg, dataName);
};

const setAmountHeader = (arr) => {
  $('#prod-amount-text').html(`There are ${arr.length} products`);
};

function setViewBtns() {
  let listViewBtn = document.querySelector('.fa-th-list');
  let gridViewBtn = document.querySelector('.fa-th');
      listViewBtn.addEventListener('click', showListView);
      gridViewBtn.addEventListener('click', showListView);
};

function showListView() {
  if (!this.classList.contains('active-color')) {
    let cards = document.querySelectorAll('.item');
    if (this.classList.contains('fa-th-list')) {
      [].forEach.call(cards, (card) => {
        card.className = 'item item-list'
      });
    } else {
      [].forEach.call(cards, (card) => {
        card.className = 'item col-xs-12 col-sm-6 col-md-4';
      });
    }
    document.querySelector('.fa-th-list').classList.toggle('active-color');
    document.querySelector('.fa-th').classList.toggle('active-color');
  }
}

const setSortNFilter = (arr, dataName) => {
  initPriceSlider(arr);
  setFilterBtn(arr, dataName);
  checkSelectSort(arr, dataName);
};

const setFilterBtn = (arr, dataName) => {
  $('#applyFilter').attr('data-name', dataName).off().on('click', () => {
    applyFilters(arr, dataName);
  });
  $('#resetFilter').on('click', () => {
    // fillCategoryContainer(arr, dataName);
    showCategoryPage(dataName);
  });
};

const applyFilters = (arr, data) => {
  let inputs = document.forms['filter-colors'].querySelectorAll('input');
  let colorValues = [];
  let priceDiapason = $('#slider-range').slider('values');

  [].forEach.call(inputs, (elem) => {
    if (elem.checked) {
      colorValues.push(elem.value);
    }
  });
  if (filtered) {
    changedCateg = checkedCateg;
  }
  changedCateg = changedCateg.filter((obj) => {
    return (colorValues.indexOf(obj.color) !== -1) && (obj.price >= priceDiapason[0] && obj.price <= priceDiapason[1]);
  });
  fillByFiltered(changedCateg);
  setAmountHeader(changedCateg);
  filtered = true;
};

const fillByFiltered = (arr) => {
  let cardClassName;
  let categProdWrapper = $('#category-products-grid');
  if (categProdWrapper.children().hasClass('item-list')) {
    cardClassName = 'item item-list';
  } else {
    cardClassName = 'item col-xs-12 col-sm-6 col-md-4';
  }
  categProdWrapper.html('');
  arr.forEach((obj) => {
    categProdWrapper.append(createProdItemWrapper(obj, cardClassName));
  });
  handlerItems();
};

const getMaxPrice = (arr) => {
  return Math.max.apply(Math, arr.map((obj) => { return obj.price; }))
};

const priceTopRound = (val) => {
  return Math.ceil(val / 100) * 100;
};

const initPriceSlider = (arr) => {
  let maxPrice = getMaxPrice(arr);
  maxPrice = priceTopRound(maxPrice);
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: maxPrice,
    values: [ 0, maxPrice ],
    slide: function( event, ui ) {
      $( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#price" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
};

const checkSelectSort = (arr) => {
  const defArr = [];
  arr.forEach((obj) => {
    defArr.push(obj);
  });
  let selectSort = document.forms['sort-by-form']['sort-by'];
  selectSort.addEventListener('change', function () {
    checkSelectValue(selectSort.value, arr);
  })
};

const checkSelectValue = (val, arr) => {
  switch (val) {
    case 'low-high':
      changedCateg = changedCateg.sort((a, b) => {
        return a.price - b.price;
      });
      fillByFiltered(changedCateg);
      break;
    case 'high-low':
      changedCateg = changedCateg.sort((a, b) => {
        return a.price - b.price;
      });
      fillByFiltered(changedCateg.reverse());
      break;
    case 'a-z':
      changedCateg = changedCateg.sort((a, b) => {
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
      fillByFiltered(changedCateg);
      break;
    case 'z-a':
      changedCateg = changedCateg.sort((a, b) => {
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
      fillByFiltered(changedCateg.reverse());
      break;
    case 'relevance':
      fillByFiltered(checkedCateg);
      break;
  }
};

const fillCategoryContainer = (arr, dataName) => {
  let categProdWrapper = $('#category-products-grid');
  let cardClassName;
  if (categProdWrapper.children().hasClass('item-list')) {
    cardClassName = 'item item-list';
  } else {
    cardClassName = 'item col-xs-12 col-sm-6 col-md-4';
  }
  let colorsCategory = [];
  categProdWrapper.html('');
  arr.forEach((obj) => {
    let item = createProdItemWrapper(obj, cardClassName);
    categProdWrapper.append(item);
    colorsCategory.push(obj.color);
    setHandler(item);
  });
  setColorFilter(colorsCategory, arr, dataName);
  handlerItems();
};

const setHandler = (item) => {
  item.off().on('mouseenter', '.img-item-wrap', togglePicture);
  item.on('mouseleave', '.img-item-wrap', togglePicture);
};

const setColorFilter = (arr, arr1, dataName) => {
  arr = removeSpareFromArray(arr);
  $('form[name="filter-colors"]').html('');
  arr.forEach((color) => {
    $('form[name="filter-colors"]').append(colorCheckboxes(color));
  });
};

const removeSpareFromArray = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const createProdItemWrapper = (obj, className) => {
  return $('<div>', {
    class: className,
    append: createCategProdItem(obj),
  });
};

const createCategProdItem = (obj) => {
  let sliced = obj.description.slice(0, 250);
  if (sliced.length < obj.description.length) {
    sliced += '...';
  }
  return `
    <div class="img-item-wrap" data-id="${obj.id}">
      <img alt="item-pic" src="${obj.images[0]}"></img>
      <img alt="item-pic" class="transparent" src="${obj.images[1]}"></img>
    </div>
    <div class="text-item-wrap">
      <p data-id="${obj.id}" class="item-name">${obj.name}</p>
      <p class="item-price">$<span>${obj.price}</span></p>
      <p class="item-description hidden">${sliced}</p>
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
    <label><input value="${color}" checked type="checkbox"><span class="color-square" style="background-color: ${color}"></span>${color}</label>
   `;
};
