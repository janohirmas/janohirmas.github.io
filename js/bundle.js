(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// On page loading
document.addEventListener("DOMContentLoaded", function() {
  let vOutcomesLeft = [3,2,0,0,3,0,0,2,1];
  let vOutcomesRight = [1,4,1,2,0,3,0,1,4];
  CreateTable(vOutcomesLeft,TableId='L',TableClass='gametable-sep table-left');
  CreateTable(vOutcomesRight,TableId='R',TableClass='gametable-sep table-right');
})

let PrintGameTable = require('janohirmas-printgametable');

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
    let now = new Date();
    p = document.getElementById('TimePressed');
    if (p.innerHTML) {
      p.innerHTML = p.innerHTML+','+now.getTime();
    } else {
      p.innerHTML = now.getTime();
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




},{"janohirmas-printgametable":2}],2:[function(require,module,exports){
module.exports = GameTable;

function GameTable(content,iR,iC,vColNames,vRowNames) {
    this.Table = content; 
    let length = content.length;
    // Rows
    if (!iR && !iC) {
        let sqrt= Math.sqrt(length) ;
        if (Number.isInteger(sqrt)) {
            iC = sqrt;
            iR = sqrt;
        }
    }
    if (iR) {
        if (length%iR == 0) {
            if (!iC) {
                iC = length/iR;
            };
        } else {
            console.log('Rows do not fit in table');
        };
    };
    // Columns
    if (iC) {
        if (length%iC == 0) {
            if (!iR) {
                iR = length/iC;
            };
        } else {
            console.log('Columns do not fit in table');
        };
    };
    // Check both match 
    if (length/(iR*iC)!=1) {
        console.log('Dimensions do not match');
    }
    this.Rows = iR;
    this.Columns = iC;
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    if (vColNames) {
        this.ColNames = vColNames;
    } else {
        this.ColNames = ABC.slice(-iC);
    }
    if (vRowNames) {
        this.RowNames = vRowNames;
    } else {
        this.RowNames = ABC.slice(0,iR);
    }
}


},{}]},{},[1]);
