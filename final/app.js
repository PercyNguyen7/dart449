const passportFar = document.querySelector('.passport-down')
const passportNear = document.querySelector('.passport-near');
const passportBottom = document.querySelector('.passport-bottom');

const personAvatar = document.querySelector('.person')

const acceptBtn = document.querySelector(`.accept-btn`);
const declineBtn = document.querySelector(`.decline-btn`);

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

const pleadingP = document.querySelector(`.pleading`);
let pleadingTxt = ``;

let passportOpened = false;
let isDown = false;
let finalStamp = ` `;

let dragElement;
let dragElement2;

var passportIsDown=false;
let extraIsDown = false;

let haveVisa = false;
let haveStudyPermit = false;
let haveWorkPermit = false;
let havePassport = true;

let systemAnswer ='';
let errorName = ` `;
let waitingNext = false;

let typingSpeed = 30;
let paused = false;
let pauseTime = 750;
let pleaded = false;

let acceptedRussians =0;


passportNear.addEventListener('mousedown',
function(){passportIsDown=true;
    extraIsDown=true;
    isDown = true});
studyPermit.addEventListener('mousedown',
    function(){isDown=true;});

    workPermit.addEventListener('mousedown',
    function(){isDown=true;
    });

document.addEventListener('mouseup',
    function(){passportIsDown=false;
    extraIsDown=true;
    isDown = false});
document.addEventListener('mousemove',function(e) {
  e.preventDefault();
 
    personPlead();
  if (passportIsDown && isDown ) {
    // console.log(e.movementX,e.movementY);
    let movementX = e.movementX;
    let movementY = e.movementY;

    // else if (passportNear.offsetLeft )
    passportNear.style.left = passportNear.offsetLeft + movementX + 'px';
    passportNear.style.top  = passportNear.offsetTop + movementY + 'px';
  }
  else if (extraIsDown && isDown){
    // console.log(e.movementX,e.movementY);
    studyPermit.style.left = studyPermit.offsetLeft + e.movementX + 'px';
    studyPermit.style.top  = studyPermit.offsetTop + e.movementY + 'px';
   
    workPermit.style.left = workPermit.offsetLeft + e.movementX + 'px';
    workPermit.style.top  = workPermit.offsetTop + e.movementY + 'px';
}
  // Limit boundaries

for (let i = 0; i<draggableDocuments.length; i++){
  if (draggableDocuments[i].offsetLeft <0){
    draggableDocuments[i].style.left = 0;
 }  if (draggableDocuments[i].offsetTop <0){
     draggableDocuments[i].style.top = 0;
  }   if (draggableDocuments[i].offsetLeft + draggableDocuments[i].offsetWidth> window.innerWidth){
     draggableDocuments[i].style.left =  `calc(${window.innerWidth}px - ${draggableDocuments[i].offsetWidth}px)`; 
  }
  if (draggableDocuments[i].offsetTop + draggableDocuments[i].offsetHeight> window.innerHeight){
     draggableDocuments[i].style.top =  `calc(${window.innerHeight}px - ${draggableDocuments[i].offsetHeight}px)`;
  }
}

});

passportNear.addEventListener("touchstart",()=>{
    dragElement = passportNear;
    // console.log('touch downn')
});

var startX=0, startY=0;
passportNear.addEventListener('touchstart',function(e) {
  startX = e.changedTouches[0].pageX;
  startY = e.changedTouches[0].pageY;
});

passportNear.addEventListener('touchmove',function(e) {
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
let waitTime = 5000;
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
        // passportNear.classList.add(`hidden`);
        // passportOpened = false;
        // if(finalStamp ===`accept` || finalStamp === `decline`){
           
            passportFar.style.display ='block';
            passportNear.classList.add(`hidden`);
            passportOpened = true;    
        
            studyPermit.classList.add('hidden');
            workPermit.classList.add('hidden');
        // }
            if(finalStamp===` `){
                alert(`you did not pick`)
            }
            else if(systemAnswer === finalStamp){
                alert('You did good!');
            }
            else if (systemAnswer !== finalStamp){
                penalizePlayer()
               
            }
            returnPassport();
            setTimeout(()=>{
                walkAway();
            },1000);
           
            waitingNext = true;
            pleadingP.classList.add('hidden');
            setTimeout(()=>{
                waitingNext = false;
                pleaded = false;
                receivePassport();
            },waitTime);
    });
let error = 0;

function penalizePlayer(){
    error +=1;
    setTimeout(()=>{
        alert(`That was a mistake. Their document had an ${errorName}`);
    },4500)
    
}

acceptBtn.addEventListener(`click`,()=>{
    finalStamp = `accept`;
    acceptBtn.setAttribute('data-chosen','true');
    declineBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden');
    forcePlead();
});

