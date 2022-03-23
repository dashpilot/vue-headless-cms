import {
  createApp,
  provide
} from 'vue'
import App from './App.vue'
const app = createApp(App)

// example plugin
const myPlugin = {
  install(app, options) {
    // configure the app
    console.log('plugin loaded')
    const logout = () => {
      console.log("Logout is being called");
    };

    app.provide("logout", logout);

  }
}

app.use(myPlugin, {})
app.mount('#app')