"use strict";
console.log('yeah');
const activity = document.querySelector(".activity");

const cardContainer = document.querySelector(".cardContainer");
const currentHrs = document.querySelector(".currentHrs");
const prevContents = document.querySelector(".prev__contents");
const prevHrs = document.querySelector(".prev__hrs");

const btnz = document.querySelectorAll('.btn');

// active tab
let active = 0;
btnz[active].classList.add('active');

// render cards
const getData = async function(time) {
 const res = await fetch('../data.json');
 const data = await res.json();

 data.forEach(result => {
  renderData(result, time)

 })

}
function renderData(result, time) {
 const markup = `
  
 <div class="card ">
 <div class="illustration ${
  result.title
 }" >
  <img
   src="images/icon-${result.title
  }.svg"
   alt=""
   class="illustration__img"
  />
 </div>

 <div class="contents">
  <header class="flex">
   <p class="heading">${result.title}</p>
   <p>
    <img
     src="images/icon-ellipsis.svg"
     alt="icon-ellipsis"
    />
   </p>
  </header>
  <section>
   <div class="hours flex">
    <h1 class="heading currentHrs">${result.timeframes.daily.current}hrs</h1>
    <div class="timeFrame">
     <p>
      <span class="prev__contents">yesterday</span> -
      <span class="prev__hrs">${result.timeframes.daily.previous}hrs</span>
     </p>
    </div>
   </div>
  </section>
 </div>
</div> 
 `;
 cardContainer.insertAdjacentHTML("beforeend", markup)
}
getData('daily');

activity.addEventListener("click", (e) => {
 const btnz = document.querySelectorAll(".btn");
 let clicked = e.target.closest(".btn");
 if (!clicked) return;
 btnz.forEach(btn => btn.classList.remove("active"));
 clicked.classList.add("active");

 
 const time = clicked.dataset.time;
 console.log(time);
 getData(time);
 // renderData(result)
 if (time === 'weekly') renderData('weekly');
})













































// let name = "John Smith"
 
// let capLetter = name.split(' ')
//  .slice(0,1)
//  .join()
//  .split('')
//  .slice(0, 1)
//  .map(x=>x.toLowerCase());

// let remainingChar = name.slice(1)
//  .split(' ')
//  .join('');

// let newWord = [capLetter, remainingChar].join('');

// let newName = name.split(' ')
//  .map(x => x.toLowerCase())
//  .join('-')

//  console.log(newName);


/*
 const markup = `
  
 <div class="card ">
 <div class="illustration ${
  result.title.split(' ')
  .map(x => x.toLowerCase())
  .join('-')
 
 }" >
  <img
   src="images/icon-${result.title.split(' ')
   .map(x => x.toLowerCase())
   .join('-')
  }.svg"
   alt=""
   class="illustration__img"
  />
 </div>

 <div class="contents">
  <header class="flex">
   <p class="heading">${result.title}</p>
   <p>
    <img
     src="images/icon-ellipsis.svg"
     alt="icon-ellipsis"
    />
   </p>
  </header>
  <section>
   <div class="hours flex">
    <h1 class="heading currentHrs">${result.timeframes.daily.current}hrs</h1>
    <div class="timeFrame">
     <p>
      <span class="prev__contents">yesterday</span> -
      <span class="prev__hrs">${result.timeframes.daily.previous}hrs</span>
     </p>
    </div>
   </div>
  </section>
 </div>
</div> 
 `;

*/ 