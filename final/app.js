const passportFar = document.querySelector('.passport-down')
const passportNear = document.querySelector('.passport-near');
const passportBottom = document.querySelector('.passport-bottom');

const personAvatar = document.querySelector('.person')

const acceptBtn = document.querySelector(`.accept-btn`);
const declineBtn = document.querySelector(`.decline-btn`);

const historyBtn = document.querySelector(`.history-btn`);
const instructionsBtn = document.querySelector(`.instructions-btn`);


const passportFlipBtn = document.querySelector('.passport-flip-btn');
const closeDocsBtn = document.querySelector(`.passport-close-btn`)

const workPermit = document.querySelector('.work-permit');
const studyPermit = document.querySelector('.study-permit');

const draggableDocuments = document.querySelectorAll(`.draggable-documents`);

const namesInfos = document.querySelectorAll('.names-info');
const genderInfos = document.querySelectorAll('.gender-info');
const passportExpInfo = document.querySelector('.passport-exp-info');
const expInfos = document.querySelectorAll('.exp-info');

const birthInfos = document.querySelectorAll(`.dob-info`);
const purposeInfo = document.querySelector(`.purpose-info`);

const visaInfoWrapper = document.querySelector(`.visa-info-wrapper`);
const visaProfileWrapper = document.querySelector(`.visa-profile-wrapper`);


const visaExpDate = document.querySelector(`.exp-visa-info`);
const extraExpDate = document.querySelectorAll(`.exp-extra-info`);

const gameWrapper = document.querySelector(`.game-wrapper`);
const passportInteracts = document.querySelectorAll(`.passport-interacts`);
const main = document.querySelector(`main`);

const entrantChat = document.querySelector(`.pleading`);

const entrantTotalStat = document.querySelector(`.total-number`)
const entrantAcceptedStat = document.querySelector(`.accepted-number`);
const entrantDeclinedStat = document.querySelector(`.declined-number`);
const entrantVisitorStat = document.querySelector(`.visitor-number`);

const errorStat = document.querySelector(`.error-number`);
const visitVisaInstruction = document.querySelector(`.visit-visa-instruction`);

// AUDIO
const flipPageSFX = new Audio('assets/sounds/pageflip-1.mp3');
const flipPage2SFX = new Audio('assets/sounds/pageflip-2.mp3');
const stampSFX = new Audio('assets/sounds/stamp.mp3');
const returnPassportSFX = new Audio('assets/sounds/closePassport.mp3');
const receivePassportSFX = new Audio('assets/sounds/receivePassport.mp3');
const buttonSFX = new Audio('assets/sounds/button.mp3');
const footstepSFX = new Audio('assets/sounds/footstep1.mp3');
const footstep2SFX = new Audio('assets/sounds/footstep2.mp3');
const footstep3SFX = new Audio('assets/sounds/footstep3.mp3');
const newsSFX = new Audio('assets/sounds/news.mp3');

const passportProfileImg = document.querySelectorAll('.profile-img');
const entrantImg = document.querySelector('.person');

const russianLastNames = ['Iranov', 'Petrov', 'Sidorov', 'Smirnoff', 'Volkov', 'Federov', 'Popov', 'Semenov', 'Mikhailov', 'Egorov', 'Lenkov', 'Vasiliev', 'Nikolaev', 'Morozov', 'Stepanov'];

const russianFemaleFirstNames = ['Sofia', 'Anastasia', 'Maria', 'Alina', 'Inessa'];

const russianMaleFirstNames = ['Aleksandr', 'Boris', 'Alexei', 'Daniiil', 'Leonid', 'Nikita', 'Anatoly', 'Igor', 'Ivan', 'Luka', 'Mikhail', 'Matvey', 'Lev', 'Yuri',
    'Maxim', 'Nikolai', 'Andrei'
];

const people = [];
const thankArray = [`Thank you`,`Glory to Moralis`];
const pleadArray = [`It will be one bullet in the head if I get conscripted.`, `You've seen the news right... I hope you understand my position`, `I refuse to take part in this meaningless war`, '...I have a family to live for.', `my daughter needs her father. I can't be conscripted.`, `please...if I go back I will be drafted...`,`I resigned from the army...they promised to put me in prison for traitor and deserter`]

const femalePleadArray = [`My husband is abroad...`]
const durationArray = [`1 day`, `2 days`, `3 days`, `4 days`, `5 days`, `6 days`, `7 days`, `8 days`, `9 days`, `10 days`, `11 days`, `12 days`, `12 days`, `13 days`, `14 days`, `15 days`, `16 days`, `17 days`, `18 days`, `19 days`, `20 days`, `21 days`, `22 days`, `23 days`, `24 days`, `25 days`, `26 days`, `27 days`, `28 days`, `about a month`, `2 months`, `3 months`];

const backgroundArray = [[`man.png`,`man2.png`,`man3.png`,`man4.png`,`man5.png`,`man6.png`,`man7.png`,`man8.png`,`man9.png`,`man10.png`,`man11.png`,`man12.png`],[`woman.png`,`woman2.png`,`woman3.png`,`woman4.png`,`woman5.png`]]


