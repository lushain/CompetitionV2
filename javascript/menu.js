const btn = document.getElementById('menu-btn');
const topSpan = btn.children[0]
const bottomSpan = btn.children[1]

function openNav() {
  topSpan.style.transform = "rotate(-25deg)"
  bottomSpan.style.transform = "rotate(24deg)"
  document.getElementById("mySidenav").style.zIndex ="3"
  document.getElementById("mySidenav").style.width = "30%";
  btn.setAttribute('onclick','closeNav()')
};

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
topSpan.style.transform = "rotate(0deg)"
bottomSpan.style.transform = "rotate(0deg)"
btn.setAttribute('onclick','openNav()')
}
