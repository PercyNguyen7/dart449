// code inspired by https://codepen.io/jacobhernandez08/pen/XwGqZw

fetchResults(`https://www.reddit.com/r/aiArt/hot/.json?limit=30`,`https://www.reddit.com/r/DigitalArt/hot/.json?limit=25`);
// let maxRandomizedArts=50;
let maxFetched =25;
let totalArtLimit;
let eachArtLimit = 5;
let failedAI = 0;
let failedArt = 0;
let aiUpvoteType;
let artUpvoteType;

let artOrder = 0;
let aiOrder = 0;

let aiType =`new`;
let artType =`new`;

let playTime = true;

// let TopType = `top`;
// let HotType = 'hot';
// let NewType = `new`;
// let RisingType = `rising`;

const aiBtn = document.querySelector(`#ai-drop-btn`);
const artBtn = document.querySelector(`#art-drop-btn`);
const instructionText= document.querySelector(`#instruction`);

const aiTypesBtn = document.querySelectorAll(`.ai-types`);
const artTypesBtn = document.querySelectorAll(`.art-types`);
const submitBtn = document.querySelector('.button');
// const resultBtn = document.querySelector(`.result-button`);
console.log(submitBtn);
let aiAfter;
let artAfter;

const parentDiv = document.querySelector('#parent-div');

// theSubreddit = document.querySelector('.subreddit').value;


// const fetchAI = fetch(`https://www.reddit.com/r/aiArt/${aiType}/.json?limit=100`);
// const fetchArts = fetch(`https://www.reddit.com/r/DigitalArt/${artType}/.json?limit=100`);


for (let i=0; i< aiTypesBtn.length ; i++){
  aiTypesBtn[i].addEventListener('click',()=>{
    aiBtn.innerHTML = aiTypesBtn[i].innerHTML;
    aiType = aiBtn.innerHTML;
    console.log(aiBtn.innerHTML);
  });
}