declineBtn.addEventListener('click',()=>{
    // passportFar.classList.remove(`hidden`);
    // passportNear.classList.add(`hidden`);
    // passportOpened = false;
    finalStamp = `decline`;
    declineBtn.setAttribute('data-chosen','true');
    acceptBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden');
    forcePlead();
    
})

passportFar.addEventListener('click',()=>{
    if (!waitingNext){
        closeDocsBtn.classList.add('hidden')    
    createPerson();
    openPassport();
}

    // workPermit.classList.remove(`hidden`);
    // studyPermit.classList.remove(`hidden`);
    
});

passportNear.addEventListener('click',()=>{

    passportNear.classList.add('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.remove('on-top');

});
workPermit.addEventListener('click',()=>{
    passportNear.classList.remove('on-top');
    workPermit.classList.add('on-top');
    studyPermit.classList.remove('on-top');
});

studyPermit.addEventListener('click',()=>{
    passportNear.classList.remove('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.add('on-top');

});

function receivePassport(){
    passportFar.setAttribute('data-still','false');
    setTimeout(()=>{passportFar.setAttribute('data-still','true');
    },500)
    passportFar.style.display ='block';
    passportFar.classList.remove('passport-returned')
    passportFar.classList.remove('passport-received')
    void passportFar.offsetWidth;
    passportFar.classList.add('passport-received');
}

function returnPassport(){
    passportFar.classList.remove('passport-received')
    passportFar.classList.remove('passport-returned')
    void passportFar.offsetWidth;
    passportFar.classList.add('passport-returned');
    setTimeout(()=>{
        passportFar.style.display ='none';
    },500)
   
}

function walkAway(){
    if(finalStamp ===`accept`){
        personAvatar.classList.remove('walk-inside')
        void personAvatar.offsetWidth;
        personAvatar.classList.add('walk-inside')
    }
    else {
        personAvatar.classList.remove('walk-outside')
        void personAvatar.offsetWidth;
        personAvatar.classList.add('walk-outside')
    console.log(personAvatar);
    }
}
// Remove hidden from all documents
function openPassport(){
    passportBottom.setAttribute('data-flipped','false');
    //reset choices
    declineBtn.setAttribute('data-chosen','false');
    acceptBtn.setAttribute('data-chosen','false');
    finalStamp = ` `;



    passportFar.style.display ='none';
    passportNear.classList.remove(`hidden`);
    passportOpened = true;


    if (haveWorkPermit){
        workPermit.classList.remove('hidden');
    }
    else if (haveStudyPermit){
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


const russianLastNames = ['Iranov', 'Petrov'
, 'Sidorov', 'Smirnoff', 'Volkov', 'Federov', 'Popov','Semenov','Mikhailov', 'Egorov','Lenkov','Vasiliev','Nikolaev','Morozov','Stepanov'
];

const russianFemaleFirstNames = ['Sofia','Anastasia','Maria','Alina','Inessa'];

const russianMaleFirstNames = ['Aleksandr','Boris','Alexei','Daniiil','Leonid','Nikita','Anatoly','Igor','Ivan','Luka','Mikhail','Matvey','Lev','Yuri',
'Maxim','Nikolai','Andrei'];

 const people =[];

// constructor function 
function PersonBlueprint(){ 
 
    this.randomizeGender = function(){
        const genderChance = Math.floor(Math.random() * 10);
        if (genderChance >= 2){
              this.gender = 'Male';
            // return 'Male';
        }
        else{
              this.gender = 'Female';
            // return 'Female';
        }
    }

    this.randomizeName = function(){
                // **************calculate firstNameIndex**************
        if (this.gender === 'Female'){
            this.firstNameIndex = Math.floor(Math.random()  * russianFemaleFirstNames.length);
            this.firstName = russianFemaleFirstNames[this.firstNameIndex]
            // return this.firstName;
        }
        else if (this.gender === 'Male'){
            //calculate firstNameIndex
            this.firstNameIndex = Math.floor(Math.random()  * russianMaleFirstNames.length);
            this.firstName = russianMaleFirstNames[this.firstNameIndex]
        }
      // ***********************calculate last name************************
        this.lastNameIndex = Math.floor(Math.random() * russianLastNames.length);
        this.lastName = russianLastNames[this.lastNameIndex];
    }
    this.randomizeExpDate = function(){
        const minValue = new Date(2023,2,1).getTime();
        const maxValue = new Date(2027,0,1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.expDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeBirthDate = function(){
        const minValue = new Date(1971,0,1).getTime();

        const maxValue = new Date(2002,0,1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.birthDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeVisaExpDate = function(){
        const minValue = new Date(2022,9,1).getTime();
        const maxValue = new Date().getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.visaExpDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeExtraExpDate = function(){
        const minValue = new Date(2023,2,1).getTime();
        const maxValue = new Date(2027,0,1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.extraExpDate = new Date(timestamp).toLocaleDateString('en-US');
    }

    this.randomizePurpose = function(){
        const purposeChance = Math.floor(Math.random() * 10);
        //reset variables to false by default
        haveWorkPermit = false;
        haveStudyPermit = false;
        if (purposeChance <=3){
            this.visaPurpose = 'Visit';
            purposeInfo.innerHTML = 'Visit';
        }
        else if (purposeChance === 4 || purposeChance ===5){
            this.visaPurpose = 'Work';
            purposeInfo.innerHTML = 'Work';
            haveWorkPermit = true;
        }
        else if (purposeChance === 6 || purposeChance ===7){
            this.visaPurpose = 'Study';
            purposeInfo.innerHTML = 'Study';
            haveStudyPermit = true;
        }
        else if (purposeChance === 8){
              this.visaPurpose = 'Humanitarian';
            purposeInfo.innerHTML = 'Humanitarian';
        }
        else if (purposeChance === 9){
              this.visaPurpose = 'FamilyReasons';
            purposeInfo.innerHTML = 'Family Reasons';
        }
    }
    // this.randomizeNationality = function(person){
        
    // }
    this.assignInfos = function(){
        for (let i = 0; i< namesInfos.length; i++) {
            namesInfos[i].innerHTML = `${this.firstName} ${this.lastName}`;
        }

        for (let i = 0; i< genderInfos.length; i++) {
            genderInfos[i].innerHTML = `${this.gender}`;
        }

            passportExpInfo.innerHTML = `${this.expDate}`;
            visaExpDate.innerHTML = `${this.visaExpDate}`;
        for (let i = 0; i< birthInfos.length; i++){
            birthInfos[i].innerHTML = `${this.birthDate}`;
        }
            
        for (let i = 0; i< extraExpDate.length; i++){
            extraExpDate[i].innerHTML = `${this.extraExpDate}`;
        }
        // console.log(this.expDate);
        // console.log(passportExpInfo[0].innerHTML);
    }
    this.errorRandomize = function(person){
        // const errorInfo = false;
        this.typeError = `none`;
        systemAnswer = 'accept';
        // 1 out of 3 chances for having an error
        const errorChance = Math.floor(Math.random()*3)
        if (errorChance <3){
        // 1 out of 4 chances for having a NAME error
            const typeErrorChance = Math.floor(Math.random()*4)
            if (typeErrorChance ===0){
                //  alert('incorrect name')
              this.typeError = 'Incorrect Name';
              errorName = 'Incorrect Name';
            console.log(person);
            assignWrongName(person);
            systemAnswer = 'decline';
            
            }
            else if (typeErrorChance=== 1 ){
                //  alert('expired doc')
                this.typeError = 'Expired Document';
                errorName = 'Expired Document';
                assignExpiredDate(person)
                systemAnswer = 'decline';
            // else if (typeErrorChance >=2 && typeErrorChance <=3){
            //     dateError();
            // }
            }
            else if (typeErrorChance ===2){
                // alert('incorrect dob')
                this.typeError = 'Incorrect DOB';
                errorName = 'Incorrect DOB';
                assignWrongDOB(person);
                systemAnswer = 'decline';
            }
            else if (typeErrorChance ===3){
                this.typeError = 'Missing Documents';
                errorName = 'Missing Documents';
                removeMissingDocs(person);
                systemAnswer = 'decline';
            }
            // else if (typeErrorChance ===1){
            //     systemAnswer ='Bad'
            // }
            // errorInfo = true;
        }
    }
}
function removeMissingDocs(person){
    if (person.visaPurpose ===`Visit`|| person.visaPurpose ===`Humanitarian`|| person.visaPurpose ===`Family Reasons`){
        // let docError = Math.floor(Math.random()*4);
        // if (docError === 1){
            
        // }
        visaInfoWrapper.classList.add('hidden');
        visaProfileWrapper.classList.add('hidden');
    }
}

// TIE RANDOM CHANCE TO THE INDEX OF namesInfos
function assignWrongName(person){
    console.log(person);
    // const personVariable = person
    //REROLL IF THEY DONT HAVE CERTAIN DOCUMENTS
    
    let newLastName = russianLastNames[randomizeWrongName(person)];
    namesInfos[randomizeWrongDoc()].innerHTML = `${person.firstName} ${newLastName}`;
   
    //array
    // namesInfos[docError]
}
function assignWrongDOB(person){
   
    birthInfos[randomizeWrongDoc()].innerHTML = `${randomizeWrongDOB(person)}`;
}

function randomizeWrongDOB(person){
    const minValue = new Date(1971,0,1).getTime();
    const maxValue = new Date(2002,0,1).getTime();
    const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    const badDOB = new Date(timestamp).toLocaleDateString('en-US');
    return (person.birthDate === badDOB) ? randomizeWrongDOB(person) : badDOB
}
function randomizeWrongName(person){
    let newLastNameIndex = Math.floor(Math.random()*russianLastNames.length);

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

function randomizeWrongDoc(){
    let docError = Math.floor(Math.random()*4);
    console.log('before' + docError)
    if (haveWorkPermit){
        //then they don't have a study permit
        if (docError ===1){
            return randomizeWrongDoc();
            console.log('no study permit' + docError);
        }
    }
    else if (haveStudyPermit){
        //then they don't have a work permit
        if (docError ===0){
            return randomizeWrongDoc();
            console.log('no work permit' + docError);
        }
    }
    else if (!haveWorkPermit && !haveStudyPermit){
        // then they don't have a study or a work permit
        if (docError <2){
            return randomizeWrongDoc();
            console.log('no permit' + docError);
        }
    }
    return docError
}

function assignExpiredDate(person){
    const minValue = new Date(2022,8,21).getTime();
    const maxValue = new Date(2005,0,1).getTime();
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
    if (event.key ==="Enter" ) {
    
        
        // console.log(getRandomDate(new Date(2018,0,1), new Date(2021,11,31)).toLocaleDateString('en-US'));
    }

    
    // do something
});


    function createPerson(){
        const person = new PersonBlueprint()
        person.randomizeGender();
        person.randomizeName();
        person.randomizeExpDate();
        person.randomizeBirthDate();
        person.randomizePurpose();
        person.randomizeVisaExpDate();
        person.randomizeExtraExpDate()
        person.assignInfos();
        person.errorRandomize(person);
        
        // console.log(person.randomizeName());

        console.log(person.gender, person.firstName, person.lastName,person.expDate);
        //pushing people into an array
        people.push(person);
        console.log(people);
        return person;
    }

    function getRandomDate(startDate, endDate) {
        const minValue = startDate.getTime();
        const maxValue = endDate.getTime();
        // console.log(minValue)
        // console.log(maxValue)
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

        return new Date(timestamp); 
    }

    const possiblePleadings = ['We were promised that there would be no mobilization. We feel betrayed. The Kremlin lies, all the time. They look at us like toys.','I would be a terrible soldier. It would be just one bullet to the head.','There is a huge repressive machine that is the internal riot police, 400 k people, half a million people who are trained to suppress protest.'];
    
    function personPlead(){
       
        // if not pleaded, then have a 1 out of 5000 chances of pleading when mouse move.
        if (!pleaded){
            const pleadChance = Math.floor(Math.random()*1000);
            if (pleadChance <= 5){
                pleadingP.classList.remove('hidden');
                typeText();
                console.log('wtf');
                pleaded = true;
            }
        }
    }
    function forcePlead(){
        if (!pleaded){
            pleadingP.classList.remove('hidden');
            typeText();
            pleaded = true;
        }
    }

    function setData() {
    const randomPleadIndex = Math.floor(Math.random() * possiblePleadings.length);
        const text = possiblePleadings[randomPleadIndex]
        possiblePleadings.splice(randomPleadIndex,1);
        return [text, pleadingP]
        };
    
    let entrants;
    function checkEndGame(){
        entrants = possiblePleadings.length;
        // console.log(entrants);
        if (entrants === 0){
            console.log('game over')
            alert('game over')

        }
    }

    checkEndGame()
    function typeText() {
        // let typingSpeed =10;
     
        pleadingP.innerHTML ='';
        // res is an array 
        const res = setData();
        const txt = res[0];
        console.log(possiblePleadings)
        // if (txt.length < 100){
        //     typingSpeed =10;;;
        // }
        // else if (txt.length >= 100){
        //     typingSpeed =5;;
        // }
        // console.log(res);
        // const areaText = res[1];
        let i = 0;
        const timerId = setInterval(() => {
        if (!paused){
            pleadingP.innerHTML += txt.charAt(i);
            i++;
            if (txt.charAt(i)===' ' && txt.charAt(i-1)==='.'){
                pauseInterval();           
            }
            if (i === txt.length) {
            clearInterval(timerId);
        }
    }
        },typingSpeed);
    }

    function pauseInterval(){
        paused =true;
        setTimeout(resumeInterval, pauseTime);
    }
     function resumeInterval(){
         paused =false;
    }


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