const ball = document.querySelector('#ball');
const resultWrapper = document.querySelector('.result-wrapper');
const blueTriangle = document.querySelector('#blue-triangle');
const resultText = document.querySelector('#result-text');
const resultArea = document.querySelector('#result-area');
const buttons = document.querySelectorAll('.choices-btn');
const allBtn = document.querySelector('.all-cuisines-btn');
const animationEls = document.querySelectorAll('.animations');
const btnArea = document.querySelector('.btn-area');

const cuisineForm = document.querySelector('.input-cuisine')
const newCuisineTxt = document.querySelector('.new-cuisine-text');
const addCuisineBtn = document.querySelector('.new-cuisine-btn');

const removeAllBtn = document.querySelector(".remove-all-btn")
const removeBtn = document.querySelector(".remove-btn");
const rollSFX = new Audio('./assets/sounds/ball-roll.mp3');

const title = document.querySelector(".title");

const themes = document.querySelectorAll(".themes");
const eatIcon = themes[0];
const wearIcon = themes[1];
const watchIcon = themes[2];
const listenIcon = themes[3];

const resetBtn = document.querySelector(".reset-btn");
// let activeChoices= [];
eatPreset = ['American','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian','Vietnamese', 'Pakistani','Irish',`Korean`, `Mediterranean`, `British`,`Filipino`,`German`];

wearPreset = ['Artsy','Athleisure','Casual','Classic','Bohemian', 'Elegant','Exotic','Formal','Gothic','Minimalist','Preppy','Streetwear','Sportswear','Vintage'];

watchPreset = ['Action', 'Adventure','Animated','Comedy','Drama','Fantasy','Historical','Horror','Musical', 'Noir', 'Romance', 'Science Fiction',  'Thriller','Western'];

listenPreset = ['Classical', 'Avant-garde','Blues','Easy Listening','Country','Electronic','Folk','Hip Hop','Jazz','Pop','R&B & Soul','Rock','Metal','Punk'];

themes.forEach((element) => addIconListener(element));

function addIconListener(icon){
    icon.addEventListener("click",()=>{
      
        // if(eatIcon.classList.contains('active')){
        //     // let old_data = JSON.parse(localStorage.getItem('data'));
        //     //  localStorage.setItem('data',JSON.stringify(old_data));
        // }

        // REMOVE ACTIVE, and only turn on active for current one
        themes.forEach((el)=>{
            if (el.classList.contains("active")){
                el.classList.remove("active");   
            }
        });
        icon.classList.add('active');

        removeAllChoices();
        if (eatIcon.classList.contains("active")){
            title.innerHTML = 'Daily Food Magic Ball';
            localStorage.setItem('last_category','eat');
        } else if (wearIcon.classList.contains('active')){
            title.innerHTML = 'Daily Outfit Magic Ball';
            localStorage.setItem('last_category','wear');
        } else if (watchIcon.classList.contains('active')){
            title.innerHTML = 'Movie Genre Magic Ball';
            localStorage.setItem('last_category','watch');
        } else if (listenIcon.classList.contains('active')){
            title.innerHTML = 'Music Genre Magic Ball';
            localStorage.setItem('last_category','listen');
        }
        
        updateDataSet();
        updateActiveCuisines();
        updateAllBtn();
    } )
}

resetBtn.addEventListener('click',()=>{
    let presetArr = [];
    if (eatIcon.classList.contains('active')){
        // const old_data localStorage.getItem(currentData())
        localStorage.setItem(currentData(),JSON.stringify(eatPreset));
        activeChoices = eatPreset;
        presetArr = eatPreset;
    } else if (wearIcon.classList.contains('active')){
        // const old_data localStorage.getItem(currentData())
        localStorage.setItem(currentData(),JSON.stringify(wearPreset));
        activeChoices = wearPreset;
        presetArr = wearPreset;
    } else if (watchIcon.classList.contains('active')){
        // const old_data localStorage.getItem(currentData())
        localStorage.setItem(currentData(),JSON.stringify(watchPreset));
        activeChoices = watchPreset;
        presetArr = watchPreset;
    } else if (listenIcon.classList.contains('active')){
        // const old_data localStorage.getItem(currentData())
        localStorage.setItem(currentData(),JSON.stringify(listenPreset));
        activeChoices = listenPreset;
        presetArr = listenPreset;
    }
    removeAllChoices();

    for (let n = 0; n < presetArr.length; n++){
        let newDiv = document.createElement("div");
        newDiv.className += "choices-btn active";
        btnArea.append(newDiv);
        newDiv.innerHTML = presetArr[n];
        addButtonListener(newDiv);
    }
    // remove current buttons


   
   
})
// keep current active cuisines