for (let i=0; i<artTypesBtn.length ; i++){
artTypesBtn[i].addEventListener('click',()=>{
  artBtn.innerHTML =artTypesBtn[i].innerHTML;
  artType = artBtn.innerHTML;

  console.log(artBtn.innerHTML)
  });
}
submitBtn.addEventListener('click',()=>{
  const amountInput = document.querySelector(`.guessAmount`).value;
  aiOrder = 0;
  artOrder = 0;
// if null input, return 5, else return as requested
  if(amountInput == null || amountInput.length < 1) {
    eachArtLimit = 5;
  }
  else {
    eachArtLimit = amountInput;
  }
  playTime = true;
  fetchResults(`https://www.reddit.com/r/aiArt/${aiType}/.json?limit=${maxFetched}&after=${aiAfter}`,`https://www.reddit.com/r/DigitalArt/${artType}/.json?limit=${maxFetched}&after=${artAfter}`);
})
// fetchResults();
async function fetchResults(aiURL,artURL) {

  Promise.all([
    fetch(aiURL),fetch(artURL)]).then(
      
    responses =>{
      if (Promise.all(responses.ok)) {
        return Promise.all(responses.map(r =>r.json()));
      }
      throw new Error('Something went wrong');

  }
  ).then(([AI,art]) =>{
    console.log(art.data.children);
    console.log(AI.data.children);
    aiAfter = AI.data.after;
    artAfter = art.data.after;
    instructionText.innerHTML=`Guess which ${eachArtLimit} of these art are made by AI, then tap Result!`;
    renderResults(AI,art);
   
   
    // replaceBrokenAI();
    // replaceBrokenArt();
    shuffle();
    selectArt();
    // checkResult();
  })
    .catch((error) => {
    console.log(error);
    // alert('try another one');
  });
}
  function renderResults(AI,art){
    // let haveIt = [];
    // let haveIt2 = [];
 
 
    // render 
    artPosts = art.data.children;
    
    if (document.getElementById(`parent-div`)){
      document.getElementById('parent-div').remove();
    }
    
        let parentDiv = document.createElement('div');
        parentDiv.id ='parent-div';
    // for (let i = 0; i <  eachArtLimit; i++){
      
      // if (artPosts[randomNumber].data.post_hint === `image`){
      //   console.log('hey!');

 for (let i = 0; i < maxFetched; i++){
  if (artPosts[i].data.post_hint === `image`){
    console.log(`art posts chosen:`+i);
    if(artOrder < eachArtLimit){
          artOrder++
        let ElWrapper = document.createElement('div');
        ElWrapper.classList.add(`el-wrapper`);
        ElWrapper.classList.add(`art-wrappers`);

        let figure = document.createElement('figure');
        let image = document.createElement('img');
        console.log(artPosts[i].data.url_overridden_by_dest);
        if (artPosts[i].data.url_overridden_by_dest !=undefined){
          image.src = artPosts[i].data.url_overridden_by_dest;
        }
        else if (artPosts[i].data.thumbnail != undefined){
          image.src = artPosts[i].data.thumbnail;
        }
       
      
        figure.appendChild(image);
        ElWrapper.appendChild(figure);
        parentDiv.appendChild(ElWrapper);

        image.addEventListener("error", () => {
          console.log('busted artwork');
          if (artPosts[i].data.thumbnail != undefined){
          image.src = artPosts[i].data.thumbnail;}
        });
      }
    }
    else{
      console.log('IMG skipping')
    }
  }
    aiPosts = AI.data.children;
  
    // const randomNumber2 = generateUniqueRandom2(maxRandomizedArts);
    // console.log(randomNumber);
    
     for (let i = 0; i < maxFetched; i++){
      if (aiPosts[i].data.post_hint === `image`){
        console.log(`ai posts chosen:`+i);
        
       
        if(aiOrder < eachArtLimit ){
   
          aiOrder++;
        let ElWrapper = document.createElement('div');
        ElWrapper.classList.add(`el-wrapper`);
        ElWrapper.classList.add(`ai`);
        let figure = document.createElement('figure');
        let image = document.createElement('img');
        ElWrapper.classList.add(`ai-wrappers`);
        console.log(aiPosts[i].data.url_overridden_by_dest);
        if (aiPosts[i].data.url_overridden_by_dest !=undefined){
          image.src = aiPosts[i].data.url_overridden_by_dest;
        }
        else if (aiPosts[i].data.thumbnail != undefined){
          image.src = aiPosts[i].data.thumbnail;
        }
 
        // image.classList.add(`fuck`);
        // console.log(image.src);
        figure.appendChild(image);
        ElWrapper.appendChild(figure);
        parentDiv.appendChild(ElWrapper);
     
        
        image.addEventListener("error", () => {
          console.log('busted ai');
          if (aiPosts[i].data.thumbnail != undefined){
            image.src = aiPosts[i].data.thumbnail;}
        });
       
      }
        
      }
      else{
        console.log('AI skipping')
      }
  }

    // console.log(AI);
    // console.log(arts);
    
    // if (document.getElementById(`parent-div`)){
    //   document.getElementById('parent-div').remove();
    // }
    // for (let i = 0; i < eachArtLimit; i++){
    //   // randomNumber =  Math.floor(Math.random() * 50);
    //   const randomNumber = generateUniqueRandom(maxRandomizedArts);
    //   // console.log(randomNumber);
    //   if (aiPosts[randomNumber].data.post_hint === `image`){
    //   let ElWrapper = document.createElement('div');
    //   ElWrapper.classList.add(`el-wrapper`);
    //   ElWrapper.classList.add(`ai`);
    //   let figure = document.createElement('figure');
    //   let image = document.createElement('img');
    //   ElWrapper.classList.add(`ai-wrappers`);
    //   image.src = aiPosts[randomNumber].data.url_overridden_by_dest;
      
    //   // image.classList.add(`fuck`);
    //   // console.log(image.src);
    //   figure.appendChild(image);
    //   ElWrapper.appendChild(figure);
    //   parentDiv.appendChild(ElWrapper);

    //   }
    // }
    //   // else{
    //   //   let ElWrapper = document.createElement('div');
    //   //   ElWrapper.classList.add(`el-wrapper`);
    //   //   ElWrapper.classList.add(`ai`);
    //   //   let figure = document.createElement('figure');
    //   //   let image = document.createElement('img');
    //   //   ElWrapper.classList.add(`ai-wrappers`);
    //   //   // if (aiPosts[i].data.post_hint === `null`){
    //   //   // }
    //   //   image.src = aiPosts[randomNumber].data.url;
     
    //   //   // console.log(riskyWrappers);
      
    //   //   // console.log(image.src);
        
    //   //   figure.appendChild(image);
    //   //   ElWrapper.appendChild(figure);
    //   //   parentDiv.appendChild(ElWrapper);
       
    //   // }
      // document.body.appendChild(parentDiv);
 
    // }
  
    // replaceBrokenArts();
    document.body.appendChild(parentDiv);
  }

  function replaceBrokenAI(){
    const riskyWrappers = document.querySelectorAll('.ai-wrappers');
    // console.log(riskyWrappers);
    for (let n = 0; n< riskyWrappers.length; n++){
      riskyWrappers[n].children[0].children[0].addEventListener("error", () => {
       console.log('AI BROKEN SPOTTED')
       failedAI++;
       riskyWrappers[n].children[0].children[0].src= aiPosts[n].data.thumbnail;
       
      //  aiPosts[eachArtLimit].data.thumbnail;
       replaceBrokenAI();
        // riskyWrappers[n].remove();
        
        // for ( let i = 0; i < failedAI; i++){
       
          // let ElWrapper = document.createElement('div');
          // ElWrapper.classList.add(`el-wrapper`);
          // ElWrapper.classList.add(`ai`);
          // let figure = document.createElement('figure');
          // let image = document.createElement('img');
          // image.classList.add(`potential-imgs`);
          // // if (aiPosts[i].data.post_hint === `null`){
          // // }
          // image.src = aiPosts[eachArtLimit+failedAI].data.thumbnail;
          // console.log(failedAI+eachArtLimit);
          // // console.log(riskyWrappers);
          
          // figure.appendChild(image);
          // ElWrapper.appendChild(figure);
          // parentDiv.appendChild(ElWrapper);
         
     
        // }
      });
   }
  }
  // function replaceBrokenAI(){
  //   const riskyWrappers = document.querySelectorAll('.ai-wrappers');
  //   console.log(riskyWrappers);
  //   for (let n = 0; n< riskyWrappers.length; n++){
  //     riskyWrappers[n].children[0].children[0].addEventListener("error", () => {
  //     //  console.log('test')
  //      failedAI++;
  //      riskyWrappers[n].children[0].children[0].src=aiPosts[eachArtLimit+failedAI].data.thumbnail;
  //      console.log(failedAI);
  //       // riskyWrappers[n].remove();
        
  //       // for ( let i = 0; i < failedAI; i++){
       
  //         // let ElWrapper = document.createElement('div');
  //         // ElWrapper.classList.add(`el-wrapper`);
  //         // ElWrapper.classList.add(`ai`);
  //         // let figure = document.createElement('figure');
  //         // let image = document.createElement('img');
  //         // image.classList.add(`potential-imgs`);
  //         // // if (aiPosts[i].data.post_hint === `null`){
  //         // // }
  //         // image.src = aiPosts[eachArtLimit+failedAI].data.thumbnail;
  //         // console.log(failedAI+eachArtLimit);
  //         // // console.log(riskyWrappers);
          
  //         // figure.appendChild(image);
  //         // ElWrapper.appendChild(figure);
  //         // parentDiv.appendChild(ElWrapper);
         
     
  //       // }
  //     });
  //  }
  //  checkBrokenAI();
  // console.log(failedAI);
  // }
  function replaceBrokenArt(){
    const riskyWrappers = document.querySelectorAll('.art-wrappers');
    console.log(riskyWrappers);
    for (let n = 0; n< riskyWrappers.length; n++){
      riskyWrappers[n].children[0].children[0].addEventListener("error", () => {
       console.log('west');
       failedArt++;
       riskyWrappers[n].children[0].children[0].src=artPosts[n].data.thumbnail;
       console.log(failedArt);

      });
   }
  //  checkBrokenAI();
  console.log(failedArt);
  
  }
