// THE HEADER SECTION
let popupLinks = Array.from(document.querySelectorAll('.nav_links li[aria-haspopup="menu"]'));
popupLinks.forEach( (element) =>{
    element.addEventListener('click',() =>{
    let popup = element.querySelector('ul.popup');
    let popupVisibility = popup.getAttribute('aria-hidden');
        if (popupVisibility === 'true') {
            popupLinks.forEach( (element) =>{
                element.querySelector('ul.popup').setAttribute('aria-hidden', 'true');
            })
            popup.setAttribute('aria-hidden', 'false')
        }else{
            popupLinks.forEach( (element) =>{
                element.querySelector('ul.popup').setAttribute('aria-hidden', 'true');
            })
        }
    })
})

let loginBtn = document.querySelector('.login');
let loginpopup = loginBtn.querySelector('.login-popup')
loginBtn.addEventListener('click',() =>{
    let visible = loginpopup.getAttribute('aria-hidden');
    if (visible === "true") {
        loginpopup.setAttribute('aria-hidden', 'false')
    } else {
        loginpopup.setAttribute('aria-hidden', 'true')
    }
})

// HERO SECTION
let heroSection = Array.from(document.querySelectorAll('.hero-section_container'))
let slideTrack = Array.from(document.querySelectorAll('.slide-track .tracker-container'));
let heroIndex = 0;
let heroSectionAnimation = setInterval(() =>{
    heroSection.forEach(element =>{
        element.style.display = 'none'
        element.style.opacity = '0'

        element.querySelector('.hero_description').style.opacity = '0'
        element.querySelector('.hero_description').style.transition = 'unset'
        heroSection[heroIndex].style.transition = 'unset'
    })
         slideTrack.forEach(elem =>{
         elem.querySelector('.tracker').style.outline = 'none'
})

    heroSection[heroIndex].querySelector('.hero_description').style.animation = 'animatetransform 2s ease-in-out forwards';
    heroSection[heroIndex].style.display = 'block';

    heroSection[heroIndex].style.animation = 'animateopacity 700ms ease-out forwards';
    slideTrack[heroIndex].querySelector('.tracker').style.outline = ' 2px solid var(--magenta)'

    heroIndex++
    if (heroIndex > heroSection.length -1) {
        heroIndex = 0;
    }
}, 10000)
slideTrack.forEach(elem => {
    elem.addEventListener('click', () =>{
        heroIndex = slideTrack.indexOf(elem)
    })
})

// ACTIVITIES TOUCH AND MOUSE EVENTS
let activitiesContainer = document.querySelector('.activities_content-cont'),
activities = Array.from(document.querySelectorAll('.programmes'))
let activitySize = activitiesContainer.querySelector('.programmes').clientWidth;
moveSlider(activitiesContainer, activities)

// ACTIVITIES SLIDE CONTROL
let activityPrevBtn = document.querySelector('#prevBtn')
let activityNextBtn = document.querySelector('#nextBtn')
moveSliderByBtn(activitiesContainer, activitySize, activityPrevBtn, activityNextBtn, 4)

//FUTA SCHOOL
let schoolContainer = document.querySelector('.school-list')
let schools = Array.from(document.querySelectorAll('.schools'))
moveSlider(schoolContainer, schools)
//FUTA SCHOOL CONTROL
let schoolSize = schools[0].clientWidth;
let schoolprevBtn = document.querySelector('#school-list_prevbtn')
let schoolnextBtn = document.querySelector('#school-list_nextbtn')
moveSliderByBtn(schoolContainer, schoolSize, schoolprevBtn, schoolnextBtn, 6)






function moveSliderByBtn(container, slidersize, prevBtn, nextBtn, maxMove) {
    let tracker = 0;
prevBtn.addEventListener('click', () =>{
    if (tracker != -1) {
            tracker--
    container.style.transition = 'transform 1s ease-out'
    container.style.transform = `translateX(${-slidersize * tracker}px)`
    }

})
nextBtn.addEventListener('click', () =>{
    if (tracker != maxMove) {
            tracker++
    container.style.transition = 'transform 1s ease-out'
    container.style.transform = `translateX(${-slidersize * tracker}px)`
    }

})
}

function moveSlider(container, Array) {
    let startPos = 0;
let currentPos = 0;
let previousPos = 0;
let translateX = 0;
let isDragging = false;
Array.forEach((arr, index) =>{

    //TOUCH EVENTS
    arr.addEventListener('touchstart', touchStart(index))
    arr.addEventListener('touchend', touchEnd)
    arr.addEventListener('touchmove', touchMove)

    //MOUSE EVENTS
    arr.addEventListener('mousedown', touchStart(index))
    arr.addEventListener('mouseup', touchEnd)
    arr.addEventListener('mouseleave', touchEnd)
    arr.addEventListener('mousemove', touchMove)
})

function touchStart(index) {
    return function (event) {
        event.preventDefault()
        currentIndex = index;
        isDragging = true;
        startPos = getPosition(event)
    }
}
function touchMove(event) {
    if (isDragging) {
        event.preventDefault()
    let translate = getPosition(event)
    currentPos = previousPos + translate - startPos
    setContainerPos()
    }
  
}
function touchEnd() {
    isDragging = false;
    previousPos = currentPos
    translateX = getTranslateValues(container)
    if (translateX.x > 100) {
        container.style.transition = 'none'
        container.style.transform = 'translateX(0px)'
    startPos = 0;
    currentPos = 0;
    previousPos = 0;
    }else if (translateX.x < -1000) {
        container.style.transform = 'translateX(-1000px)'
        startPos = 0;
        currentPos = 0;
        previousPos = 0;
    }
}
function getPosition(event) {
    if(event.type.includes('mouse')){
     return event.pageX
}else{
   return event.touches[0].clientX
}
}
function setContainerPos() {
    container.style.transition = 'transform 1s ease-out'
    container.style.transform = `translateX(${currentPos}px)`
}
function getTranslateValues(element) {
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform
    if (matrix == 'none' || typeof matrix == 'undefined') {
        return{
            x:0,
            y:0,
            z:0
        }
    }
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
    if (matrixType === '2d') {
        return{
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0
        }
    }
    else if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14]
        }
    }
}
}