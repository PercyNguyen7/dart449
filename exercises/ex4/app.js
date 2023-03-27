const passportFar = document.querySelector('.passport-down')
const passportClose = document.querySelector('.passport-near');
const passportBottom = document.querySelector('.passport-bottom');


const acceptBtn = document.querySelector(`.accept-btn`);
const declineBtn = document.querySelector(`.decline-btn`);

const passportFlipBtn = document.querySelector('.passport-flip-btn');
const closeDocsBtn = document.querySelector(`.passport-close-btn`)

const workPermit = document.querySelector('.work-permit');
const studyPermit = document.querySelector('.study-permit');



let passportOpened = false;
let finalStamp = ``;

    passportFlipBtn.addEventListener(`click`, ()=>{
        if (passportBottom.getAttribute('data-flipped')==='false'){
            passportBottom.setAttribute('data-flipped','true');
        }
        else {
            passportBottom.setAttribute('data-flipped','false');

        }
        
    })

    closeDocsBtn.addEventListener(`click`,()=>{
    
        // passportFar.classList.remove(`hidden`);
        // passportClose.classList.add(`hidden`);
        // passportOpened = false;
        if(finalStamp ===`accept` || finalStamp === `decline`){
            passportFar.classList.remove(`hidden`);
            passportClose.classList.add(`hidden`);
            passportOpened = true;    

            studyPermit.classList.add('hidden');
            workPermit.classList.add('hidden');
        }
     
    });

acceptBtn.addEventListener(`click`,()=>{
   
    // passportFar.classList.remove(`hidden`);
    // passportClose.classList.add(`hidden`);
    // passportOpened = false;

    finalStamp = `accept`;
    acceptBtn.setAttribute('data-chosen','true');
    declineBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden');
    
});

declineBtn.addEventListener('click',()=>{

    // passportFar.classList.remove(`hidden`);
    // passportClose.classList.add(`hidden`);
    // passportOpened = false;
    finalStamp = `decline`;
    declineBtn.setAttribute('data-chosen','true');
    acceptBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden')
})

passportFar.addEventListener('click',()=>{
    openPassport();
   
    // workPermit.classList.remove(`hidden`);
    // studyPermit.classList.remove(`hidden`);
    console.log('click');
    
});

passportClose.addEventListener('click',()=>{


    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    console.log('click');
    passportClose.classList.add('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.remove('on-top');

});
workPermit.addEventListener('click',()=>{


    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    console.log('click');
    passportClose.classList.remove('on-top');
    workPermit.classList.add('on-top');
    studyPermit.classList.remove('on-top');

});

studyPermit.addEventListener('click',()=>{
    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    console.log('click');
    passportClose.classList.remove('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.add('on-top');

});
function openPassport(){
    studyPermit.classList.remove('hidden')
    passportFar.classList.add(`hidden`);
    passportClose.classList.remove(`hidden`);
    passportOpened = true;
}