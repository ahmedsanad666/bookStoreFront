import {createStore} from 'vuex';
import authModule from './Modules/auth/index';
import bookModule from './Modules/Book/index';

const store = createStore({
modules:{
auth:authModule,
book:bookModule
},
    state(){},

    
})


export default store;