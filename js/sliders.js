document.querySelector('.bd-example').addEventListener('mouseover', () => {
    document.querySelector('.slider-buttons').classList.remove('hide');
})

document.querySelector('.bd-example').addEventListener('mouseout', () => {
    document.querySelector('.slider-buttons').classList.add('hide');
})