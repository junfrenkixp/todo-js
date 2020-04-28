'use strict';

class Todo {
  constructor(el) {
    this.el = el;

    this.input = this.el.querySelector('.todo__input');
    this.itemsList = this.el.querySelector('.todo__list');

    this.dbTasks = [
      {
        id: 1,
        state: 'done',
        taskText: 'Create Todo on pure JS'
      },
      {
        id: 2,
        state: 'active',
        taskText: 'Make Todo perfect'
      }
    ];

    this.init();
  }

  init() {
    this.renderTask(this.dbTasks);
    this.createTask();
    
    this.el.addEventListener('click', event => {
      this.correctTask(event);
      this.deleteTask(event);
      this.doneTask(event);
      this.undoneTask(event);
      this.allTasksDelete(event);
      this.filterCompleted(event);
      this.filterActive(event);
      this.filterAll(event);
    })
  }

  generateId() {
    let taskId =[];
    const newId = new Date().getUTCMilliseconds();

    this.dbTasks.forEach(task => taskId.push(task.id));
    
    const finalId = taskId.includes(newId) ? newId + 13 : newId;
    return finalId;
  }

  createTask() {
    this.el.addEventListener('keyup', event => {
      if (event.target.closest('.todo__input')) 
        if (event.code === 'Enter' && event.key === 'Enter') {{
          if (!!this.input.value) {
            this.addTask();
            this.cleanInput();
            this.renderTask(this.dbTasks);
          }
        }
      }
    })

    this.el.addEventListener('click', event => {
      if (event.target.closest('.todo__add-task')) {
        if (!!this.input.value) {
          this.addTask();
          this.cleanInput();
          this.renderTask(this.dbTasks);
        }
      }
    })
  }

  addTask() {
    this.dbTasks.push({
      id: this.generateId(),
      state: 'active',
      taskText: this.getTaskText(),
    })
    return this.dbTasks;
  }

  getTaskText() {
    if (this.input.value !== '') {
      return this.input.value;
    }
  }

  cleanInput() {
    this.input.value = '';
  }

  renderTask(data) {
    let arr = [];
    data.forEach(task => {
      if (task.deleted !== true) {
        const state = (task.state == 'done') ? 'todo__item-done' :
                      (task.state == 'undone') ? 'todo__item-undone' : '';
        const taskLayout = `
          <div class="todo__item ${state}" data-id="${task.id}" data-state="${task.state}">
            <p class="todo__item-text">
              ${task.taskText}
            </p>
            <input class="todo__item-correct-input" type="text">
            <div class="todo__item-btns">
              <button class="todo__item-btn todo__item-btn--done">
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
              <button class="todo__item-btn todo__item-btn--undone">
                <i class="fa fa-remove" aria-hidden="true"></i>
              </button>
              <button class="todo__item-btn todo__item-btn--correct">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="todo__item-btn todo__item-btn--delete">
                <i class="fa fa-minus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        `;
        arr.unshift(taskLayout);
      }
    })
    this.itemsList.innerHTML = arr.join('');
  }

  correctTask(event) {
    let target = event.target;
    if (target.closest('.todo__item-btn--correct')) {
      let text = target.closest('.todo__item').querySelector('.todo__item-text');
      let input = target.closest('.todo__item').querySelector('.todo__item-correct-input');

      if (target.closest('.todo__item-correct')) {
        text.innerHTML = input.value;
        target.closest('.todo__item').classList.remove('todo__item-correct');
        this.dbTasks.forEach(task => {
          if (event.target.closest('.todo__item').dataset.id == task.id) {
            task.taskText = input.value;
          }
        })
      } else {
        input.value = text.innerHTML.trim();
        setTimeout(() => {
          input.focus();
        }, 100);
        target.closest('.todo__item').classList.add('todo__item-correct');
      }
    }


  }

  stateTask(state) {
    event.target.closest('.todo__item').classList.add(`todo__item-${state}`);
    event.target.closest('.todo__item').dataset.state = state;
    this.dbTasks.forEach(task => {
      if (event.target.closest('.todo__item').dataset.id == task.id) {
        task.state = state;
      }
    })
  }

  doneTask(event) {
    if (event.target.closest('.todo__item-btn--done')) {
      this.stateTask('done')
    }
  }
  undoneTask(event) {
    if (event.target.closest('.todo__item-btn--undone')) {
      this.stateTask('undone')
    }
  }
  deleteTask(event) {
    if (event.target.closest('.todo__item-btn--delete')) {
      this.dbTasks.forEach(task => {
        if (event.target.closest('.todo__item').dataset.id == task.id) {
          task.deleted = true;
        }
      })
      event.target.closest('.todo__item').remove();
    }
  }
  allTasksDelete(event) {
    if (event.target.closest('.todo__btn-trash')) {
      let items = this.el.querySelectorAll('.todo__item');
      items.forEach(task => {
        task.remove();
      });
      this.dbTasks.forEach(task => {
        task.deleted = true;
      })
    }
  }

  filter(state) {
    if (state === 'done') {
      let completedTasks = this.dbTasks.filter(task => task.state === 'done');
      this.renderTask(completedTasks);
    }
    if (state === 'active') {
      let completedTasks = this.dbTasks.filter(task => task.state === 'active');
      this.renderTask(completedTasks);
    }
  }

  filterCompleted(event) {
    if (event.target.closest('.todo__btn-completed')) {
      this.filter('done');
    }
  }

  filterActive(event) {
    if (event.target.closest('.todo__btn-active')) {
      this.filter('active');
    }
  }

  filterAll(event) {
    if (event.target.closest('.todo__btn-all')) {
      this.renderTask(this.dbTasks);
    }
  }
}


const elem = document.querySelector('.todo');
const todo = new Todo(elem);