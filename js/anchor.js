$('a[href*="#"]')
.not('[href="#"]')
.not('[href="#0"]')
.not('[href="#carouselExampleCaptions"]')
.click(function(event) {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
 if (target.length) {
   $('html,body').animate({
       scrollTop: target.offset().top - 64
  }, 800);
  return false;
 }
  }
});
$("a[href*='https']:not([href*='"+location.hostname+"'])").attr('rel','noreferrer');

let scrollOnTop = () => {
    $("body,html").animate({
        scrollTop:0
    }, 800);
}