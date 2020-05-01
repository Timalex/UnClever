// Setup animation sequencing
let sequencer = { animationList: [] }
sequencer.defaultTransition = [
    { visibility: 'hidden', opacity: 0 },
    { visibility: 'visible', opacity: 1 }
]
sequencer.defaultTiming = { duration: 2500, fill: 'forwards' }
sequencer.addStep = function(selector) {
    let element = document.querySelector(selector)
    let animation = element.animate(this.defaultTransition, this.defaultTiming)
    animation.pause() // Wait with playback
    this.continuePrevious(animation)
}
sequencer.continuePrevious = function(animation) {
    if (this.animationList.length) {
        let previousAnimation = this.animationList[this.animationList.length - 1]
        previousAnimation.onfinish = () => animation.play()
    }
    this.animationList.push(animation)
}

// Setup controls
sequencer.startSequence = function() {
    this.animationList[0].play()
}
sequencer.findActivatedAnimation = function() {
    let activatedAnimation = this.animationList.find(animation => animation.playState == 'running' || animation.playState == 'paused' || animation.playState == 'canceled')
    return !activatedAnimation ? this.animationList[this.animationList.length - 1] : activatedAnimation
}
sequencer.previous = function() {
    let activatedAnimation = this.findActivatedAnimation()
    activatedAnimation.cancel()
    let indexFollowing = this.animationList.indexOf(activatedAnimation)
    if (indexFollowing) {
        this.animationList[indexFollowing - 1].currentTime = 0    
    }
    else { activatedAnimation.play() }
}
sequencer.next = function() {
    this.findActivatedAnimation().finish()
}
sequencer.togglePause = function() {
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

// Add steps to sequence
sequencer.addStep('#triangleMain')
sequencer.addStep('#squareC')
sequencer.addStep('#squareB')
sequencer.addStep('#squareA')
sequencer.addStep('#triangleOutline')
sequencer.addStep('#gridA')
sequencer.addStep('#gridB')
sequencer.addStep('#gridC')
sequencer.addStep('#outlinedSlices')

sequencer.startSequence()