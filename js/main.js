import { navLeftFn } from './nav-left.js';
import { menuTopFn } from './meun-top.js';
import { playingMessFn } from './playing-mess.js';
import { floatRightFn } from './float-right.js';
import { contentBodyFn } from './content-body.js';


let musicList = new Map();
musicList.set(0, {
    path: "./audio/Daoxiang zjl.mp3",
    info: "稻香-周杰伦"
});
musicList.set(1, {
    path: "./audio/Barricades.mp3",
    info: "Barricades-Mgxxx"
});
musicList.set(2, {
    path: "./audio/SymphonicSuite.mp3",
    info: "SymphonicSuite-Mgxxx"
});
musicList.set(3, {
    path: "./audio/The Reluctant Heroes.mp3",
    info: "The Reluctant Heroes-Mgxxx"
});
musicList.set(4, {
    path: "./audio/Zero Eclipse.mp3",
    info: "Zero Eclipse-Mgxxx"
});


window.onload = function () {
    navLeftFn();
    menuTopFn();
    playingMessFn();
    floatRightFn();
    contentBodyFn();
}

export { musicList }
