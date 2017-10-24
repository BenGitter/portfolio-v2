console.log("Script started");

const Navbar = (function(){
  // DOM elements
  const navbar = document.querySelector(".nav-bar");
  const toggleBtn = document.querySelector(".nav-bar .nav-toggle");
  const homeLink = document.querySelector(".nav-bar .home-link");
  const navSmall = document.querySelector(".nav-bar .nav-small");
  
  let showNav = false;

  function init(){
    events();
  }

  function events(){
    window.addEventListener("scroll", handleScroll);
    toggleBtn.addEventListener("click", toggleNav);
  }

  function toggleNav(e){
    showNav = !showNav;
    homeLink.style.display = showNav ? "none" : "inline";
    navSmall.style.visibility = !showNav ? "hidden" : "visible";
    toggleBtn.classList.toggle("fa-bars");
    toggleBtn.classList.toggle("fa-angle-left");
  }

  function handleScroll(e){
    let opac = 1 - e.pageY / 1000;
    opac = opac < 0.8 ? 0.8 : opac;
    
    navbar.style.opacity = opac;
  }

  return {
    init
  }
})();

const Intro = (function(){
  const welcomeTxt = document.querySelector(".welcome");
  const hour = new Date().getHours();

  function init(){
    setGreeting();
  }

  function setGreeting(){
    if(hour < 6){
      welcomeTxt.innerText = "Good night,";
    }else if(hour < 12){
      welcomeTxt.innerText = "Good morning,";
    }else if(hour < 12){
      welcomeTxt.innerText = "Good afternoon,";
    }else{
      welcomeTxt.innerText = "Good evening,";
    }
  }

  return {
    init
  }
})();

Navbar.init();
Intro.init();