let purposeDialogue = ``;
let durationDialogue = ``;
let nameDialogue = ``;
let pleadingTxt = ``;

let entrantPleading = false;
let entrantContested = false;

let passportOpened = false;
let isDown = false;
let finalStamp = ` `;

var passportIsDown = false;
let extraIsDown = false;

let haveVisa = false;
let haveStudyPermit = false;
let haveWorkPermit = false;
let missingStudyPermit = false;
let missingWorkPermit = false

let havePassport = true;

let systemAnswer = '';
let errorName = ` `;
let waitingNext = false;

let typingSpeed = 30;
let paused = false;
let pauseTime = 750;
let pleadedOnce = false;

let totalRussians = 0;
let acceptedRussians = 0;
let declinedRussians = 0;
let visitorRussians = 0;
let errorMade = 0;
let russianTouristBanned = false;

let currentInput = '';
let currentPurpose = ``;

const voiceTxt = document.querySelector('.player-voice')
window.addEventListener('load', () => {
    createPerson();
    receivePassport();
    // setInterval(function () {
    //     voiceTxt.innerHTML = `You: ${currentInput}`;
    //     // console.log(currentInput);
    // }, 100);
    startAnnyang();
});

function startAnnyang() {
    if (annyang) {
        let commands = {
            '*input': showInput,
        };
        annyang.addCommands(commands);
        annyang.start();
    }
}


// show Player Voice
function showInput(input) {
    currentInput = `${capitalizeFirstLetter(input)}`;

    console.log("current input:" + currentInput);
    if (currentInput === 'Purpose of visit') {
        // voiceTxt.innerHTML = `PURPOSE OF YOUR TRIP?`
        entrantChatReset();
        entrantChat.innerHTML = purposeDialogue;


    } else if (currentInput === 'Hello') {
        // voiceTxt.innerHTML = `PURPOSE OF YOUR TRIP?`
        entrantChatReset();
        entrantChat.innerHTML = `Hello officer`;


    } else if (currentInput === `Name please` || currentInput === `What's your name` || currentInput === `What is your name`) {

        entrantChatReset();
        entrantChat.innerHTML = nameDialogue;
    }else if (currentInput === `Visit duration` || currentInput === `How long do you intend to stay`|| currentInput === `How long will you stay`) {
        // voiceTxt.innerHTML = `STAY DURATION?`
        entrantChatReset();
        entrantChat.innerHTML = durationDialogue;
    } else if (currentInput === `I can't` && entrantPleading && !passportOpened) {
        entrantChatReset();
        entrantChat.innerHTML = `You might as well kill me.`;
        
        setTimeout(() => {
            returnPassport();
        }, 1000);

        setTimeout(() => {
            walkAway();
           
            waitingNext = true;
        }, 5000);

        entrantPleading = false;
        declinedRussians++;
        updateStats();

      

    } else if (currentInput === `Next please`&& waitingNext || currentInput === `Next`&& waitingNext){
        callNext();
  
        createPerson();
        setTimeout(() => {
            receivePassport();
        }, 2000);
    } 
    voiceTxt.innerHTML = `You: ${currentInput}`;
}
window.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "n" && waitingNext) {
      // Cancel the default action, if needed
      event.preventDefault();
      callNext();
  
        createPerson();
        setTimeout(() => {
            receivePassport();
        }, 2000);
      // Trigger the button element with a click

    } else if (event.key ===`Enter` &&  entrantPleading && !passportOpened){
        entrantChatReset();
        entrantChat.innerHTML = `You might as well kill me.`;
        
        setTimeout(() => {
            returnPassport();
        }, 1000);

        setTimeout(() => {
            walkAway();
            
            waitingNext = true;
        }, 5000);

        entrantPleading = false;
        declinedRussians++;
        updateStats();

   
    }
  });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

passportNear.addEventListener('mousedown',
    function () {
        passportIsDown = true;
        extraIsDown = true;
        isDown = true
    });
studyPermit.addEventListener('mousedown',
    function () {
        isDown = true;
    });

workPermit.addEventListener('mousedown',
    function () {
        isDown = true;
    });

document.addEventListener('mouseup',
    function () {
        passportIsDown = false;
        extraIsDown = true;
        isDown = false
    });
