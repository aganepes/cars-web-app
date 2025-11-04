import { ReactiveCardStore ,UploadingFileProgressAndPost,selectedViewElement} from './formCard.js';

const bottomUploadFileElement = document.querySelector('form .upload-progress');

export default function addEventToCards() {
    const zoomPreviewOpenBtns = document.querySelectorAll('.file-preview-thumbnails .file-footer-buttons .file-zoom');
    
    const cardRotateBtns = document.querySelectorAll('.file-thumbnail-footer .file-rotate');
    const cardRemoveBtns = document.querySelectorAll('.file-thumbnail-footer .file-remove');
    const cardRepeatBtns = document.querySelectorAll('.file-thumbnail-footer .error-uploading-repeat');
  
    const leftBtnZoom = document.querySelector('.zoom-content-container button.left');
    const rightBtnZoom = document.querySelector('.zoom-content-container button.right');
    const zoomPreviewCont = document.getElementById('zoom-container');

    // click zoom button of card that preview  to image of card 
    zoomPreviewOpenBtns?.forEach((button, index) => {
    button.addEventListener('click', () => {
        // show zoom container
        zoomPreviewCont.classList.add('preview');
        // not show scrool bar in body
        document.body.style.overflow = "hidden";
        // change  to img index of zoom container.
        zoomPreviewCont.setAttribute('data-fileindex', index);
        // change to scr of zoom img
        const imgSRC = document.querySelectorAll('.file-preview-frame .file-preview-image')[index].getAttribute('src');
        document.getElementById('zoom-preview-img').setAttribute('src', imgSRC);
      document.querySelector('.zoom-container .zoom-img-name').textContent = document.querySelectorAll('.file-preview-frame .file-footer-caption')[index].textContent;
        // disable all input requred elements
        disabledRequredInput();
        // set to file index  of zoom container of the left button and  the right  button.
        leftBtnZoom.setAttribute('data-left-index', index - 1);
        rightBtnZoom.setAttribute('data-right-index', index + 1);
        leftBtnZoom.disabled = false;
        rightBtnZoom.disabled = false;
        if (index == 0) {
          leftBtnZoom.disabled = true;
        }
        if (cardRotateBtns?.length - 1 == index) {
          rightBtnZoom.disabled = true;
        }
    });
    });
    // rotate button of card clicked .
    cardRotateBtns.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        const rotateImgElement = document.querySelectorAll('.file-preview-frame .file-preview-image')[i];
        const elementStyle = rotateImgElement.getAttribute('style');
        const newStyle = Rotate90(elementStyle);
        rotateImgElement.setAttribute('style', newStyle);
    });
    });
  // delete button
  cardRemoveBtns.forEach((el, i) => {
    el.addEventListener('click', () => {
      const cardElement = document.querySelectorAll('.file-preview-frame')[i];
      const id = cardElement?.id;
      if (cardElement.classList.contains('uploading-error')) {
        cardElement.remove();
        ReactiveCardStore.delete(id);

        bottomUploadFileElement.classList.remove('uploading-error');
        selectedViewElement.placeholder = `Faýl saýlaň ...`;
        selectedViewElement.setAttribute('title',"Faýl saýlanmady");


        if (!ReactiveCardStore.size) {
          // document.querySelector('form .file-preview-thumbnails').children.length
          document.querySelector('form .file-drop-zone').classList.remove('draging-file');
          document.querySelector('form .file-drop-zone').classList.add('no-file');
        }
        return;
      }
      // to send delete request
      const xhr = new XMLHttpRequest();
      xhr.open('delete', 'http://localhost:3000/upload');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = (e) => {
        if (xhr.status == 200) {
          cardElement.remove();
          ReactiveCardStore.delete(id);
          
          selectedViewElement.placeholder = `Faýl saýlaň ...`;
          selectedViewElement.setAttribute('title', "Faýl saýlanmady");
          
          if (!ReactiveCardStore.size) {
            // document.querySelector('form .file-preview-thumbnails').children.length
            document.querySelector('form .file-drop-zone').classList.remove('draging-file');
            document.querySelector('form .file-drop-zone').classList.add('no-file');
          }
        }
      }
      xhr.onerror = (e) => {
        alert("Error on server.");
      }
      xhr.send(JSON.stringify({ filename: id }));
    });
  });
  // to send file replace
  cardRepeatBtns.forEach((el, i) => {
    el.addEventListener('click', () => {
      const id = document.querySelectorAll('.file-preview-frame')[i].id;
      const cardData = ReactiveCardStore.get(id);

      UploadingFileProgressAndPost(cardData,{getLoadingProgressElement:` <span style="width:0%">Ýüklenýär...</span>`});
    })
  })
  
}
// disabled to input element
function disabledRequredInput() {
  document.querySelectorAll('.form-group .form-control').forEach(element => {
    if (element.ariaRequired == 'true') {
      element.required = false;
    }
  });
}
// enabled to it has required attribute of input elements.
export function enableRequredInput() {
  document.querySelectorAll('.form-group .form-control').forEach(element => {
    if (element.ariaRequired == 'true') {
      element.required = true;
    }
  });
}

/**
 * 
 * @param {String} elementStyle
 * @returns {String} new style as the rotate is 90deg
 */
export function Rotate90(elementStyle) {
    const preDeg = elementStyle.split('rotate(')[0];
    const sufDeg = elementStyle.split('rotate(')[1];
    let deg = parseInt(sufDeg.split('deg')[0]);
    deg += 90;
  return preDeg + 'rotate(' + deg + 'deg);';
}