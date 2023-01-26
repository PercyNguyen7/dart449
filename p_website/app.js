const menuBtn = document.querySelector('.menu-btn');
const primaryNav = document.querySelector('.primary-navigation');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    primaryNav.setAttribute('data-open',true);
  menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    primaryNav.setAttribute('data-open',false);
 menuOpen = false;
  }
});

let innerCursor = document.querySelector('.inner-cursor');
let outerCursor = document.querySelector('.outer-cursor');

document.addEventListener('mousemove',moveCursor);

let normCursorDiff = 0;
let growCursorDiff =0;

let normCursor = 1;
let growCursor = 1;
function moveCursor(e){
    // let x = e.clientX;
    // let y = e.clientY;

    // innerCursor.style.left =e.pageX + "px";
    // innerCursor.style.top =e.pageY + "px";
    // outerCursor.style.left =e.pageX + "px";
    // outerCursor.style.top =e.pageY + "px";
    let pageX = e.pageX - normCursorDiff;
    let pageY = e.pageY - normCursorDiff;
    innerCursor.style.transform = "translate("+pageX+"px,"+pageY+"px)";
    innerCursor.style.transform += 'scale('+normCursor+')';
    // outerCursor.style.transform = "translate("+e.pageX+"px,"+e.pageY +"px)";

    // console.log(x,y);
}

// const headings = ;
const headings = Array.from(document.querySelectorAll(".clickable"));
headings.forEach((headings) => {
    headings.addEventListener("mouseover",()=>{
        normCursorDiff = growCursorDiff;
        innerCursor.classList.add("grow");
        outerCursor.classList.add("grow");
        normCursor= growCursor
    });
    headings.addEventListener("mouseleave",()=>{
        innerCursor.classList.remove("grow");
        outerCursor.classList.remove("grow");
        // innerCursor.style.transform = "scale(2)";
        normCursor=1;
      
    });
});