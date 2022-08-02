"use strict";
const tabContainer = document.querySelector(".tabContainer");
const activities = document.querySelector(".activities");
// const currentHrs = document.querySelector(".current__time");
const btnz = document.querySelectorAll(".btn");
let currentHrsz = document.querySelectorAll(".current__time");
let prevContentz = document.querySelectorAll(".prev__content");
let prevTime = document.querySelectorAll(".prev__time");

btnz[1].classList.add("active");

async function getData(time) {
	try {
		const res = await fetch("../data.json");
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}

function displaySelected(e) {
	let clicked = e.target.closest(".btn");
	if (!clicked) return;
	btnz.forEach((btn) => btn.classList.remove("active"));
	clicked.classList.add("active");
	let time = clicked.dataset.time;
	const data = getData();
	renderTimeframes(time, data);
}

tabContainer.addEventListener("click", displaySelected);

function renderTimeframes(time, data) {
	if (time === "daily") {
		data.then((data) => {
			currentHrsz.forEach((c, i) => {
				c.innerText = data[i].timeframes.daily.current + "hrs";
				prevTime[i].innerText = data[i].timeframes.daily.previous + "hrs";
				prevContentz[i].innerText = "yesterday";
			});
		});
	}

	if (time === "weekly") {
		data.then((data) => {
			currentHrsz.forEach((c, i) => {
				c.innerText = data[i].timeframes.weekly.current + "hrs";
				prevTime[i].innerText = data[i].timeframes.weekly.previous + "hrs";
				prevContentz[i].innerText = "last week";
			});
		});
	}

	if (time === "monthly") {
		data.then((data) => {
			currentHrsz.forEach((c, i) => {
				c.innerText = data[i].timeframes.monthly.current + "hrs";
				prevTime[i].innerText = data[i].timeframes.monthly.previous + "hrs";
				prevContentz[i].innerText = "last month";
			});
		});
	}
}