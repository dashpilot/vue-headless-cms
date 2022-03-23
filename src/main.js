import {
  createApp,
  provide
} from 'vue'
import App from './App.vue'
const app = createApp(App)

const myPlugin = {
  install(app, options) {
    // configure the app
    console.log('plugin loaded')
    const logout = () => {
      console.log("Logout is being called");
    };

    app.provide("logout", logout);

    async function postData(url = '', data = {}) {

      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    app.provide("postData", postData);

  }
}

app.use(myPlugin, {})
app.mount('#app')