"use strict";

// push and move to page

//Push logo and move home page
$('.logo-link').on('click', function() {
    changePageContent('main-pg-container');
});

//Btn Home on page product
$('#breadcrumb-link-home').on('click', function() {
    changePageContent('main-pg-container');
});

//Btn Home on page category
$('#breadcrumb-link-homeCategPage').on('click', function() {
    changePageContent('main-pg-container');
});