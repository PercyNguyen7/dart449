const ball = document.querySelector('#ball');
const smallCircle = document.querySelector('.result-area')
const resultText = document.querySelector('#result-text');

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
    smallCircle.classList.toggle('turn-animation');
    ball.classList.toggle('turn-animation');
    // console.log( smallCircle.classList.toggle('turn-animation'));
 
    
    if (smallCircle.classList.contains('turn-animation')
    //  && interactable ==true
     ){
        getRandomInt();   
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


        setTimeout(()=>{
                    resultText.innerHTML = foods[orderNumber];
                }, 1000);
        
    }
    else if (!smallCircle.classList.contains('turn-animation')){
        resultText.innerHTML = 'Just pick For Fuck Sake';
        // smallCircle.classList.add('turn-animation');
        
    }


   

    // console.log(answers[0].yes[0]);
   
});
function funny(){
    console.log('funny');
}