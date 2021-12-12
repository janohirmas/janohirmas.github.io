// Other variables or constants
var currentPosition={};
var activeQuest = 'None';
// Quests
const Quest = [
    {
        id: 'home',
        Location: {latitude: 52.397076, longitude: 4.931854},
    }, 
    {
        id: 'yoga',
        Location: {latitude: 52.3915747, longitude: 4.9342416},
    },
    {
        id: 'bird',
        Location: {latitude: 52.384724, longitude: 4.93048},
    },
    {
        id: 'broers',
        Location: {latitude: 52.385614, longitude: 4.914406},
        Answer: '190',
    },
    {
        id: 'nachtegalen',
        Location: {latitude: 52.383925, longitude: 4.901745},
    },  
    {
        id: 'filmmuseum',
        Location: {latitude: 52.3755256, longitude: 4.8949212},
    },  
    {
        id: 'bartsmit',
        Location: {latitude: 52.373983, longitude: 4.891038},
    },  
    {
        id: 'alfajores',
        Location: {latitude: 52.381337, longitude: 4.891279},
    },  
    {
        id: 'fit4free',
        Location: {latitude: 52.384407, longitude: 4.886072},
    },  
    {
        id: 'dancing',
        Location:{latitude: 52.354655, longitude: 4.855231},
    },  
]
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

function whereAreYou() {
    let sAnswer = document.getElementById('pass-check').value;
    sAnswer = sAnswer.replace(/\s+/g, '').toLowerCase();
    console.log(sAnswer)
    let Result  = Quest.filter(d=>d['id']==sAnswer);
    if (Result.length==1) {
        url = `./stages/${Result[0].id}/index.html`
        console.log(url)
        window.location = url;
    }
}



function adjustPosition() {
    if (activeQuest!='None') {
        getLocation();
        document.getElementById('next-stop').classList.remove('inactive');
        let distanceText  = document.getElementById('distance');
        let dDistance = Math.round(geoDistance(currentPosition,activeQuest.Location));
        console.log(`Distance is ${dDistance}mts`)
        if (dDistance>1000) {
            let dKdist = Math.round(dDistance/100)/10;
            distanceText.innerHTML = `${dKdist}kms`
        } else if (dDistance>100) {
            distanceText.innerHTML = `${dDistance}mts`
        } else if (dDistance<=100) {
            distanceText.innerHTML = '&gt;100mts';
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
