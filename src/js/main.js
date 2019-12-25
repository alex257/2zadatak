
const navSlide = () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".header__mobile-menu");
  const navLinks = document.querySelectorAll(".header__mobile-menu li");

  //Toggle nav
  hamburger.addEventListener("click", () => {

    nav.classList.toggle("header__mobile-menu--active");

    //Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade .5s ease forwards ${index / 5 +
          0.5}s`; 
      }
    });
    //hamburger animation
    hamburger.classList.toggle("header__toggle");
  });

}; 

navSlide();
