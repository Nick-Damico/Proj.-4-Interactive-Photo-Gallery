// INTERACTIVE PHOTO GALLERY
// AUTHOR: NICHOLAS D'AMICO NICKALAN82@ICLOUD.COM
// NICHOLASDAMICO.NET
// SEPT 21 2016

console.log("start");
var photo = document.querySelectorAll(".photo");
var thumbnail = document.querySelectorAll(".thumbnail");
var searchBar = document.querySelector("#gallerySearch");
var cols = document.querySelectorAll(".col");

// MODAL CONSTRUCT
var lightBox = document.getElementById("lightBox");
var closeBtn = document.querySelector(".modal-close");
var modalImage = document.querySelector(".modal-photo");
var modalAbout = document.querySelector(".modal-description");
var nextBtn = document.querySelector(".modal-next");
var prevBtn = document.querySelector(".modal-prev");

// GLOBAL VARIABLES
var counter = 0;
var cache = [];

//////////////////////////////////////////////////////
/////// 	EVENT HANDLERS
//////////////////////////////////////////////////////

// SEARCH BAR EVENT HANDLER ON KEYUP
searchBar.addEventListener("keyup", function() {
    filter(this.value.trim().toLowerCase());
});

// LOOP ADDS EVENT HANDLER "CLICK" TO img.thumbnails & a.photo.
for (var i = 0; i < photo.length; i++) {

    // ADD EVENT "CLICK"
    photo[i].addEventListener("click", function(event, i) {
        // PREVENTS A LINK FROM OPENING URL, STOP DEFAULT BEHAVIOR.
        event.preventDefault();
        // UPDATES LIGHTBOX IMG TO CLICKED IMAGE.
        modalImage.setAttribute("src", this.getAttribute("href"));
    });
    // CLICK OPENS LIGHTBOX MODAL.
    thumbnail[i].addEventListener("click", function() {
        // TURNS LIGHTBOX 'ON' WITH IMG 'CLICK'.
        lightBox.style.visibility = "visible";
        // UPDATES LIGHTBOX CAPTION TEXT FROM 'CLICKED' IMG [ATTR="ALT"]
        modalAbout.textContent = this.getAttribute("alt");
    });

    // BUILDS AN ARRAY OF OBJECTS FROM THE .PHOTO ELEMENTS.
    cache.push({
        element: thumbnail[i],
        text: thumbnail[i].getAttribute("alt").trim().toLowerCase()
    });

}

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



//////////////////////////////////////////////////////
/////// 	FUNCTIONS
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
    modalImage.setAttribute("src", photo[num].getAttribute("href"));
    // UPDATE LIGHTBOX CAPTION W/ ALT TAG OF .THUMBNAIL
    modalAbout.textContent = thumbnail[num].getAttribute("alt");
}

// FILTERS IMAGES BASED ON SEARCH BAR INPUT
function filter(search) {
    for (var i = 0; i < cache.length; i++) {
        // CACHE ARRAY TEXT : VALUE STORED.
        var query = cache[i].text;
        // QUERY VALUE indexOf FOR SearchBar value.
        // IF QUERY DOESN'T CONTAIN SEARCHBAR VALUE.
        // .col ELEMENT DISPLAYS NONE.
        // ELSE QUERY MATCHES SEARCHBAR VALUE.
        // .col ELEMENT DISPLAYED BLOCK, DEFAULT DISPLAY.
        query.indexOf(search) === -1 ? cols[i].classList.add("hide") : cols[i].classList.remove("hide");
    }


}

//////////////////////////////////////////////////////
/////// 	END/OF FUNCTIONS
//////////////////////////////////////////////////////
