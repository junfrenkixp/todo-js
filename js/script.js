'use strict';

class Todo {
  constructor(el) {
    this.el = el;

    this.input = this.el.querySelector('.todo__input');
    this.itemsList = this.el.querySelector('.todo__list');

    this.taskItemInfo = [
      {
        state: 'active',
        taskText: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        state: 'done',
        taskText: 'Lorem ipsum dolor sit amet consectetur',
      },
      {
        state: 'undone',
        taskText: 'Lorem ipsum dolor sit amet consectetur',
      }
    ];

    this.init();
  }

  init() {
    this.addTask();

    this.el.addEventListener('click', event => {
      this.correctTask(event);
      this.deleteTask(event);
      this.doneTask(event);
      this.undoneTask(event);
      this.allTasksDelete(event);
      this.activeTasks(event);
    })
  }

  addTask() {
    this.el.addEventListener('keyup', event => {
      if (event.target.closest('.todo__input')) {
        if (event.code === 'Enter' && event.key === 'Enter') {
          this.createTask();
        }
      }
    })

    this.el.addEventListener('click', event => {
      if (event.target.closest('.todo__add-task')) {
        this.createTask();
      }
    })
  }

  createTask() {
    if (this.input.value !== '') {
      this.taskItemInfo.forEach(item => {
        item.taskText = this.input.value;
        console.log(item.state, item.taskText);
      })
      this.input.value = '';
      this.renderTask();
    }
  }

  renderTask(state) {
    let wrap = document.createElement('div');
    wrap.classList.add('todo__item');
    wrap.dataset.state = state;
    this.itemsList.prepend(wrap);

    let itemText = document.createElement('p');
    itemText.classList.add('todo__item-text');
    itemText.innerHTML = value;
    wrap.append(itemText);

    let correctInput = document.createElement('input');
    correctInput.classList.add('todo__item-correct-input');
    correctInput.type = 'text';
    wrap.append(correctInput);

    let btnsWrap = document.createElement('div');
    btnsWrap.classList.add('todo__item-btns');
    wrap.append(btnsWrap);

    let btnsObject = {
      check: '--done',
      remove: '--undone',
      pencil: '--correct',
      minus: '--delete',
    }

    for (let item in btnsObject) {
      let btn = document.createElement('button');
      btn.classList.add('todo__item-btn', `todo__item-btn${btnsObject[item]}`);
      btnsWrap.append(btn);

      let icon = document.createElement('i');
      icon.classList.add('fa', `fa-${item}`);
      btn.append(icon);
    }
  }

  correctTask(event) {
    let target = event.target;
    if (target.closest('.todo__item-btn--correct')) {
      let text = target.closest('.todo__item').querySelector('.todo__item-text');
      let input = target.closest('.todo__item').querySelector('.todo__item-correct-input');

      if (target.closest('.todo__item-correct')) {
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
  }

  deleteTask(event) {
    if (event.target.closest('.todo__item-btn--delete')) {
      event.target.closest('.todo__item').remove();
    }
  }

  doneTask(event) {
    if (event.target.closest('.todo__item-btn--done')) {
      event.target.closest('.todo__item').classList.add('todo__item-done');
      event.target.closest('.todo__item').dataset.state = 'done';
    }
  }

  undoneTask(event) {
    if (event.target.closest('.todo__item-btn--undone')) {
      event.target.closest('.todo__item').classList.add('todo__item-undone');
      event.target.closest('.todo__item').dataset.state = 'undone';
    }
  }

  allTasksDelete(event) {
    if (event.target.closest('.todo__btn-trash')) {
      let items = this.el.querySelectorAll('.todo__item');
      items.forEach(item => {
        item.remove();
      });
    }
  }

  activeTasks(event) {
    if (event.target.closest('.todo__btn-active')) {
      let items = this.el.querySelectorAll('.todo__item');
      items.forEach(item => {
      });
    }
  }
}

const elem = document.querySelector('.todo');
const todo = new Todo(elem);