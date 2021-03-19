(function glob(){

const page2016 = document.querySelector(".page-2016"),
page2009 = document.querySelector(".page-2009"),
page1988 = document.querySelector(".page-1988"),
slider = document.querySelector(".third-slide__slider"),
mainContainer = document.querySelector(".main-container"),
firstSlide = document.querySelector(".first-slide"),
secondSlide = document.querySelector(".second-slide"),
thirdSlide = document.querySelector(".third-slide");

const navNodeList = document.querySelectorAll(".main-container__circle");

// задаю дефолтные значения навигационну кружку и нижней панели слайдов
page1988.classList.add('not-active-on-left');
page2009.classList.add('not-active-on-left');
page2016.classList.add('active');
navNodeList[0].style.backgroundColor = "#f78b1f";

function setActiveSlider(){// ф-я задающая цвет "заполненной" стороне слайдера
    let procentActive = slider.value / 10;
    procentActive >= 80 ? procentActive = slider.value / 10 - 3 : procentActive = slider.value / 10;
    slider.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0) 0% 1.5%, rgb(209,234,255)1.5% ${procentActive}%,rgba(209,234,255, .3) ${procentActive}% 98.5%,  rgba(0, 0, 0, 0) 98.5% 100%)`;
};

// ф-я изменений слайдера (пролистывание страниц нижней презентации и заполнение активного слайдера)
slider.addEventListener('input', () => {
    if( slider.value < 260 ){

        page1988.classList.add('active');
        page1988.classList.remove('not-active-on-left');
        page2009.classList.remove('active');
        page2009.classList.add('not-active-on-right');
        page2009.classList.remove('not-active-on-left');
        page2016.classList.remove('active');
        page2016.classList.add('not-active-on-right');

    } else if ( slider.value >= 260 && slider.value <= 740 ){

        page1988.classList.add('not-active-on-left');
        page1988.classList.remove('active');
        page2009.classList.remove('not-active-on-left');
        page2009.classList.remove('not-active-on-right');
        page2009.classList.add('active');
        page2016.classList.add('not-active-on-right');
        page2016.classList.remove('active');

    } else if ( slider.value > 740 ){

        page2009.classList.add('not-active-on-left');
        page2009.classList.remove('active');
        page2016.classList.add('active');
        page2016.classList.remove('not-active-on-right');
        page1988.classList.remove('active');
        page1988.classList.add('not-active-on-left');
        
    }
    
    setActiveSlider();
    
})

// плавное возвращение пальца слайдера через setInterval
function animateSlider( elem, first, last ){ 
    let step = (last - first ) / 20;
        
    let start = Date.now();
    let timer = setInterval(function() {
    let timePassed = Date.now() - start;

            
    elem.value = +elem.value + step;
    setActiveSlider();

    if (timePassed >= 100) clearInterval(timer);

}, 5);}  

  
       
      

slider.addEventListener('change', () => {
    if( slider.value < 260 ){
        
        animateSlider( slider, slider.value, 0 )
        
    } else if ( slider.value >= 260 && slider.value <= 740 ){
        
            animateSlider( slider, slider.value, 500 )
        
    } else if ( slider.value > 740 ){
        
        animateSlider( slider, slider.value, 1000 )
        
    }
})





//плавное изменение положения страницы и изменение цвета навигационных шариков
function animatePage( coordPage, targetSlide ){ 
    let step = (768 + coordPage) / 40;
    
    let start = Date.now();
    let timer = setInterval( function() {
        let timePassed = Date.now() - start;

        window.scrollBy( 0 , step )
        
        if (timePassed >= 200){
        clearInterval( timer )
        targetSlide.scrollIntoView( false )};
        
    }, 5);

    if( targetSlide === firstSlide ){

        navNodeList[0].style.backgroundColor = "#f78b1f";
        navNodeList[1].style.backgroundColor = "#fff";
        navNodeList[2].style.backgroundColor = "#fff";
    }else if( targetSlide === secondSlide ){

        navNodeList[0].style.backgroundColor = "#fff";
        navNodeList[1].style.backgroundColor = "#f78b1f";
        navNodeList[2].style.backgroundColor = "#fff";
    }else if( targetSlide === thirdSlide ){

        navNodeList[0].style.backgroundColor = "#fff";
        navNodeList[1].style.backgroundColor = "#fff";
        navNodeList[2].style.backgroundColor = "#f78b1f";
    }
 
} 
// сбрасываю дефолтное поведение для избегания "побочного" действия при перелистывании страниц
firstSlide.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, false)
secondSlide.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, false)
thirdSlide.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, false)

// функция пролистывания слайдов
function SlideScroll(startPage, targetPage, correctCoord){
    let firstTouch;
    let finishTouch;
    let coordPage;
    
        startPage.addEventListener('touchstart', (event) =>{
            firstTouch = event.changedTouches[0].clientY;      // начальные координаты нажатия
        })

        startPage.addEventListener('touchend', (event) =>{
            finishTouch = event.changedTouches[0].clientY; // конечные координаты
            coordPage = mainContainer.getBoundingClientRect().top + correctCoord;// расстояние от верхнего края при дефолтном действии touchmove
            
            if( firstTouch > finishTouch && startPage === firstSlide ) {
                
                animatePage( coordPage, targetPage );

            } else if( firstTouch < finishTouch && startPage === thirdSlide && event.target !== document.querySelector(".third-slide__slider") ){
               
                animatePage( coordPage, targetPage );

            } else if( startPage === secondSlide ){

                if( firstTouch > finishTouch ){

                    animatePage( coordPage , targetPage );

                } else if( firstTouch < finishTouch ){

                    animatePage( coordPage - 1534 , firstSlide );

                }
            }
            
                
        })    
    
};
SlideScroll(firstSlide, secondSlide, 0 );
SlideScroll(secondSlide, thirdSlide, 768 );
SlideScroll(thirdSlide, secondSlide, 0);

})()