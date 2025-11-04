const CategoryButtons = document.querySelectorAll('.posts-cont .categories-tab-contianers .category-button')
const CategoryContents=document.querySelectorAll('.posts-cont .card-container')
CategoryButtons.forEach((element,i,elements)=>{
    
    element.addEventListener('click',(e)=>{
        elements.forEach((el)=>el.classList.remove('active'))
        CategoryContents.forEach(el=>el.classList.remove('active'))
        if (i != 6) {
            CategoryContents[i].classList.add('active');
            element.classList.add('active');
        }else {
            element.classList.add('active');
            CategoryContents.forEach((el,i) => {if(i!=0) el.classList.add('active')});
        }
    })
})
const AllSwiperSlide=document.querySelectorAll('.swiper-wrapper .swiper-slide');
AllSwiperSlide.forEach(slide=>{
    slide;
})


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    allowTouchMove: true,
    centeredSlides: true,
    loop: true,
    speed: 3000,
    autoplay: { 
      delay: 0, 
      pauseOnMouseEnter:true,
    },
    breakpoints: {
      400: {
        slidesPerView: 2,
      },
      680: { 
        slidesPerView: 3, 
      },
      960: { 
        slidesPerView: 4, 
      }
    }
});