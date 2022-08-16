const video = document.querySelector('.video'),
    playBtn = document.querySelector('.controls_play'),
    progress = document.querySelector('.progress'),
    svgButton = document.querySelector('.svg_btn path'),
    volume = document.querySelector('.volume'),
    volumeSvgPath = document.querySelectorAll('.volume_svg path'),
    volumeSvgLine = document.querySelector('.svg_line')

function toggleVideoStatus() {
    if (video.paused) {
        video.play()
        svgButton.style.fill = '#7C7C7C'
    }
    else {
        video.pause()
        svgButton.style.fill = '#F4F1EB'
    }
}
playBtn.addEventListener('click', toggleVideoStatus)
video.addEventListener('click', toggleVideoStatus)

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100
    target = document.getElementById('range')
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
video.addEventListener('timeupdate', updateProgress)

function setProgress() {
    video.currentTime = (progress.value * video.duration) / 100
}
progress.addEventListener('change', setProgress)

function mute() {
    if (video.muted) {
        video.muted = false
        volumeSvgPath.forEach(function (el) {
            el.style.fill = '#F4F1EB'
        });
        volumeSvgLine.style.stroke = '#F4F1EB'
    }
    else {
        video.muted = true
        volumeSvgPath.forEach(function (el) {
            el.style.fill = '#7C7C7C'
        });
        volumeSvgLine.style.stroke = '#7C7C7C'
    }
}
volume.addEventListener('click', mute)

const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})
