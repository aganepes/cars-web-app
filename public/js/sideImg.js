//get and change product side image
const productImagesContianer = document.getElementById('productImages');
const productLeftBtn=document.getElementById('imgSideLeft');
const productRightBtn = document.getElementById('imgSideRight');
const productImagesSideContainer = document.getElementById('SideContainerOfProductImgs');
const productImagesSideCloseBtn = document.getElementById('sideCloseSide');
const productImagesSideZoomBtn = document.getElementById('sideZoom');
const productImagesSideAnimationBtn = document.getElementById('sideAnimation');
const productImagesSideFullScreenBtn = document.getElementById('sideFullScreen');
const productImagesSideBackImgBtn = document.getElementById('backImgsBtn');
const productImagesSideForwardImgBtn = document.getElementById('forwardImgsBtn');
const imgElement = document.querySelector('#sideImg img.esasy-img');

// open and close side image container
productImagesContianer.addEventListener('click', (e) => {
    productImagesSideContainer.classList.toggle('not-show');

    if (!productImagesSideContainer.classList.contains('not-show')) {
        document.body.style = 'overflow: hidden;';
    } else {
        document.body.style = "";
    }
});
productImagesSideCloseBtn.addEventListener('click', () => {
    productImagesSideContainer.classList.add('not-show');
    document.body.style = "";
});
//! move side image container when touch move
let startX = 0;
let isDragging = false;
productImagesSideContainer.addEventListener('touchstart', (e) => {
    startX = e.clientX;
    isDragging = true;
});
productImagesSideContainer.addEventListener('touchstart', (e) => {
    let deltaX = e.clientX - startX;
    if (isDragging && deltaX>50) {
        funcRightButton();
    }else if (isDragging && deltaX<-50) {
        funcLeftButton();
    }
    console.log(deltaX);
});
// change image side container
const productImages = document.getElementById('productImages');
const config = { attributes: true };
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type == 'attributes') {

            const imgIndex = productImages.getAttribute('img-index');
            const imgs = productImages.querySelectorAll('img[data-src]');

            for (const img of imgs) {
                const index = img.getAttribute('data-index');
                if (imgIndex != index) {
                    img.classList.add('not-show');
                } else {
                    img.classList.add('not-show');

                    let yes = false;

                    if (!img.getAttribute('src')) {
                        img.setAttribute('src', img.dataset.src);
                        for (const element of document.querySelectorAll('.loading-img-container svg')) {
                            element.classList.remove('not-show');
                        }
                        
                        document.querySelector('.images .show-imgs').classList.add('not-show');
                        imgElement.classList.add('not-show');

                        img.addEventListener('load', () => {
                            // change loading with api
                            setTimeout(() => {
                                for (const element of document.querySelectorAll('.loading-img-container svg')) {
                                    element.classList.add('not-show');
                                }
                                yes = true;
                            }, 1000);
                        });
                        yes = true;
                    }

                    if (yes) {
                        setTimeout(() => {
                            document.querySelector('.images .show-imgs').classList.remove('not-show');
                        imgElement.classList.remove('not-show');

                            img.classList.remove('not-show');
                        }, 1000);
                    } else {
                        img.classList.remove('not-show');
                    }
                    
                    
                    imgElement.setAttribute('src', img.dataset.src);
                    productImagesSideContainer.querySelector('.imgs-info').textContent = `${Number(imgIndex)+1}/${imgs.length}`;
                }
            }
        }
    }
}

const observerProductImg = new MutationObserver(callback);
observerProductImg.observe(productImages, config);

const funcLeftButton = () => {
    const index = productImages.getAttribute('img-index');
    const imgCount = productImages.querySelectorAll('img[data-src]').length;
    if (Number(index) == 0) {
        productImages.setAttribute('img-index', imgCount - 1);
    } else {
        productImages.setAttribute('img-index', Number(index) - 1);
    }
}
const funcRightButton = () => {
    const index = productImages.getAttribute('img-index');
    const imgCount = productImages.querySelectorAll('img[data-src]').length;
    if (Number(index) == imgCount-1) {
        productImages.setAttribute('img-index', 0);
    } else {
        productImages.setAttribute('img-index', Number(index) + 1);
    }
}

productLeftBtn.addEventListener('click', () => {
    funcLeftButton();
});

productRightBtn.addEventListener('click', () => {
    funcRightButton();
});
// for side container

productImagesSideBackImgBtn.addEventListener('click', () => {
    funcLeftButton();
});

productImagesSideForwardImgBtn.addEventListener('click', () => {
    funcRightButton();
});

//  manipulation side image
let SideImgClick = false;

const funcSideImgClick = (e = null,scaleSize=1.5) => {
    const x = e?.offsetX;
    const y = e?.offsetY;
    
    if (!SideImgClick) {
        if (e) {
            imgElement.style.transformOrigin = `${x}px ${y}px`;

        } else {
            imgElement.style.transformOrigin = 'center center';
        }
        
        imgElement.style.transform =`scale(${scaleSize})`;
        imgElement.style.cursor = "zoom-out";
        
    } else {
        imgElement.style.cursor = "zoom-in";
        imgElement.style.transform = "";
    }
    SideImgClick=!SideImgClick;
}

productImagesSideZoomBtn.addEventListener('click', () => {
    funcSideImgClick();
});

// let clickTime = null;
// imgElement.addEventListener('click', (e) => {
//     clickTime = setTimeout(() => {
//         funcSideImgClick(e);
//     }, 300);
// });
imgElement.addEventListener('dblclick', (e) => {
    // clearTimeout(clickTime);
    funcSideImgClick(e, 2);
});

// funcRightButton();
let ClickedAnimaitonSideBtn = false;
let animationSideInterval = null;

productImagesSideAnimationBtn.addEventListener('click', () => {
    const svgElements = productImagesSideAnimationBtn.querySelectorAll('svg');

    if (!ClickedAnimaitonSideBtn) {
        svgElements[0].classList.add('not-show');
        svgElements[1].classList.remove('not-show');
        animationSideInterval= setInterval(() => {
            funcRightButton();
        },1000);
    } else {
        svgElements[0].classList.remove('not-show');
        svgElements[1].classList.add('not-show');
        clearInterval(animationSideInterval);
    }

    ClickedAnimaitonSideBtn = !ClickedAnimaitonSideBtn;
});

import { getBodyFullscreenMethods } from './unit/index.js';

let FullScreenBtnClicked = false;

productImagesSideFullScreenBtn.addEventListener('click', async (e) => {
    const methods = getBodyFullscreenMethods();
    if (!methods) {
      console.log("Your browser does not support the full-screen API or is not allowed");
      return;
    }
    if (!FullScreenBtnClicked) {
        await document.body[methods.request]();
    } else {
        document[methods.exit]();
    }
    FullScreenBtnClicked = !FullScreenBtnClicked;
});