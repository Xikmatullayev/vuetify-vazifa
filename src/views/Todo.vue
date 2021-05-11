<template>
  <div class="todo">
    <v-text-field
      v-model="$store.state.newTaskTitle"
      @keyup.enter="$store.commit('addTask'), snackbar = true"
      @click:append="$store.commit('addTask'), snackbar = true"
      outlined
      class="pa-3"
      label="Vazifa qo'shing"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>

    <v-list class="pt-0" flat>
      <div v-for="task in $store.state.tasks" :key="task.id">
        <v-list-item
          @click="$store.commit('doneTask', task.id), snackbar = true"
          :class="{ 'blue lighten-4': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
                >{{ task.title }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.stop="$store.commit('deleteTask', task.id), snackbar = true">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ $store.state.alert }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      snackbar: false,
      timeout: 2000
    }
  }
};
</script>
