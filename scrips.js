'use strict'

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})
//////////
const section1 = document.querySelector('#section--1')
const btnScrollTo = document.querySelector('.btn--scroll-to')

btnScrollTo.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: 'smooth' })
})

////
document.querySelector('.nav__links').addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('nav__link')) {
        let id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})
/////////////
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
tabsContainer.addEventListener('click', (e) => {
    let click = e.target.closest('.operations__tab')
    if (!click) return

    ///removing
    tabs.forEach((t) => {
        t.classList.remove('operations__tab--active')
    })
    tabsContent.forEach((c) => {
        c.classList.remove('operations__content--active')
    })

    ///seting
    click.classList.add('operations__tab--active')
    document
        .querySelector(`.operations__content--${click.dataset.tab}`)
        .classList.add('operations__content--active')
})
//////////// header hover
const nav = document.querySelector('.nav')

let handleHover = (opacity) => (e) => {
    if (e.target.classList.contains('nav__link')) {
        let link = e.target
        let siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')

        siblings.forEach((s) => {
            if (s !== link) s.style.opacity = opacity
        })
        logo.style.opacity = opacity
    }
}

nav.addEventListener('mouseover', handleHover(0.5))
nav.addEventListener('mouseout', handleHover(1))

/////// sticky header
let header = document.querySelector('.header')
let navHight = nav.getBoundingClientRect().height
let stickyHeader = (entries) => {
    let [entry] = entries

    if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}

let headerObserver = new IntersectionObserver(stickyHeader, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHight}px`,
})
headerObserver.observe(header)
////////// reveal Sections
const allsections = document.querySelectorAll('.section')

let revealSection = (entries, observer) => {
    let [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allsections.forEach((section) => {
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})
///////
let imgTargets = document.querySelectorAll('img[data-src]')
let loadImg = (entries, observer) => {
    let [entry] = entries

    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    rootMargin: '-200px',
    root: null,
    threshold: 0.25,
})
imgTargets.forEach((img) => imgObserver.observe(img))
///////
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const slider = document.querySelector('.slider')
let curSlide = 0
let maxSlide = slides.length

const goToSlide = (slide) => {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}
goToSlide(0)
const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0
    else curSlide++
    goToSlide(curSlide)
    activateDot(curSlide)
}
const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1
    else curSlide--
    goToSlide(curSlide)
    activateDot(curSlide)
}
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)
//////

document.addEventListener('keydown', (e) => {
    e.key === 'ArrowRight' && nextSlide()
    e.key === 'ArrowLeft' && prevSlide()
})
let dotContainer = document.querySelector('.dots')
const createDots = () => {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `
        <button class='dots__dot' data-slide='${i}'></button>
        `
        )
    })
}
createDots()
dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
        let slide = e.target.dataset.slide
        goToSlide(slide)
        activateDot(slide)
    }
})
const activateDot = (slide) => {
    document
        .querySelectorAll('.dots__dot')
        .forEach((dot) => dot.classList.remove('dots__dot--active'))
    document
        .querySelector(`.dots__dot[data-slide='${slide}']`)
        .classList.add('dots__dot--active')
}
activateDot(0)
