// INTERACTIVE PHOTO GALLERY
// AUTHOR: NICHOLAS D'AMICO NICKALAN82@ICLOUD.COM
// NICHOLASDAMICO.NET
// SEPT 21 2016
// Updated April 4 2018

var photo = document.querySelectorAll(".photo");
var thumbnail = document.querySelectorAll(".thumbnail");
var searchBar = document.querySelector("#gallerySearch");
var cols = document.querySelectorAll(".col");

// MODAL SELECTORS
var lightBox = document.getElementById("lightBox");
var closeBtn = document.querySelector(".lightbox-close");
var lightboxImg = document.querySelector(".lightbox-photo");
var lightboxAbout = document.querySelector(".img-description");
var lightboxContent = document.querySelector(".lightbox-content");
var nextBtn = document.querySelector(".lightbox-next");
var prevBtn = document.querySelector(".lightbox-prev");

// GLOBAL VARIABLES
var counter = 0;
var photoArr = [];

//////////////////////////////////////////////////////
///////     FUNCTIONS
//////////////////////////////////////////////////////

// LIGHTBOX CLOSE
function close() {
  // lightBox.style.visibility = "hidden";
  Velocity(lightBox, "fadeOut", 800);
}

// LIGHTBOX CHANGE TO NEXT PIC BTN.
function nextPic() {
  if (counter === photoArr.length - 1) {
    counter = 0;
  } else {
    counter++;
  }

  while (!photoArr[counter].active) {
    counter++;
    if (counter === photo.length) {
      counter = 0;
    }
  }
  modalDisplay(photoArr[counter]);
}

// LIGHTBOX CHANGE TO PREV PIC BTN.
function prevPic() {
  if (counter === 0) {
    counter = photoArr.length - 1;
  } else {
    counter--;
  }

  while (!photoArr[counter].active) {
    counter--;
    if (counter <= 0) {
      counter = photoArr.length - 1;
    }
  }
  modalDisplay(photoArr[counter]);
}

// UPDATES LIGHTBOX IMG AND DESCRIPTION, CALL FROM prevPic() or nextPic();
function modalDisplay(photo) {
  // UPDATE LIGHTBOX IMG SRC TAG FROM .PHOTO
  lightboxImg.setAttribute("src", photo.src);
  // UPDATE LIGHTBOX CAPTION W/ ALT TAG OF .THUMBNAIL
  lightboxAbout.textContent = photo.text;
}

function filter(search) {
  var liItem = '';
  const wrapperEl = document.querySelector('.wrapper');
  for (var i = 0; i < photoArr.length; i++) {
    liItem = cols[i];
    // CACHE ARRAY TEXT : VALUE STORED.
    var queryText = photoArr[i].text;
    var queryTitle = photoArr[i].title;

    if (queryText.indexOf(search) >= 0 || queryTitle.indexOf(search) >= 0) {
      liItem.style.display = 'initial';
      photoArr[i].active = true;
    } else {
      liItem.style.display = 'none';
      photoArr[i].active = false;
    }
  }
}

function getPhotoId(photo) {
  let selectedPhoto = photoArr.filter(p =>
    p.title === photo.firstElementChild.title.toLowerCase());
  return selectedPhoto[0].id;
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
      counter = getPhotoId(this);
      // UPDATES LIGHTBOX IMG TO CLICKED IMAGE.
      elLightBoxImg.setAttribute(
        "src",
        this.firstElementChild.getAttribute('data-full-image')
      );
    });
    // CLICK OPENS LIGHTBOX MODAL.
    thumbnail[i].addEventListener("click", function() {
      // TURNS LIGHTBOX 'ON' WITH IMG 'CLICK'.
      lightBox.style.visibility = "visible";
      Velocity(lightBox, "fadeIn", 800);
      // UPDATES LIGHTBOX CAPTION TEXT FROM 'CLICKED' IMG [ATTR="ALT"]
      lightboxAbout.textContent = this.getAttribute("alt");

    });

    // BUILDS AN ARRAY OF OBJECTS FROM THE .PHOTO ELEMENTS.
    photoArr.push({
      id: i,
      src: thumbnail[i].getAttribute("data-full-image"),
      text: thumbnail[i].getAttribute("alt").trim().toLowerCase(),
      title: thumbnail[i].getAttribute("title").toLowerCase(),
      active: true
    });

  }


}());

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
