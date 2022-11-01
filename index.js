const musicPlr = document.querySelector('#music-player'),
    musicSrc = document.querySelector('#music-source')

document.querySelectorAll('.tip-link').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation()
        event.target.classList.add('active')
        openTip(event.target.dataset.tip, event.target.parentElement)
    })
})

document.querySelectorAll('.music-card').forEach(e => {
    e.addEventListener('click', () => {
        const src = `music/${e.dataset.music}.webm`
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
    document.querySelectorAll('video').forEach(vid => vid.pause())
    let popup = document.createElement('div')
    popup.classList.add('popup')
    popup.innerHTML =
        (
            origin
                ? `<h2 class="popup-title">Toelichting over ${origin.getAttribute('title')}</h2>`
                : `<h2 class="popup-title">Informatie</h2>`
        ) +
        (
            `<span role="button" tabindex=0 class="popup-close" title="Sluiten" onclick="closeTip(this.parentElement)">close</span>`
        ) +
        (
            !origin.dataset.noClone
                ? `<div class="popup-clone">${origin.outerHTML}</div>`
                : ``
        ) +
        `<p class="popup-body">${body || "Geen inhoud."}` + (
            origin.querySelector('video')
                ? `<br><br><b>Hover over de video om geluid af te spelen.</b>`
                : ``
        ) + "</p>"
    document.body.appendChild(popup)
    document.querySelectorAll('.popup-clone:has(video)').forEach(e => {
        e.addEventListener('mouseover', () => {
            if (!musicPlr.paused) {
                musicPlr.pause()
                musicPlr.classList.add('hold')
            }
            e.querySelector('video').muted = false
        })
        e.addEventListener('mouseout', () => {
            if (musicPlr.classList.contains('hold')) {
                musicPlr.play()
                musicPlr.classList.remove('hold')
            }
            e.querySelector('video').muted = true
        })
    })
}

function closeTip(element) {
    element.classList.add('hide')
    setTimeout(() => {
        element.remove()
        document.querySelectorAll('video').forEach(vid => vid.play())
    }, 300)
}