function removeAllChoices(){
    let buttons = document.querySelectorAll('.choices-btn');
    // remove all btns if needed
    if (buttons.length > 0){
        buttons.forEach((btn) => {btn.remove()});
    }
}



  // return allCuisinesArr
  let allCuisines=()=>{
    const buttons = document.querySelectorAll('.choices-btn'); 
    let array = [];
    for (let n = 0; n < buttons.length; n++){
        array.push(buttons[n].innerHTML);    
   }
    return array;
   }

// ******************************************** ON BROWSER LOAD
window.addEventListener("load", () => {
   
    if (localStorage.getItem('last_category') == null){
        localStorage.setItem('last_category','eat') ;
        eatIcon.classList.add('active'); 
    } else if (localStorage.getItem('last_category') == 'eat'){
        eatIcon.classList.add('active');
    } else if (localStorage.getItem('last_category') == 'wear'){
        wearIcon.classList.add('active');
    } else if (localStorage.getItem('last_category') == 'watch'){
        watchIcon.classList.add('active');
    } else if (localStorage.getItem('last_category') == 'listen'){
        listenIcon.classList.add('active');
    }

     // make all buttons active
     for (let n = 0; n < buttons.length; n++){
        if (!buttons[n].classList.contains('active')){
               buttons[n].classList.add('active');     
        }
    }
    // loading localStorage
    updateDataSet();
    updateActiveCuisines();
    updateAllBtn();
});

//

// update TO CURRENT CATEGORY
function updateDataSet(){
    if (localStorage.getItem('eat_data') == null){
        // localStorage.setItem(currentData(),'[]');
        localStorage.setItem('eat_data',JSON.stringify(eatPreset));    
    } else if (localStorage.getItem('wear_data') == null){
        // localStorage.setItem(currentData(),'[]');
        localStorage.setItem('wear_data',JSON.stringify(wearPreset)); 
    } else if (localStorage.getItem('watch_data') == null){
        // localStorage.setItem(currentData(),'[]');
        localStorage.setItem('watch_data',JSON.stringify(watchPreset));    
    }  else if (localStorage.getItem('listen_data') == null){
        // localStorage.setItem(currentData(),'[]');
        localStorage.setItem('listen_data',JSON.stringify(listenPreset));    
    } 

        const old_data = JSON.parse(localStorage.getItem(currentData()));

        for (let n = 0; n < old_data.length; n++){
            let newCuisine = document.createElement("div");
            newCuisine.className += "choices-btn active"
            btnArea.append(newCuisine);

            newCuisine.innerHTML = old_data[n];
           
            addButtonListener(newCuisine);
        }
        activeChoices = old_data;
    
}

const currentData=()=>{
    let data = '';
    if (eatIcon.classList.contains('active')){
        data = 'eat_data';
    }
    else if (wearIcon.classList.contains('active')){
        data = 'wear_data';
    }
    else if (watchIcon.classList.contains('active')){
        data = 'watch_data';
    }
    else if (listenIcon.classList.contains('active')){
        data = 'listen_data';
    }
    return data;
}
  
