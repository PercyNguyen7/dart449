const ball = document.querySelector('#ball');
const smallCircle = document.querySelector('.result-area');
const smallCircleWrapper = document.querySelector('.result-wrapper');

const resultText = document.querySelector('#result-text');
const resultArea = document.querySelector('#result-area');

const rollSFX = new Audio('./assets/sounds/ball-roll.mp3');
answers = [
    {yes:['It is certain','It is decidedly so','Without a doubt','Yes definitely','You may rely on it','As I see it, yes','Most likely','Outlook good','Yes','Signs point to yes'],
    neutral:['Reply hazy, try again', 'Ask again later', 'Better not tell you now','Cannot predict now','Concentrate and ask again'],
    no:[`Don't count on it`, `My reply is no`, `My sources say no`,`Outlook not so good`,`Very doubtful`] 
    }
]
// answers = ['us,uk,']
// foods = [
//     {yes:['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian'],
//     neutral:['Vietnamese', 'Turkish', 'Pakistani','Starve','Irish'],
//     no:[`Korean`, `Mediterranean`, `British`,`Filipino`,`German`] 
//     }
// ]
foods = ['Murican','Mexican','Thai','Greek','Indian','Japanese','Spanish','French','Chinese','Italian','Vietnamese', 'Turkish', 'Pakistani','Starve','Irish',`Korean`, `Mediterranean`, `British`,`Filipino`,`German`]

let orderNumber;
const getRandomInt =()=> {
    orderNumber = Math.floor(Math.random() * 20);
  }
let number;
let interactable = true;
ball.addEventListener("click", ()=>{
    // ball.classList.toggle('turn-animation');
    // ball.classList.toggle('turn-animation');
    // console.log( smallCircle.classList.toggle('turn-animation'));
 
    
    // if (ball.classList.contains('turn-animation')
    //  && interactable ==true
    //  ){
        rollSFX.currentTime=0;
        rollSFX.play();
        
        getRandomInt();  
        reset_animation();
        resultText.innerHTML = foods[orderNumber]; 
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
    //     smallCircleWrapper.classList.remove('turn-animation2');
    //     resultText.classList.remove('fade-in');
    //     resultText.innerHTML = 'FFS';
    //     // smallCircle.classList.add('turn-animation');
    // }



   

    // console.log(answers[0].yes[0]);
   
});
// reset animation for the ball
function reset_animation() {
   
    resultArea.style.animation = 'none';
    resultArea.offsetHeight; /* trigger reflow */
    resultArea.style.animation = null; 

    smallCircleWrapper.style.animation = 'none';
    smallCircleWrapper.offsetHeight; /* trigger reflow */
    smallCircleWrapper.style.animation = null; 

    resultArea.style.animation = 'none';
    resultArea.offsetHeight; /* trigger reflow */
    resultArea.style.animation = null; 

    
  }

document.querySelector('body').addEventListener('keydown', shakeBall);

function shakeBall(e) {
    if (e.which == 13) {
        rollSFX.currentTime=0;
        rollSFX.play();
        
        getRandomInt();  
        reset_animation();
        resultText.innerHTML = foods[orderNumber]; 
    //     ball.classList.toggle('turn-animation');
    // // ball.classList.toggle('turn-animation');
    // // console.log( smallCircle.classList.toggle('turn-animation'));
 
    
    // if (ball.classList.contains('turn-animation')
    // //  && interactable ==true
    //  ){
    //     rollSFX.currentTime=0;
    //     rollSFX.play();
        
    //     getRandomInt(); 
    //     smallCircleWrapper.classList.add('turn-animation2');
    //        resultText.classList.add('fade-in');
    //         resultText.innerHTML = foods[orderNumber];
    //             // }, 1000);
        
    // }
    // else if (!ball.classList.contains('turn-animation')){
    //     smallCircleWrapper.classList.remove('turn-animation2');
    //     resultText.classList.remove('fade-in');
    //     resultText.innerHTML = 'FFS';
    //     // smallCircle.classList.add('turn-animation');
    // }
    } 
}
