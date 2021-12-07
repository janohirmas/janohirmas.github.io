// Other variables or constants
var currentPosition={};
var activeQuest = 'None';
// Quests
const Quest = [{
        id: 'Home',
        Location: {latitude: 52.3915747, longitude: 4.9342416},
        Clue: "clue1.txt",
        Question: 'Bird: What is the number of the house where I live?',
        Answer: '190',
    }, {
        id: 'Bird',
        // Location: {latitude: 52.384724, longitude: 4.930480},
        Location: {latitude: 52.365520, longitude: 4.910808},
        Clue: "clue2.txt",
        Question: 'wut?',
        Answer: 'Margreeth',
    },{
        id: 'Broers',
        // Location: {latitude: 52.385614, longitude: 4.914406},
        Location: {latitude: 52.363898, longitude: 4.910761},
        Clue: "clue3.txt",
        Question: 'wut?',
        Answer: 'Katja',
    }]
// Functions
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function checkAnswer() {
    getLocation();
    // Looks if PasswordID is correct
    let sAnswer = document.getElementById('pass-check').value;
    let Result  = Quest.filter(d=>d['id']==sAnswer);
    activeQuest = Result[0];
    // If Correct Display Clue
    if (Result.length==1) {
        // Hide Init Text
        let initText = document.getElementById("init-text")
        initText.classList.add("inactive");
        initText.classList.remove("active");
        // Show Clue
        let clueText = document.getElementById("clue-text");
        let sCluePath = `clues/${activeQuest.Clue}`;
        clueText.innerHTML = readTextFile(sCluePath);
        clueText.classList.remove("inactive");
        clueText.classList.add("active");
    } 
    
}

function adjustPosition() {
    if (activeQuest!='None') {
        getLocation();
        let distanceText  = document.getElementById('distance');
        let dDistance = Math.round(geoDistance(currentPosition,activeQuest.Location));
        console.log(`Distance is ${dDistance}mts`)
        if (dDistance>100) {
            distanceText.innerHTML = '&gt;100mts';
        } else {
            distanceText.innerHTML = `${dDistance}mts`
        }
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    currentPosition.latitude    = position.coords.latitude;
    currentPosition.longitude   = position.coords.longitude;
    console.log(`latitude: ${currentPosition.latitude}, longitude: ${currentPosition.longitude}`);
}


function geoDistance(pos1,pos2){  // generally used geo measurement function
    // Load Positions in radians
    let lat1 = pos1.latitude* Math.PI / 180;
    let lat2 = pos2.latitude* Math.PI / 180;
    let lon1 = pos1.longitude* Math.PI / 180;
    let lon2 = pos2.longitude* Math.PI / 180;
    // Calculate distance
    const R = 6378.137; // Radius of earth in KM
    let eq1 = Math.pow(Math.sin((lat2-lat1)/2),2) + 
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.pow(Math.sin((lon2-lon1)/2),2);
    let eq2 = 2 * Math.atan2(Math.sqrt(eq1), Math.sqrt(1-eq1));
    let eq3 = R * eq2;
    return eq3 * 1000; // meters
}   
