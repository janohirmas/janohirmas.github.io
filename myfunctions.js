function DisplayContent(Act) {
  HideEverything();
  let x = document.getElementByClassName(Act);
  for(let i = 0; i<x.length; i++) {
    x[i].style.display = "block";
  }
}

function HideEverything() {
  let x = document.getElementsByClassName("button-outcome");
  // console.log(x);
  for(let i = 0; i<x.length; i++) {
    x[i].style.display = "none";
  }
}
