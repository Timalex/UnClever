// Setup animation sequencing
let sequencer = { animationList: [] }
sequencer.defaultTransition = [
    { visibility: 'hidden', opacity: 0, easing: 'ease-out' },
    { visibility: 'visible', opacity: 1 }
]
sequencer.defaultTiming = { duration: 2500, fill: 'forwards' }
sequencer.addStep = function (selector, transition = this.defaultTransition, timing = this.defaultTiming) {
    let element = document.querySelector(selector)
    let animation = element.animate(transition, timing)
    animation.pause() // Wait with playback
    this.continuePrevious(animation)
}
sequencer.continuePrevious = function (animation) {
    if (this.animationList.length) {
        let previousAnimation = this.animationList[this.animationList.length - 1]
        previousAnimation.onfinish = () => animation.play()
    }
    this.animationList.push(animation)
}

// Setup controls
sequencer.startSequence = function () {
    this.animationList[0].play()
}
sequencer.findActivatedAnimation = function () {
    let activatedAnimation = this.animationList.find(animation => animation.playState == 'running' || animation.playState == 'paused' || animation.playState == 'canceled')
    return !activatedAnimation ? this.animationList[this.animationList.length - 1] : activatedAnimation
}
sequencer.previous = function () {
    let activatedAnimation = this.findActivatedAnimation()
    activatedAnimation.cancel()
    let indexFollowing = this.animationList.indexOf(activatedAnimation)
    if (indexFollowing) {
        this.animationList[indexFollowing - 1].currentTime = 0
    }
    else { activatedAnimation.play() }
}
sequencer.next = function () {
    this.findActivatedAnimation().finish()
}
sequencer.togglePause = function () {
    let activatedAnimation = this.findActivatedAnimation()
    activatedAnimation.playState == 'paused' ? activatedAnimation.play() : activatedAnimation.pause()
}
addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            sequencer.previous()
            break
        case 'ArrowRight':
            sequencer.next()
            break
        case ' ':
            sequencer.togglePause()
            break
    }
    event.preventDefault()
})
addEventListener('pointerdown', (event) => {
    if (event.clientX > event.view.innerWidth / 2) {
        sequencer.next()
    }
    else {
        sequencer.previous()
    }
})

// Add steps to sequence
sequencer.addStep('#triangleMain')
sequencer.addStep('#squareC')
sequencer.addStep('#squareB')
sequencer.addStep('#squareA')
sequencer.addStep('#triangleOutline', { strokeWidth: [0, 0.5, 0], easing: ['ease-out', 'ease-out'] })
sequencer.addStep('#gridA')
sequencer.addStep('#gridB')
sequencer.addStep('#gridC')
sequencer.addStep('#slices', { shapeRendering: ['optimizeSpeed', 'geometricprecision'], strokeWidth: [0, 0.1], easing: ['ease-out'] })
sequencer.addStep('#smallA', { transform: ['translate(0, 0)', 'translate(20px, 50px)', 'translate(-30px, 70px)'] })
sequencer.addStep('#bigB', { transform: ['translate(0, 0)', 'translate(8px,  20px)', 'translate(-50px, 20px)'] })
sequencer.addStep('#bigA', { transform: ['translate(0, 0)', 'translate(20px, 50px)'] })

sequencer.startSequence()