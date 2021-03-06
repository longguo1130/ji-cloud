import {renderTemplate as tmpl} from "@utils/template";
import modeChoosePage from "@templates/module/memory/edit/start-mode-choose.html";



export default {
  title: 'Modules/Memory/Edit',
}

export const ChooseMode = () =>
    tmpl(modeChoosePage, {

});

/*
TO MIGRATE:

import worderror from "@templates/module/memory/edit/memory-error.html";
import memorysteptwo from "@templates/module/memory/edit/memory-step-two.html";
import memorystepthree from "@templates/module/memory/edit/memory-step-three.html";
import memorystepfour from "@templates/module/memory/edit/memory-step-four.html";
import memorysuccess from "@templates/module/memory/edit/memory-success.html";
import memorysummary from "@templates/module/memory/edit/memory-summary.html";

export const MemoryStepTwo = () =>
    tmpl(memorysteptwo, {

});

export const MemoryStepThree = () =>
    tmpl(memorystepthree, {

});

export const MemoryStepFour = () =>
    tmpl(memorystepfour, {

});

export const MemorySuccess = () =>
    tmpl(memorysuccess, {

});
export const MemorySummary = () =>
    tmpl(memorysummary, {

});

export const AddWord = () =>  {
    const pageContainer = tmpl(memorystepone);

    const pageContents = tmpl(addword);

    appendId(pageContainer, "add-word-tooltip", pageContents);

    return pageContainer;
}

export const WordError = () =>  {
    const pageContainer = tmpl(memorystepone);

    const pageContents = tmpl(worderror);

    appendId(pageContainer, "memory-error", pageContents);

    return pageContainer;
}
*/