// code inspired by https://codepen.io/jacobhernandez08/pen/XwGqZw

fetchResults(`https://www.reddit.com/r/all/top/.json`);

// const parentDiv = document.querySelector('#parent-div');

subreddit = "all";
submit = document.querySelector('.button');

submit.addEventListener('click', function(e){
  
  theSubreddit = document.querySelector('.subreddit').value;
  
  if(theSubreddit == null || theSubreddit.length < 1) {
    subreddit = "all";
  }
  else {
    subreddit = theSubreddit;
  }
  
  console.log(subreddit);
  fetchResults(`https://www.reddit.com/r/${subreddit}/new/.json`);
  
});

async function fetchResults(url) {
  fetch(url)
  .then(
    // response=>response.json()

    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
      // console.log('nope');
      // else{
      //   console.log('sad')
      //  alert('try another one');
      // }
    }


    // function(response) {
    // document.querySelector('.content').innerHTML = 'Fetching results';
    // return response.json();
    // response=>response.json();
  // }
  )
  .then(
    json => {
    // or function (myJson) {
    renderResults(json);
    // console.log(myJson);
  
  })
  // .catch((error) => {
  //   console.log(error);
  //   alert('try another one');
  // });
}

function renderResults(json) {
  posts = json.data.children;
  console.log(posts);
  
  if (document.getElementById(`parent-div`)){
    document.getElementById('parent-div').remove();
  }

      let parentDiv = document.createElement('div');
      parentDiv.id ='parent-div';
  for (let i = 0; i< posts.length; i++){

    if (posts[i].data.post_hint === `image`){
    let ElWrapper = document.createElement('div');
    // ElWrapper.classList.add(`el-wrapper`);
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    if (posts[i].data.post_hint === `null`){
    }
    image.src = posts[i].data.url_overridden_by_dest;
    console.log(image.src);
    figure.appendChild(image);
    ElWrapper.appendChild(figure);
    parentDiv.appendChild(ElWrapper);
    console.log();
    }
    else if (posts[i].data.post_hint === `hosted:video`){
      let ElWrapper = document.createElement('div');
    // ElWrapper.classList.add(`el-wrapper`);
    let figure = document.createElement('figure');
    let video = document.createElement('video');
    video.setAttribute("controls","controls")
    video.src = posts[i].data.secure_media.reddit_video.fallback_url;
    

    figure.appendChild(video);
    ElWrapper.appendChild(figure);
    parentDiv.appendChild(ElWrapper);
    }
    else if (posts[i].data.post_hint === `rich:video`){
    // let ElWrapper = document.createElement('div');
    // // ElWrapper.classList.add(`el-wrapper`);
    // let figure = document.createElement('figure');
    // let video = document.createElement('video');
    // video.setAttribute("controls","controls")
    // // video.src = posts[i].data.secure_media_embed.media_domain_url;
    // video.src=`https://www.redditmedia.com/mediaembed/10wmdrs`;
    // // https://www.redditmedia.com/mediaembed/10wjdzs

    // figure.appendChild(video);
    // ElWrapper.appendChild(figure);
    // parentDiv.appendChild(ElWrapper);
    let ElWrapper = document.createElement('div');
    // ElWrapper.classList.add(`el-wrapper`);
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    if (posts[i].data.post_hint === `null`){
    }
    image.src = posts[i].data.thumbnail;
    console.log(image.src);
    figure.appendChild(image);
    ElWrapper.appendChild(figure);
    parentDiv.appendChild(ElWrapper);
    // console.log();
    }
    else if (posts[i].data.post_hint === `link`){
      let ElWrapper = document.createElement('div');
      // ElWrapper.classList.add(`el-wrapper`);
      let figure = document.createElement('figure');
      let image = document.createElement('img');
      if (posts[i].data.post_hint === `null`){
      }
      image.src = posts[i].data.thumbnail;
      console.log(image.src);
      figure.appendChild(image);
      ElWrapper.appendChild(figure);
      parentDiv.appendChild(ElWrapper);
      console.log();
  }
  document.body.appendChild(parentDiv);
}
}


 



// function renderResults(json) {
//   posts = json.data.children;
//   console.log(posts);
//   let html = `<ol> 
//   ${posts.map(
//       post => `<li>${post.data.title} <a href=${post.data.url} target='_blank'>Link</a></li>`
//     ).join('')}
//   </ol>`;
  
//   document.querySelector('.content').innerHTML = html;
// }

