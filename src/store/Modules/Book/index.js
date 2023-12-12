import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default{
    namespaced:true,
    state(){
        return{
            categories:[],
            books:[],
            questions:[],
            grants:[],
            libraries:[]
        }
    },
    actions,
    mutations,
    getters
}