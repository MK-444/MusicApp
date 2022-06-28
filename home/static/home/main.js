$(function () {
$(".menu-link").click(function () {
    $(".menu-link").removeClass("is-active");
    $(this).addClass("is-active");
});
});

$(function () {
$(".main-header-link").click(function () {
    $(".main-header-link").removeClass("is-active");
    $(this).addClass("is-active");
});
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdowns.forEach((c) => c.classList.remove("is-active"));
    dropdown.classList.add("is-active");
});
});

$(".search-bar input")
.focus(function () {
    $(".header").addClass("wide");
})
.blur(function () {
    $(".header").removeClass("wide");
});

$(document).click(function (e) {
var container = $(".status-button");
var dd = $(".dropdown");
if (!container.is(e.target) && container.has(e.target).length === 0) {
    dd.removeClass("is-active");
}
});

$(function () {
$(".dropdown").on("click", function (e) {
    $(".content-wrapper").addClass("overlay");
    e.stopPropagation();
});
$(document).on("click", function (e) {
    if ($(e.target).is(".dropdown") === false) {
    $(".content-wrapper").removeClass("overlay");
    }
});
});

$(function () {
$(".status-button:not(.open)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
});
$(".pop-up .close").click(function () {
    $(".overlay-app").removeClass("is-active");
});
});

$(".status-button:not(.open)").click(function () {
$(".pop-up").addClass("visible");
});

$(".pop-up .close").click(function () {
$(".pop-up").removeClass("visible");
});

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});


console.clear()

class PlayerWidget {
    constructor(player, tracks) {
        // State
        this.current = 0
        this.next = 0
        this.currentImage = 0
        this.tracks = tracks
        this.player = player
        this.isPaused = false
        this.interval = null
        // DOM
        this.progressBar = this.player.querySelector('.c-player__ui__seek__seeker div')
        this.progress = this.player.querySelector('.c-player__ui__seek__seeker')
        this.playBtn = this.player.querySelector('.c-player__ui__play')
        this.pauseBtn = this.player.querySelector('.c-player__ui__pause')
        this.pauseSvgs = this.pauseBtn.querySelectorAll('svg')
        this.prevBtn = this.player.querySelector('.c-player__ui__prev')
        this.nextBtn = this.player.querySelector('.c-player__ui__next')
        this.dots = this.player.querySelectorAll('.c-player__ui__dots__dot')
        this.bindEvents()
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', e => this.nextTrack(e))
        this.prevBtn.addEventListener('click', e => this.prevTrack(e))
        this.playBtn.addEventListener('click', () => this.playTrack())
        this.pauseBtn.addEventListener('click', () => this.pauseTrack())
    }

    playTrack() {
        this.tiltX()

        this.tl
            .set(this.pauseBtn, {
                transformPerspective: 1000,
                rotationY: 45,
                rotationX: -45,
                scale: .8
            })
            .to(this.playBtn, .2, {
                y: 8,
                yoyo: true,
                ease: Sine.easeInOut,
                repeat: 1
            }, 0)

            // Dots
            .set(this.dots, {autoAlpha: 1})
            .to(this.dots[1], .5, {
                y: 35,
                scale: .4,
                onComplete: () => {
                    this.tl.set(this.dots, {autoAlpha: 0})
                    this.play()
                },
                ease: Sine.easeIn
            }, .65)
            .to(this.dots[2], .9, {
                y: 35,
                scale: .7,
                ease: Power4.easeIn
            }, 0)
            .to(this.dots[3], .9, {
                y: 15,
                scaleX: 0,
                scaleY: 2,
                ease: Power4.easeIn
            }, 0)
    }

