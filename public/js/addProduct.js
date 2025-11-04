import createProgress from './profilePage/formCard.js';
import { enableRequredInput } from './profilePage/formCardEvents.js';
import { Rotate90 } from './profilePage/formCardEvents.js'
import addEventToCards from './profilePage/formCardEvents.js'
import { ReactiveCardStore } from './profilePage/formCard.js';

const observerDragZone = new MutationObserver((mutations, observe) => {
  if (mutations[0].type == 'childList') {
    addEventToCards();
  }
});
observerDragZone.observe(document.querySelector('.file-preview-thumbnails'), { childList: true });


// zoom container.
const zoomPreviewCont = document.getElementById('zoom-container');

// click close button of card.
const zoomPreviewCloseBtn = document.getElementById('zoom-close-btn');
zoomPreviewCloseBtn.addEventListener('click', () => {
  // not show zoom container
  zoomPreviewCont.classList.remove('preview');
  // show scrool bar in body
  document.body.style.overflow = "auto";
  // enable all input elements requred elements
  enableRequredInput();
});
// rotate button of zoom container.
const RotateBtnOfZoom = document.getElementById('zoom-img-rotate');
RotateBtnOfZoom.addEventListener('click', (event) => {
  const zoomImgElement = document.getElementById('zoom-preview-img');
  const imgIndex = zoomPreviewCont.getAttribute('data-fileindex');
  const cardImgElement = document.querySelectorAll('.file-preview-frame .file-preview-image')[imgIndex];
  
  const newStyle = Rotate90(zoomImgElement.getAttribute('style'));
  // change to style of card img and zoom-preview img .
  zoomImgElement.setAttribute('style', newStyle);
  cardImgElement.setAttribute('style', newStyle);
});
//change to class of zoom content container. 
const FullImgBtnOfZoom = document.getElementById('zoom-img-full');
const FullBrowserBtnOfZoom = document.getElementById('zoom-browser-full');
const FullElementBtnOfZoom = document.getElementById('zoom-element-full');
// full image button to clicked
FullImgBtnOfZoom.addEventListener('click', (e) => {
  document.querySelector('.zoom-content-container').classList.toggle('img-full');
  FullImgBtnOfZoom.classList.toggle('active');
});
// full element button to clicked
FullElementBtnOfZoom.addEventListener('click', (e) => {
  document.querySelector('.zoom-content-container').classList.toggle('element-full');
  FullElementBtnOfZoom.classList.toggle('active');
})
// full screen button to clicked
import {getBodyFullscreenMethods} from './unit/index.js'
FullBrowserBtnOfZoom.addEventListener('click', async (e) => {
  const methods = getBodyFullscreenMethods();
  if (!methods) {
    console.log("Your browser does not support the full-screen API or is not allowed");
    return;
  }
  if (FullBrowserBtnOfZoom.classList.contains('active')) {
    FullBrowserBtnOfZoom.classList.remove('active');
    document[methods.exit]();
  } else {
    FullBrowserBtnOfZoom.classList.add('active');
    await document.body[methods.request]();
  }
});



const imgZoom = document.getElementById('zoom-preview-img');
const imgNameZoom = document.querySelector('.zoom-container .zoom-img-name');
const leftBtnZoom = document.querySelector('.zoom-content-container button.left');
const rightBtnZoom = document.querySelector('.zoom-content-container button.right');
// left button of zoom container.
leftBtnZoom.addEventListener('click', (e) => {
  const imgElements = document.querySelectorAll('.file-preview-frame .file-preview-image');
  const imgNameElements = document.querySelectorAll('.file-preview-frame .file-footer-caption');
  const nextImgIndex = leftBtnZoom.getAttribute('data-left-index');

  if (nextImgIndex == -1) {
    return;
  }
  // change to data
  imgZoom.src = imgElements[nextImgIndex].src;
  imgNameZoom.textContent = imgNameElements[nextImgIndex].textContent;
  leftBtnZoom.disabled = false;
  leftBtnZoom.setAttribute('data-left-index', Number(nextImgIndex)-1);
  
  if (nextImgIndex == 0) {
    leftBtnZoom.disabled = true;
  }
  // right button
  rightBtnZoom.setAttribute('data-right-index', Number(nextImgIndex)+1);
  rightBtnZoom.disabled = false;
  if (nextImgIndex==imgElements.length-1) {
    rightBtnZoom.disabled = true;
  }
  
});
// right button of zoom container.
rightBtnZoom.addEventListener('click', (e) => {
  const imgElements = document.querySelectorAll('.file-preview-frame .file-preview-image');
  const imgNameElements = document.querySelectorAll('.file-preview-frame .file-footer-caption');
  const nextImgIndex = rightBtnZoom.getAttribute('data-right-index');

  if (nextImgIndex == imgElements.length) {
    return;
  }
  // change to data
  imgZoom.src = imgElements[nextImgIndex].src;
  imgNameZoom.textContent = imgNameElements[nextImgIndex].textContent;
  rightBtnZoom.disabled = false;
  rightBtnZoom.setAttribute('data-right-index', Number(nextImgIndex)+1);
  
  if (nextImgIndex == imgElements.length-1) {
    rightBtnZoom.disabled = true;
  }
  // left button
  leftBtnZoom.setAttribute('data-left-index', Number(nextImgIndex)-1);
  leftBtnZoom.disabled = false;
  if (nextImgIndex==0) {
    leftBtnZoom.disabled = true;
  }
});

