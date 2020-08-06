import {
    createdList,
    createListBtn,
    createListToggleBtn,
    collectedListToggleBtn,
    navLeftBody,
    collectedList,
    scrollBar
} from './nav-left-components.js';

import { contentBody } from './content-music-hall-compoents.js';

function navLeftFn() {
    let navLis = document.querySelectorAll('.nav-sub-item li:nth-child(n+2)');
    let actNavLeftBodyHeight = 0;
    for (let i of navLeftBody.children)
        actNavLeftBodyHeight += i.offsetHeight + 10;
    console.log(actNavLeftBodyHeight)


    let activeLi = 0;
    navLis.forEach((li, index) => {
        li.addEventListener('mouseenter', e => {
            if (li.dataset.active !== "true")
                li.style.backgroundColor = 'rgb(44, 44, 45)';
        });
        li.addEventListener('mouseleave', e => {
            if (li.dataset.active !== "true")
                li.style.backgroundColor = 'transparent';
        });
        li.addEventListener('click', e => {
            for (let _li of navLis) {
                if (_li !== li) {
                    _li.style.backgroundColor = 'transparent';
                    _li.dataset.active = "false";
                }
            }
            li.style.backgroundColor = 'rgb(30, 205, 152)';
            li.dataset.active = "true";
            contentBody.children[activeLi].style.display = "none";
            activeLi = index;
            contentBody.children[activeLi].style.display = "block";
        });
    })

    createListBtn.addEventListener('click', e => {
        if (createdList.children.length > 10) {
            alert('最多只能创建10个歌单!');
            return;
        }
        let li = document.createElement('li');
        li.innerText = `新建歌单${createdList.children.length}`;
        li.style.cursor = "default";
        li.addEventListener('mouseenter', e => {
            if (li.dataset.active !== "true")
                li.style.backgroundColor = 'rgb(44, 44, 45)';
        });
        li.addEventListener('mouseleave', e => {
            if (li.dataset.active !== "true")
                li.style.backgroundColor = 'transparent';
        });
        li.addEventListener('click', e => {
            for (let _li of navLis) {
                if (_li !== li) {
                    _li.style.backgroundColor = 'transparent';
                    _li.dataset.active = "false";
                    _li.setAttribute('contentEditable', 'false');
                }
            }
            li.style.backgroundColor = 'rgb(30, 205, 152)';
            li.dataset.active = "true";
        });
        li.addEventListener('dblclick', e => {
            li.style.position = "relative";
            let text = document.createElement('input');
            text.type = "text";
            text.style.width = "100%";
            text.style.height = "100%";
            text.style.position = "absolute";
            text.style.left = "0";
            text.style.outline = "none";
            text.value = li.innerText;
            text.style.fontSize = "16px";
            text.style.textIndent = "0.5em";
            text.addEventListener('blur', e => {
                for (let i = 1; i < createdList.children.length; i++) {
                    if (text.value === createdList.children[i].innerText && li !== createdList.children[i]) {
                        alert('歌单名重复!');
                        li.removeChild(text);
                        return;
                    }
                }
                if (text.value === "") {
                    alert('歌单名不能为空!');
                    li.removeChild(text);
                    return;
                }
                li.innerText = text.value;
            })
            li.appendChild(text);
            text.select();
            text.focus();
        });
        createdList.insertBefore(li, createdList.children[1]);
        actNavLeftBodyHeight += li.offsetHeight;
        navLis = document.querySelectorAll('.nav-sub-item li:nth-child(n+2)');
        createdList.style.height = "";
        createdList.style.overflow = "visible";
        createdList.dataset.show = "true";
        createdList.dataset.show = "true";
        createListToggleBtn.classList.add('icon-icon_arrow_bottom');
        createListToggleBtn.classList.remove('icon-icon_arrow_top');
        if (createdList.offsetHeight + collectedList.offsetHeight > 314) {
            scrollBar.style.display = "block";
            scrollBar.style.height = 696 - (createdList.offsetHeight + collectedList.offsetHeight - 320) + "px";
            // scrollBar.style.height = `calc(100% * ${(navLeftBody.offsetHeight - 10) / actNavLeftBodyHeight})`;
        }
        else scrollBar.style.display = "none";
    });

    createListToggleBtn.addEventListener('click', e => {
        createListToggleBtn.classList.toggle('icon-icon_arrow_top');
        createListToggleBtn.classList.toggle('icon-icon_arrow_bottom');
        let show = createdList.dataset.show;
        if (show === "true") {
            createdList.style.height = "67px";
            createdList.style.overflow = "hidden";
            createdList.dataset.show = "false"
        } else {
            createdList.style.height = "";
            createdList.style.overflow = "visible";
            createdList.dataset.show = "true";
        }
        if (createdList.offsetHeight + collectedList.offsetHeight > 314)
            scrollBar.style.display = "block";
        else scrollBar.style.display = "none";
    });

    collectedListToggleBtn.addEventListener('click', e => {
        e.target.classList.toggle('icon-icon_arrow_top');
        e.target.classList.toggle('icon-icon_arrow_bottom');
        let show = collectedList.dataset.show;
        if (show === "true") {
            collectedList.style.height = "67px";
            collectedList.style.overflow = "hidden";
            collectedList.dataset.show = "false"
        } else {
            collectedList.style.height = "";
            collectedList.style.overflow = "visible";
            collectedList.dataset.show = "true";
        }
        if (createdList.offsetHeight + collectedList.offsetHeight > 314)
            scrollBar.style.display = "block";
        else scrollBar.style.display = "none";
    });

    navLeftBody.addEventListener('scroll', e => {
        scrollBar.style.top = e.target.scrollTop + "px";
        // scrollBar.style.top = `calc(100% * ${e.target.scrollTop / actNavLeftBodyHeight})`;
    });

    navLeftBody.parentElement.addEventListener('mouseenter', e => {
        if (createdList.offsetHeight + collectedList.offsetHeight > 314)
            scrollBar.style.display = "block";
    });

    navLeftBody.parentElement.addEventListener('mouseleave', e => {
        scrollBar.style.display = "none";
    });

    let startY, scrollPress;
    scrollBar.addEventListener('mousedown', e => {
        startY = e.pageY;
        scrollPress = true;
    });

    scrollBar.addEventListener('mouseup', e => {
        scrollPress = false;
    });

    scrollBar.addEventListener('mousemove', e => {
        if (scrollPress) {
            scrollBar.style.top = 90 + e.target.scrollTop + e.pageY - startY + "px";
        }
    });
}

export { navLeftFn }