document.addEventListener('mousemove', function (e) {
    e.preventDefault();

    // personPlead();
    if (passportIsDown && isDown) {
        // console.log(e.movementX,e.movementY);
        let movementX = e.movementX;
        let movementY = e.movementY;

        // else if (passportNear.offsetLeft )
        passportNear.style.left = passportNear.offsetLeft + movementX + 'px';
        passportNear.style.top = passportNear.offsetTop + movementY + 'px';
    } else if (extraIsDown && isDown) {
        // console.log(e.movementX,e.movementY);
        studyPermit.style.left = studyPermit.offsetLeft + e.movementX + 'px';
        studyPermit.style.top = studyPermit.offsetTop + e.movementY + 'px';

        workPermit.style.left = workPermit.offsetLeft + e.movementX + 'px';
        workPermit.style.top = workPermit.offsetTop + e.movementY + 'px';
    }
    // Limit boundaries

    for (let i = 0; i < draggableDocuments.length; i++) {
        if (draggableDocuments[i].offsetLeft < 0) {
            draggableDocuments[i].style.left = 0;
        }
        if (draggableDocuments[i].offsetTop < 0) {
            draggableDocuments[i].style.top = 0;
        }
        if (draggableDocuments[i].offsetLeft + draggableDocuments[i].offsetWidth > window.innerWidth) {
            draggableDocuments[i].style.left = `calc(${window.innerWidth}px - ${draggableDocuments[i].offsetWidth}px)`;
        }
        if (draggableDocuments[i].offsetTop + draggableDocuments[i].offsetHeight > window.innerHeight) {
            draggableDocuments[i].style.top = `calc(${window.innerHeight}px - ${draggableDocuments[i].offsetHeight}px)`;
        }
    }

});

passportNear.addEventListener("touchstart", () => {
    dragElement = passportNear;
    // console.log('touch downn')
});

let startX = 0,
    startY = 0;
passportNear.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
});

passportNear.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var deltaX = e.changedTouches[0].pageX - startX;
    var deltaY = e.changedTouches[0].pageY - startY;
    passportNear.style.left = passportNear.offsetLeft + deltaX + 'px';
    passportNear.style.top = passportNear.offsetTop + deltaY + 'px';
    //reset start-position for next frame/iteration
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;

});

// wait Time for the person to leave and the next one to come
// let waitTime = 5000;
passportFlipBtn.addEventListener(`click`, () => {
    if (passportBottom.getAttribute('data-flipped') === 'false') {
        passportBottom.setAttribute('data-flipped', 'true');
        flipPageSFX.play();
    } else {
        passportBottom.setAttribute('data-flipped', 'false');
        flipPage2SFX.play();
    }

})

closeDocsBtn.addEventListener(`click`, () => {

    // passportFar.classList.remove(`hidden`);
    // passportNear.classList.add(`hidden`);
    // passportOpened = false;
    // if(finalStamp ===`accept` || finalStamp === `decline`){

    passportFar.style.display = 'block';
    passportNear.classList.add(`hidden`);
    passportOpened = false;

    studyPermit.classList.add('hidden');
    workPermit.classList.add('hidden');
    // }
    // if(finalStamp===` `){
    //     alert(`you did not pick`)
    // }
    // THEY'RE GOOD SO YOU ACCEPTED
    if (systemAnswer === finalStamp && systemAnswer === `accept`) {
        alert('You did good! They were good.');
        returnPassport();

        entrantChatReset();
        entrantChat.innerHTML = `Thank You`;

        setTimeout(() => {
            walkAway();
            waitingNext = true;
        }, 2000);

      
        acceptedRussians++;
        if(currentPurpose ===`Visit`){
            visitorRussians++;
        }
        updateStats();
            
    
        
    }
    //THEY'RE WRONG SO YOU DECLINE
    else if (systemAnswer === finalStamp && systemAnswer === `decline`) {
        alert('You did good! They were bad.');
        plead();

        entrantPleading = true;
     
    } 
    // They're BAD, but you ACCEPT
    else if (systemAnswer === `decline` && finalStamp === `accept`) {
        alert(`That was a mistake. Their document had an ${errorName}`);
        
        if (entrantPleading){
            entrantChatReset();
            entrantChat.innerHTML = `I owe you my life.`;
            entrantPleading = false;
        }
        else if (!entrantPleading){
            entrantChatReset();
            entrantChat.innerHTML = `Thank You`;
        }

        errorMade++;
        acceptedRussians++;
        if(currentPurpose ===`Visit`){
            console.log('earjqporjwpq')
            visitorRussians++;
        }
        updateStats();
        returnPassport();

        setTimeout(() => {
            walkAway();
            waitingNext = true;
        }, 2000);

     

    }
    // IF THEYRE GOOD, BUT YOU DENY 
    else if (systemAnswer === `accept` && finalStamp === `decline`) {
        alert(`That was a mistake. They were clean`);
       
        entrantChatReset();
        entrantChat.innerHTML = `I will appeal this decision`;
        returnPassport();

        setTimeout(() => {
            waitingNext = true;
            walkAway();
        }, 2000);

        errorMade++;
        declinedRussians++;
        updateStats();
    }
    returnPassportSFX.play();
});
let error = 0;

// plead when entrance is denied
function plead() {
    entrantChatReset();
    // entrantChat.innerHTML = `Please. I need this.`;

    const randomPleadIndex = Math.floor(Math.random() * pleadArray.length);
    if (!pleadedOnce){
        pleadedOnce = true;
    entrantChat.innerHTML = pleadArray[randomPleadIndex];
    }
    else if(pleadedOnce){
        entrantChat.innerHTML = `Please...`;
    }
}

function entrantChatReset() {
    entrantChat.classList.remove('appear-left')
    void entrantChat.offsetWidth;
    entrantChat.classList.add('appear-left');
}

