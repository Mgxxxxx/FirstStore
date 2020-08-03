import {
    searchTools,
    hotSearch,
    hisSearch,
    searchText
} from './menu-top-components.js';

function menuTopFn() {
    for (let tool of searchTools) {
        if (tool.className.indexOf('icon-vertical_line') === -1) {
            tool.addEventListener('mouseenter', e => {
                tool.style.cursor = "pointer";
                tool.style.color = "rgb(30, 206, 157)"
            });
            tool.addEventListener('mouseleave', e => {
                tool.style.color = "rgb(209, 209, 209)";
            });
        }
    }

    searchText.addEventListener('focus', e => {
        hotSearch.parentElement.style.display = "block";
    });

    searchText.addEventListener('blur', e => {
        //立即把display变为none会触发不了hotSearch.children[i]的点击事件
        setTimeout(function () {
            hotSearch.parentElement.style.display = "none";
        }, 200);
    });

    for (let i = 1; i < hotSearch.children.length; i++) {
        hotSearch.children[i].style.cursor = "pointer";
        hotSearch.children[i].addEventListener('mouseenter', e => {
            e.target.style.backgroundColor = "rgb(53, 53, 55)";
        });

        hotSearch.children[i].addEventListener('mouseleave', e => {
            e.target.style.backgroundColor = "transparent";
        });

        hotSearch.children[i].addEventListener('click', e => {
            searchText.value = e.target.innerText;
        });
    }

    for (let i = 1; i < hisSearch.children.length; i++) {
        hisSearch.children[i].style.cursor = "pointer";
        hisSearch.children[i].addEventListener('mouseenter', e => {
            e.target.style.backgroundColor = "rgb(53, 53, 55)";
        });

        hisSearch.children[i].addEventListener('mouseleave', e => {
            e.target.style.backgroundColor = "transparent";
        });

        hisSearch.children[i].addEventListener('click', e => {
            searchText.value = e.target.innerText;
        });
    }
}

export { menuTopFn }
