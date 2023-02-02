const ball = document.querySelector('#ball');

const resultWrapper = document.querySelector('.result-wrapper');
const blueTriangle = document.querySelector('#blue-triangle');
const resultText = document.querySelector('#result-text');
const resultArea = document.querySelector('#result-area');
const buttons = document.querySelectorAll('.cuisines-button');
const allBtn = document.querySelector('.all-cuisines-btn');
const animationEls = document.querySelectorAll('.animations');

const rollSFX = new Audio('./assets/sounds/ball-roll.mp3');
answers = [
    {yes:['It is certain','It is decidedly so','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes'],
    neutral:['Reply hazy, try again', 'Ask again later', 'Better not tell you now','Cannot predict now','Concentrate and ask again'],
    no:[`Don't count on it`, `My reply is no`, `My sources say no`,`Outlook not so good`,`Very doubtful`] 
    }
]
// answers = ['us,uk,']
// cuisines = [
//     {yes:['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian'],
//     neutral:['Vietnamese', 'Turkish', 'Pakistani','Starve','Irish'],
//     no:[`Korean`, `Mediterranean`, `British`,`Filipino`,`German`] 
//     }
// ]
cuisines = ['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian','Vietnamese', 'Turkish', 'Pakistani','Irish',`Korean`, `Mediterranean`, `British`,`Filipino`,`German`];

window.addEventListener("load", () => {
    for (let n = 0; n < buttons.length; n++){
        if (!buttons[n].classList.contains('active')){
               buttons[n].classList.add('active');     
        }
    }
    checkAllBtn();
  });


console.log(animationEls);
let orderNumber;

// get random number from the array
const getRandomInt =()=> {
    orderNumber = Math.floor(Math.random() * cuisines.length);
  };
// let number;
// let interactable = true;

allBtn.addEventListener("click",()=>{
    allBtn.classList.toggle('active');
    // if allBtn is on, 
    if (allBtn.classList.contains('active')){
        for (let n = 0; n < buttons.length; n++){
            // if all buttons are not active, then make all btns active
            if (!buttons[n].classList.contains('active')){
                   buttons[n].classList.add('active');
                      
            }
           //  else {
           //     buttons[n].classList.remove('active');
           //  }
       }
       cuisines = ['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian','Vietnamese', 'Turkish', 'Pakistani','Irish',`Korean`, `Mediterranean`, `British`,`Filipino`,`German`];  
       console.log(cuisines);  
    }
    // else if allBtn is off then remove active from all btns
    else if (!allBtn.classList.contains('active')){
        for (let n = 0; n < buttons.length; n++){
            if (buttons[n].classList.contains('active')){
                   buttons[n].classList.remove('active');     
            }
           //  else {
           //     buttons[n].classList.remove('active');
           //  }
       }
        cuisines = [];
        console.log(cuisines);  
    }
   
});

for (let n = 0; n < buttons.length; n++){
    buttons[n].addEventListener('click',()=>{
        buttons[n].classList.toggle('active');
        checkAllBtn();
        if (buttons[n].classList.contains('active')){
            cuisines.push(buttons[n].innerHTML);
            console.log(cuisines);
    }
        else{
            // search for index of the el that matches this value
            const index = cuisines.indexOf(buttons[n].innerHTML);
            cuisines.splice(index,1);
            console.log(cuisines);
        }
    
    });
}
const buttonsActive = document.getElementsByClassName('active cuisines-button');
function checkAllBtn(){
    console.log(buttonsActive.length);
    for (let n = 0; n < buttons.length; n++){
        if (buttonsActive.length === 19 && !allBtn.classList.contains('active')){
            allBtn.classList.toggle('active');
        }
        else if (buttonsActive.length < 19 && allBtn.classList.contains('active')){
            
            allBtn.classList.remove('active');
        }
    }
}

ball.addEventListener("click", ()=>{
    // ball.classList.toggle('turn-animation');
    
    // if (ball.classList.contains('turn-animation')
    //  && interactable ==true
    //  ){
 
       
       
        rollSFX.currentTime=0;
        rollSFX.play();
        
        getRandomInt();  
        reset_animation();
        // lo
        resultText.innerHTML = cuisines[orderNumber];

        if(cuisines.length ===0){
            resultText.innerHTML = 'Bite The Dust';
        } 
      
        // if (orderNumber <= 9){
        //     number= Math.floor(Math.random() * 10);
        //     setTimeout(()=>{
        //         resultText.innerHTML = answers[0].yes[number];
        //     }, 1000);
            
        //     console.log('yes')
        // }
        // else if (orderNumber > 9 && orderNumber <= 14){
        //     number= Math.floor(Math.random() * 4);
        //     setTimeout(()=>{
        //         resultText.innerHTML = answers[0].neutral[number];
        //     }, 1000);
          
        //     console.log('neutral')
        // }
        // else if (orderNumber > 14 && orderNumber <= 19){
        //     number= Math.floor(Math.random() * 4);
        //     setTimeout(()=>{
        //         resultText.innerHTML = answers[0].no[number];
        
        //     }, 1000);
            
        //     console.log('no')
        // }
        // console.log(number);


        // setTimeout(()=>{
                    // 
         
                // }, 1000);
        
    // }
    // else if (!ball.classList.contains('turn-animation')){
    //     resultWrapper.classList.remove('turn-animation2');
    //     resultText.classList.remove('fade-in');
    //     resultText.innerHTML = 'FFS';
    //     // smallCircle.classList.add('turn-animation');
    // }

    // console.log(answers[0].yes[0]);
   
});
// reset animation for all animated elements
function reset_animation() {
    for (let i = 0; i < animationEls.length; i++){
        animationEls[i].style.animation = 'none';
        animationEls[i].offsetHeight; /* trigger reflow */
        animationEls[i].style.animation = null; 
    }
  }

document.querySelector('body').addEventListener('keydown', shakeBall);

// when press enter, 
function shakeBall(e) {
    if (e.which == 13) {
        rollSFX.currentTime=0;
        rollSFX.play();
        
        getRandomInt();  
        reset_animation();
        // lo
        resultText.innerHTML = cuisines[orderNumber];

        if(cuisines.length ===0){
            resultText.innerHTML = 'Bite The Dust';
        } 
    //     ball.classList.toggle('turn-animation');
    // // ball.classList.toggle('turn-animation');
    // // console.log( smallCircle.classList.toggle('turn-animation'));
 
    
    // if (ball.classList.contains('turn-animation')
    // //  && interactable ==true
    //  ){
    //     rollSFX.currentTime=0;
    //     rollSFX.play();
        
    //     getRandomInt(); 
    //     resultWrapper.classList.add('turn-animation2');
    //        resultText.classList.add('fade-in');
    //         resultText.innerHTML = cuisines[orderNumber];
    //             // }, 1000);
        
    // }
    // else if (!ball.classList.contains('turn-animation')){
    //     resultWrapper.classList.remove('turn-animation2');
    //     resultText.classList.remove('fade-in');
    //     resultText.innerHTML = 'FFS';
    //     // smallCircle.classList.add('turn-animation');
    // }
    } 
}
