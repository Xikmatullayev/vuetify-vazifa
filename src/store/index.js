import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 0,
        title: 'Uyg\'onmoq',
        done: false
      },
      {
        id: 1,
        title: 'Banan olmoq',
        done: false
      },
      {
        id: 2,
        title: 'Banan yemoq',
        done: false
      }
    ],
    newTaskTitle: '',
    alert: ''
  },
  mutations: {
    addTask(state) {
      if (state.newTaskTitle === '') {
        state.alert = 'Vazifa kiritilmadi, qayta urinib ko\'ring :(';
      }
      else {
        let newTask = {
          id: Date.now(),
          title: state.newTaskTitle,
          done: false
        }
        state.alert = 'Vazifa muvaffaqqiyatli kiritildi :)';
        state.tasks.push(newTask);
        state.newTaskTitle = '';
      }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      state.alert = 'Vazifa o\'chirildi :(';
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
      if (task.done === true) {
        state.alert = 'Vazifa bajarildi! :)'
      } else {
        state.alert = 'Vazifa bajarilmadi! :('
      }
    }
  },
  actions: {},
  getters: {},
  modules: {}
})