// add cards to zoom zone and file to send to backend .

// click file input. That get data of image and create to prosses of reading image.
const cardContainer = document.querySelector('.file-preview-thumbnails');
const productImages = document.getElementById('productImages');
const zoomContainerElement = document.querySelector('.file-preview .file-drop-zone');

// dragover file to zoom container.
zoomContainerElement.addEventListener('dragover', (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove('no-file');
  e.target.classList.add('draging-file');
});
// dragleave file to zoom container.
zoomContainerElement.addEventListener('dragleave', (e) => {
  e.target.classList.remove('draging-file');
  if(cardContainer.children.length)
    e.target.classList.remove('no-file');
  else e.target.classList.add('no-file');
})
//drop to been zoom container
zoomContainerElement.addEventListener('drop', async (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.remove('draging-file');
  if(!e.dataTransfer.files.length) {
    e.target.classList.add('no-file');
    return;
  }
  await createProgress(e.dataTransfer.files);
});
// click to file input
productImages.addEventListener('click', (e) => {
  zoomContainerElement.classList.remove('no-file');
  zoomContainerElement.querySelector('.file-preview-status').style.display = "flex";
});
productImages.addEventListener('change', async (e) => {
  zoomContainerElement.querySelector('.file-preview-status').style.display = "none";
  zoomContainerElement.classList.remove('draging-file');
  if (!e.target.files.length && !zoomContainerElement.children.length) {
    zoomContainerElement.classList.add('no-file');
    return;
  }
  zoomContainerElement.classList.remove('no-file');
  await createProgress(e.target.files);
});



const zonaContainer = document.querySelector('.form-group .file-preview');

document.querySelector('.saved-btn').addEventListener('click', (e) => {
  const formData = new FormData(form);
  
  for (const [key, value] of formData.entries()) {
    const formControl = document.querySelector(`form .form-control[name="${key}"]`);

     if ((formControl?.getAttribute('aria-required') == 'true'||key == 'imageIdCount') && (!value || value=='0')) {
      if (key == 'imageIdCount') {
        zonaContainer.classList.add('error');
        console.log(zonaContainer)
      } else {
        formControl.classList.add('error');
      }

      formControl?.addEventListener('change', () => {
        if (!formControl.getAttribute('value')) {
          if(key == 'imageIdCount') zonaContainer.classList.add('error');
          else formControl.classList.add('error');
        } else {
          if(key == 'imageIdCount') zonaContainer.classList.remove('error');
          else formControl.classList.remove('error');
        }
      });

    }
  }
});


const form = document.getElementById('add-part-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {};

  const formData = new FormData(form);
  
  for (const [key, value] of formData.entries()) {
    if (key != 'file') {
      data[key] = value;
    }
  }

  let fileIndex = 0;
  for (const [key, value] of ReactiveCardStore.entries()) {
    if (value.uploadingStatus == 'upload') {
      data[`filename_${fileIndex}`] = value.responseImgUrl;
      fileIndex++;
    }
  }
  fetch('http://localhost:3000/addPart', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type':"application/json",
    }
  })
    .catch((e) => {
      alert('Error on server');
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      alert('Good!');
    });

})

