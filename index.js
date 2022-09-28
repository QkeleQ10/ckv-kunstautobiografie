const musicPlr = document.querySelector('#music-player')
const musicSrc = document.querySelector('#music-source')

document.querySelectorAll('.music-card').forEach(e => {
    e.addEventListener('click', function () {
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