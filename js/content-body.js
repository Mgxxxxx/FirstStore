import {
    contentNavLis,
    slideLeft,
    slideRight,
    slideShowBox,
    slidePoints
} from './content-body-compoents.js';

function contentBodyFn() {

    let contentNavActive = 0;
    contentNavLis.forEach((li, index) => {
        li.onclick = function (e) {
            contentNavLis[contentNavActive].classList.remove('content-nav-active');
            e.target.classList.add('content-nav-active');
            contentNavActive = index;
        }
    });
    slideLeft.onmouseenter = e => e.target.style.color = "rgb(30, 210, 169)";
    slideLeft.onmouseleave = e => e.target.style.color = "rgb(209, 209, 209)";
    slideRight.onmouseenter = e => e.target.style.color = "rgb(30, 210, 169)";
    slideRight.onmouseleave = e => e.target.style.color = "rgb(209, 209, 209)";

    let flag = true;
    let curPicIndex = 0;
    let slideTimer = null;

    slideTimer = setInterval(() => {
        slideRight.click();
    }, 3000);

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

}

export { contentBodyFn };
