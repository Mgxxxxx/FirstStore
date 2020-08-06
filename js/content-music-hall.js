import {
    musichallNavLis,
    slideLeft,
    slideRight,
    slideShowBox,
    slidePoints,
    curNavContent,
    curContentScrollBar,
    musichallH1
} from './content-music-hall-compoents.js';

function contentBodyFn() {

    let contentNavActive = 0;
    musichallNavLis.forEach((li, index) => {
        li.onclick = function (e) {
            musichallNavLis[contentNavActive].classList.remove('musichall-nav-active');
            e.target.classList.add('musichall-nav-active');
            curNavContent.children[contentNavActive].style.display = "none";
            contentNavActive = index;
            curNavContent.children[contentNavActive].style.display = "block";
        }
    });

    let flag = true;
    let curPicIndex = 0;
    let slideTimer = null;

    slideTimer = setInterval(() => {
        slideRight.click();
    }, 5000);

    slideLeft.onclick = e => {
        if (flag) {
            flag = false;
            slidePoints[curPicIndex].children[0].style.backgroundColor = "rgb(96, 96, 97)";
            if (curPicIndex === 0)
                curPicIndex = 4;
            else curPicIndex--;
            slidePoints[curPicIndex].children[0].style.backgroundColor = "white";
            if (slideShowBox.offsetLeft >= -916) {
                slideShowBox.style.transitionDuration = "0s";
                slideShowBox.style.left = '-5496px';
                setTimeout(() => {
                    slideShowBox.style.transitionDuration = "0.5s";
                    slideShowBox.style.left = 916 + slideShowBox.offsetLeft + 'px';
                })
            }
            else slideShowBox.style.left = 916 + slideShowBox.offsetLeft + 'px';
            setTimeout(() => flag = true, 500);
        }
    }

    slideRight.onclick = e => {
        if (flag) {
            flag = false;
            slidePoints[curPicIndex].children[0].style.backgroundColor = "rgb(96, 96, 97)";
            if (curPicIndex === 4)
                curPicIndex = 0;
            else curPicIndex++;
            slidePoints[curPicIndex].children[0].style.backgroundColor = "white";
            if (slideShowBox.offsetLeft == -4580) {
                slideShowBox.style.transitionDuration = "0s";
                slideShowBox.style.left = '0px';
                setTimeout(() => {
                    slideShowBox.style.left = -916 + slideShowBox.offsetLeft + 'px';
                    slideShowBox.style.transitionDuration = "0.5s";
                })
            }
            else slideShowBox.style.left = -916 + slideShowBox.offsetLeft + 'px';
            setTimeout(() => flag = true, 500);
        }
    }

    slidePoints.forEach((point, index) => {
        point.onmouseenter = e => point.children[0].style.backgroundColor = "rgb(30, 204, 148)";
        point.onmouseleave = e => {
            if (curPicIndex !== index)
                point.children[0].style.backgroundColor = "rgb(96, 96, 97)";
            else point.children[0].style.backgroundColor = "white";
        };

        point.onclick = e => {
            slidePoints[curPicIndex].children[0].style.backgroundColor = "rgb(96, 96, 97)";
            curPicIndex = index;
            slidePoints[curPicIndex].children[0].style.backgroundColor = "white";
            slideShowBox.style.left = (curPicIndex + 1) * -916 + "px";
        }
    });

    for (let li of slideShowBox.children) {
        li.onmouseenter = e => flag = false;
        li.onmouseleave = e => flag = true;
    }

    let curContent = curNavContent.children[contentNavActive];
    let actHeight = 0;
    for (let e of curContent.children) {
        if (e === curContentScrollBar.parentElement)
            continue;
        actHeight += e.offsetHeight;
    }

    curContentScrollBar.style.height = `calc(100% * ${curContent.offsetHeight / actHeight} - 50px)`;

    let h = musichallH1.offsetHeight, w = musichallH1.offsetWidth;
    curContent.onscroll = e => {
        if (curContent.scrollTop < h) {
            musichallH1.style.height = h - curContent.scrollTop + 'px';
            musichallH1.style.width = w * (h - curContent.scrollTop) / h + 'px';
            musichallH1.style.fontSize = 30 * (h - curContent.scrollTop) / h + 'px';
        } else if (curContent.scrollTop >= h) {
            musichallH1.style.height = '0px';
            musichallH1.style.width = '0px';
            musichallH1.style.fontSize = '0px';
        }
        curContentScrollBar.style.top = `calc(100% * ${curContent.scrollTop / actHeight})`;
    };

}

export { contentBodyFn };
