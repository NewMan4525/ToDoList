'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];


function refreshToDo() {
	if (localStorage.length !== 0) {
		JSON.parse(localStorage.toDoData).forEach(function (item) {
			toDoData.push(item);

			logger('localStorage contain item');
		});
	} else {

		logger('localStorage is empty');
	}

}

function render() {

	todoCompleted.innerHTML = '';
	todoList.innerHTML = '';

	toDoData.forEach(function (item) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
			'<div class="todo-buttons">' +
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
			'</div>';


		if (item.complited) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}
		li.querySelector('.todo-complete').addEventListener('click', function () {
			item.complited = !item.complited;
			render();
		});
		li.querySelector('.todo-remove').addEventListener('click', function () {
			let txt = this.parentElement.parentElement.querySelector('span').textContent;

			toDoData.forEach(function (item, index) {
				if (item.text === txt) {
					delete toDoData[index];
				}
			});
			toDoData = toDoData.filter(Boolean);

			render();
		});

	});

	localStorage.setItem('toDoData', JSON.stringify(toDoData));
}


todoControl.addEventListener('submit', function (event) {
	event.preventDefault();
	if (headerInput.value !== '') {
		const newToDo = {
			text: headerInput.value,
			complited: false
		};


		toDoData.push(newToDo);
		headerInput.value = '';
		render();
	} else {

		logger('value is empty, btnPlus : disabled');
	}
});

function logger(value) {
	console.log(value);
}

refreshToDo();
render();
//localStorage.clear();