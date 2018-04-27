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

const Portfolio = (function(){
  const items = document.getElementsByClassName("portfolio-item");
  const viewer = document.getElementsByClassName("portfolio-item-viewer")[0];
  const viewerImg = viewer.querySelector("img");
  const closeBtn = viewer.querySelector(".close");

  const scroll = new SmoothScroll();

  let hideOnScroll = false;

  function init(){
    events();
  }

  function events(){
    for(let item of items){
      item.addEventListener('click', handleClick);
    }

    // window.addEventListener('scroll', handleScroll);
    closeBtn.addEventListener('click', hideViewer);
  }

  function handleScroll(e){
    if(hideOnScroll){
      hideViewer();
    }
  }

  function handleClick(e){
    // Directly redirect on mobile viewport
    if(window.innerWidth <= 575){
      const url = e.target.parentNode.dataset.link;
      return url && location.assign(url);
    }
    

    const div = e.target.parentElement;
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    const left = div.offsetLeft;
    const top = div.offsetTop;

    const clone = document.createElement('div');
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.left = `${left}px`;
    clone.style.top = `${top}px`;
    clone.classList.add('expand');

    viewer.style.top = `${top}px`;
    viewerImg.src = e.target.src;

    document.body.appendChild(clone);
    scroll.animateScroll(div);

    setTimeout(() => {
      scroll.animateScroll(div);
      viewer.classList.add('active');
      viewer.classList.remove('fadeOut');
    }, 1000);

    setTimeout(() => {
      if(viewer.classList.contains('active')){
        hideOnScroll = true;
      }
    }, 2000);

    clone.addEventListener('click', (e) => {
      document.body.removeChild(e.target)
    });

  }

  function hideViewer(){
    const expand = document.querySelector('.expand');
    hideOnScroll = false;
    
    // viewer.classList.remove('active');
    viewer.classList.add('inactive');
    viewer.classList.remove('active');
    expand.classList.add('fadeOut');

    // Remove expanded div
    setTimeout(() => {
      document.body.removeChild(expand);
      viewer.classList.remove('inactive');
    }, 500);
  }

  return {
    init
  }
})();

Navbar.init();
Intro.init();
Portfolio.init();




