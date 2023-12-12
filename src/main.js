
import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import './assets/tailwind.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavBar from './components/Layout/NavBar.vue';
import Header from './components/Layout/Header.vue';
import Footer from './components/Layout/Footer.vue';
import BaseSpinner from './components/Bases/BaseSpinner.vue';


library.add(fas);


const app = createApp(App)

// global components


app.component('nav-bar',NavBar);
app.component('the-header',Header);
app.component('the-footer',Footer);
app.component('base-spinner',BaseSpinner);
app.component("font-awesome-icon", FontAwesomeIcon);




app.use(store);
app.use(router);

app.mount('#app')
