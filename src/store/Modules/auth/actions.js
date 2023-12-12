
const BaseUrl = "https://localhost:7130/bookstore/auth";

export default{

    async SignUp(_,payload){

        const user = {
            enName:payload.enName,
            arName:payload.arName,
            email:payload.email,
            userName:payload.userName,
            password:payload.pass
        }

        const response = await fetch(`${BaseUrl}/register`,
        {
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-type':'application/json'
            }
        });

         const responseData = response.json();
        if(!response.ok){
            const error =  new Error(responseData.message || "Failed to signup");

            throw error;
        }


    },
    async logIn(context, payload){

        const userData = {

         
            email : payload.email,

            password : payload.password
        
        }

        const response = await fetch(`${BaseUrl}/login`,{
            method:'POST',  
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(userData)
        })

        const responseData = await response.json();

        if(!response.ok){
          const error = new Error(responseData.message || "failed to login try agian please");
            throw error;
            
        }
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.userId);
        localStorage.setItem('role', responseData.role);
        context.commit('setUser', {
            token: responseData.token,
            userId: responseData.userId,
            role:responseData.role 
          });
    
    },

    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
    
        if (token && userId) {
          context.commit('setUser', {
            token: token,
            userId: userId,
            role:role
          });
        }
      },

      logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
      
    
        
    
        context.commit('setUser', {
          token: null,
          userId: null,
          role:0
        });
      },


}