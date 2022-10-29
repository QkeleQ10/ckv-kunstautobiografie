const musicPlr = document.querySelector('#music-player')
const musicSrc = document.querySelector('#music-source')

document.querySelectorAll('.tip-link').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation()
        event.target.classList.add('active')
        openTip(event.target.dataset.tip, event.target.parentElement)
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

function openTip(body, origin) {
    let popup = document.createElement('div')
    popup.classList.add('popup')
    popup.innerHTML = `
        <h2 class="popup-title">${origin ? "Toelichting over " + origin.getAttribute('title') : "Informatie"}</h2>
        <a class="popup-close" title="Sluiten" onclick="closeTip(this.parentElement)">close</a>
        <div class="popup-clone"></div>
        <p class="popup-body">${body || "Geen inhoud."}
        <br><br>
        <b>${origin.querySelector('video') ? "Hover over de video om geluid af te spelen." : ""}</b></p>`
    document.body.appendChild(popup)
    if (origin) {
        let clone = origin.cloneNode(true)
        document.querySelector('.popup-clone').appendChild(clone)
    }

    document.querySelectorAll('.popup-clone:has(video)').forEach(e => {
        e.addEventListener('mouseover', () => e.querySelector('video').muted = false)
        e.addEventListener('mouseout', () => e.querySelector('video').muted = true)
    })
}

function closeTip(element) {
    element.remove()
}