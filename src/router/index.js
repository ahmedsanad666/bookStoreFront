import { createRouter, createWebHistory } from "vue-router";
import AuthPage from '../views/Auth/AuthPage.vue';
import HomePage from '../views/HomePage.vue';
import CategoryPage from '../views/Admin/CategoryPage.vue';
import BookPage from '../views/Admin/BookPage.vue';
import QuestionsPage from '../views/Admin/QuestionsPage.vue';
import BookGrants from '../views/BookGrants.vue';
import BooksPage from '../views/BooksPage.vue'
import store from "../store/index.js";
import NotFound from '../views/NotFound.vue';
import librarypage from '../views/Admin/librarypage.vue';
import AllLibraries from '../views/AllLibraries.vue'




const routes = [
{
    path:'/',
    redirect:'/home',
  },
  {
    path:'/grants',
    name:'grants',
    component:BookGrants,
    meta:{
      title:'grants',
      requiresAuth: true
    }
  },
  {
    path:'/libraries',
    name:'library',
    component:AllLibraries,
    meta:{
      title:'all libraries',
     
    }
  },
  {
    path:'/Admin/addLibrary',
    name:'add',
    component:librarypage,
    meta:{
      title:'add',
      requiresAuth: true
    }
  },
  {
    path:'/Books/:catId',
    name:'Books',
    component:BooksPage,
    meta:{
      title:'Books',
     
    }
  },
  {
    path:'/home',
    name:'home',
    component:HomePage,
    meta:{
      title:'home'
    }
  },
  {
    path:'/Auth',
    name:'Auth',
    component:AuthPage,
    meta:{
      title:'Auth',
      requiresUnauth: true
    }
  },
  {
    path:'/categories',
    name:'categories',
    component:CategoryPage,
    meta:{
      title:'category',
      requiresAuth: true
    }
  },
  {
    path:'/categories/:catId',
    name:'book',
    component:BookPage,
    meta:{
      title:'addBook'
    }
  },
  {
    path:'/book/:bookId',
    name:'quiz',
    component:QuestionsPage,
    meta:{
      title:'quiz',
      requiresAuth: true
    }
  },
  { path: '/:notFound(.*)', component: NotFound },

];

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach((to,_,next)=>{
  document.title = to.meta.title;
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters["auth/isAuthenticated"]) {
    next('/');
  } else {
    next();
  }

});

export default router;