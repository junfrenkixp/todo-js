'use strict';

class Todo {
  constructor(el) {
    this.el = el;
    this.input = this.el.querySelector('.todo__input');
    this.plusItemBtn = this.el.querySelector('.todo__add-task');
    this.itemsList = this.el.querySelector('.todo__list');

    this.addTask();
    this.allTasksDelete();
    this.deleteTask();
    this.doneTask();
    this.undoneTask();
    this.correctTask();
  }

  addTask() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__add-task')) {
        if(this.input.value !== '') {
          this.createTask(this.input.value);
          this.input.value = '';
        }
      }
    })
  }

  createTask(value) {
    let wrap = document.createElement('div');
    wrap.classList.add('todo__item');
    this.itemsList.appendChild(wrap);

    this.itemText = document.createElement('p');
    this.itemText.classList.add('todo__item-text');
    this.itemText.innerHTML = value;
    wrap.appendChild(this.itemText);

    let correctInput = document.createElement('input');
    correctInput.classList.add('todo__item-correct-input');
    correctInput.type = 'text';
    wrap.appendChild(correctInput);

    let btnsWrap = document.createElement('div');
    btnsWrap.classList.add('todo__item-btns');
    wrap.appendChild(btnsWrap);

    let btnsObject = {
      'check': '--done',
      'remove': '--undone',
      'pencil': '--correct',
      'minus': '--delete',
    }

    for(let item in btnsObject) {
      let btn = document.createElement('button');
      btn.classList.add('todo__item-btn', `todo__item-btn${btnsObject[item]}`);
      btnsWrap.appendChild(btn);

      let icon = document.createElement('i');
      icon.classList.add('fa', `fa-${item}`);
      btn.appendChild(icon);
    }
  }

  correctTask() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__item-btn--correct')) {
        let text = target.closest('.todo__item').querySelector('.todo__item-text');
        let input = target.closest('.todo__item').querySelector('.todo__item-correct-input');

        if(target.closest('.todo__item-correct')) {
          text.innerHTML = input.value;
          target.closest('.todo__item').classList.remove('todo__item-correct');
        } else {
          input.value = text.innerHTML.trim();
          setTimeout(() => {
            input.focus();
          }, 100);
          target.closest('.todo__item').classList.add('todo__item-correct');
        }
      }
    })
  }

  deleteTask() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__item-btn--delete')) {
        target.closest('.todo__item').remove();
      }
    })
  }

  doneTask() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__item-btn--done')) {
        target.closest('.todo__item').classList.add('todo__item-done');
      }
    })
  }

  undoneTask() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__item-btn--undone')) {
        target.closest('.todo__item').classList.add('todo__item-undone');
      }
    })
  }

  allTasksDelete() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__btn-trash')) {
        let items = this.el.querySelectorAll('.todo__item');
        items.forEach(item => {
          item.remove();
        });
      }
    })
  }

}

const elem = document.querySelector('.todo');
const todo = new Todo(elem);