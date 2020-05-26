// On page loading
let PreviousTime = new Date().getTime();
let PrintGameTable = require('janohirmas-printgametable');

document.addEventListener("DOMContentLoaded", function() {
  let vOutcomesLeft = [3,2,0,0,3,0,0,2,1];
  let vOutcomesRight = [1,4,1,2,0,3,0,1,4];
  CreateTable(vOutcomesLeft,TableId='L',TableClass='gametable-sep table-left');
  CreateTable(vOutcomesRight,TableId='R',TableClass='gametable-sep table-right');
})



// Print button in a object (cell)
function CellButton(Cell, ButtonClass='', ButtonValue='',ButtonID='',DisplayClass='') {
  let btn = document.createElement('button');
  btn.type = "button";
  btn.className = ButtonClass;
  btn.value = ButtonValue;
  if (ButtonID) {btn.id = ButtonID};
  btn.innerHTML = ButtonID;
  btn.addEventListener("click", function() {
    HideEverything();
    DisplayContent(DisplayClass,ButtonValue);
    let p = document.getElementById('ButtonsPressed');
    if (p.innerHTML) {
      p.innerHTML = p.innerHTML+','+ButtonValue;
    } else {
      p.innerHTML = ButtonValue;
    }
    let now = new Date().getTime();
    p = document.getElementById('TimePressed');
    let diff = (now-PreviousTime);
    if (p.innerHTML) {
      p.innerHTML = p.innerHTML+','+ diff;
    } else {
      p.innerHTML = diff;
    }
    PreviousTime = now;
  });
  Cell.appendChild(btn);
}

// Display Contents from a specific class
function DisplayContent(Act,val='') {
  let x = document.getElementsByClassName(Act);
  for(let i = 0; i<x.length; i++) {
    x[i].classList.remove('hidden');
    x[i].classList.add('non-hidden');
  }
}

// Hide all elements 
function HideEverything() {
  let x = document.getElementsByClassName("button-outcome");
  // console.log(x);
  for(let i = 0; i<x.length; i++) {
    x[i].classList.remove('non-hidden');
    x[i].classList.add('hidden');
  }
}
// Create Table
function CreateTable(vOutcomes,TableId='',TableClass='') {

  // compile table
  let Outcomes = new PrintGameTable(vOutcomes);
  // Import values
  let vValues = Outcomes.Table;
  let iR = Outcomes.Rows;
  let iC = Outcomes.Columns;
  let vColNames = Outcomes.ColNames;
  let vRowNames = Outcomes.RowNames;
  // Create relevant elements
  let table = document.createElement('table');
  if (TableId) {
    table.id = TableId;
  };
  if (TableClass) {
    let vClasses = TableClass.split(' ')
    vClasses.forEach(element => {
      table.classList.add(element);
    });
  }
  let row = table.insertRow(0);
  let cell = row.insertCell(0);
  // Fill header
  for (j=0; j<iC; j++) {
    cell = row.insertCell(j+1);
    CellButton(cell,'button-game button-action',TableId+vColNames[j],vColNames[j],'col-'+j+' tab-'+TableId)
    // cell.innerHTML = vColNames[j];
  }
  // Fill Rows
  for (i=0;i<iR;i++) {
    row = table.insertRow(i+1);
    cell = row.insertCell(0);
    outcomes = vValues.slice(3*i,3*(i+1));
    // Add Row Name
    CellButton(cell,'button-game button-action',TableId+vRowNames[i],vRowNames[i],'row-'+i+' tab-'+TableId)
    // cell.innerHTML = vRowNames[i];
    // go through col values
    for (j=0; j<iC; j++) {
      cell = row.insertCell(j+1);
      // cell.innerHTML = outcomes[j];
      CellButton(cell,'button-game button-outcome row-'+i+' col-'+j+' tab-'+TableId,vRowNames[i]+vColNames[j],outcomes[j],'col-'+j+' row-'+i)
    }
  }
  let body = document.getElementsByClassName("game-body")[0];
  console.log(table);
  body.appendChild(table);
}



