function DisplayContent(ID) {
    // $("div").not(ID).style.display = "none";
    var x = document.getElementById(ID);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }