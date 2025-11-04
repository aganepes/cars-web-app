import addEventToCards from './formCardEvents.js';

export const cardContainer = document.querySelector('.file-preview-thumbnails');
export const MainUploadProgress = document.querySelector('.file-input .upload-progress');
export const selectedViewElement = document.querySelector('form .file-caption-name');
/**
 * @param {{src:String,filename:String,
 *          loadSpeed:Number,size:Number,
 *          loadingProgress:Number}} cardData
 * @returns {string} html of card.
 */
function createCard(cardData) {
    const { filename, cardId, loadSpeed, sizeKb, getImageElement, getLoadingProgressElement } = cardData;

    return `<div class="file-preview-frame uploading" id="${cardId}"
              data-fileid="${cardId}" data-filename="${filename}">
              <div class="file-preview-uploading-status">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                      <path
                          d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
                  </svg>
              </div>
              <div class="file-content">
                ${getImageElement}
              </div>
              <div class="file-thumbnail-footer">
                  <div class="file-footer-caption" title="${filename}">
                      <div class="file-caption-info">${filename}</div>
                      <div class="file-size-info"> <samp>(${sizeKb}KB)</samp></div>
                  </div>
                  <div class="file-thumb-progress">
                      <div class="progress">
                          <div class="progress-bar" role="progressbar">
                          ${getLoadingProgressElement}
                          </div>
                          <div class="progress-time" role="progressbar">
                          Faýlyň ýüklenme tizligi (${loadSpeed} kb/s)
                        </div>
                      </div>
                  </div>
                  <div class="file-actions-conatiner">
                      <div class="file-upload-indicator">
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                              fill="#e3e3e3">
                              <path
                                  d="M480-520q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                              fill="#e3e3e3">
                              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                              fill="#e3e3e3">
                              <path d="M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z" />
                          </svg>
                      </div>
                      <div class="file-actions">
                          <div class="file-footer-buttons">
                              <button type="button" class="file-rotate" title="Suraty 90 gradus öwür">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                                      fill="#e3e3e3">
                                      <path
                                          d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" />
                                  </svg>
                              </button>
                              <button type="button" class="error-uploading-repeat" title="Täzeden ýükle">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                      fill="#e3e3e3">
                                      <path
                                          d="M440-160H260q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520v-286l64 62 56-56-160-160-160 160 56 56 64-62v286Z" />
                                  </svg>
                              </button>
                              <button type="button" class="file-remove" title="Faýly boz">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                                      fill="#e3e3e3">
                                      <path
                                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                  </svg>
                              </button>
                              <button type="button" class="file-zoom" title="Golaýlaşdyr">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                                      fill="#e3e3e3">
                                      <path
                                          d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Zm-40-60v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
                                  </svg>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>                                                                
          </div>`
}

/**
 * @param {{src:String,
 *          filename:String,cardId:string,
 *          loadSpeed:String,size:Number,sizeKb:Number,
 *          loadingProgress:Number,getImageElement:String|HTMLElement,
 *          getLoadingProgressElement:String,
 *          startTime: Number,lastTime: Number,lastLoaded:Number}} initialCardData 
 * @returns {ProxyConstructor}
 */
const createReactiveCard = (initialCardData) => {
    const handler = {
        set(target, property, value, receiver) {
            if (target[property] == value) {
                return true;
            }

            const result = Reflect.set(target, property, value, receiver);

            if (property == 'src' || property == 'filename') {
                target.getImageElement = `<img src="${target.src}" class="file-preview-image preview-data" title="${target.filename}" alt="${target.filename}" style="image-orientation: from-image; transform: rotate(0deg);">`;
                // updating  DOM
                document.getElementById(`${target.cardId}`).querySelector(`.file-content`).innerHTML = target.getImageElement;
            }
            if (property == 'loadingProgress') {
                target["getLoadingProgressElement"] = target.loadingProgress < 100 ? `<span style="width:${target.loadingProgress}%">${target.loadingProgress}% </span>` : `<span style="width:100%">Ýüklendi</span>`;
                // updating DOM
                document.getElementById(`${target.cardId}`).querySelector(`.progress-bar`).innerHTML = target.getLoadingProgressElement;
                MainUploadProgress.querySelector(`.progress-bar`).innerHTML = target.getLoadingProgressElement;
            }
            if (property == 'loadSpeed') {
                document.getElementById(`${target.cardId}`).querySelector('.progress-time').textContent = target.loadSpeed;
                MainUploadProgress.querySelector('.progress-time').textContent = target.loadSpeed;
            }
            if (target.file.type.startsWith('video/')) {
                document.getElementById(`${target.cardId}`).querySelector(`.file-zoom`).disabled = true;
                document.getElementById(`${target.cardId}`).querySelector(`.file-rotate`).disabled = true;
            }
            return result;
        }
    };

    const cardProxy = new Proxy(initialCardData, handler);
    return cardProxy;
}


export const ReactiveCardStore = new Map();
/**
 * create to card element
 * @param {File[]} ImgFiles
*/
export default async function createProgress(ImgFiles) {
    const errorTitleElement = document.querySelector('#productImagesLabel .image-count-error');
    errorTitleElement.textContent = ``;
    if (!ImgFiles) return;
    
    for (const i in ImgFiles) {
        if (i == 5) {
            errorTitleElement.textContent = `Siziň saýlan file sany çäkden geçdiň.(Başkylar alynýar.)`;
            return;
        }
        const file = ImgFiles[i];
        if (typeof file == 'number') return;
        if (typeof file !=='number' && !file?.type?.startsWith('image/') && !file?.type?.startsWith('video/')) {
            errorTitleElement.textContent = `Sen surat faýl saýlamadyň.`;
            return;
        }
        if (file.size >= 3e7) {
            errorTitleElement.textContent = `Siziň saýlan faýlyňyz ${(file.size / (1024 * 1024)).toFixed(2)}MB (çäk möçber 30MB).`
            return;
        }
        let successfulFileNumbers = 1;
        for (const element of cardContainer.getElementsByClassName('file-preview-frame')) {
            if (!element.classList.contains('uploading') || !element.classList.contains('uploading-erro')) {
                successfulFileNumbers++;
            }
        }
        const maxCountFile=document.getElementById('imageIdCount').getAttribute('max')
        if (successfulFileNumbers > Number(maxCountFile)) {
            errorTitleElement.textContent = `Siziň saýlan alan umumt file sanyňyz çäkden geçdiň.`;
            return ;
        }
        addEventToCards();
        errorTitleElement.textContent = ``;

        const cardId = `${Date.now()}-${i}_${file.size}_${file.name}`;
        const extFile = file.type.startsWith('image/') ? 'image' : 'video';

        const initialCardData = {
            getImageElement: `<img src="public/icons/notFormImg.svg" class="file-preview-image preview-data" title="${file.name}" alt="${file.name}" style="image-orientation: from-image; transform: rotate(0deg);">`,
            getLoadingProgressElement:`<span style="width:0%">Ýüklenýär...</span>`,
            src: 'public/icons/notFormImg.svg',
            cardId,
            file,
            filename: file.name,
            size: file.size,
            sizeKb:(file.size / 1024).toFixed(2),
            loadSpeed: 0,
            loadingProgress: 0,
            lastTime: 0,
            lastLoaded: 0,
            uploadingStatus: 'uploading',
            responseImgUrl:'',
        }
        const reactiveCardData = createReactiveCard(initialCardData);
        cardContainer.insertAdjacentHTML('beforeend', createCard(reactiveCardData));

        ReactiveCardStore.set(cardId, reactiveCardData);
        // file read . 
        const reader = new FileReader();
        reader.onload = (e) => {
            reactiveCardData.src = extFile == 'image' ? e.target.result: reactiveCardData.src;
        }
        reader.readAsDataURL(file);
        // file listen events. 
        UploadingFileProgressAndPost(reactiveCardData, MainUploadProgress, initialCardData);
    }
}
/**
 * 
 * @param {ProxyConstructor} reactiveCardData 
 * @param {HTMLElement} MainUploadProgress 
 * @param {Object} initialCardData ; This object has property on "getLoadingProgressElement": `<span style="width:0%">Ýüklenýär...</span>` 
 */ 
export const UploadingFileProgressAndPost = (reactiveCardData,initialCardData) => {
    MainUploadProgress.querySelector(`.progress-bar`).innerHTML = initialCardData.getLoadingProgressElement;
    selectedViewElement.setAttribute('title', reactiveCardData.filename || "Faýl saýlanmady");

    const createdCard = document.getElementById(`${reactiveCardData.cardId}`);

    const formData = new FormData();
    formData.append('file', reactiveCardData.file,reactiveCardData.cardId);

    const xhr =new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/upload');

    
    xhr.onerror=() =>{
        selectedViewElement.placeholder = `${reactiveCardData?.filename} faýl ýükmenmedi`;
        console.log('men')
        
    }

    xhr.upload.addEventListener('loadstart', (e) => {
        reactiveCardData.lastTime = Date.now();
        reactiveCardData.lastLoaded = 0;
        createdCard.classList.remove('uploading');
        createdCard.classList.remove('uploading-error');
        MainUploadProgress.classList.remove('uploading-error');
        MainUploadProgress.classList.add('uploading');
        reactiveCardData.uploadingStatus = "uploading";
        selectedViewElement.placeholder = `${reactiveCardData?.filename} faýl ýüklenýär`;

    });

    xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const currentTime = Date.now();
            const timeElapsed = currentTime - reactiveCardData.lastTime;
            const loadedSinceLast = event.loaded - reactiveCardData.lastLoaded; 
            if (timeElapsed > 0) {
                const loadSpeed = ((loadedSinceLast / timeElapsed) / 1000).toFixed(2);
                const loadSpeedText = loadSpeed <= 1024 ? `Faýlyň ýüklenme tizligi (${loadSpeed} kb/s)`
                    : `Faýlyň ýüklenme tizligi (${(loadSpeed / 1024).toFixed(2)} Mb/s)`;
                reactiveCardData.loadSpeed = loadSpeedText;
            }
            reactiveCardData.loadingProgress = ((event.loaded / event.total) * 100).toFixed(0);

            reactiveCardData.lastTime = currentTime;
            reactiveCardData.lastLoaded = event.loaded;
        }
    });

    xhr.upload.addEventListener('loadend', (event) => {
        if (event.lengthComputable) {
            const currentTime = Date.now();
            const timeElapsed = currentTime - reactiveCardData.lastTime;
            const loadedSinceLast = event.loaded - reactiveCardData.lastLoaded;
            if (timeElapsed > 0) {
                const loadSpeed = ((loadedSinceLast / timeElapsed) / 1000).toFixed(2);
                const loadSpeedText = loadSpeed <= 1024 ? `Faýlyň ýüklenme tizligi (${loadSpeed} kb/s)`
                    : `Faýlyň ýüklenme tizligi (${(loadSpeed / 1024).toFixed(2)} Mb/s)`;
                reactiveCardData.loadSpeed = loadSpeedText;
            }
            reactiveCardData.loadingProgress = 100;
        }
    });

    xhr.upload.addEventListener('error', () => {
        selectedViewElement.placeholder = `${reactiveCardData?.filename} faýl ýükmenmedi`;

        createdCard.classList.remove('uploading');
        if (!createdCard.classList.contains("uploading-error"));
            createdCard.classList.add('uploading-error');
        
        MainUploadProgress.classList.remove('uploading'); 
        if (!MainUploadProgress.classList.contains("uploading-error"));
            MainUploadProgress.classList.add('uploading-error');
        reactiveCardData.loadSpeed = 0;
        reactiveCardData.loadingProgress = 0;
        reactiveCardData.uploadingStatus = "uploading-error";
    });

    xhr.onload=function (e) {
        if (xhr.status == 200) {
            reactiveCardData.responseImgUrl = JSON.parse(e.target.response)?.img;


            const imgCountInput = document.getElementById('imageIdCount');
            const count = Number(imgCountInput.getAttribute('value'));
            imgCountInput.setAttribute('value', count+1);
            selectedViewElement.placeholder = `Saýlanan faýl sany ${count + 1}`;

            document.querySelector('form .file-preview').classList.remove('error');
            MainUploadProgress.classList.remove('uploading');
            MainUploadProgress.classList.remove('uploading-error');
            reactiveCardData.uploadingStatus = "upload";

        } else {
            alert(`${file.name} ýüklendi we serwerde ýalňyşlyk ýüze çykdy.`);
            selectedViewElement.placeholder = `${reactiveCardData?.filename} faýl ýükmenmedi`;

            createdCard.classList.remove('uploading');
            if (!createdCard.classList.contains("uploading-error"));
                createdCard.classList.add('uploading-error');
            
            MainUploadProgress.classList.remove('uploading');
            if (!MainUploadProgress.classList.contains("uploading-error"));
                MainUploadProgress.classList.add('uploading-error');
            reactiveCardData.uploadingStatus = "uploading-error";
        }
    }
    xhr.send(formData);
}