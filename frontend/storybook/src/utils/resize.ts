/* See https://codepen.io/dakom/pen/WNxYrQM */
/* This is slightly adapted to work on a containing element instead of window */


import {STAGE_WIDTH, STAGE_HEIGHT, STAGE_PADDING_X_PERC, STAGE_PADDING_Y_PERC} from "../../../../config/js/src/lib";

let cancelListener = null;

export function cancelResizer() {
    if(cancelListener != null) {
        console.log("canceling resizer");
        cancelListener();
        cancelListener = null;
    }
}

export function startResizerOnElement(element) {
    function resizeFit() {
        const targetRatio = STAGE_WIDTH / STAGE_HEIGHT;
        const bounds = element.getBoundingClientRect();
        let width = bounds.width;
        let height = bounds.height;
        const windowRatio = width / height;

        if (windowRatio > targetRatio ) {
            width = height * targetRatio;
        } else {
            height = width / targetRatio;
        }

        const x = bounds.x + ((bounds.width - width) / 2);
        const y = bounds.y + ((bounds.height - height) / 2);
        const scale = width / STAGE_WIDTH;

        //document.documentElement.style.setProperty('font-size', `calc(62.5% * ${scale})`);

        //help fix safari, use hard pixel values
        document.documentElement.style.setProperty('font-size', `calc(10px * ${scale})`);
        document.documentElement.style.setProperty('--scale', `${scale}`);
        document.documentElement.style.setProperty('--x', `${x}px`);
        document.documentElement.style.setProperty('--y', `${y}px`);
        document.documentElement.style.setProperty('--width', `${width}px`);
        document.documentElement.style.setProperty('--height', `${height}px`);
        document.documentElement.style.setProperty('--content-x', `${(STAGE_PADDING_X_PERC/2) * width}px`);
        document.documentElement.style.setProperty('--content-y', `${(STAGE_PADDING_Y_PERC/2) * height}px`);
        document.documentElement.style.setProperty('--content-width', `${width - (STAGE_PADDING_X_PERC * width)}px`);
        document.documentElement.style.setProperty('--content-height', `${height - (STAGE_PADDING_Y_PERC * height)}px`);
    }

    cancelResizer();

    if(!element || !element.getBoundingClientRect().width || !element.getBoundingClientRect().height) {
        return;
    }
    console.log("creating resizer");
    resizeFit();
    window.addEventListener("resize", resizeFit);
    cancelListener= () => {
        window.removeEventListener("resize", resizeFit);
    }
}