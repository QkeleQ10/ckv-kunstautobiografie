const musicPlr = document.querySelector('#music-player')
const musicSrc = document.querySelector('#music-source')

document.querySelectorAll('.tip').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation()
        event.target.classList.add('active')
        openTip(event.target.parentElement, event.target.dataset.tip)
    })
})

document.querySelectorAll('.music-card').forEach(e => {
    e.addEventListener('click', () => {
        const src = `music/${e.dataset.music}.mp3`
        document.querySelectorAll('.playing').forEach(e1 => e1.classList.remove('playing'))
        if (musicSrc.getAttribute('src') != src) {
            musicSrc.src = src
            musicPlr.load()
            musicPlr.play()
        } else {
            musicPlr.paused ? musicPlr.play() : musicPlr.pause()
        }
        musicPlr.paused ? e.classList.remove('playing') : e.classList.add('playing')
    })
})

function openTip(about, clarification) {
    let popupContainer = document.createElement('div')
    popupContainer.classList.add('popup-container')
    document.body.appendChild(popupContainer)
    popupContainer.innerHTML = `<div class="popup">
        <div style="display: flex; width: 100%; justify-content: space-between;">
            <h2>Toelichting over ${about.getAttribute('title')}</h2>
            <a class="popup-close">close</a>
        </div>
        <div class="popup-clone" style="pointer-events: none;"></div>
        <p id="popup-body">${clarification}</p>
    </div>`
    popupContainer.onclick = closeTip
    let clone = about.cloneNode(true)
    document.querySelector('.popup-clone').appendChild(clone)
    document.querySelector('main').style.pointerEvents = "none"
}

function closeTip(event) {
    this.remove()
    document.querySelector('main').style.pointerEvents = ""
}