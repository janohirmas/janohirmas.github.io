// CONSTANTS 
const lNonEssential = [
    "GoogleAnalytics",
    "GoogleAnalytics2",
];

// INITIALIZE 
document.addEventListener("DOMContentLoaded", function() {
    let cookieContainer = document.getElementsByClassName('cookie-container')[0];
    let AcceptButton = document.getElementById('cookies-all');
    let RejectButton = document.getElementById('cookies-essential');
    // Display cookie banner if not selected already
    setTimeout( () => {
        if (!localStorage.getItem('cookieBannerDisplayed')) {
            cookieContainer.classList.add('active');
        }
    }, 2000);
    // Highlight active page

    let sActive = document.getElementById("input-active").value;
    document.getElementById(`nav-${sActive}`).classList.add('active');
    // Remove Scripts if cookies already rejected
    removeScripts();
    mobileVersion((window.innerWidth<680));
    
});

// Response to resize
window.addEventListener('resize', ()=>{
    mobileVersion((window.innerWidth<680));
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// FUNCTIONS

function acceptCookies(bAll) {
    if (bAll) {
        localStorage.setItem('onlyEssentials','false');
    } else {
        localStorage.setItem('onlyEssentials','true');
        removeScripts()
    }
    removeBanner();
}

function mobileVersion(bMobile) {
    btnHeader = document.getElementById('header-btn') ;
    navHeader = document.getElementById('header-nav') ;
    divFooter = document.getElementById('footer');

    if (bMobile) {
        btnHeader.classList.remove('hidden');
        navHeader.classList.add('dropdown-content');  
    } else {
        btnHeader.classList.add('hidden');
        navHeader.classList.remove('dropdown-content');
    }
}
function removeScripts() {
    let lScripts = document.scripts;
    if (localStorage.getItem('onlyEssentials')) {
        for (let i=lScripts.length-1;i>=0; i+=-1) {
            if (lNonEssential.includes(lScripts[i].id)) {
                console.log(`Script ${lScripts[i].id} removed`);
                lScripts[i].parentElement.removeChild(lScripts[i]);
            };
        };
    };
};

function removeBanner() {
    let cookieContainer = document.getElementsByClassName('cookie-container')[0];
    cookieContainer.classList.remove('active');
    localStorage.setItem('cookieBannerDisplayed','true');
}


function dropdownHeader() {
    document.getElementById("header-nav").classList.toggle("show");
}

// Reduce abstract 

document.addEventListener("DOMContentLoaded", ()=>{
    const lAbs = document.getElementsByClassName("abstract-reduced")
    if (lAbs.length>0) {
        for (let i in lAbs) {
            let abs = lAbs[i]
            let id = abs.id;
            // find 100th word and separate text
            let innerHTML = abs.innerHTML.replace('<p>','').replace('<br>','').replace('</p>','').replace(/\s+/g, ' ').trim();
            let words = innerHTML.split(' ');
            innerHTML = innerHTML.split(words[100]);
            // add new html with dots in between 
            let newHTML = innerHTML[0] + words[100] + `<span id="dots-${id}"> ... </span> <span id="more-${id}">` + innerHTML.slice(1).join('') + '</span>';
            abs.innerHTML = newHTML;
            console.log(newHTML)
            // hide more section
            document.getElementById(`more-${id}`).style.display = 'none'
        }

    } else {
        console.log('no-abstracts')
    }
})
function displayAbstract(id) {
    var dots = document.getElementById(`dots-${id}`);
    var moreText = document.getElementById(`more-${id}`);
    var btnText = document.getElementById(`btn-${id}`);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }