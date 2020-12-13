// Setup animation sequencing
let sequencer = { animationList: [] }
sequencer.defaultTransition = [
    { visibility: 'hidden', opacity: 0, easing: 'ease-out' },
    { visibility: 'visible', opacity: 1 }
]
sequencer.defaultTiming = { duration: 2500, fill: 'forwards' }
sequencer.addStep = function (selector, transition = this.defaultTransition, timing = this.defaultTiming) {
    var animation = document.querySelector(selector).animate(transition, timing)
    animation.cancel() // Wait with playback
    this.animationList.push(animation)
    if (this.animationList.length > 1) {
        this.chainToPrevious(animation)
    }
}
sequencer.chainToPrevious = function (currentAnimation) {
    let previousAnimation = this.animationList[this.animationList.length - 2]
    previousAnimation.onfinish = () => {
        if (this.autoPlay) {
            this.latestAnimation = currentAnimation
            this.latestAnimation.play()
        }
    }
}

// Setup controls
sequencer.startSequence = function () {
    this.autoPlay = true
    this.latestAnimation = this.animationList[0]
    this.latestAnimation.play()
}
sequencer.getNextAnimation = function () {
    let indexLatest = this.animationList.indexOf(this.latestAnimation)
    return this.animationList[indexLatest + 1]
}
sequencer.getPreviousAnimation = function () {
    let indexLatest = this.animationList.indexOf(this.latestAnimation)
    return this.animationList[indexLatest - 1]
}
sequencer.stepForward = function () {
    let nextAnimation = this.getNextAnimation()
    if (nextAnimation) {
        this.latestAnimation = nextAnimation
        this.latestAnimation.finish()
    }
}
sequencer.stepBack = function () {
    this.latestAnimation.cancel()
    let previousAnimation = this.getPreviousAnimation()
    if (previousAnimation) {
        this.latestAnimation = previousAnimation
        this.latestAnimation.finish()
    }
    else {
        this.startSequence()
    }
}

addEventListener('keydown', (event) => {
    sequencer.autoPlay = false
    switch (event.key) {
        case 'ArrowLeft':
            sequencer.stepBack()
            break
        case 'ArrowRight':
            sequencer.stepForward()
            break
    }
    event.preventDefault()
})
addEventListener('pointerdown', (event) => {
    sequencer.autoPlay = false
    if (event.clientX > event.view.innerWidth / 2) {
        sequencer.stepForward()
    }
    else {
        sequencer.stepBack()
    }
})

// Add steps to sequence
sequencer.addStep('#triangleMain')
sequencer.addStep('#squareC')
sequencer.addStep('#squareC', { transform: ['translate(0, 0) rotate(0deg)', 'translate(-50px, -42px) rotate(21.8deg)'] })
sequencer.addStep('#squareA')
sequencer.addStep('#squareA', { transform: ['translate(0, 0)', 'translate(50px, -58px)'] })
sequencer.addStep('#squareB')
sequencer.addStep('#squareB', { transform: ['translate(0, 0)', 'translate(65px, -73px)'] })
sequencer.addStep('#questionedEqualTo')
sequencer.addStep('#questionedEqualTo', [ { visibility: 'visible', opacity: 1, easing: 'ease-in'}, { visibility: 'hidden', opacity: 0} ])
// sequencer.addStep('#observerEyeSymbol')
// sequencer.addStep('#observerEyeSymbol', [ { visibility: 'visible', opacity: 1, easing: 'ease-in'}, { visibility: 'hidden', opacity: 0} ])
sequencer.addStep('#squareC', { transform: ['translate(-50px, -42px) rotate(21.8deg)', 'translate(0, 0) rotate(0)'] })
sequencer.addStep('#squareA', { transform: ['translate(50px, -58px)', 'translate(0, 0)'] })
sequencer.addStep('#squareB', { transform: ['translate(65px, -73px)', 'translate(0, 0)'] })
// sequencer.addStep('#triangleOutline', { strokeWidth: [0, 0.5, 0], easing: ['ease-out', 'ease-out'] })
sequencer.addStep('#gridA')
sequencer.addStep('#gridB')
sequencer.addStep('#gridC')
sequencer.addStep('#slices', { shapeRendering: ['optimizeSpeed', 'geometricprecision'], strokeWidth: [0, 0.1], easing: ['ease-out'] })
sequencer.addStep('#smallA', { transform: ['translate(0, 0)', 'translate(20px, 50px)', 'translate(-30px, 70px)'] })
sequencer.addStep('#bigB', { transform: ['translate(0, 0)', 'translate(8px,  20px)', 'translate(-50px, 20px)'] })
sequencer.addStep('#bigA', { transform: ['translate(0, 0)', 'translate(20px, 50px)'] })
sequencer.addStep('#gridPattern', [
    { visibility: 'visible', opacity: 0.95, easing: 'ease-out' },
    { visibility: 'hidden', opacity: 0 }],
    { duration: 5000, fill: 'forwards'})
sequencer.startSequence()