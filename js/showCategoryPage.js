'use sctrict';

const showCategoryPage = (name, dataName, products) => {
  alert(`Here you will redirect to ${name} Category Page`);
  console.log(products);
  products.forEach((item) => {
    if (item.category === dataName) {
      console.log(item);
    }
  });
};