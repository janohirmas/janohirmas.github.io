// On page loading
const PrintGameTable = require('janohirmas-printgametable');
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const sGamesDir = '/sections/games/Games.csv';
const Path = require('path');
let PreviousPress = 'Start';
let PreviousTime = new Date().getTime();

document.addEventListener("DOMContentLoaded", function() {
  let vOutcomesLeft = [3,2,0,0,3,0,0,2,1];
  let vOutcomesRight = [1,4,1,2,0,3,0,1,4];
  // let Games = ReadGames(sGamesDir);
  CreateTable(vOutcomesLeft,TableId='L',TableClass='gametable-sep table-left');
  CreateTable(vOutcomesRight,TableId='R',TableClass='gametable-sep table-right');
})

function ReadGames(dir) {
  let Games = [];
  jsonPath = Path.resolve(dir);
  console.log(dir);
  let inputStream = Fs.createReadStream(dir, 'utf8').pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })).on('data', function (row) {
      Games[row[0]] = row.slice(1,row.length);
  }).on('end', function (data) {
      console.log('No more rows!');
  });
  return Games;
}

// Print button in a object (cell)
function CellButton(Cell, ButtonClass='',ButtonID='',ButtonValue='',DisplayClass='') {
  // Create Button and apply characteristics
  let btn = document.createElement('button');
  btn.type = "button";
  btn.className = ButtonClass;
  btn.id = ButtonID;
  btn.value = ButtonValue;
  btn.innerHTML = ButtonValue;
  
  // EventListener functions
  btn.addEventListener("click", function() {
    // Check that new element is pressed
    if (btn.id != PreviousPress) {
      
      // display specific content
      HideEverything();
      DisplayContent(DisplayClass,ButtonValue);

      // record button pressed
      let p = document.getElementById('ButtonsPressed');
      if (p.innerHTML) {
        p.innerHTML = p.innerHTML+','+ButtonID;
      } else {
        p.innerHTML = ButtonID;
      }

      // record time of pressing
      let now = new Date().getTime();
      p = document.getElementById('TimePressed');
      let diff = (now-PreviousTime);
      if (p.innerHTML) {
        p.innerHTML = p.innerHTML+','+ diff;
      } else {
        p.innerHTML = diff;
      }

      // change previous to new
      PreviousPress = btn.id;
      PreviousTime = now;
    }
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
    console.log(outcomes)
    // Add Row Name
    CellButton(cell,'button-game button-action',TableId+vRowNames[i],vRowNames[i],'row-'+i+' tab-'+TableId)

    // go through col values
    for (j=0; j<iC; j++) {
      cell = row.insertCell(j+1);
      console.log(outcomes[j]);
      CellButton(cell,'button-game button-outcome row-'+i+' col-'+j+' tab-'+TableId,vRowNames[i]+vColNames[j],outcomes[j],'col-'+j+' row-'+i)
    }
  }
  let body = document.getElementsByClassName("game-body")[0];
  console.log(table);
  body.appendChild(table);
}



