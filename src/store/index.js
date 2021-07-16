import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    newTaskTitle: '',
    alert: ''
  },
  mutations: {
    getTask(state) {
      db.collection('tasks').get().then(tasks => {
        state.tasks = tasks
      })
    },
    addTask(state) {
      if (state.newTaskTitle === '') {
        state.alert = 'Vazifaga nom bering!';
      }
      else {
        let newTask = {
          id: Date.now(),
          title: state.newTaskTitle,
          done: false
        }
        state.alert = 'Vazifa yaratildi!';
        state.tasks.push(newTask);
        db.collection('tasks').add(newTask);
        state.newTaskTitle = '';
      }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
      db.collection('tasks').doc({ id: id }).delete();
      state.alert = 'Vazifa o\'chirildi!';
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
      db.collection('tasks').doc({ id: id }).update({
        done: task.done
      });
      if(task.done) {
        state.alert = 'Vazifa bajarildi!';
      } else {
        state.alert = 'Vazifa qaytarildi!'
      }
    }
  },
  actions: {},
  getters: {},
  modules: {}
})
