const musicPlr = document.querySelector('#music-player')
const musicSrc = document.querySelector('#music-source')

document.querySelectorAll('.tip').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation()
        document.getElementById('popup-body').innerText = event.target.getAttribute('data-tip')
        document.getElementById('popup').classList.add('open')
        event.target.classList.add('open')
    })
})

document.querySelectorAll('.music-card').forEach(e => {
    e.addEventListener('click', () => {
        const src = `music/${e.id}.mp3`
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

function popupHTML(element, clarification) {
    `<div id="popup" onclick="
    document.querySelectorAll('.open').forEach(e=>e.classList.remove('open')); 
    setTimeout(this.remove(), 300);">
        <div id="popup-content">
            <div style="display: flex; width: 100%; justify-content: space-between;">
                <h2>Toelichting</h2>
                <a id="close">close</a>
            </div>
            <div style="pointer-events: none;">${element.outerHTML}</div>
            <p id="popup-body">${clarification}</p>
        </div>
    </div>`

    // liever het element appenden ipv dupliceren!!
}