'use strict';

class Todo {
  constructor(el) {
    this.el = el;
    this.input = this.el.querySelector('.todo__input');
    this.plusItemBtn = this.el.querySelector('.todo__add-task');
    this.itemsList = this.el.querySelector('.todo__list');

    this.noneInput();
  }

  noneInput() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__add-task')) {
        if(this.input.value !== '') {
          this.createItem(this.input.value);
          this.input.value = '';
        }
      }
    })
  }

  createItem(data) {
    let wrap = document.createElement('div');
    wrap.classList.add('todo__item');
    this.itemsList.appendChild(wrap);

    this.itemText = document.createElement('p');
    this.itemText.classList.add('todo__item-text');
    this.itemText.innerHTML = data;
    wrap.appendChild(this.itemText);

    let btnsWrap = document.createElement('div');
    btnsWrap.classList.add('todo__item-btns');
    wrap.appendChild(btnsWrap);

    let btnsArr = ['check', 'remove', 'minus'];
    btnsArr.forEach(item => {
      let btn = document.createElement('button');
      btn.classList.add('todo__item-btn');
      btnsWrap.appendChild(btn);

      let icon = document.createElement('i');
      icon.classList.add('fa', `fa-${item}`);
      btn.appendChild(icon);
    })
  }

}

const elem = document.querySelector('.todo');
const todo = new Todo(elem);