function updateStats(){

    totalRussians ++;
    entrantTotalStat.innerHTML = `Total: ${totalRussians}`;
    entrantAcceptedStat.innerHTML = `Accepted: ${acceptedRussians}`;
    entrantDeclinedStat.innerHTML = `Declined: ${declinedRussians}`;
    entrantVisitorStat.innerHTML = `Visitors: ${visitorRussians}`;
    errorStat.innerHTML = `Errors: ${errorMade}`;

   
}


function increaseError() {
    errorMade += 1;
    errorStat.innerHTML = `Errors: ${errorMade}`;
    // setTimeout(()=>{
    //     alert(`That was a mistake. Their document had an ${errorName}`);
    // },4500)

}

acceptBtn.addEventListener(`click`, () => {
   
    stampSFX.currentTime = 0;
    stampSFX.play();
    finalStamp = `accept`;
    acceptBtn.setAttribute('data-chosen', 'true');
    declineBtn.setAttribute('data-chosen', 'false');
    closeDocsBtn.classList.remove('hidden');
    // forcePlead();
});

declineBtn.addEventListener('click', () => {
   
    stampSFX.currentTime = 0;
    stampSFX.play();
    // passportFar.classList.remove(`hidden`);
    // passportNear.classList.add(`hidden`);
    // passportOpened = false;
    finalStamp = `decline`;
    declineBtn.setAttribute('data-chosen', 'true');
    acceptBtn.setAttribute('data-chosen', 'false');
    closeDocsBtn.classList.remove('hidden');
    // forcePlead();

})


passportFar.addEventListener('click', () => {
    if (!waitingNext) {
        closeDocsBtn.classList.add('hidden');

        openPassport();
        newsUpdate();
    }

    // workPermit.classList.remove(`hidden`);
    // studyPermit.classList.remove(`hidden`);

});

const tvScreen = document.querySelector('.tv-screen');
const tvHeadline = document.querySelector('.tv-headline');


let currentNews =0;
newsSFX.volume = 0.6;
function newsUpdate(){
    if (totalRussians ===0 && currentNews ===0){
        tvScreen.style.background=`url(assets/images/tv/flee.png) center center / cover no-repeat`
        tvHeadline.innerHTML =`700 000 Russians fled since Putin's partial mobilization`;
        tvHeadline.style.backgroundColor = `rgba(0, 0, 0, 0.466)`
        currentNews++;
        
        newsSFX.play();
    } else if (totalRussians ===2 && currentNews ===1){
        tvScreen.style.background=`url(assets/images/tv/protesterDetained.jpg) center center / cover no-repeat`
        tvHeadline.innerHTML =`Over 1,300 arrested in Russia as military call-up ignites widespread protests`;
        currentNews++;
        newsSFX.play();
    } else if (totalRussians ===4 && currentNews ===2){
        tvScreen.style.background=`url(assets/images/tv/russianDeath.jpg) center center / cover no-repeat`
        tvHeadline.innerHTML =`Russia officials confirm 5973 soldier deaths in Ukraine `;
        currentNews++;
        newsSFX.play();
    } else if (totalRussians === 5 && currentNews ===3){
        tvScreen.style.background=`url(assets/images/tv/eu-divided.jpg) center center / cover no-repeat`
        tvHeadline.innerHTML =`EU divided on response to Russians fleeing military service`;
        currentNews++;
        newsSFX.play();
    } else if (totalRussians ===8 && currentNews ===4){
        tvScreen.style.background=`url(assets/images/tv/kazakh.png) center center / cover no-repeat`
        tvHeadline.innerHTML =`Russians fleeing conscription to Kazakhstan should be 'cared for', Kazakh president said.`;
        currentNews++;
        newsSFX.play();
    } else if (acceptedRussians >= 9 && currentNews ===5){
        tvScreen.style.background=`url(assets/images/tv/finlandBorderClose.jpg) center center / cover no-repeat`
        tvHeadline.innerHTML =`Influx of 90 000 russians tourists in Moralis could create political instability in the country.`;
        currentNews++;
        newsSFX.play();
   
    }   else if (acceptedRussians >= 10 && currentNews ===6){
        tvScreen.style.background=`url(assets/images/tv/border.png) center center / cover no-repeat`
        tvHeadline.innerHTML =`Moralis starts building fence on Russian border`;
        currentNews++;
        newsSFX.play();
        russianTouristBanned = true;
    }  else if (acceptedRussians >= 12 && currentNews ===7){
        tvScreen.style.background=`url(assets/images/tv/border.png) center center / cover no-repeat`
        tvHeadline.innerHTML =`Moralis starts building fence on Russian border`;
        currentNews++;
        newsSFX.play();
     
    }  
}

