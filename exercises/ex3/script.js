// code inspired by https://codepen.io/jacobhernandez08/pen/XwGqZw

fetchResults(`https://www.reddit.com/r/aiArt/hot/.json?limit=100`,`https://www.reddit.com/r/DigitalArt/hot/.json?limit=100`);
let maxRandomizedArts=75;
let totalArtLimit;
let eachArtLimit = 5;
let failedAI = 0;
let failedArt = 0;
let aiUpvoteType;
let artUpvoteType;

let aiType =`new`;
let artType =`new`;

let playTime = true;

let TopType = `top`;
let HotType = 'hot';
let NewType = `new`;
let RisingType = `rising`;

const aiBtn = document.querySelector(`#ai-drop-btn`);
const artBtn = document.querySelector(`#art-drop-btn`);

const aiTypesBtn = document.querySelectorAll(`.ai-types`);
const artTypesBtn = document.querySelectorAll(`.art-types`);
const submitBtn = document.querySelector('.button');
// const resultBtn = document.querySelector(`.result-button`);
console.log(submitBtn);


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
  playTime = true;
  fetchResults(`https://www.reddit.com/r/aiArt/${aiType}/.json?limit=100`,`https://www.reddit.com/r/DigitalArt/${artType}/.json?limit=100`);
})
// fetchResults();
async function fetchResults(aiURL,artURL) {
 

  Promise.all([
    fetch(aiURL),fetch(artURL)]).then(
      
    responses =>{
      // if (Promise.all(responses.ok)) {
        return Promise.all(responses.map(r =>r.json()));
      // }
      // throw new Error('Something went wrong');

  }
  ).then(([AI,arts]) =>{
    console.log(AI.data.children);
    console.log(arts.data.children);
    renderResults(AI,arts);
    replaceBrokenAI();
    replaceBrokenArt();
    shuffle();
    selectArt();
    // checkResult();
  })
    .catch((error) => {
    console.log(error);
    // alert('try another one');
  });
}
  function renderResults(AI,arts){
    if (document.getElementById(`parent-div`)){
      document.getElementById('parent-div').remove();
    }
    
    // render 
    artPosts = arts.data.children;
    // console.log(AI);
    // console.log(arts);
    
    // if (document.getElementById(`parent-div`)){
    //   document.getElementById('parent-div').remove();
    // }

        let parentDiv = document.createElement('div');
        parentDiv.id ='parent-div';
    for (let i = 0; i <  eachArtLimit; i++){
      const randomNumber = generateUniqueRandom2(maxRandomizedArts);
      if (artPosts[randomNumber].data.post_hint === `image`){
      let ElWrapper = document.createElement('div');
      ElWrapper.classList.add(`el-wrapper`);
      ElWrapper.classList.add(`art-wrappers`);

      let figure = document.createElement('figure');
      let image = document.createElement('img');
      if (artPosts[randomNumber].data.post_hint === `null`){
      }
      image.src = artPosts[randomNumber].data.url_overridden_by_dest;
      // console.log(image.src);
      figure.appendChild(image);
      ElWrapper.appendChild(figure);
      parentDiv.appendChild(ElWrapper);
      // console.log('test');
      }
      else{
        let ElWrapper = document.createElement('div');
        ElWrapper.classList.add(`el-wrapper`);
        ElWrapper.classList.add(`art-wrappers`);
        let figure = document.createElement('figure');
        let image = document.createElement('img');
        if (artPosts[i].data.post_hint === `null`){
        }
        image.src = artPosts[i].data.thumbnail;
        // console.log(image.src);
        figure.appendChild(image);
        ElWrapper.appendChild(figure);
        parentDiv.appendChild(ElWrapper);
        console.log();
      }
    
      // document.body.appendChild(parentDiv);
    }

    aiPosts = AI.data.children;
    // console.log(AI);
    // console.log(arts);
    
    // if (document.getElementById(`parent-div`)){
    //   document.getElementById('parent-div').remove();
    // }
    for (let i = 0; i < eachArtLimit; i++){
      // randomNumber =  Math.floor(Math.random() * 50);
      const randomNumber = generateUniqueRandom(maxRandomizedArts);
      // console.log(randomNumber);
      if (aiPosts[randomNumber].data.post_hint === `image`){
      let ElWrapper = document.createElement('div');
      ElWrapper.classList.add(`el-wrapper`);
      ElWrapper.classList.add(`ai`);
      let figure = document.createElement('figure');
      let image = document.createElement('img');
      ElWrapper.classList.add(`ai-wrappers`);
      image.src = aiPosts[randomNumber].data.url_overridden_by_dest;
      
      // image.classList.add(`fuck`);
      // console.log(image.src);
      figure.appendChild(image);
      ElWrapper.appendChild(figure);
      parentDiv.appendChild(ElWrapper);

      }
      else{
        let ElWrapper = document.createElement('div');
        ElWrapper.classList.add(`el-wrapper`);
        ElWrapper.classList.add(`ai`);
        let figure = document.createElement('figure');
        let image = document.createElement('img');
        ElWrapper.classList.add(`ai-wrappers`);
        // if (aiPosts[i].data.post_hint === `null`){
        // }
        image.src = aiPosts[randomNumber].data.thumbnail;
     
        // console.log(riskyWrappers);
      
        // console.log(image.src);
        
        figure.appendChild(image);
        ElWrapper.appendChild(figure);
        parentDiv.appendChild(ElWrapper);
       
      }
      // document.body.appendChild(parentDiv);
 
    }
    document.body.appendChild(parentDiv);
    // replaceBrokenArts();
   
  }



  function replaceBrokenAI(){
    const riskyWrappers = document.querySelectorAll('.ai-wrappers');
    // console.log(riskyWrappers);
    for (let n = 0; n< riskyWrappers.length; n++){
      riskyWrappers[n].children[0].children[0].addEventListener("error", () => {
       console.log('AI BROKEN SPOTTED')
       failedAI++;
       riskyWrappers[n].children[0].children[0].src=aiPosts[eachArtLimit+failedAI].data.thumbnail;
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
       riskyWrappers[n].children[0].children[0].src=artPosts[eachArtLimit+failedArt].data.thumbnail;
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



  let count = 0;
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
    console.log('once')
  }
  function selectArt(){
    let selectedAmount = 0;
    const elWrappers = document.querySelectorAll('.el-wrapper');

  
      for(let n = 0; n< elWrappers.length; n++){
        elWrappers[n].addEventListener('click',()=>{
          
          if (elWrappers[n].classList.contains('selected')  && playTime===true){
            elWrappers[n].classList.remove('selected');
            selectedAmount--;
          }
          else if (!elWrappers[n].classList.contains('selected') && selectedAmount <5 && playTime===true){
            elWrappers[n].classList.add('selected');
            selectedAmount++;
          }
          console.log(`selecting ${(selectedAmount)}`);
        });
      }
 
    
  }



    
    const resultBtn = document.querySelector(`.result-button`);
    

      resultBtn.addEventListener('click',()=>{
        console.log('result btn pressed');
        playTime = false;
        let score = 0;
      
        const selectedWrappers = document.querySelectorAll('.selected');
        for(let n = 0; n< selectedWrappers.length; n++){
 
          if (selectedWrappers[n].classList.contains(`ai`)){
            score++;
          }
        }
       console.log('score:'+score);

       const aiWrappers = document.querySelectorAll(`.ai`);
       for(let n = 0; n< aiWrappers.length; n++){
        aiWrappers[n].style.outline = "5px solid green";
      }
       for(let n = 0; n< selectedWrappers.length; n++){
     
        selectedWrappers[n].classList.remove('selected');
      }
      alert(`You scored ${score} points!`);
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

        
        console.log(haveIt);
        return random;
    } else {
        if(haveIt.length < maxNr) {
          //Recursively generate number
        
         return  generateUniqueRandom(maxNr);
        } else {
          console.log('No more numbers available.')
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

      
      console.log(haveIt);
      return random;
  } else {
      if(haveIt2.length < maxNr) {
        //Recursively generate number
      
       return  generateUniqueRandom(maxNr);
      } else {
        console.log('No more numbers available.')
        return false;
      }
  }
}