/*1 кнопка для клика
2 само модальное окно
 3 кнопка закрыть*/

const OpenModal = document.querySelector('#openModalBtn')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('#closeModalBtn')


console.log(OpenModal);
console.log(modal);
console.log(closeModal);

function fadeIn(element){
    let opacity = 0;
    element.style.display = 'block';
    element.classList.add('modal-show');


    function animate() {
        opacity += 0.1
        element.style.opacity = opacity;
        if (opacity < 1) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function fadeOut (element){
    let opacity = 1;
    
    function animate() {
        opacity -= 0.1
        element.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            element.style.visibility = 'hidden'; //Используем visibility вместо дисплей
        }
    }
    animate()
}

OpenModal.addEventListener('click', function clk() {
    modal.style.visibility = 'visible';
fadeIn(modal);
})

closeModal.addEventListener('click', function cls() {
    // modal.classList.remove('modal-show');
    modal.classList.remove('modal-show');
    fadeOut(modal);
})

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('modal-show')
        fadeOut(modal)
    }
    
})
document.addEventListener('keydown', function (event){
    if(event.key === 'Tab') {
        modal.classList.remove('modal-show')
        fadeOut(modal)
    }
    
})

// 1 кнопка для открытия, закрытия
// 2 Меню


// const toggleMenuBtn = document.querySelector('#toggleMenuBtn')
// const dropdownMenu = document.getElementById('dropdownMenu')

// console.log(toggleMenuBtn);
// console.log(dropdownMenu);

// toggleMenuBtn.addEventListener('click', function(){
//     if(dropdownMenu.style.display === 'none'){
//         dropdownMenu.style.display = 'block'
//     } else{
//         dropdownMenu.style.display = 'none'
//     }
    
// }
// )

// window.addEventListener('click', function(event) {
//     if (!event.target.matches('#toggleMenuBtn')){
//         dropdownMenu.style.display = 'none';
//     }

// })

// 1Все пункты меню главного
// 2 подменю


const mainMenuItems = document.querySelectorAll('.main-menu li')

mainMenuItems.forEach ( function (item) {
    item.addEventListener('mouseover', function() {
        const submenu = item.querySelector('.submenu')
        // console.log(submenu);
        if(submenu) {
            submenu.style.display = 'block'    
        }
    })

    item.addEventListener('mouseout', function () {
        const submenu = item.querySelector('.submenu')
        if(submenu) {
            submenu.style.display = 'none'
        }     
    })

})

// 1 Кнопка туда обратно
// 2 слайды

const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const slides = document.querySelectorAll('.slide')

let currentSlide = 0; // Индекс текущего сладйа

// console.log(prevBtn)
// console.log(nextBtn)
// console.log(slides)

function showSlide(index){
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block'
        } else {
            slide.style.display = 'none'
        }
    })
}
showSlide(currentSlide)
prevBtn.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length

    showSlide(currentSlide)
})
nextBtn.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length

    showSlide(currentSlide)
})


document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault()

    let formData = new FormData(this);

    let feedbackData = {};

    formData.forEach(function (value, key) {
        feedbackData[key] = value
    })
    feedbackData['userId'] = 1;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', 
        body: JSON.stringify(feedbackData)
    })
    .then(Response => Response.json())
    .then(data => {
        alert('Спасибо, с вами свяжутся');
        console.log('Успешно отправлено: ' + data);
        this.reset();
    })
    .catch(Error =>{
        console.error('Ошибка: ' + error);
    })
})