passportNear.addEventListener('click', () => {
    passportNear.classList.add('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.remove('on-top');

});
workPermit.addEventListener('click', () => {
    passportNear.classList.remove('on-top');
    workPermit.classList.add('on-top');
    studyPermit.classList.remove('on-top');
});

studyPermit.addEventListener('click', () => {
    passportNear.classList.remove('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.add('on-top');

});

function receivePassport() {
    receivePassportSFX.play();
    passportFar.setAttribute('data-still', 'false');
    setTimeout(() => {
        passportFar.setAttribute('data-still', 'true');
    }, 500)
    passportFar.style.display = 'block';
    passportFar.classList.remove('passport-returned')
    passportFar.classList.remove('passport-received')
    void passportFar.offsetWidth;
    passportFar.classList.add('passport-received');
}

function returnPassport() {
    passportFar.classList.remove('passport-received')
    passportFar.classList.remove('passport-returned')
    void passportFar.offsetWidth;
    passportFar.classList.add('passport-returned');
    setTimeout(() => {
        passportFar.style.display = 'none';
    }, 500)

}


// Remove hidden from all documents
function openPassport() {
    updateTouristBan();
    passportBottom.setAttribute('data-flipped', 'false');
    //reset choices
    declineBtn.setAttribute('data-chosen', 'false');
    acceptBtn.setAttribute('data-chosen', 'false');
    finalStamp = ` `;

    passportFar.style.display = 'none';
    passportNear.classList.remove(`hidden`);
    passportOpened = true;

    if (haveWorkPermit && !missingWorkPermit) {
        workPermit.classList.remove('hidden');
    } else if (haveStudyPermit && !missingStudyPermit) {
        studyPermit.classList.remove('hidden');
    }

}
// SET A NEW DATE
// function getRandomDate(startDate, endDate) {
//     const minValue = startDate.getTime();
//     const maxValue = endDate.getTime();
//     const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
//     return new Date(timestamp);
// }

const instructionsTab = document.querySelector('.instructions-tab');
const historyTab = document.querySelector('.history-tab');

historyBtn.addEventListener('click', () => {
    buttonSFX.play()
    instructionsBtn.classList.toggle('active');
    historyBtn.classList.toggle('active');

    instructionsTab.classList.add('hidden');
    historyTab.classList.remove('hidden');
})

instructionsBtn.addEventListener('click',()=>{
    buttonSFX.play()
    instructionsBtn.classList.toggle('active');
    historyBtn.classList.toggle('active');
    instructionsTab.classList.remove('hidden');
    historyTab.classList.add('hidden');
})
// constructor function 
function PersonBlueprint() {

    this.randomizeSex = function () {
        const genderChance = Math.floor(Math.random() * 10);
        if (genderChance >= 2) {
            this.gender = 'Male';
            const randomImgIndex = Math.floor(Math.random() * backgroundArray[0].length);
            entrantImg.style.background = `url(./assets/images/profiles/${backgroundArray[0][randomImgIndex]}) center center / contain no-repeat`;

        
           
            for (let i = 0; i < passportProfileImg.length; i++) {
                passportProfileImg[i].style.background = `url(./assets/images/profiles/${backgroundArray[0][randomImgIndex]}) center center / cover no-repeat`;
                passportProfileImg[i].style.backgroundColor = `white`
            }
           
            
        } else {

            this.gender = 'Female';
            const randomImgIndex = Math.floor(Math.random() * backgroundArray[1].length);
            entrantImg.style.background = `url(./assets/images/profiles/${backgroundArray[1][randomImgIndex]}) center center / contain no-repeat`;

            
            for (let i = 0; i < passportProfileImg.length; i++) {
                passportProfileImg[i].style.background = `url(./assets/images/profiles/${backgroundArray[1][randomImgIndex]}) center center / cover no-repeat`;
                passportProfileImg[i].style.backgroundColor = `white`
            }
        }
    }


    this.randomizeName = function () {
        // **************calculate firstNameIndex**************
        if (this.gender === 'Female') {
            this.firstNameIndex = Math.floor(Math.random() * russianFemaleFirstNames.length);
            this.firstName = russianFemaleFirstNames[this.firstNameIndex]
            // return this.firstName;
        } else if (this.gender === 'Male') {
            //calculate firstNameIndex
            this.firstNameIndex = Math.floor(Math.random() * russianMaleFirstNames.length);
            this.firstName = russianMaleFirstNames[this.firstNameIndex]
        }
        // ***********************calculate last name************************
        this.lastNameIndex = Math.floor(Math.random() * russianLastNames.length);
        this.lastName = russianLastNames[this.lastNameIndex];
        nameDialogue = `${this.firstName} ${this.lastName}`;
    }
    this.randomizeExpDate = function () {
        const minValue = new Date(2023, 2, 1).getTime();
        const maxValue = new Date(2027, 0, 1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.expDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeBirthDate = function () {
        const minValue = new Date(1971, 0, 1).getTime();

        const maxValue = new Date(2002, 0, 1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.birthDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeVisaExpDate = function () {
        const minValue = new Date(2023, 2, 1).getTime();
        const maxValue = new Date().getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.visaExpDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeExtraExpDate = function () {
        const minValue = new Date(2023, 2, 1).getTime();
        const maxValue = new Date(2027, 0, 1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.extraExpDate = new Date(timestamp).toLocaleDateString('en-US');
    }

    this.randomizePurpose = function () {
        const purposeChance = Math.floor(Math.random() * 7);
        //reset variables to false by default
        haveWorkPermit = false;
        haveStudyPermit = false;
        if (purposeChance <= 3) {
            this.visaPurpose = 'Visit';
            purposeInfo.innerHTML = 'Visit';
            purposeDialogue = `I'm here to visit my family.`;
            console.log(this.visaPurpose);
        } else if (purposeChance === 4 ) {
            this.visaPurpose = 'Work';
            purposeInfo.innerHTML = 'Work';
            purposeDialogue = `I'm here for work.`;
            console.log(this.visaPurpose);
            haveWorkPermit = true;
        } else if (purposeChance === 5) {
            
            this.visaPurpose = 'Study';
            purposeInfo.innerHTML = 'Study';
            purposeDialogue = `I'm an international student studying in Moralis.`;
            console.log(this.visaPurpose);
            haveStudyPermit = true;
        } else if (purposeChance === 6) {
            
            this.visaPurpose = 'Humanitarian';
            
            purposeInfo.innerHTML = 'Humanitarian';
            purposeDialogue = `I come here to seek refuge from the Kremlin.`;
            console.log(this.visaPurpose);
        }
        currentPurpose =  this.visaPurpose;
      
        // else if (purposeChance === 9){
        //       this.visaPurpose = 'FamilyReasons';
        //     purposeInfo.innerHTML = 'Family Reasons';
        //     purposeDialogue = `My family, a citizen of Moralis, would like .`;
        // }
    }
    this.randomizeDurationDialogue = function () {
        const randomDurationIndex = Math.floor(Math.random() * durationArray.length);
        durationDialogue = durationArray[randomDurationIndex];
    }
    // this.randomizeNationality = function(person){

    // }
    this.assignInfos = function () {
        for (let i = 0; i < namesInfos.length; i++) {
            namesInfos[i].innerHTML = `${this.firstName} ${this.lastName}`;
        }

        for (let i = 0; i < genderInfos.length; i++) {
            genderInfos[i].innerHTML = `${this.gender}`;
        }

        passportExpInfo.innerHTML = `${this.expDate}`;
        visaExpDate.innerHTML = `${this.visaExpDate}`;
        for (let i = 0; i < birthInfos.length; i++) {
            birthInfos[i].innerHTML = `${this.birthDate}`;
        }

        for (let i = 0; i < extraExpDate.length; i++) {
            extraExpDate[i].innerHTML = `${this.extraExpDate}`;
        }
        // console.log(this.expDate);
        // console.log(passportExpInfo[0].innerHTML);
    }
    this.errorRandomize = function (person) {
        // const errorInfo = false;
        resetMissingDocs();
        this.typeError = `none`;
        systemAnswer = 'accept';
        // 1 out of 6 chances for having an error
        const errorChance = Math.floor(Math.random() * 8)
        if (errorChance < 3) {
            // 1 out of 4 chances for having a NAME error
            const typeErrorChance = Math.floor(Math.random() * 1)
            if (typeErrorChance === 0) {
                alert('incorrect name')
                this.typeError = 'Incorrect Name';
                errorName = 'Incorrect Name';
                console.log(person);
                assignWrongName(person);
                systemAnswer = 'decline';

            } else if (typeErrorChance === 1) {
                alert('expired doc')
                this.typeError = 'Expired Document';
                errorName = 'Expired Document';
                assignExpiredDate(person)
                systemAnswer = 'decline';
                // else if (typeErrorChance >=2 && typeErrorChance <=3){
                //     dateError();
                // }
            } else if (typeErrorChance === 2) {
                alert('incorrect dob')
                this.typeError = 'Incorrect DOB';
                errorName = 'Incorrect DOB';
                assignWrongDOB(person);
                systemAnswer = 'decline';
            } else if (typeErrorChance === 3) {
                alert('missing docs')
                this.typeError = 'Missing Documents';
                errorName = 'Missing Documents';
                removeMissingDocs(person);
                systemAnswer = 'decline';
            } else if (typeErrorChance ===4){
                alert('invalid visa')
                this.typeError = 'Invalid Visa Purpose';
                errorName = 'Invalid Visa Purpose';
                this.visaPurpose = 'Fun';
                purposeInfo.innerHTML = 'Fun';
                systemAnswer = 'decline';
            }
            // else if (typeErrorChance ===1){
            //     systemAnswer ='Bad'
            // }
            // errorInfo = true;
        }
        // if not, they're good!
        else if (errorChance >= 3) { 
           
        }
        if (russianTouristBanned){
            this.typeError ='Invalid Visa Purpose';
            errorName = 'Invalid Visa Purpose';
            systemAnswer = `decline`;
        }
    }
}
// reset all documents and unhide them
function resetMissingDocs() {
    if (visaInfoWrapper.classList.contains("hidden")) {
        visaInfoWrapper.classList.remove("hidden")
        visaProfileWrapper.classList.remove("hidden")
    } 
    else if (!workPermit.classList.contains('hidden')) {
        workPermit.classList.add('hidden')
    } else if (!studyPermit.classList.contains('hidden')) {
        studyPermit.classList.add('hidden')
    }
}

function removeMissingDocs(person) {
    missingWorkPermit = false;
    missingStudyPermit = false;

  console.log(person)
    if (person.visaPurpose === `Visit` || person.visaPurpose === `Humanitarian`) {
        // let docError = Math.floor(Math.random()*4);
        // if (docError === 1){
            console.log(`visit or humanita`)
        // }
        visaInfoWrapper.classList.add('hidden');
        visaProfileWrapper.classList.add('hidden');
    } else if (person.visaPurpose === `Work`) {
        console.log(`work `)
        // workPermit.classList.add('hidden');
        missingWorkPermit = true;
        
    } else if (person.visaPurpose === `Study`) {
        console.log(`study`)
        // studyPermit.classList.add('hidden');
        missingStudyPermit = true;
    }
}

// TIE RANDOM CHANCE TO THE INDEX OF namesInfos
function assignWrongName(person) {
    console.log(person);
    // const personVariable = person
    //REROLL IF THEY DONT HAVE CERTAIN DOCUMENTS

    let newLastName = russianLastNames[randomizeWrongName(person)];
    namesInfos[randomizeWrongDoc()].innerHTML = `${person.firstName} ${newLastName}`;

    //array
    // namesInfos[docError]
}

function assignWrongDOB(person) {

    birthInfos[randomizeWrongDoc()].innerHTML = `${randomizeWrongDOB(person)}`;
}
// RANDOM CHANCE TO HAVE DOB
function randomizeWrongDOB(person) {
    const minValue = new Date(1971, 0, 1).getTime();
    const maxValue = new Date(2002, 0, 1).getTime();
    const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    const badDOB = new Date(timestamp).toLocaleDateString('en-US');
    return (person.birthDate === badDOB) ? randomizeWrongDOB(person) : badDOB
}

function randomizeWrongName(person) {
    let newLastNameIndex = Math.floor(Math.random() * russianLastNames.length);

    // if (newLastNameIndex === person.lastNameIndex ){
    //    alert('fuck');
    //     console.log(counter + 1)
    //     return randomizeWrongName(person);
    // }
    // else {
    //     return newLastNameIndex;
    //     console.log('rerolling name');

    // }
    // console.log(person.lastNameIndex);
    // console.log(newLastNameIndex);
    return (newLastNameIndex === person.lastNameIndex) ? randomizeWrongName(person) : newLastNameIndex
}

function randomizeWrongDoc() {
    let docError = Math.floor(Math.random() * 4);
    console.log('before' + docError)
    if (haveWorkPermit) {
        //then they don't have a study permit
        if (docError === 1) {
            return randomizeWrongDoc();
            console.log('no study permit' + docError);
        }
    } else if (haveStudyPermit) {
        //then they don't have a work permit
        if (docError === 0) {
            return randomizeWrongDoc();
            console.log('no work permit' + docError);
        }
    } else if (!haveWorkPermit && !haveStudyPermit) {
        // then they don't have a study or a work permit
        if (docError < 2) {
            return randomizeWrongDoc();
            console.log('no permit' + docError);
        }
    }
    return docError
}

function assignExpiredDate(person) {
    const minValue = new Date(2022, 8, 21).getTime();
    const maxValue = new Date(2005, 0, 1).getTime();
    const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    const badExpDate = new Date(timestamp).toLocaleDateString('en-US');
    expInfos[randomizeWrongDoc()].innerHTML = `${badExpDate}`;
}


// this.name = function(){
//     // If gender is female,

//     if (this.gender() === 'Female'){
//         //calculate firstNameIndex
//         const firstNameIndex = Math.floor(Math.random() * russianFemaleFirstNames.length);


//         return  russianFemaleFirstNames[firstNameIndex];
//     }
// }

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {


        // console.log(getRandomDate(new Date(2018,0,1), new Date(2021,11,31)).toLocaleDateString('en-US'));
    }


    // do something
});
function callNext(){
    personAvatar.classList.remove('walk-outside')
    personAvatar.classList.remove('walk-inside')
    personAvatar.classList.remove('walk-towards')
    void personAvatar.offsetWidth;
    personAvatar.classList.add('walk-towards');
    footstepSFX.play();
 
}
function walkAway() {
    personAvatar.classList.remove('walk-outside');
    personAvatar.classList.remove('walk-inside');
    personAvatar.classList.remove('walk-towards');
    void personAvatar.offsetWidth;
    if (finalStamp === `accept`) {
        personAvatar.classList.add('walk-inside')
        footstep3SFX.play();
    } else if (finalStamp === `decline`) {
        personAvatar.classList.add('walk-outside');
        footstep2SFX.play();
    }
    
}
function createPerson() {
  
    pleadedOnce = false;
    waitingNext = false;

    const person = new PersonBlueprint()
    person.randomizeSex();
    person.randomizeName();
    person.randomizeExpDate();
    person.randomizeBirthDate();
    person.randomizePurpose();
    person.randomizeVisaExpDate();
    person.randomizeExtraExpDate()
    person.randomizeDurationDialogue();
    person.assignInfos();
    person.errorRandomize(person);

    // console.log(person.randomizeName());

    console.log(person.gender, person.firstName, person.lastName, person.expDate);
    //pushing people into an array
    people.push(person);
    console.log(people);
    return person;
}

function updateTouristBan(){
    if (russianTouristBanned){
        visitVisaInstruction.innerHTML = `VISITOR NO LONGER ACCEPTED`
        visitVisaInstruction.classList.add(`visit-banned`);
    }
}


function getRandomDate(startDate, endDate) {
    const minValue = startDate.getTime();
    const maxValue = endDate.getTime();
    // console.log(minValue)
    // console.log(maxValue)
    const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    return new Date(timestamp);
}

// const possiblePleadings = ['We were promised that there would be no mobilization. We feel betrayed. The Kremlin lies, all the time. They look at us like toys.','I would be a terrible soldier. It would be just one bullet to the head.','There is a huge repressive machine that is the internal riot police, 400 k people, half a million people who are trained to suppress protest.'];

// function personPlead(){

//     // if not pleaded, then have a 1 out of 5000 chances of pleading when mouse move.
//     if (!pleaded){
//         const pleadChance = Math.floor(Math.random()*1000);
//         if (pleadChance <= 5){
//             pleadingP.classList.remove('hidden');
//             typeText();
//             console.log('wtf');
//             pleaded = true;
//         }
//     }
// }
// function forcePlead(){
//     if (!pleaded){
//         pleadingP.classList.remove('hidden');
//         typeText();
//         pleaded = true;
//     }
// }

// function setData() {
// const randomPleadIndex = Math.floor(Math.random() * possiblePleadings.length);
//     const text = possiblePleadings[randomPleadIndex]
//     possiblePleadings.splice(randomPleadIndex,1);
//     return [text, pleadingP]
//     };


let entrants;

function checkEndGame() {
    entrants = possiblePleadings.length;
    // console.log(entrants);
    if (entrants === 0) {
        console.log('game over')
        alert('game over')

    }
}


// function typeText() {
//     // let typingSpeed =10;
//     checkEndGame()
//     pleadingP.innerHTML ='';
//     // res is an array 
//     const res = setData();
//     const txt = res[0];
//     console.log(possiblePleadings)
//     // if (txt.length < 100){
//     //     typingSpeed =10;;;
//     // }
//     // else if (txt.length >= 100){
//     //     typingSpeed =5;;
//     // }
//     // console.log(res);
//     // const areaText = res[1];
//     let i = 0;
//     const timerId = setInterval(() => {
//     if (!paused){
//         pleadingP.innerHTML += txt.charAt(i);
//         i++;
//         if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
//             pauseInterval();           
//         }
//         if (i === txt.length) {
//         clearInterval(timerId);
//     }
// }
//     },typingSpeed);
// }

// function pauseInterval(){
//     paused =true;
//     setTimeout(resumeInterval, pauseTime);
// }
//  function resumeInterval(){
//      paused =false;
// }
// console.log(getRandomDate(new Date(2020,0,1), new Date(2020,0,6)).toLocaleDateString('en-US'));
// const personBlueprint ={
//     gender: function(){
//         const genderChance = Math.floor(Math.random() * 10);
//         if (genderChance >= 7){
//             return 'Male';
//         }
//         else{
//             return 'Female';
//         }
//     },
//     number: function (){
//       return 155;
//     }
//   }

//   console.log(personBlueprint.gender());

// 

//   const person = new Person('Fafaf','sada',44,'female','sadmess')
//   person.bio();





// function getRandomBirthday(){
//     if (person.age = )[


//     ]


// }

// *************************
// *************************
// *************************

// class Person {

//     name;

//     constructor(name) {
//       this.name = name;
//     }

//     introduceSelf() {
//       console.log(`Hi! I'm ${this.name}`);
//     }

//   }

//   class Professor extends Person {

//     teaches;

//     constructor(name, teaches) {
//       super(name);
//       this.teaches = teaches;
//     }

//     introduceSelf() {
//       console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);
//     }

//     grade(paper) {
//       const grade = Math.floor(Math.random() * (5 - 1) + 1);
//       console.log(grade);
//     }
//   }

//   const walsh = new Professor('Walsh', 'Psychology');
// walsh.introduceSelf();  // 'My name is Walsh, and I will be your Psychology professor'

// walsh.grade('my paper'); // some random grade

//   const giles = new Person('Giles');

//   giles.introduceSelf(); // Hi! I'm Giles

// *************************
// *************************
// *************************

// function PrototypicalGreeting(greeting = "Hello", name = "World") {
//     this.greeting = greeting;
//     this.name = name;
//     // this.greet = function(){
//     //     return `${this.greeting}, ${this.name}!`;
//     // }
//   }

//   PrototypicalGreeting.prototype.greet = function() {
//     return `${this.greeting}, ${this.name}!`
//   }





// if (date1 > date2) {
//   console.log("Date 1 is greater than Date 2");
// } else if (date1 < date2) {
//   console.log("Date 1 is less than Date 2");
// } else {
//   console.log("Both Dates are same");
// }