    pauseTrack() {
        this.isPaused = true
        this.tiltX()
        this.tl
            .set(this.playBtn, {rotation: -45})
            .to(this.pauseSvgs[0], .25, {
                y: 4,
                yoyo: true,
                repeat: 1,
                ease: Sine.easeInOut
            })
            .to(this.playBtn, .3, {
                rotation: 0,
                scale: 1,
                ease: Power4.easeIn,
                autoAlpha: .9
            }, .9)
            .to(this.pauseBtn, .1, {autoAlpha: 0}, 1)
            .to(this.progress, .7, {
                width: '0%',
                ease: Power4.easeOut
            }, .8)
            .to(this.pauseSvgs[1], .2, {autoAlpha: 0}, .9)
            .to(this.progress, .6, {
                alpha: 0,
                ease: Power4.easeInOut
            }, .8)
            .set(this.dots, {autoAlpha: 1}, 1.1)
            .to(this.dots[2], .6, {
                y: '-=35',
                scale: 1,
                ease: Power4.ease
            }, 1.1)
            .to(this.dots[1], .6, {
                y: '-=35',
                scale: 1,
                ease: Power4.ease,
                onComplete: () => this.tl.set(this.dots, {autoAlpha: 0})
            }, 1.1)
            .set(this.dots[3], {
                y: "-=15",
                scaleX: 1,
                scaleY: 1,
                ease: Power4.ease
            })
            .to(this.player, .6, {
                paddingBottom: '.4rem'
            }, 1)
    }

    nextTrack(e) {
        this.incrementNextTrack()
            .animatePrevNext(e)
            .tiltY('right')
            .rewind()
            .changeImage('+')
    }

    prevTrack(e) {
        this.decrementNextTrack()
            .animatePrevNext(e)
            .tiltY('left')
            .rewind()
            .changeImage('-')
    }

    play() {
        this.tl
            .set(this.pauseSvgs[1], {scale: 0})
            .set(this.progress, {alpha: 1})
            .to(this.progress, .8, {
                width: '100%',
                ease: Power4.easeOut,
                onComplete: () => {
                    this.isPaused = false
                    this.setInterval()
                }
            }, 0)
            .to(this.playBtn, .3, {
                rotation: -30,
                scale: .8,
                ease: Power4.easeIn,
                autoAlpha: 0
            }, .25)
            .to(this.pauseBtn, .1, {
                scale: 1,
                rotationY: 0,
                rotationX: 0,
                autoAlpha: 1,
                onComplete: () => {
                    this.tl
                        .set(this.pauseBtn, {
                            rotationY: 0,
                            rotationX: 0,
                            scale: 1
                        })
                }
            }, 0.35)
            .to(this.pauseSvgs[1], .3, {
                scale: 1,
                autoAlpha: 1,
                ease: Back.easeOut
            }, .5)
            .to(this.player, .6, {
                paddingBottom: '2rem'
            }, 0.2)
    }

    rewind() {
        this.tl.to(this.progressBar, .5, {width: '-2%'})
        return this
    }

    incrementNextTrack() {
        if (this.current >= (this.tracks.length - 1)) {
            this.next = -1
        }
        this.next++
        return this
    }

    decrementNextTrack() {
        if (this.current <= 0) {
            this.next = this.tracks.length
        }
        this.next--
        return this
    }

    animatePrevNext(e) {
        const icons = e.currentTarget.querySelectorAll('svg')

        this.tl
            .set(icons, {scale: 1, alpha: .6})
            .to(icons[1], .18, {
                scale: .8,
                repeat: 1,
                alpha: 1,
                yoyo: true
            })
            .to(icons[0], .18, {
                scale: .8,
                alpha: 1,
                repeat: 1,
                yoyo: true
            }, '-=.22')

        return this
    }

    tiltY(side) {
        this.tl
            .set(".c-player", {
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
                rotationY: 0
            })
            .to('.c-player', .25, {
                rotationY: side === 'right' ? 8 : -8,
                ease: Sine.easeInOut,
                yoyo: true,
                repeat: 1
            }, 0)

        return this
    }

    tiltX() {
        this.tl
            .set(this.player, {
                transformPerspective: 1000,
                rotationX: 0,
                rotationY: 0
            })
            .to(this.player, .25, {
                rotationX: -4,
                ease: Sine.easeInOut,
                yoyo: true,
                repeat: 1
            })
    }

    changeImage(direction) {
        let images = this.player.querySelectorAll('img'),
            current = this.currentImage % 2

        images[1 - current].src = this.tracks[this.next].image

        this.tl
            .set('.c-player__picture__images', {rotation: 0})
            .to('.c-player__picture__images', 1.8, {
                rotation: direction + '=360',
                ease: Back.easeOut
            })
            .to(images[current], 1.8, {alpha: 0, ease: Expo.easeOut}, 0)
            .to(images[1 - current], 1.8, {
                alpha: 1,
                ease: Expo.easeOut
            }, 0)

        this.updateTrackName()
        this.updateBackground()

        // Set props for next transition
        this.current = this.next
        this.currentImage = ++this.currentImage % 2
    }

