const elems = document.getElementsByClassName("scroll-icon");
const sections = document.getElementsByTagName('section');
let element=null
let child = undefined
let content = undefined

let current_dict = {
  prev_element: undefined,
  current: undefined,
}

function scroll(element) {
  var temp = element.id
  temp = temp.slice(0, -5)
  document.getElementById(temp).scrollIntoView({behavior: 'smooth', block:'center'});
}

function mouseover(element){
  // element.style.borderRadius = "10px"
  element.style.width= "60px";
  element.style.backgroundColor="var(--theme)"
}

function mouseout(element){
  if (element.id === current_dict['current'].id+'-icon') {
    return
  }else {
    // element.style.borderRadius = "2em"
    element.style.width= "40px";
    element.style.backgroundColor="white"
  }
}

const options = {
  root: null,
  threshold: 0.5
}
const observer = new IntersectionObserver(function(entries,observer){
  entries.forEach(entry => {
    if (entry.isIntersecting){
      if (child !== undefined) {
        if (child.id === "about-img") {
           child.classList.remove("about-enter")
        }else {
          child.classList.remove("image-enter")
        }
      }

      if (content !== undefined) {
        content.classList.remove("content-enter")
      }

      if (current_dict['prev_element'] !== undefined) {
        current_dict['prev_element'] = element
      }
      current_dict['current'] = entry.target

      content = entry.target.children[0]
      if (content !== undefined && entry.target.id !== "home") {
        content.classList.add("content-enter")
      }

      child = entry.target.children[1]
      if (child !== undefined) {
        if (child.id === "about-img") {
          child.classList.add("about-enter")
        }else if (entry.target.id === "home") {
        }else {
          child.classList.add("image-enter")
        }
      }

      element = document.getElementById(current_dict['current'].id+"-icon")
      mouseover(element)
      if (current_dict['prev_element'] === undefined) {
        current_dict['prev_element'] = element
      } else if (current_dict['prev_element'] !== element && current_dict['prev_element'] !== undefined) {
        mouseout(current_dict['prev_element'])
      }
    }

  });
},options);

let userHasScrolled = false;
window.addEventListener('scroll', (e) => {
  userHasScrolled = true;
})

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
//
var planets = document.getElementById('planets');
var planetsParallax = new Parallax(planets);
planetsParallax.invert(true, false)
if (userHasScrolled) {
  parallaxInstance.disable()
}else {
  parallaxInstance.enable()
}

Array.from(elems).forEach(element => {
  element.onclick = function() {scroll(element)};
  element.onmouseover = function() {mouseover(element)};
  element.onmouseout = function() {mouseout(element)};
});

Array.from(sections).forEach(section => {
  observer.observe(section);
});
