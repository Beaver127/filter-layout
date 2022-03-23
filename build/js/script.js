
"use strict";
(function() {
	document.body.onclick = function (e){
		let div = document.querySelectorAll(".checkbox-tooltip");
		if(div.length != 0) {
			for(let item of div) {
				item.remove();
			}
		}
	};
		//константы
		const MAX_HEIGHT = 400;
		const MAX_WIDTH = 768;
		const MAX_CHECBOX_ITEMS = 5;
		const SECOND_MAX_CHECBOX_ITEMS = 12;
		const CLEAR_MIN_NUMBER = "0";
		const CLEAR_MAX_NUMBER = "0";

	//CATEGORY LIST (первый компонент фильтра)
	const one = document.querySelectorAll(".filter-category-list_one > li");
	const two = document.querySelectorAll(".filter-category-list_two > li");
	const three = document.querySelectorAll(".filter-category-list_three");
	const threeItems = document.querySelectorAll(".filter-category-list_three > li");
	for(let item of threeItems) {
		item.onclick = function(event) {
			let old = document.querySelector(".filter-category-list_three > li.active");
			old.firstElementChild.checked = "";
			old.classList.remove("active");
			this.classList.add("active");
			this.firstElementChild.checked = "checked";
		}
	}
	for(let item of three) {
		item.onclick = function(event) {
			event.stopPropagation();
		}
	}
	function popupMenuCategory(list) {
		for(let item of list) {
			item.onclick = function(event) {
				if(this.parentElement.classList.contains("filter-category-list_one")) {
					this.firstElementChild.classList.toggle("active_arrow");
					let arrItems = this.lastElementChild.children;
					showItems(arrItems);
				} else if(this.parentElement.classList.contains("filter-category-list_two")) {
					this.firstElementChild.classList.toggle("active_arrow");
					let arrItems = this.lastElementChild.children;
					showItems(arrItems);
					event.stopPropagation();
				}
			}
		}
	}
	function showItems(items) {
		for(let item of items) {
			item.classList.toggle("show");
		}
	}
	popupMenuCategory(one);
	popupMenuCategory(two);


	//PRICE
	const inputsStart = document.querySelectorAll(".input_start");
	const inputsEnd = document.querySelectorAll(".input_end");
	const closeInputs = document.querySelectorAll(".clear_inputs");
	const column_price_wrappers = document.querySelectorAll(".column_price_wrapper");
	const column_price_showall = document.querySelectorAll(".column_price_showall");
	for(let item of column_price_wrappers) {
		if(item.children.length > 3) {
			item.nextElementSibling.classList.add("show");
			for(let elem = 3; elem < item.children.length; elem++) {
				item.children[elem].classList.add("hide");
			}
		}
	}
	for(let item of column_price_showall) {
		item.onclick = function(event) {
			let arr = this.previousElementSibling;
			if(this.classList.contains("active")) {
				for(let elem = 3; elem < arr.children.length; elem++) {
					arr.children[elem].classList.add("hide");
				}

				if(arr.children.length > 7) {
					this.previousElementSibling.previousElementSibling.classList.remove("active");
					arr.classList.remove("active");
				}
				this.classList.remove("active");
				this.textContent = "Показать все";
			} else {
				this.classList.add("active")
				this.textContent = "Скрыть";
				for(let item of arr.children) {
					item.classList.remove("hide");
				}
				if(arr.children.length > 7) {
					this.previousElementSibling.previousElementSibling.classList.add("active");
					arr.classList.add("active");
				}
			}
		}
	}
	for(let item of closeInputs) {
		item.onclick = function(event) {
			let currentElem = this.nextElementSibling;
			if(currentElem.classList.contains("column_price_row")) {
				currentElem.firstElementChild.firstElementChild.value = CLEAR_MIN_NUMBER;
				currentElem.lastElementChild.lastElementChild.value = CLEAR_MAX_NUMBER;
				currentElem = currentElem.nextElementSibling;
			}
		}
	}
	validateNuber(inputsStart);
	validateNuber(inputsEnd);

	//валидация большего и меньшего поля с вводом числа 
	function validateNuber(inputs) {
		for(let item of inputs) {
			item.onpaste = (e) => e.preventDefault();
			item.addEventListener("change", e => {
				if(e.target.classList.contains("input_start")) {
					let s = e.target.parentElement.nextElementSibling.firstElementChild.value;
					if(+(e.target.value.replace(/\s/g, '')) >= +(s.replace(/\s/g, ''))) {
						e.target.value = e.target.getAttribute("value");
					}
				} else if(e.target.classList.contains("input_end")) {
					let s = e.target.parentElement.previousElementSibling.firstElementChild.value;
					if(+(e.target.value.replace(/\s/g, '')) <= +(s.replace(/\s/g, ''))) {
						e.target.value = e.target.getAttribute("value");
					}
				}
				e.target.setAttribute("value", e.target.value);
				let newValue = e.target.value.replace(/\D/g, "");
				newValue = separator(newValue);
				e.target.value = newValue;
				if(e.target.classList.contains("input-adaptive")) {
					const spoiler = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
					const last = spoiler.lastElementChild;
					const first = spoiler.firstElementChild;
					first.classList.add("active");
					last.textContent = "от " + e.target.parentElement.previousElementSibling.firstElementChild.value +" до "+ newValue + " ₽";
					last.classList.add("active");
					spoiler.classList.add("active");
				}
			});
		}
	}
	//разделитель числа на пробелы
	function separator(str) {
		var parts = (str + '').split('.'),
		main = parts[0],
		len = main.length,
		output = '',
		i = len - 1;

		while(i >= 0) {
			output = main.charAt(i) + output;
			if ((len - i) % 3 === 0 && i > 0) {
				output = ' ' + output;
			}
			--i;
		}
		if (parts.length > 1) {
			output += '.' + parts[1];
		}
		return output;
	};
	//CHEKBOX
	const checkboxItems = document.querySelectorAll(".filter-checkbox");
	const simpleCheckboxItems = document.querySelectorAll(".simple-checkbox");
	const checkboxWraps = document.querySelectorAll(".checbox-wrapper");
	const showAllChekbox = document.querySelectorAll(".show-allchecbox");
	const lettersCheckbox = document.querySelectorAll(".alphabet-letter");
	// alphabet-letter
	for(let item of showAllChekbox) {
		item.onclick = function(event) {
			let arrCheckbox = this.previousElementSibling;
			if(arrCheckbox.children.length > SECOND_MAX_CHECBOX_ITEMS) {
				arrCheckbox.classList.add("active");
			}
			this.classList.toggle("active");
			if(this.classList.contains("active")) {
				this.textContent = "Скрыть";
				for(let item of arrCheckbox.children) {
					if(!(item.classList.contains("filter-checkbox"))) {
						item.classList.add("show");
					}
				}
			} else {
				arrCheckbox.classList.remove("active");
				this.textContent = "Показать все";
				for(let item of arrCheckbox.children) {
					if(!(item.classList.contains("filter-checkbox"))) {
						item.classList.remove("show");
					}
				}
			}
			//если больше 5
			if(arrCheckbox.children.length > MAX_CHECBOX_ITEMS) {
				checkLength(arrCheckbox);
			}
			//если больше 12
			if(arrCheckbox.children.length >= SECOND_MAX_CHECBOX_ITEMS) {
				if(!(arrCheckbox.previousElementSibling.classList.contains("active"))) {
					arrCheckbox.previousElementSibling.classList.add("active");
				} else {
					arrCheckbox.previousElementSibling.classList.remove("active");
				}
				sortChecbox(arrCheckbox);
			}
			if(arrCheckbox.classList.contains("active")) {
				for(let i of arrCheckbox.children) {
					if(i.classList.contains("hide")) {
						i.classList.remove("hide");
					}
				}
			}
			let n = 0;
			for(let i of arrCheckbox.children) {
				if(!(i.classList.contains("hide")) && i.classList.contains("filter-checkbox")) {
					n++;
				}
			}
			if(n < MAX_CHECBOX_ITEMS) {
				for(let c = n; c <= MAX_CHECBOX_ITEMS;c++) {
					if(!(arrCheckbox.children[c].classList.contains("filter-checkbox"))) {
						arrCheckbox.children[c].nextElementSibling.classList.remove("hide");
					} else {
						arrCheckbox.children[c].classList.remove("hide");
					}

				}
			}
		}
	}
	for(let currentList of checkboxWraps) {
		let length = currentList.children.length;
		if(length > MAX_CHECBOX_ITEMS) {
			for(let count = MAX_CHECBOX_ITEMS; count < length;count++) {
				if(!(currentList.nextElementSibling.classList.contains("show"))) {
					currentList.nextElementSibling.classList.add("show");
				}
				currentList.children[count].classList.add("hide");
			}
		}
		if(currentList.previousElementSibling.classList.contains("filter-appointment__search")) {
			currentList.children[4].classList.add("hide");
		}
	}
	for(let item of checkboxItems) {
		item.onclick = function(event) {
			const spoiler = this.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
			this.classList.toggle("active");
			if(spoiler) {
				spoiler.classList.add("active");
				spoiler.firstElementChild.classList.add("active");
				const last = spoiler.lastElementChild;
				last.classList.add("active");
				let count = 0;
				for(let item of this.parentElement.children) {
					if(item.classList.contains("filter-checkbox") &&
						item.classList.contains("active")) {
						++count;
				}
			}
			last.textContent = "Выбрано: " + count;
		}
		if(this.classList.contains("active")) {
			let j = this;
			setTimeout(function() {
				let message = createMessageUnder(j, j.lastElementChild.textContent);
				document.body.append(message);
			},3000);
			if(!document.querySelector(".checkbox-btn") && window.innerWidth < 769 && !document.querySelector(".fullfilter")) {
				setTimeout(function() {
					let message = createBtn(j, j.lastElementChild.textContent);
					document.body.append(message);
				},300);
			}

			this.firstElementChild.checked = "checked";
		} else {
			this.firstElementChild.checked = "";
			if(spoiler) {
				let ev = new Event("click");
				spoiler.firstElementChild.dispatchEvent(ev);
			}
	}
	let res = false;
	let parent = this.parentElement;
	for(let i of parent.children) {
		if(i.classList.contains("active")) {
			res = true;
		}
	}
	if(res) {
		parent.previousElementSibling.previousElementSibling.classList.add("filter-show");
	} else {
		if(document.querySelector(".checkbox-btn")) {
			document.querySelector(".checkbox-btn").remove();
		}
		parent.previousElementSibling.previousElementSibling.classList.remove("filter-show");
	}
}
}
for(let item of simpleCheckboxItems) {
	item.onclick = function(event) {
		this.classList.toggle("active");
		if(this.classList.contains("active")) {
			let j = this;
			if(!this.classList.contains("filter-price__checkbox")) {
				setTimeout(function() {
					let message = createMessageUnder(j, j.lastElementChild.textContent);
					document.body.append(message);
				},3000);
			}


			this.firstElementChild.checked = "checked";
		} else {
			this.firstElementChild.checked = "";
		}
	}
}
function toggleHiddenCheckboxItems(list) {
	for(let item of list) {
		let length = item.children.length;
		if(length > MAX_CHECBOX_ITEMS) {
			for(let count = MAX_CHECBOX_ITEMS; count < length;count++) {
				item.children[count].classList.add("hide");
			}
		}
	}
}
function checkLength(arrCheckbox) {
	let length = arrCheckbox.children.length;
	let reallength = 0;
	let counter = 0;
	for(let count = 0; count < MAX_CHECBOX_ITEMS;count++) {
		if(!(arrCheckbox.children[count].classList.contains("filter-checkbox"))) {
			counter++;
		}
	}
	reallength = counter;
	if(reallength == 0) {
		for(let count = MAX_CHECBOX_ITEMS; count < length;count++) {
			arrCheckbox.children[count].classList.toggle("hide");
		}
	} else {
		reallength += MAX_CHECBOX_ITEMS;
		for(let count = reallength; count < length;count++) {
			arrCheckbox.children[count].classList.toggle("hide");
		}
	}
}
function sortChecbox(list,search) {
	let curLetter;
	let arrItems = list.children;
	let arrNames = [];
	if(!(list.classList.contains("column_price_wrap"))) {
		for(let i of arrItems) {
			arrNames.unshift(i.textContent.trim());
		}
	} else {
		for(let i of arrItems) {
			arrNames.unshift(i.firstElementChild.textContent.trim());
		}
	}
				//сортировщик
				if(!(list.previousElementSibling.classList.contains("filter-appointment__search"))) {
					let collator = new Intl.Collator();
					arrNames.sort(function(a, b) {
						return collator.compare(a, b);
					});
					for(let sortItem of arrNames) {
						if(curLetter != sortItem[0]) {
						//создание букв
						if(!(list.classList.contains("alphabetLetters")) && !(list.previousElementSibling.classList.contains("filter-size__search"))) {
							curLetter = sortItem[0];
							let letter = document.createElement('div');
							letter.className = "alphabet-letter";
							letter.textContent = curLetter;
							letter.classList.add("show");
							list.append(letter);
						}
					}
					//добавление в отсортированом порядк
					for(let item of arrItems) {
						if(!(list.classList.contains("column_price_wrap"))) {
							if(item.textContent.trim() == sortItem) {
								list.append(item);
							} 
						} else {
							if(item.firstElementChild.textContent.trim() == sortItem) {
								list.append(item);
							} 
						}
						
					}
				}
				list.classList.add("alphabetLetters");
			}
			if(!(search == undefined)) {
				for(let item of list.children) {
					if(!(list.classList.contains("column_price_wrap"))) {
						if(!(list.previousElementSibling.classList.contains("filter-appointment__search"))) {
							if(item.textContent.toLowerCase().includes(search.toLowerCase())) {
								item.classList.remove("hide-el");
							} else {
								item.classList.add("hide-el");
							}
						} else {
							if(item.lastElementChild.textContent.toLowerCase().includes(search.toLowerCase())) {
								item.classList.remove("hide-el");
							} else {
								item.classList.add("hide-el");
							}
						}

					} else {
						if(item.firstElementChild.textContent.toLowerCase().includes(search.toLowerCase())) {
							item.classList.remove("hide-el");
						} else {
							item.classList.add("hide-el");
						}
					}
				}
			}
		}
		function createMessageUnder(elem, text) {
			let message = document.createElement('div');
			message.classList.add("checkbox-tooltip")
			let messageBtn = document.createElement('div');
			messageBtn.classList.add("checkbox-tooltip-btn")
			message.append(messageBtn);
			messageBtn.innerHTML = "Показать " + text + " товаров";
			return message;
		}
		const contents = document.querySelectorAll(".filter-adaptive-content__content");
		function createBtn(elem, text) {
			let message = document.createElement('div');
			message.classList.add("checkbox-btn")
			let messageBtn = document.createElement('div');
			messageBtn.classList.add("checkbox-btn-btn");
			message.append(messageBtn);
			messageBtn.innerHTML = "Применить";
			messageBtn.onclick = function(event) {
				for(let item of contents) {
					if(item.style.left == "0%") {
						item.style.left = "-100%";
						item.firstElementChild.style.left = "-100%";
					}
				}
				this.parentElement.remove();
			}
			return message;
		}
	//SEARCH
	const searchFields = document.querySelectorAll(".filter-search input");
	for(let item of searchFields) {
		item.addEventListener("keyup", e => {
			let newValue = e.target.value.replace(/[^ a-zA-Z0-9А-Яа-я()]/g, '');;
			e.target.value = newValue;
			sortChecbox(e.target.parentElement.nextElementSibling,newValue);
		});
	}
	//POPUP
	const popupItems = document.querySelectorAll(".popup-info span");
	const popups = document.querySelectorAll(".popup-content");
	for(let item of popups) {
		item.onmouseout = function(event) {
			this.classList.remove("active");
			this.classList.remove("show");
		}
	}
	for(let item of popupItems) {
		item.onclick = function(event) {
			popupClick(this);
		}
		item.onmouseover = function(event) {
			popupMouseOver(this);
		}
		item.onmouseout = function(event) {
			popupMouseOut(this);
		}
	}
	function popupClick(current) {
		if(window.innerWidth < MAX_WIDTH || window.innerHeight < MAX_HEIGHT) {
			current.nextElementSibling.classList.toggle("active");
		}
	}
	function popupMouseOver(current) {
		if(window.innerWidth > MAX_WIDTH || window.innerHeight > MAX_HEIGHT) {
			let content = current.nextElementSibling;
			content.classList.add("active");
			content.onmouseover = function(event) {
				current.nextElementSibling.classList.add("show");
				current.nextElementSibling.classList.add("active");
			}
		}
	}
	function popupMouseOut(current) {
		let elem = current;
		if(window.innerWidth > MAX_WIDTH || window.innerHeight > MAX_HEIGHT) {
			elem.nextElementSibling.classList.remove("active");
		}
	}

	//PRODUCER
	const clearCheckboxes = document.querySelectorAll(".clear_checboxes");
	for(let item of clearCheckboxes) {
		item.onclick = function(event) {
			clearCheckboxItems(this.nextElementSibling.nextElementSibling.children,this);
		}
	}
	function clearCheckboxItems(arr, current) {
		for(let i of arr) {
			if(i.classList.contains("filter-checkbox")) {
				i.classList.remove("active");
				i.firstElementChild.checked = "";
			}
		}
		current.classList.remove("filter-show");
		if(document.querySelector(".checkbox-btn")) {
			document.querySelector(".checkbox-btn").remove();
		}
	}

	//SPOILER
	const spoilers = document.querySelectorAll(".spoiler");
	for(let item of spoilers) {
		item.onclick = function(event) {
			this.classList.toggle("active");
			this.nextElementSibling.classList.toggle("active");
		}
	}
	//RADIO BTN
	const radiobtnWraps = document.querySelectorAll(".spoiler-radiobtns");
	for(let item of radiobtnWraps) {
		for(let child of item.children) {
			child.onclick = function(event) {
				for(let item of this.parentElement.children) {
					if(item.classList.contains("active")) {
						item.classList.remove("active");
						item.firstElementChild.checked = "checked";
					}
				}
				this.classList.add("active");
				this.firstElementChild.checked = "checked";
			}
		}
	}
	//BTN RESET

	const btnReset = document.querySelector(".fullfilter-row__btnreset input");
	if(btnReset) {
		btnReset.onclick = function(event) {
			for(let item of checkboxItems) {
				item.classList.remove("active");
			}
			for(let item of simpleCheckboxItems) {
				item.classList.remove("active");
			}
			for(let item of clearCheckboxes) {
				item.classList.remove(".filter-show");
			}
		}
	}
	//ADAPTIVE BTN FILTER
	const Adaptbtn = document.querySelector(".adaptivefilter__btn");
	const filterAdaptive = document.querySelector(".filter-adaptive");
	const backBtns = document.querySelectorAll(".backbtn");
	for(let item of backBtns) {
		item.onclick = function(event) {
			document.body.classList.remove("lock");
			filterAdaptive.classList.remove("lock");
			if(document.querySelector(".checkbox-btn")) {
				document.querySelector(".checkbox-btn").remove();
			}
			this.parentElement.parentElement.style.left = "-100%";
			this.parentElement.parentElement.parentElement.style.left = "-100%";
		}
	}
	const adaptSpoiler = document.querySelectorAll(".adaptive-spoiler");
	for(let item of adaptSpoiler) {
		item.onclick = function(event) {
			filterAdaptive.classList.add("lock");
			this.nextElementSibling.firstElementChild.style.left = "0%";
			this.nextElementSibling.style.left = "0%";
			let event1 = new Event("click");
			if(!(this.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.classList.contains("active"))) {
				let n = this.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
				if(n) {
					n.dispatchEvent(event1);
				}
				
			}
			

		}
	}

	const spoilerbtnsReset = document.querySelectorAll(".spoilerbtn-reset");
	for(let item of spoilerbtnsReset) {
		item.onclick = function(event) {
			this.parentElement.classList.remove("active");
			this.classList.remove("active");
			this.nextElementSibling.classList.remove("active");
			event.stopPropagation();
			const reset = this.parentElement.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
			let clickevent = new Event("click");
			reset.dispatchEvent(clickevent);
		}
	}
	if(Adaptbtn) {
		Adaptbtn.onclick = function(event) {
			filterAdaptive.style.left = "0";
			document.body.classList.add("lock");
		}
	}
	const allResetAdaptBtn = document.querySelector(".filter-adaptive-header__clearbtn");
	allResetAdaptBtn.onclick = function() {
		let ev = new Event("click");
		for(let item of spoilerbtnsReset) {
			item.dispatchEvent(ev);
		}
	}
})();