    updateTrackName() {
        this.tl
            .to('.c-player__details strong', .3, {
                delay: .2,
                alpha: 0,
                scale: 0,
                ease: Back.easeIn,
                onComplete: timeline => {
                    timeline.target[0].innerText = this.tracks[this.next].artist

                    this.tl.to(timeline.target[0], .25, {
                        scale: 1,
                        delay: .1,
                        alpha: 1,
                        ease: Back.easeInOut
                    })
                },
                onCompleteParams: ['{self}']
            })
            .to('.c-player__details span', .25, {
                alpha: 0,
                onComplete: timeline => {
                    timeline.target[0].innerText = this.tracks[this.next].name

                    this.tl.to(timeline.target[0], .2, {alpha: 1})
                },
                onCompleteParams: ['{self}']
            }, .5)
    }

    updateBackground() {
        const gradient = this.tracks[this.next].gradient

        this.tl
            .to('.o-background', 1.5, {
                'background-image': 'linear-gradient(to right top, ' + gradient + ')',
                ease: Sine.easeOut
            })
    }

    setInterval() {
        if (this.interval !== null) {
            return
        }
        this.interval = setInterval(() => {
            if (this.isPaused === false) {
                this.tl.to(this.progressBar, 0.2, {width: '+=1%'})
            }
        }, 1000)
    }

    get tl() {
        return new TimelineLite()
    }
}

const tracks = [
    {
        artist: 'Sugar',
        name: 'Rakuta (Official Single)',
        image: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&h=300&w=300',
        gradient: '#ffc4ee, #ead1fc, #dadcff, #d5e5fb, #dceaf3'
    }, {
        artist: 'Moon Boots',
        name: 'Tied up feat. Steven Clavier',
        image: 'https://images.unsplash.com/photo-1564463836192-7ca5d09c8e92?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&h=300&w=300',
        gradient: '#8bd0ff, #a4daff, #bbe3ff, #d2edff, #e8f6ff'
    }, {
        artist: 'The Glyph',
        name: 'A great dribble shot',
        image: 'https://images.unsplash.com/photo-1563386732972-99222d5cacb3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=300',
        gradient: '#ffaff1, #ffb5cb, #ffc8ae, #ffe1a6, #f0f8b8'
    }
]

const widget = new PlayerWidget(document.querySelector('.c-player'), tracks)

"use strict";

