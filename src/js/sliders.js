document.querySelector('.bd-example').addEventListener('mouseover', () => {
    document.querySelector('.slider-buttons').classList.remove('hide');
});

document.querySelector('.bd-example').addEventListener('mouseout', () => {
    document.querySelector('.slider-buttons').classList.add('hide');
});

$('.carousel-caption h5').on('click', function(e) {
    let catAttr = $(this).data('name');
    showCategoryPage(catAttr);
});