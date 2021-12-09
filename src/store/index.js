import { createStore } from 'vuex'

export default createStore({
  state: {
    completedItemCount: 0,
    todoList: [],
    filteredTodo: '',
    filterParam: 'all',
  },
  mutations: {
    toggleItemCompleted(state, id) {
      state.todoList.forEach(todo => {
        if (todo.id === id) {
          if (todo.completed) {
            todo.completed = false;
            state.completedItemCount--;
          } else {
            todo.completed = true;
            state.completedItemCount++;
          }
        }
      });
    },
    setDefaultTodo(state) {
      state.todoList = JSON.parse(localStorage.getItem('todoList'));
      state.completedItemCount = JSON.parse(localStorage.getItem('completedItemCount'));
    },
    createNewTodo(state, event) {
      state.todoList.push({
        id: Date.now(),
        text: event.target.value,
        completed: false
      });
      event.target.value = '';
    },
    removeCompletedTodo(state) {
      state.todoList = state.todoList.filter(todo => !todo.completed);
      state.completedItemCount = 0;
    },
    changeFilterParam(state, param, event) {
      state.filterParam = param;
      console.log(event);
    },
  },
  getters: {
    filteredTodo(state) {
      if (state.filterParam === 'active') {
        return state.todoList.filter(todo => !todo.completed);
      } else if (state.filterParam === 'completed') {
        return state.todoList.filter(todo => todo.completed);
      } else {
        return state.todoList;
      }
    },
    saveStateInLocalStorage(state) {
      localStorage.setItem('todoList', JSON.stringify(state.todoList));
      localStorage.setItem('completedItemCount', JSON.stringify(state.completedItemCount));
    }
  },
  modules: {
  }
})