var sideMenu = document.querySelector(".app");
var checkbox = sideMenu.querySelectorAll(".holder");
if (checkbox.length) {
    checkbox.forEach(function(checkbox, i) {
        var audioPlayer = checkbox.querySelector(".green-audio-player");
        // for(var i = 0; i < audioPlayer.length; i++) {
        //     audioPlayer = audioPlayer[i];  
        // }
        var playPauseBtn = audioPlayer.querySelector(".play-pause-btn");
        var playPause = audioPlayer.querySelector(".play-pause-icon");
        var loading = audioPlayer.querySelector(".loading");
        var progress = audioPlayer.querySelector(".progress");
        var sliders = audioPlayer.querySelectorAll(".slider");
        var volumeBtn = audioPlayer.querySelector(".volume-btn");
        var volumeControls = audioPlayer.querySelector(".volume-controls");
        var volumeProgress = volumeControls.querySelector(".slider .progress");
        var player = audioPlayer.querySelector("audio");
        var currentTime = audioPlayer.querySelector(".current-time");
        var totalTime = audioPlayer.querySelector(".total-time");
        var speaker = audioPlayer.querySelector("#speaker");
        var draggableClasses = ["pin"];
        var currentlyDragged = null;

        window.addEventListener("mousedown", function (event) {
            if (!isDraggable(event.target)) return false;
            currentlyDragged = event.target;
            let handleMethod = currentlyDragged.dataset.method;
            this.addEventListener("mousemove", window[handleMethod], false);
            window.addEventListener("mouseup", () => {
                currentlyDragged = false;
                window.removeEventListener("mousemove", window[handleMethod], false);
            }, false);
        });


        playPauseBtn.addEventListener("click", togglePlay);
        player.addEventListener("timeupdate", updateProgress);
        player.addEventListener("volumechange", updateVolume);
        player.addEventListener("loadedmetadata", () => {
            totalTime.textContent = formatTime(player.duration);
        });
        player.addEventListener("canplay", makePlay);
        player.addEventListener("ended", function () {
            playPause.attributes.d.value = "M18 12L0 24V0";
            player.currentTime = 0;
        });
        volumeBtn.addEventListener("click", () => {
            volumeBtn.classList.toggle("open");
            volumeControls.classList.toggle("hidden");
        });
        window.addEventListener("resize", directionAware);
        sliders.forEach(slider => {
            let pin = slider.querySelector(".pin");
            slider.addEventListener("click", window[pin.dataset.method]);
        });
        directionAware();

        function isDraggable(el) {
            let canDrag = false;
            let classes = Array.from(el.classList);
            draggableClasses.forEach(draggable => {
                if (classes.indexOf(draggable) !== -1) canDrag = true;
            });
            return canDrag;
        }

        function inRange(event) {
            let rangeBox = getRangeBox(event);
            let rect = rangeBox.getBoundingClientRect();
            let direction = rangeBox.dataset.direction;

            if (direction == "horizontal") {
                var min = rangeBox.offsetLeft;
                var max = min + rangeBox.offsetWidth;
                if (event.clientX < min || event.clientX > max) return false;
            }
            else {
                var min = rect.top;
                var max = min + rangeBox.offsetHeight;
                if (event.clientY < min || event.clientY > max) return false;
            }

            return true;
        }

        function updateProgress() {
            var current = player.currentTime;
            var percent = current / player.duration * 100;
            progress.style.width = percent + "%";
            currentTime.textContent = formatTime(current);
        }

        function updateVolume() {
        volumeProgress.style.height = player.volume * 100 + "%";

        if (player.volume >= 0.5) {
            speaker.attributes.d.value = "M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z";
        } else if (player.volume < 0.5 && player.volume > 0.05) {
            speaker.attributes.d.value = "M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z";
        } else if (player.volume <= 0.05) {
            speaker.attributes.d.value = "M0 7.667v8h5.333L12 22.333V1L5.333 7.667";
        }
        }

        function getRangeBox(event) {
        let rangeBox = event.target;
        let el = currentlyDragged;

        if (event.type == "click" && isDraggable(event.target)) {
            rangeBox = event.target.parentElement.parentElement;
        }

        if (event.type == "mousemove") {
            rangeBox = el.parentElement.parentElement;
        }

        return rangeBox;
        }

        function getCoefficient(event) {
        let slider = getRangeBox(event);
        let rect = slider.getBoundingClientRect();
        let K = 0;

        if (slider.dataset.direction == "horizontal") {
            let offsetX = event.clientX - slider.offsetLeft;
            let width = slider.clientWidth;
            K = offsetX / width;
        } else if (slider.dataset.direction == "vertical") {
            let height = slider.clientHeight;
            var offsetY = event.clientY - rect.top;
            K = 1 - offsetY / height;
        }

        return K;
        }

        function rewind(event) {
        if (inRange(event)) {
            player.currentTime = player.duration * getCoefficient(event);
        }
        }

        function changeVolume(event) {
        if (inRange(event)) {
            player.volume = getCoefficient(event);
        }
        }

        function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ":" + (sec < 10 ? "0" + sec : sec);
        }

        function togglePlay() {
        if (player.paused) {
            playPause.attributes.d.value = "M17.991 40.976c0 3.662-2.969 6.631-6.631 6.631l0 0c-3.662 0-6.631-2.969-6.631-6.631V6.631C4.729 2.969 7.698 0 11.36 0l0 0c3.662 0 6.631 2.969 6.631 6.631V40.976zM42.877 40.976c0 3.662-2.969 6.631-6.631 6.631l0 0c-3.662 0-6.631-2.969-6.631-6.631V6.631C29.616 2.969 32.585 0 36.246 0l0 0c3.662 0 6.631 2.969 6.631 6.631V40.976z";
            player.play();
        } else {
            playPause.attributes.d.value = "M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z";
            player.pause();
        }
        }

        function makePlay() {
        playPauseBtn.style.display = "block";
        loading.style.display = "none";
        }


        function directionAware() {
        if (window.innerHeight < 250) {
            volumeControls.style.bottom = "-54px";
            volumeControls.style.left = "54px";
        } else if (audioPlayer.offsetTop < 154) {
            volumeControls.style.bottom = "-164px";
            volumeControls.style.left = "-3px";
        } else {
            volumeControls.style.bottom = "52px";
            volumeControls.style.left = "-3px";
        }
    }
});
}


