import {
    floatRightToggle,
    floatRightBox,
    floatRightLis,
    floatRightIconBox
} from './float-right-componenets.js';

import { musicList } from './main.js';
import { moreInfo, audio, control, aboutMusic } from './playing-mess-components.js';

function floatRightFn() {
    floatRightToggle.onclick = function () {
        floatRightBox.style.right = "-300px";
    }

    let _floatRightLis = Array.from(floatRightLis);
    musicList.forEach((item, index) => {
        _floatRightLis[index].children[0].innerText = `${item.info.split('-')[0]}`;
        _floatRightLis[index].children[1].innerText = `${item.info.split('-')[1]}`;
        _floatRightLis[index].addEventListener('mouseenter', e => {
            _floatRightLis[index].style.backgroundColor = "rgb(46, 46, 48)";
            floatRightIconBox[index].style.display = "flex";
        });
        _floatRightLis[index].addEventListener('mouseleave', e => {
            _floatRightLis[index].style.backgroundColor = "";
            if (audio.dataset.index != index)
                floatRightIconBox[index].style.display = "none";
        });
    });

    let arr = [moreInfo.children[4], ...floatRightBox.querySelectorAll('*')];
    document.body.addEventListener('click', e => {
        if (floatRightBox.style.right === "0px" && arr.indexOf(e.target) === -1) {
            floatRightBox.style.right = "-300px";
        }
    })

    floatRightIconBox.forEach((item, index) => {
        for (let i = 0; i < 3; i++) {
            item.children[i].onmouseenter = function (e) {
                e.target.style.color = 'rgb(35, 205, 126)';
                e.target.style.cursor = "pointer";
            }
            item.children[i].onmouseleave = function (e) {
                e.target.style.color = ""
            }
            if (i === 0) {
                item.children[i].onclick = e => {
                    if (audio.dataset.index == index) {
                        control.children[2].onclick();
                    } else {
                        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.remove('icon-zanting1');
                        floatRightIconBox[parseInt(audio.dataset.index)].children[0].classList.add('icon-zanting2');
                        if (!audio.paused) {
                            control.children[2].classList.toggle('icon-zanting');
                            control.children[2].classList.toggle('icon-zanting11');
                        }

                        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
                        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
                        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "none";

                        audio.dataset.index = index;

                        floatRightLis[parseInt(audio.dataset.index)].children[0].classList.toggle('active');
                        floatRightLis[parseInt(audio.dataset.index)].children[1].classList.toggle('active');
                        floatRightLis[parseInt(audio.dataset.index)].children[2].style.display = "flex";

                        let curMusic = musicList.get(parseInt(audio.dataset.index));
                        let curMusicInfo = curMusic.info.split('-');
                        aboutMusic.children[0].children[0].innerText = curMusicInfo[0];
                        aboutMusic.children[0].children[1].innerText = curMusicInfo[1];
                        audio.src = curMusic.path;
                        control.children[2].onclick();
                    }
                }
            }
        }
    })

    function whenPauseOrEnd() {
        audio.play();
        if (progressListener === null) {
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
            }, 100);
        }
    }

}

export { floatRightFn }
