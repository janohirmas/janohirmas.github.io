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

