// Add lightbox module to DOM
// Using DOM Manipulation Method

// Element References
var elBody = document.getElementsByTagName('body')[0];
var elscript = document.getElementsByTagName('script')[0];

// Build LightBox container div
var elLightBox = document.createElement('div');
// Append LightBox to <body>
elBody.insertBefore(elLightBox, elscript);
// Set id attribute
elLightBox.setAttribute('id', 'lightBox');
// Set class Attribute
elLightBox.setAttribute('class', 'lightbox-container');

// Build LightBox Content container
var elLightBoxContent = document.createElement('div');
// AppendChild to LightBox
elLightBox.appendChild(elLightBoxContent);
// Set class Attribute
elLightBoxContent.setAttribute('class', 'lightbox-content');

// Build LightBox img container
var elImgContainer = document.createElement('div');
// Append Child to LightBox Content
elLightBoxContent.appendChild(elImgContainer);
// Set class Attribute
elImgContainer.setAttribute('class', 'lightbox-img-container');

// Build img Element LightBox
var elLightBoxImg = document.createElement('img');
// Append img element to container
elImgContainer.appendChild(elLightBoxImg);
// Set class Attribute
elLightBoxImg.setAttribute('class', 'lightbox-photo');
// Set src Attribute
elLightBoxImg.setAttribute('src', '');
// Set alt Attribute
elLightBoxImg.setAttribute('alt', '');

// Build Next and Prev buttons for LightBox
var elNextBtn = document.createElement('button');
var elPrevBtn = document.createElement('button');
// Append Prev Btn to LightBox img container
elImgContainer.appendChild(elPrevBtn);
// Set class Attribute Prev Btn
elPrevBtn.setAttribute('class', 'lightbox-prev');
// Append Next Btn to LightBox img Container
elImgContainer.appendChild(elNextBtn);
// Set class Attribute Next Btn
elNextBtn.setAttribute('class', 'lightbox-next');

// Build img DESCRIPTION lightbox-close
var imgDescription = document.createElement('p');
// Append img to lightbox-close
elImgContainer.appendChild(imgDescription);
// Set class Attribute
imgDescription.setAttribute('class', 'img-description');

// Build Close Btn.
var elCloseBtn = document.createElement('button');
// Build Close Btn TEXT
var closeBtnSvg = document.createElement('img');
// Append Text to Close Btn
elCloseBtn.appendChild(closeBtnSvg);
// Set closeBtn Attribute src
closeBtnSvg.setAttribute('src', 'img/close-icon.svg');
//Append Close Btn to LIGHTBOX
elLightBox.appendChild(elCloseBtn);
// Set class Close Btn
elCloseBtn.setAttribute('class', 'lightbox-close');