//******************************************* ON REMOVE BTN CLICK
removeBtn.addEventListener("click", ()=>{
   removeBtn.classList.toggle("active");
   
   const buttons = document.querySelectorAll('.choices-btn');
 
   cuisineForm.classList.toggle("disabled");
   removeAllBtn.classList.toggle("hidden");
   removeAllBtn.classList.toggle("shake-little");
   removeAllBtn.classList.toggle("shake-constant");
   removeAllBtn.classList.toggle("shake-cosntant--hover");

   // if REMOVING MODE,
   if (removeBtn.classList.contains("active")){
    if (!allBtn.classList.contains('disabled')){
        allBtn.classList.add("disabled");
    }
    // turn on REMOVABLE for all buttons
    for (let n = 0; n < buttons.length; n++){
               buttons[n].classList.add('removable');  
               buttons[n].className += ' shake-little shake-constant shake-constant--hover';
    }
   }
   // if NORMAL MODE
   else{
    if (allBtn.classList.contains('disabled')){
        allBtn.classList.remove("disabled");
    }
    for (let n = 0; n < buttons.length; n++){
               buttons[n].classList.remove('removable'); 
               buttons[n].classList.remove('shake-little');   
               buttons[n].classList.remove('shake-constant');   
               buttons[n].classList.remove('shake-constant--hover');   
    }
   }
});

addCuisineBtn.addEventListener("click", ()=>{
    console.log(allCuisines());

    // if text value does not exist in array, then create new button
    if (!allCuisines().includes(newCuisineTxt.value) && newCuisineTxt.value != ''){
        // make new button div
        const newCuisine = document.createElement("div");
        newCuisine.className += "choices-btn active"
        btnArea.append(newCuisine);
        newCuisine.innerHTML = newCuisineTxt.value;
        activeChoices.push(newCuisineTxt.value);
        
        let new_data = newCuisineTxt.value;

        //
        let old_data = JSON.parse(localStorage.getItem(currentData()));
        old_data.push(new_data);
        localStorage.setItem(currentData(), JSON.stringify(old_data));
        updateAllBtn();
        addButtonListener(newCuisine);
    }
    else if (newCuisineTxt.value == ''){
        alert("Cuisine text cannot be empty");
    }
    else {
        alert("This cuisine already exists!");
    }
})

removeAllBtn.addEventListener("click", ()=>{
    activeChoices= [];
    allBtn.classList.remove("disabled");
    cuisineForm.classList.remove("disabled");
    const buttons = document.querySelectorAll('.choices-btn');
    
    let old_data = JSON.parse(localStorage.getItem(currentData()));

    for (let n = 0; n < buttons.length; n++){
        buttons[n].remove();
        old_data.splice(0, 1);
    }

    localStorage.setItem(currentData(), JSON.stringify(old_data));

    removeBtn.classList.remove("active");
    removeAllBtn.classList.add("hidden");
    removeAllBtn.classList.remove("shake-little");
    removeAllBtn.classList.remove("shake-constant");
    removeAllBtn.classList.remove("shake-cosntant--hover");
    updateAllBtn();
})

// ***** Add All Active Cuisines to the Array
  function updateActiveCuisines (){
    const buttonsActive = document.getElementsByClassName('active choices-btn');   
    const buttons = document.querySelectorAll('.choices-btn'); 
      activeChoices= [];
      for (let n = 0; n < buttonsActive.length; n++){
        
          // if all buttons are not active, then make all btns active
          if (buttons[n].classList.contains('active')){
                 activeChoices.push(buttons[n].innerHTML);    
          }
     }
     console.log(activeChoices)
  } 


// console.log(animationEls);
// get random number from the array
const getRandomInt = ()=> {
    return Math.floor(Math.random() * activeChoices.length);
  };

// ALL btn
allBtn.addEventListener("click",()=>{
 
    const buttons = document.querySelectorAll('.choices-btn');

    allBtn.classList.toggle('active');
    // if allBtn is on, make every cuisine active
    if (allBtn.classList.contains('active')){
        for (let n = 0; n < buttons.length; n++){
            // if all buttons are not active, then make all btns active
            if (!buttons[n].classList.contains('active')){
                   buttons[n].classList.add('active');
                   activeChoices.push(buttons[n].innerHTML);    
            }
       }
    }
    // else if allBtn is off then remove active from all btns
    else{
        for (let n = 0; n < buttons.length; n++){
            if (buttons[n].classList.contains('active')){
                   buttons[n].classList.remove('active');     
            }
       }
        activeChoices= [];
        console.log(activeChoices);  
    }
});

    buttons.forEach((element) => addButtonListener(element));

    // if clicked while removable, then remove
