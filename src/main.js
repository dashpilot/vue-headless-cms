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

    app.mixin({
      methods: {
        slugify(text) {
          let slug = text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
          console.log(slug)
          return slug;
        },
        closeWindow() {
          this.$emit('update:show', false);
        }
      }
    });

  }
}

app.use(myPlugin, {})
app.mount('#app')