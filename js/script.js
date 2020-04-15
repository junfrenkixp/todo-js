'use strict';

class Todo {
  constructor(el) {
    this.el = el;
    this.input = this.el.querySelector('.todo__input');
    this.plusItemBtn = this.el.querySelector('.todo__add-task');
    this.itemsList = this.el.querySelector('.todo__list');

    this.addItem();
    this.deleteItem();
    this.allItemsDelete();
  }

  addItem() {
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

  deleteItem() {
    this.el.addEventListener('click', event => {
      let target = event.target;
      if(target.closest('.todo__item-btn--delete')) {
        target.closest('.todo__item').remove();
      }
    })
  }

  allItemsDelete() {
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

    let btnsObject = {
      'check': '--done',
      'remove': '--not-done',
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

}

const elem = document.querySelector('.todo');
const todo = new Todo(elem);