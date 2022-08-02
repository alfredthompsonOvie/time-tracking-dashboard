"use strict";
const tabContainer = document.querySelector(".tabContainer");
const activities = document.querySelector(".activities");
const currentHrs = document.querySelector(".current__time");
const prevContent = document.querySelector(".prev__content");
const prevHrs = document.querySelector(".prev__time");
const btnz = document.querySelectorAll(".btn");
const cardz = document.querySelectorAll(".activities .card");

btnz[1].classList.add("active");

async function getData(time = "daily") {
	try {
		const res = await fetch("../data.json");
		const data = await res.json();
		if (!res.ok) throw new Error("Something went wrong");
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
      <img src="images/icon-${result.title
			.split(" ")
			.map((x) => x.toLowerCase())
			.join("-")}.svg" alt="" class="illustration__img">
     </div>
     <div class="card__contents">
      <div class="content__header">
       <h4 class="title">${result.title}</h4>
       <img src="images/icon-ellipsis.svg" alt="">
      </div>
      <div class="card__timeframes">
       <h1 class="current__time">${curr}hrs</h1>
       <p class="prev__timeframe">
        <span class="prev__content">${period}</span>
        -
        <span class="prev__time">${prev}hrs</span>
       </p>
      </div>
     </div>
    </div>
 `;
	activities.insertAdjacentHTML("beforeend", markup);
}

function displaySelectedContent(e) {
	const clicked = e.target.closest(".btn");
	if (!clicked) return;
	btnz.forEach((btn) => btn.classList.remove("active"));
	clicked.classList.add("active");

	let time = clicked.dataset.time;

	//! fix?
	activities.innerHTML = "";
	getData(time);
}

tabContainer.addEventListener("click", displaySelectedContent);
