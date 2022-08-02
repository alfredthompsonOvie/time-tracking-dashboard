"use strict";
console.log("yeah");
const activity = document.querySelector(".activity");

const cardContainer = document.querySelector(".cardContainer");
const currentHrs = document.querySelector(".currentHrs");
const prevContents = document.querySelector(".prev__contents");
const prevHrs = document.querySelector(".prev__hrs");

const btnz = document.querySelectorAll(".btn");

function init() {
	let active = 0;
	btnz[active].classList.add("active");
	getData();
}
init();

async function getData(time = "daily") {
	try {
		const res = await fetch("../data.json");
		const data = await res.json();
		if (!res.ok)
			throw new Error(
				"Something went wrong"
			);
		data.forEach((result) => {
			if (time === "daily") {
				const period = "yesterday";
				const dailycurrent = result.timeframes.daily.current;
				const dailyprevious = result.timeframes.daily.previous;
				renderData(result, dailycurrent, period, dailyprevious);
			}
			if (time === "weekly") {
				const period = "last week";
				const weeklycurrent = result.timeframes.weekly.current;
				const weeklyprevious = result.timeframes.weekly.previous;
				renderData(result, weeklycurrent, period, weeklyprevious);
			}
			if (time === "monthly") {
				const period = "last month";
				const monthlycurrent = result.timeframes.monthly.current;
				const monthlyprevious = result.timeframes.monthly.previous;
				renderData(result, monthlycurrent, period, monthlyprevious);
			}

			// first render
			// renderData(result, dailycurrent, time, dailyprevious);
		});

		return data;
	} catch (err) {
		console.log(err);
	}
}

function renderData(result, curr, period, prev) {
	const markup = `
 <div class="card">
 <div class="illustration ${result.title
		.split(" ")
		.map((x) => x.toLowerCase())
		.join("-")}">
  <img
   src="images/icon-${result.title
		.split(" ")
		.map((x) => x.toLowerCase())
		.join("-")}.svg"
   alt=""
   class="illustration__img"
  />
 </div>

 <div class="contents">
  <header class="flex">
   <p class="heading">${result.title}</p>
   <p>
   <a href="#">
    <img
     src="images/icon-ellipsis.svg"
     alt="icon-ellipsis"
    />
   </a>
   </p>
  </header>
  <section>
   <div class="hours flex timeFrame flex_prev">
    <h1 class="heading current__time">${curr}hrs</h1>
    <div class="timeFrame__prev">
     <p>
     <span class="prev__contents period">${period}</span> -
     <span class="prev__hrs prev__time">${prev}hrs</span>
     </p>
    </div>
   </div>
  </section>
 </div>
</div>
 `;
	cardContainer.insertAdjacentHTML("beforeend", markup);
}

function displaySelectedContent(e) {
	const clicked = e.target.closest(".btn");
	if (!clicked) return;
	btnz.forEach((btn) => btn.classList.remove("active"));
	clicked.classList.add("active");

	let time = clicked.dataset.time;

	//! fix?
	cardContainer.innerHTML = "";
	getData(time);
}

activity.addEventListener("click", displaySelectedContent);
console.log(currentHrs);
