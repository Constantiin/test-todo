<template>
  <div class="page">
    <h1>ToDo list</h1>

    <input
      class="input-to-do"
      type="text"
      placeholder="What needs to be done?"
      @keydown.enter="createNewTodo"
    >

    <div class="work-panel">
      <div>{{ todoList.length - completedItemCount }} item left</div>
      <div class="filter-btns">
        <button
          class="btn"
          @click="changeFilterParam('all')"
          :class="{'active-filter-btn': filterParam === 'all'}"
        >All</button>
        <button
          class="btn"
          @click="changeFilterParam('active')"
          :class="{'active-filter-btn': filterParam === 'active'}"
        >Active</button>
        <button
          class="btn"
          @click="changeFilterParam('completed')"
          :class="{'active-filter-btn': filterParam === 'completed'}"
        >Completed</button>
      </div>
      <button
        :class="{'not-active-clear-btn': completedItemCount === 0}"
        @click="removeCompletedTodo"
      >Clear completed</button>
    </div>

    <div class="list" v-if="todoList.length > 0">
      <div
        class="list__item"
        v-for="item in filteredTodo"
        :key="item.id"
        @click="toggleItemCompleted(item.id)"
        :class="{'todo-completed': item.completed}"
      >
        {{ item.text }}
      </div>
    </div>
    <div v-else>
      <p>Todo list is empty</p>
    </div>
    <div v-if="filterParam === 'completed' && todoList.length && !completedItemCount">
      <p>Completed list is empty</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      toggleItemCompleted: 'toggleItemCompleted',
      setDefaultTodo: 'setDefaultTodo',
      createNewTodo: 'createNewTodo',
      removeCompletedTodo: 'removeCompletedTodo',
      changeFilterParam: 'changeFilterParam',
    })
  },
  computed: {
    ...mapState({
      completedItemCount: 'completedItemCount',
      todoList: 'todoList',
      filterParam: 'filterParam',
    }),
    ...mapGetters({
      filteredTodo: 'filteredTodo',
      saveStateInLocalStorage: 'saveStateInLocalStorage',
    }),
  },

  created() {
    if (localStorage.todoList && localStorage.completedItemCount) {
      this.setDefaultTodo();
    }
  },

  beforeUpdate() {
    this.saveStateInLocalStorage;
  },
}
</script>

<style scoped>

.page {
  max-width: 500px;
  margin: 0 auto;
  font-size: 20px;
}

.input-to-do {
  width: 100%;
  font-size: 20px;
  margin-bottom: 1px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 15px;
}

.list__item {
  text-align: left;
  padding: 5px 5px;
  border: 1px solid #000;
  cursor: pointer;
}

.work-panel {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.filter-btns {
  display: flex;
  gap: 15px;
  min-height: 20px;
}

.todo-completed {
  text-decoration: line-through;
  color: #D3D3D3;
  padding-left: 35px;
  background-image: url('../assets/check-icon.svg');
  background-position: left 5px center;
  background-repeat: no-repeat;
  background-size: 25px;
}

.btn {
  min-width: 30px;
}

.active-filter-btn {
  border: 1px solid #000;
  background-color: #ccc;
}

.not-active-clear-btn {
  cursor: not-allowed;
  color: #ccc;
}

</style>