// function checkBrokenAI(){
    
//     const riskyWrappers = document.querySelectorAll('.ai-wrappers');
//     for (let n = 0; n< riskyWrappers.length; n++){
//       riskyWrappers[n].children[0].children[0].addEventListener("error", () => {
//         console.log('oh no');
//   });
//   }
// }




function errorHandler(){
  count++;
  console.log('sad');
  // alert('fk'+count);

}



  function shuffle() {
    const cardWrappers = document.querySelectorAll('.el-wrapper');
    cardWrappers.forEach(card => {
      let randomPos = Math.floor(Math.random() * cardWrappers.length);
      card.style.order = randomPos;
    });

  }
  function selectArt(){
    let selectedAmount = 0;
    const elWrappers = document.querySelectorAll('.el-wrapper');
console.log(eachArtLimit);

      for(let n = 0; n< elWrappers.length; n++){
        elWrappers[n].addEventListener('click',()=>{
          
          if(!elWrappers[n].classList.contains('selected') && eachArtLimit==1 && playTime === true){
            for(let i = 0; i< elWrappers.length; i++){
              elWrappers[i].classList.remove('selected');
            }
            elWrappers[n].classList.add('selected');
            console.log('adnpand')
          }

          else if (elWrappers[n].classList.contains('selected')  && playTime===true && eachArtLimit!=1){
            elWrappers[n].classList.remove('selected');
            selectedAmount--;
          }
          
          else if (!elWrappers[n].classList.contains('selected') && selectedAmount <eachArtLimit && playTime===true && eachArtLimit!=1){
            elWrappers[n].classList.add('selected');
            selectedAmount++;
          }
          
   
        });
      }
 
    
  }


    const resultBtn = document.querySelector(`.result-button`);
    
      resultBtn.addEventListener('click',()=>{
        // console.log('result btn pressed');
        if (playTime){
      
        console.log(playTime);
        let score = 0;
        const aiWrappers = document.querySelectorAll(`.ai`);
        const selectedWrappers = document.querySelectorAll('.selected');
        for(let n = 0; n< selectedWrappers.length; n++){
 
          if (selectedWrappers[n].classList.contains(`ai`)){
            score++;
            selectedWrappers[n].style.border = "10px solid rgb(39, 107, 30)";
          }
          
          else{
            selectedWrappers[n].style.border = "10px solid rgb(170, 2, 2)";
          }
          
        }
       console.log('score:'+score);

       for(let n = 0; n< aiWrappers.length; n++){
        if (!aiWrappers[n].classList.contains(`selected`)){
          console.log('wth');
        aiWrappers[n].style.border = "10px solid  rgb(30, 66, 107)";
        }
      }
      
       for(let n = 0; n< selectedWrappers.length; n++){
        selectedWrappers[n].classList.remove('selected');
      }
      let points = `points`;
      if (score===1 || score ===0){
        points = `point`;
      }
      instructionText.innerHTML=`${score} ${points}! Refresh to try again!`;
        // if (score <3){
        // instructionText.innerHTML=`${score} points... What are you? A bot? Press  Refresh and try again u bot`;
        // }
        // else if(score ===3 ){
        //   instructionText.innerHTML=`${score} points... Preeeeetty average. Heh jk press  Refresh to try again!`;
        // }
        // else if(score ===4){
        //   instructionText.innerHTML=`${score} points yeah? That's pretty good, though still low for asian standard. Press Refresh to Try again!`;
        // }
        // else if(score ===5){
        //   instructionText.innerHTML=`SHEEEESH ${score} pts! Homerun!`;
        // }
      }
      playTime = false;
      });


  // resultBtn.addEventListener('click',()=>{
  
   
  // });
  let haveIt = [];
  let haveIt2 = [];
  // generateUniqueRandom(10);

function generateUniqueRandom(maxNr) {
    //Generate random number
    let random = (Math.random() * maxNr).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if(!haveIt.includes(random)) {
        haveIt.push(random);

        
        // console.log(haveIt);
        return random;
    } else {
        if(haveIt.length < maxNr) {
          //Recursively generate number
        
         return  generateUniqueRandom(maxNr);
        } else {
          // // console.log('No more numbers available.')
          return false;
        }
    }
}
function generateUniqueRandom2(maxNr) {
  //Generate random number
  let random = (Math.random() * maxNr).toFixed();

  //Coerce to number by boxing
  random = Number(random);

  if(!haveIt2.includes(random)) {
      haveIt2.push(random);

      
      // console.log(haveIt2);
      return random;
  } else {
      if(haveIt2.length < maxNr) {
        //Recursively generate number
      
       return  generateUniqueRandom2(maxNr);
      } else {
        console.log('No more numbers available.')
        return false;
      }
  }
}