const passportFar = document.querySelector('.passport-down')
const passportNear = document.querySelector('.passport-near');
const passportBottom = document.querySelector('.passport-bottom');


const acceptBtn = document.querySelector(`.accept-btn`);
const declineBtn = document.querySelector(`.decline-btn`);

const passportFlipBtn = document.querySelector('.passport-flip-btn');
const closeDocsBtn = document.querySelector(`.passport-close-btn`)

const workPermit = document.querySelector('.work-permit');
const studyPermit = document.querySelector('.study-permit');

const draggableDocuments = document.querySelectorAll(`.draggable-documents`);

const namesInfos = document.querySelectorAll('.names-info');
const genderInfos = document.querySelectorAll('.gender-info');
const expInfos = document.querySelectorAll('.exp-info');
const birthInfos = document.querySelectorAll(`.dob-info`);
const purposeInfo = document.querySelector(`.purpose-info`);

const visaExpDate = document.querySelector(`.exp-visa-info`);
const extraExpDate = document.querySelectorAll(`.exp-extra-info`);

const gameWrapper = document.querySelector(`.game-wrapper`);
const passportInteracts = document.querySelectorAll(`.passport-interacts`);
const main = document.querySelector(`main`);
let passportOpened = false;
let isDown = false;
let finalStamp = ``;

let dragElement;
let dragElement2;

var passportIsDown=false;
let extraIsDown = false;

let haveVisa = false;
let haveStudyPermit = false;
let haveWorkPermit = false;
let havePassport = true;



passportNear.addEventListener('mousedown',
function(){passportIsDown=true;
    extraIsDown=true;
    isDown = true});
studyPermit.addEventListener('mousedown',
    function(){isDown=true;});

    workPermit.addEventListener('mousedown',
    function(){isDown=true;});

document.addEventListener('mouseup',
    function(){passportIsDown=false;
    extraIsDown=true;
    isDown = false});
document.addEventListener('mousemove',function(e) {
  e.preventDefault();
 
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
            passportFar.classList.remove(`hidden`);
            passportNear.classList.add(`hidden`);
            passportOpened = true;    
       

            studyPermit.classList.add('hidden');
            workPermit.classList.add('hidden');
        // }
     
    });

acceptBtn.addEventListener(`click`,()=>{

    finalStamp = `accept`;
    acceptBtn.setAttribute('data-chosen','true');
    declineBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden');
    
});

declineBtn.addEventListener('click',()=>{

    // passportFar.classList.remove(`hidden`);
    // passportNear.classList.add(`hidden`);
    // passportOpened = false;
    finalStamp = `decline`;
    declineBtn.setAttribute('data-chosen','true');
    acceptBtn.setAttribute('data-chosen','false');
    closeDocsBtn.classList.remove('hidden')
})

passportFar.addEventListener('click',()=>{
    createPerson();
    openPassport();
   

    // workPermit.classList.remove(`hidden`);
    // studyPermit.classList.remove(`hidden`);
    
});

