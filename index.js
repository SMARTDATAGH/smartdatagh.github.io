


// JavaScript for slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex - 1].style.display = "block";  
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var textContent = document.getElementById("text-content");
        var positionFromTop = textContent.getBoundingClientRect().top;

        var screenHeight = window.innerHeight;

        if (positionFromTop - screenHeight <= 0) {
            textContent.classList.add("flip-in-x");
        } else {
            textContent.classList.remove("flip-in-x"); // Remove the class if the element is not in view
        }
    });
});


const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
});

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6558e086d600b968d314926f/1hurice0o';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

