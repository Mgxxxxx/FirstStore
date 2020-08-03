import {
    progress,
    aboutMusic,
    control,
    moreInfo,
    audio,
    volControl,
    volControlIcon
} from './playing-mess-components.js';

import { musicList } from './main.js';
import { floatRightBox, floatRightIconBox, floatRightLis } from './float-right-componenets.js';

function playingMessFn() {
    aboutMusic.children[0].addEventListener('mouseenter', e => {
        e.target.style.cursor = "pointer";
    });

    for (let tool of aboutMusic.children[1].children) {
        tool.addEventListener('mouseenter', enter);
        tool.addEventListener('mouseleave', leave);
    }

    for (let i = 0; i < control.children.length - 1; i++) {
        if (i !== 2) {
            control.children[i].addEventListener('mouseenter', enter);
            control.children[i].addEventListener('mouseleave', leave);
            // control.children[i].addEventListener('mousedown', down);
            // control.children[i].addEventListener('mouseup', up);
        } else if (i === 2) {
            control.children[i].onclick = function (e) {
                control.children[i].classList.toggle('icon-zanting');
                control.children[i].classList.toggle('icon-zanting11');
                floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.toggle('icon-zanting1');
                floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.toggle('icon-zanting2');
                if (audio.paused || audio.ended) {
                    audio.play();
                    if (progressListener === null) {
                        ifProgressNull();
                    }
                } else if (!audio.paused) {
                    audio.pause();
                    if (progressListener) {
                        clearInterval(progressListener);
                        progressListener = null;
                    }
                }
            }
            control.children[i].addEventListener('mouseenter', e => {
                e.target.style.cursor = "pointer";
            });
        }
    }

    let volControlBox = volControl.parentElement.parentElement;
    control.children[4].addEventListener('click', e => {
        if (volControlBox.style.display === "" || volControlBox.style.display === "none") {
            volControlBox.style.display = "block";
        } else {
            volControlBox.style.display = "none";
        }
    })

    for (let i = 0; i < moreInfo.children.length - 1; i++) {
        moreInfo.children[i].addEventListener('mouseenter', e => {
            e.target.style.cursor = "pointer";
            e.target.style.color = "rgb(30, 206, 155)";
            e.target.style.borderColor = "rgb(30, 206, 155)";
        });
        moreInfo.children[i].addEventListener('mouseleave', e => {
            e.target.style.color = "rgb(209, 209, 209)";
            e.target.style.borderColor = "rgb(209, 209, 209)";
        });
    }

    let floatRightBoxTimer = null;
    moreInfo.children[4].onclick = function () {
        if (floatRightBoxTimer === null)
            floatRightBoxTimer = setTimeout(() => {
                floatRightBox.style.right = "0px";
                floatRightBoxTimer = null;
            })
    }

    let actualLeft = progress.offsetLeft;
    let cur1 = progress.offsetParent;
    while (cur1 !== null) {
        actualLeft += cur1.offsetLeft;
        cur1 = cur1.offsetParent;
    }
    progress.parentElement.addEventListener('mousedown', e => {
        audio.currentTime = audio.duration * ((e.pageX - actualLeft) / 976);
        control.children[2].classList.add('icon-zanting');
        control.children[2].classList.remove('icon-zanting11');
        if (audio.pause || audio.ended) {
            ifProgressNull();
        }
    });


    let progressListener = null;
    control.children[1].addEventListener('click', e => {
        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.add('icon-zanting2');
        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.remove('icon-zanting1');
        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "none";
        if (audio.dataset.index === '0')
            audio.dataset.index = musicList.size - 1;
        else audio.dataset.index--;
        if (!audio.paused) {
            floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.remove('icon-zanting2');
            floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.add('icon-zanting1');
        }
        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "flex";
        let curMusic = musicList.get(parseInt(audio.dataset.index));
        let curMusicInfo = curMusic.info.split('-');
        aboutMusic.children[0].children[0].innerText = curMusicInfo[0];
        aboutMusic.children[0].children[1].innerText = curMusicInfo[1];
        if (!audio.paused) {
            audio.src = curMusic.path;
            audio.play();
            if (progressListener === null)
                ifProgressNull();
        } else if (audio.paused || audio.ended) {
            audio.src = curMusic.path;
            progress.value = 0;
        }
    });

    control.children[3].addEventListener('click', nextMusic);

    volControl.addEventListener('input', e => {
        document.documentElement.style.setProperty('--volSize', `${e.target.value * 1.29}px`);
        audio.volume = e.target.value / 100;
        volControl.parentElement.children[1].innerText = `${e.target.value}%`;
        if (e.target.value === '0') {
            volControlIcon.classList.remove('icon-laba');
            volControlIcon.classList.add('icon-jingyin01');
            control.children[4].classList.remove('icon-laba');
            control.children[4].classList.add('icon-jingyin01');
        } else {
            volControlIcon.classList.remove('icon-jingyin01');
            volControlIcon.classList.add('icon-laba');
            control.children[4].classList.remove('icon-jingyin01');
            control.children[4].classList.add('icon-laba');
        }
    });

    volControlIcon.addEventListener('mouseenter', enter);

    volControlIcon.addEventListener('mouseleave', e => {
        e.target.style.color = "#615b5b";
    });

    volControlIcon.addEventListener('click', e => {
        if (audio.volume === 0) {
            volControlIcon.classList.remove('icon-jingyin01');
            volControlIcon.classList.add('icon-laba');
            control.children[4].classList.remove('icon-jingyin01');
            control.children[4].classList.add('icon-laba');
            audio.volume = volControl.value / 100;
        } else {
            volControlIcon.classList.remove('icon-laba');
            volControlIcon.classList.add('icon-jingyin01');
            control.children[4].classList.remove('icon-laba');
            control.children[4].classList.add('icon-jingyin01');
            audio.volume = 0;
        }
    });

    let arr = [control.children[4], ...volControlBox.querySelectorAll('*')];
    document.body.addEventListener('click', e => {
        if (volControlBox.style.display === "block" && arr.indexOf(e.target) === -1) {
            volControlBox.style.display = "none";
        }
    })


    function nextMusic(e) {
        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.add('icon-zanting2');
        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.remove('icon-zanting1');
        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "none";
        if (audio.dataset.index == musicList.size - 1)
            audio.dataset.index = 0;
        else audio.dataset.index++;
        if (!audio.paused) {
            floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.remove('icon-zanting2');
            floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.add('icon-zanting1');
        }
        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "flex";
        let curMusic = musicList.get(parseInt(audio.dataset.index));
        let curMusicInfo = curMusic.info.split('-');
        aboutMusic.children[0].children[0].innerText = curMusicInfo[0];
        aboutMusic.children[0].children[1].innerText = curMusicInfo[1];
        if (!audio.paused) {
            audio.src = curMusic.path;
            audio.play();
            if (progressListener === null)
                ifProgressNull();
        } else if (audio.paused || audio.ended) {
            audio.src = curMusic.path;
            progress.value = 0;
        }
    }

    function ifProgressNull() {
        // audio.play();
        // if (progressListener === null) {
        progressListener = setInterval(() => {
            if (audio.currentTime === audio.duration) {
                if (audio.dataset.index == musicList.size - 1)
                    audio.dataset.index = 0;
                else audio.dataset.index++;
                let curMusic = musicList.get(parseInt(audio.dataset.index));
                let curMusicInfo = curMusic.info.split('-');
                aboutMusic.children[0].children[0].innerText = curMusicInfo[0];
                aboutMusic.children[0].children[1].innerText = curMusicInfo[1];
                audio.src = musicList.get(parseInt(audio.dataset.index)).path;
                audio.play();
            }
            try {
                progress.value = (audio.currentTime / audio.duration) * 100;
            } catch (error) { }
        });
        // }
    }

    function enter(e) {
        e.target.style.cursor = "pointer";
        e.target.style.color = "rgb(30, 206, 155)";
    }

    function leave(e) {
        e.target.style.color = "rgb(209, 209, 209)";
    }

    function down(e) {
        e.target.style.position = "relative";
        e.target.style.top = "1px";
        e.target.style.left = "1px";
    }

    function up(e) {
        console.log(this)
        e.target.style.position = "static";
        e.target.style.top = "0";
        e.target.style.left = "0";
    }
}


export { playingMessFn };