function addButtonListener(button){
    button.addEventListener('click',()=>{
        // console.log(allCuisines());
        button.classList.toggle('active');
      
        // if ACTIVE MODE, update button status
        if (!button.classList.contains('removable')){
            if (button.classList.contains('active')){
                activeChoices.push(button.innerHTML);
                console.log(activeChoices);
            }
            else {
                // search for index of the el that matches this value
                const index = activeChoices.indexOf(button.innerHTML);
                activeChoices.splice(index,1);
                console.log(activeChoices);
            }
        }
        // else if REMOVABLE MODE, remove the button
        else {
            const index = activeChoices.indexOf(button.innerHTML);
            activeChoices.splice(index,1);
            button.remove();
            
            let old_data = JSON.parse(localStorage.getItem(currentData()));
            let indexNewData = old_data.indexOf(button.innerHTML); 

            old_data.splice(indexNewData, 1);
            localStorage.setItem(currentData(), JSON.stringify(old_data));
        }
        
        updateAllBtn();
    });
}
// if (buttons.length == 0){
//     removeBtn.classList.add('disabled');
// }

// }
// ********** CHECK IF ALL BUTTONS ARE ACTIVE. Activate *ALL* btn if yes, if not deactivate it
function updateAllBtn(){
    // all active buttons
    const buttonsActive = document.getElementsByClassName('active choices-btn');
    const buttonsNum = document.querySelectorAll('.choices-btn');
    console.log("buttons active: "+ buttonsActive.length + " and buttons num: " + buttonsNum.length);
    
    // if ACTIVE = ALL, allBTN shines
        if (buttonsActive.length === buttonsNum.length && !allBtn.classList.contains('active')){
           
            // if (buttonsNum.length == 0){
            //     allBtn.classList.add('disabled');
            // }
            // else {
            //     allBtn.classList.remove('disabled');
                allBtn.classList.add('active');
            // }

        }
        else if (buttonsActive.length < buttonsNum.length && allBtn.classList.contains('active')){  
            allBtn.classList.remove('active');

       
        }

}

// when click on ball
ball.addEventListener("click", ()=>{
        rollSFX.currentTime=0;
        rollSFX.play();   
    
        reset_animation();
        // lo
        resultText.innerHTML = activeChoices[getRandomInt()];

        if(activeChoices.length ===0){
            resultText.innerHTML = 'Bite The Dust';
        } 
   
});
// reset animation for all animated elements
function reset_animation() {
    for (let i = 0; i < animationEls.length; i++){
        animationEls[i].style.animation = 'none';
        animationEls[i].offsetHeight; /* trigger reflow */
        animationEls[i].style.animation = null; 
    }
}





// document.querySelector('body').addEventListener('keydown', shakeBall);

// when press enter, 
// function shakeBall(e) {
//     if (e.which == 13) {
//         rollSFX.currentTime=0;
//         rollSFX.play();
        
     
//         reset_animation();
//         // lo
//         resultText.innerHTML = activeChoices[   getRandomInt()];

//         if(activeChoices.length ===0){
//             resultText.innerHTML = 'Bite The Dust';
//         } 
//     } 
// }


// answers = [
//     {yes:['It is certain','It is decidedly so','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes'],
//     neutral:['Reply hazy, try again', 'Ask again later', 'Better not tell you now','Cannot predict now','Concentrate and ask again'],
//     no:[`Don't count on it`, `My reply is no`, `My sources say no`,`Outlook not so good`,`Very doubtful`] 
//     }
// ]

// answers = ['us,uk,']
// cuisines = [
//     {yes:['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian'],
//     neutral:['Vietnamese', 'Turkish', 'Pakistani','Starve','Irish'],
//     no:[`Korean`, `Mediterranean`, `British`,`Filipino`,`German`] 
//     }
// ]