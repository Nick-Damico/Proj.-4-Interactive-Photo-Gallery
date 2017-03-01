// INTERACTIVE PHOTO GALLERY
// AUTHOR: NICHOLAS D'AMICO NICKALAN82@ICLOUD.COM
// NICHOLASDAMICO.NET
// SEPT 21 2016

var photo = document.querySelectorAll(".photo");
var thumbnail = document.querySelectorAll(".thumbnail");
var searchBar = document.querySelector("#gallerySearch");
var cols = document.querySelectorAll(".col");

// MODAL SELECTORS
var lightBox = document.getElementById("lightBox");
var closeBtn = document.querySelector(".lightbox-close");
var lightboxImg = document.querySelector(".lightbox-photo");
var lightboxAbout = document.querySelector(".img-description");
var nextBtn = document.querySelector(".lightbox-next");
var prevBtn = document.querySelector(".lightbox-prev");

// GLOBAL VARIABLES
var counter = 0;
var cache = [];

//////////////////////////////////////////////////////
///////     FUNCTIONS
//////////////////////////////////////////////////////

// LIGHTBOX CLOSE
function close() {
    lightBox.style.visibility = "hidden";
}

// LIGHTBOX CHANGE TO NEXT PIC BTN.
function nextPic() {
    counter += 1;
    if (counter > photo.length - 1) {
        counter = 0;
    }
    modalDisplay(counter);
}

// LIGHTBOX CHANGE TO PREV PIC BTN.
function prevPic() {
    counter -= 1;
    if (counter < 0) {
        counter = photo.length - 1;
    }
    modalDisplay(counter);
}

// UPDATES LIGHTBOX IMG AND DESCRIPTION, CALL FROM prevPic() or nextPic();
function modalDisplay(num) {
    // UPDATE LIGHTBOX IMG SRC TAG FROM .PHOTO
    lightboxImg.setAttribute("src", photo[num].getAttribute("href"));
    // UPDATE LIGHTBOX CAPTION W/ ALT TAG OF .THUMBNAIL
    lightboxAbout.textContent = thumbnail[num].getAttribute("alt");
}

// FILTERS IMAGES BASED ON SEARCH BAR INPUT
function filter(search) {
    var liItem = '';
    for (var i = 0; i < cache.length; i++) {
        liItem = cols[i];
        // CACHE ARRAY TEXT : VALUE STORED.
        var queryText = cache[i].text;
        var queryTitle = cache[i].title;
        // QUERY VALUE indexOf FOR SearchBar value.
        // IF QUERY DOESN'T CONTAIN SEARCHBAR VALUE.
        // .col ELEMENT DISPLAYS NONE.
        // ELSE QUERY MATCHES SEARCHBAR VALUE.
        // .col ELEMENT DISPLAYED BLOCK, DEFAULT DISPLAY.
        if(queryText.indexOf(search) === -1 && queryTitle.indexOf(search) === -1 ) {
            // Velocity(liItem, "fadeOut", 700);
            Velocity(liItem, {opacity: 0}, 300);
        } else {
            // Velocity(liItem, "fadeIn", 700);
            Velocity(liItem, {opacity: 1}, 300);
        }
    }


}
//////////////////////////////////////////////////////
///////     END/OF FUNCTIONS
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
/////// 	EVENT HANDLERS
//////////////////////////////////////////////////////

// SEARCH BAR EVENT HANDLER ON KEYUP
searchBar.addEventListener("keyup", function() {
    filter(this.value.trim().toLowerCase());
});


// LOOP ADDS EVENT HANDLER "CLICK" TO img.thumbnails & a.photo.
(function() {
        for (var i = 0; i < photo.length; i++) {

        // ADD EVENT "CLICK"
        photo[i].addEventListener("click", function() {
            // PREVENTS A LINK FROM OPENING URL, STOP DEFAULT BEHAVIOR.
            event.preventDefault();
            // UPDATES LIGHTBOX IMG TO CLICKED IMAGE.
            elLightBoxImg.setAttribute("src", this.getAttribute("href"));
        });
        // CLICK OPENS LIGHTBOX MODAL.
        thumbnail[i].addEventListener("click", function() {
            // TURNS LIGHTBOX 'ON' WITH IMG 'CLICK'.
            lightBox.style.visibility = "visible";
            // UPDATES LIGHTBOX CAPTION TEXT FROM 'CLICKED' IMG [ATTR="ALT"]
            lightboxAbout.textContent = this.getAttribute("alt");
        });

        // BUILDS AN ARRAY OF OBJECTS FROM THE .PHOTO ELEMENTS.
        cache.push({
            element: thumbnail[i],
            text: thumbnail[i].getAttribute("alt").trim().toLowerCase(),
            title: thumbnail[i].getAttribute("title").toLowerCase()
        });

    }


}() );

// EVENT HANDLER FOR .closeBtn TURNS OFF LIGHTBOX.
closeBtn.addEventListener("click", close);

// EVENT "CLICK" ADDED CALLS PREVPIC() FUNCTION.
prevBtn.addEventListener("click", prevPic);

// EVENT "CLICK" ADDED CALLS NEXTPIC() FUNCTION.
nextBtn.addEventListener("click", nextPic);

// KEYDOWN OF LEFT, RIGHT, ESC KEYS
document.onkeydown = function() {
    switch (window.event.keyCode) {

        // LEFT ARROW
        case 37:
        prevPic();
        break;
        // RIGHT ARROW
        case 39:
        nextPic();
        break;
        // ESC KEY
        case 27:
        close();
        break;
    }
};



//////////////////////////////////////////////////////
/////// 	END/OF EVENT HANDLERS
//////////////////////////////////////////////////////




