function DisplayContent(ID) {
  HideEverything();
  let x = document.getElementById(ID);
  x.style.display = "block";
}

function HideEverything() {
  let x = document.getElementsByClassName("content-box");
  // console.log(x);
  for(let i = 0; i<x.length; i++) {
    x[i].style.display = "none";
  }
}
