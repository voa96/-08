const recommended_equipment = document.querySelector(".recommended_equipment");
const min_equipment = document.querySelector(".min_equipment");

const CloseModalBtn = document.querySelector(".close_modal_win")
const ModalWinMain = document.querySelector(".modal_win_wrapper")
const ModalWin = document.querySelector(".modal_win")

const recPrice = document.querySelectorAll(".rec")
const minPrice = document.querySelectorAll(".min")

recommended_equipment.addEventListener("click",switchmax)
min_equipment.addEventListener("click",switchmin)
 

function switchmin(){
    setTimeout(() => {
        document.querySelector(".img_choice_min").style.opacity = "1"
        document.querySelector(".img_choice_rec").style.opacity = "0"
    },100)
    
}
function switchmax(){
    setTimeout(() => {
    document.querySelector(".img_choice_min").style.opacity = "0"
    document.querySelector(".img_choice_rec").style.opacity = "1"
    }, 100)
}


CloseModalBtn.addEventListener("click",CloseModal)

function CloseModal(){

    ModalWinMain.style.scale = "0.3"
    ModalWin.style.opacity = "0.1"
    setTimeout(() => {
        ModalWin.style.display = "none"
    }, 200);
    document.documentElement.style.overflow = 'auto'
}




// slider
const allSliders = [];

// Функция создания слайдера
function createSlider(gameBlock) {
    const sliderData = {
        container: gameBlock,
        slider: gameBlock.querySelector('.game_screen_slaider'),
        slides: gameBlock.querySelectorAll('.game_screen_slaider img'),
        prevBtn: gameBlock.querySelector('.prev_btn'),
        nextBtn: gameBlock.querySelector('.next_btn'),
        openModalBtn: gameBlock.querySelector('.open_modal'),
        currentSlide: 0,
        autoPlayInterval: null,
        isAutoPlaying: true
    };
    
    function openModalWin(){
        ModalWin.style.display = 'block'
        document.documentElement.style.overflow = 'hidden'
        setTimeout(() => {
            ModalWinMain.style.scale = '1'
            ModalWin.style.opacity = '1'
        },20);
    }

    // Функции для этого слайдера
    function nextSlide() {
        sliderData.currentSlide++;
        if (sliderData.currentSlide >= sliderData.slides.length) {
            sliderData.currentSlide = 0;
        }
        updateSlider();
        resetAutoPlay();
    }
    
    function prevSlide() {
        sliderData.currentSlide--;
        if (sliderData.currentSlide < 0) {
            sliderData.currentSlide = sliderData.slides.length - 1;
        }
        updateSlider();
        resetAutoPlay();
    }
    
    function updateSlider() {
        sliderData.slider.style.transform = `translateX(-${sliderData.currentSlide * 100}%)`;
    }
    
    function startAutoPlay() {
        if (sliderData.autoPlayInterval) {
            clearInterval(sliderData.autoPlayInterval);
        }
        sliderData.autoPlayInterval = setInterval(nextSlide, 3000);
        sliderData.isAutoPlaying = true;
    }
    
    function resetAutoPlay() {
        if (sliderData.isAutoPlaying) {
            clearInterval(sliderData.autoPlayInterval);
            startAutoPlay();
        }
    }
    
    sliderData.prevBtn.addEventListener('click', prevSlide);
    sliderData.nextBtn.addEventListener('click', nextSlide);
    
    sliderData.openModalBtn.addEventListener('click', openModalWin);

    // Пауза при наведении
    sliderData.container.addEventListener('mouseenter', () => {
        if (sliderData.isAutoPlaying) {
            clearInterval(sliderData.autoPlayInterval);
        }
    });
    
    sliderData.container.addEventListener('mouseleave', () => {
        if (sliderData.isAutoPlaying) {
            startAutoPlay();
        }
    });
    
    startAutoPlay();
    
    allSliders.push(sliderData);
}

document.querySelectorAll('.game').forEach(gameBlock => {
    createSlider(gameBlock);
});

console.log(`Создано слайдеров: ${allSliders.length}`);