passportNear.addEventListener('click',()=>{


    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    // console.log('click');
    passportNear.classList.add('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.remove('on-top');

});
workPermit.addEventListener('click',()=>{


    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    // console.log('click');
    passportNear.classList.remove('on-top');
    workPermit.classList.add('on-top');
    studyPermit.classList.remove('on-top');

});

studyPermit.addEventListener('click',()=>{
    // workPermit.classList.add(`hidden`);
    // studyPermit.classList.add(`hidden`);
    // console.log('click');
    passportNear.classList.remove('on-top');
    workPermit.classList.remove('on-top');
    studyPermit.classList.add('on-top');

});
// Remove hidden from all documents
function openPassport(){
    
    passportFar.classList.add(`hidden`);
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
// , 'Sidorov', 'Smirnoff', 'Volkov', 'Federov', 'Popov','Semenov','Mikhailov', 'Egorov','Lenkov','Vasiliev','Nikolaev','Morozov','Stepanov'
];

const russianFemaleFirstNames = ['Sofia','Anastasia','Maria','Alina','Inessa'];

const russianMaleFirstNames = ['Aleksandr','Boris','Alexei','Daniiil','Leonid','Nikita','Anatoly','Igor','Ivan','Luka','Mikhail','Matvey','Lev','Yuri',
'Maxim','Nikolai','Andrei'];

 const people =[];

// constructor function 
function PersonBlueprint(){ 
 
    this.randomizeGender = function(){
        const genderChance = Math.floor(Math.random() * 10);
        if (genderChance >= 5){
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
        const minValue = new Date().getTime();
        const maxValue = new Date(2022,9,1).getTime();
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
        this.visaExpDate = new Date(timestamp).toLocaleDateString('en-US');
    }
    this.randomizeExtraExpDate = function(){
        const minValue = new Date(2923,2,1).getTime();
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

    this.assignInfos = function(){
        for (let i = 0; i< namesInfos.length; i++) {
            namesInfos[i].innerHTML = `${this.firstName} ${this.lastName}`;
        }

        for (let i = 0; i< genderInfos.length; i++) {
            genderInfos[i].innerHTML = `${this.gender}`;
        }
        for (let i = 0; i< expInfos.length; i++) {
            expInfos[i].innerHTML = `${this.expDate}`;
        }
        for (let i = 0; i< birthInfos.length; i++){
            birthInfos[i].innerHTML = `${this.birthDate}`;
        }
            visaExpDate.innerHTML = `${this.visaExpDate}`;
        for (let i = 0; i< extraExpDate.length; i++){
            extraExpDate[i].innerHTML = `${this.extraExpDate}`;
        }
        // console.log(this.expDate);
        // console.log(expInfos[0].innerHTML);
    }
    this.errorRandomize = function(person){
        // const errorInfo = false;
        const typeError = ``;
        // 1 out of 3 chances for having an error
        const errorChance = Math.floor(Math.random()*3)
        if (errorChance <3){
        // 1 out of 4 chances for having a NAME error
            const typeErrorChance = Math.floor(Math.random()*4)
            if (typeErrorChance <4){
            //   const typeError = 'Incorrect Name';
            console.log(person)
            nameError(person);
            }
            // else if (typeErrorChance >=2 && typeErrorChance <=3){
            //     dateError();
            // }

            // errorInfo = true;
        }
        
    }
}
// TIE RANDOM CHANCE TO THE INDEX OF namesInfos
function nameError(person){
    console.log(person);
    // const personVariable = person
    //REROLL IF THEY DONT HAVE CERTAIN DOCUMENTS

    person.lastName = russianLastNames[randomizeWrongName(person)];
    namesInfos[randomizeWrongDoc()].innerHTML = `${person.firstName} ${person.lastName}`;
   
    //array
    // namesInfos[docError]
}
function randomizeWrongName(person){
    let newLastNameIndex = Math.floor(Math.random()*russianLastNames.length);

    if (newLastNameIndex === person.lastNameIndex ){
       
        alert('faileld')
        randomizeWrongName(person);
    }
    else {
        return newLastNameIndex;
        console.log('rerolling name');
       
    }
    console.log(person.lastNameIndex);
    console.log(newLastNameIndex);
  
    // return (newLastNameIndex === person.lastNameIndex) ? randomizeWrongName(person) : newLastNameIndex
}

function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 2) ? generateRandom(min, max) : num;
}



function randomizeWrongDoc(){
    let docError = Math.floor(Math.random()*4);
    console.log('before' + docError)
    if (haveWorkPermit){
        //then they don't have a study permit
        if (docError ===1){
            docError = randomizeWrongDoc();
            console.log('no study permit' + docError);
        }
    }
    else if (haveStudyPermit){
        //then they don't have a work permit
        if (docError ===0){
            docError = randomizeWrongDoc();
            console.log('no work permit' + docError);
        }
    }
    else if (!haveWorkPermit && !haveStudyPermit){
        // then they don't have a study or a work permit
        if (docError <2){
            docError = randomizeWrongDoc();
            console.log('no permit' + docError);
        }
    }
    return docError
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
    }

    function getRandomDate(startDate, endDate) {
        const minValue = startDate.getTime();
        const maxValue = endDate.getTime();
        // console.log(minValue)
        // console.log(maxValue)
        const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

        return new Date(timestamp); 
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






// function randomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//   }
  
//   const d = randomDate(new Date(2012, 0, 1), new Date(2012,0,3));
//   console.log(d.toLocaleDateString('en-US'));


//   let date1 = new Date(2012, 0, 1);
// let date2 = new Date();
// console.log(date1.toLocaleDateString('en-US'),date2.toLocaleDateString('en-US'))

// if (date1 > date2) {
//   console.log("Date 1 is greater than Date 2");
// } else if (date1 < date2) {
//   console.log("Date 1 is less than Date 2");
// } else {
//   console.log("Both Dates are same");
// }