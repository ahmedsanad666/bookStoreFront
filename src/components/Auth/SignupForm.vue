<template>

<section >
  <div class="  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <base-spinner v-if="isLoading"></base-spinner>
      <div class=" mainForm w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 " v-else>
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8" >
              <h1 class="text-xl  text-center font-bold leading-tight tracking-tight  md:text-2xl ">
                  انشاء حساب 
              </h1>
              <form @submit.prevent="submitData" class=" space-y-3">
                  <div>
                      <label for="fullName" class="block mb-2 text-sm font-medium"> الاسم بالعربية</label>
                      <input @blur="ClearValidation('arName')" type="text" name="email" id="fullName" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg . ahmed gamal" v-model.trim="arName.val" required="">
                      <p class=" text-red-800 py-2 font-bold mx-3" v-if="!arName.valid">{{ arName.error }}</p>
                  </div>
                  <div>
                      <label for="fullName" class="block mb-2 text-sm font-medium"> الاسم بالانجليزية</label>
                      <input @blur="ClearValidation('enName')" type="text" name="email" id="fullName" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg . ahmed gamal" v-model.trim="enName.val" required="">
                      <p class=" text-red-800 py-2 font-bold mx-3" v-if="!enName.valid">{{ enName.error }}</p>

                  </div>
                  <div>
                      <label for="fullName" class="block mb-2 text-sm font-medium"> اسم المستخدم</label>
                      <input type="text" name="email" id="fullName" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg . ahmed gamal" v-model.trim="userName.val" required="">
      

                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium">البريد الالكترونى</label>
                      <input @blur="ClearValidation('email')" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" v-model.trim="email.val" required="">
                      <p class=" text-red-800 py-2 font-bold mx-3" v-if="!enName.valid">{{ email.error }}</p>

                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium dark:text-white">كلمة المرور</label>
                      <input @blur="ClearValidation('pass')" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model.trim="pass.val" required="">
                      <p class=" text-red-800 py-2 font-bold mx-3" v-if="!pass.valid">{{ pass.error }}</p>


                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-mediumdark:text-white">تاكيد كلمة المرور </label>
                      <input @blur="ClearValidation('confirmPass')"  type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model.trim="confirmPass.val" required="">
                      <p class=" text-red-800 py-2 font-bold mx-3" v-if="!confirmPass.valid">{{ confirmPass.error }}</p>
                  </div>
<!-- 
                  <div class="flex items-start">
                     
                    
                  </div> -->
                  <button type="submit" class="w-full bg-white text-[#313A49] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">انشاء حساب</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     املك جساب بالفعل? <button @click="$emit('ToggleMood')" class="font-medium text-primary-600 hover:underline dark:text-primary-500">تسجيل الدخول </button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<script>
export default {
    data(){
        return{
          arName:{
            val:'',
            required:true,
            valid:true,
            error:''
          },
          enName:{
            val:'',
            required:true,
            valid:true,
            error:''
          },
          email:{
            val:'',
            required:true,
            valid:true,
            error:''
          },
          pass:{
            val:'',
            required:true,
            valid:true,
            error:''
          },
          confirmPass:{
            val:'',
            required:true,
            valid:true,
            error:''
          },
          userName:{
            val:'',
            required:true,
            
          },
          validForm:true,
          error:''
          ,
          isLoading:false,


        }
    },
    methods:{
        ClearValidation(input){
            this[input].valid =true;
            this[input].error = '';
        },
        isValidForm(){
            if(this.arName.val === ''|| this.arName.val.length < 5){
                this.arName.error = "لا يمكن ان يترك فارغ او عدد الاحرف اقل من 5 ";
                this.arName.valid = false;
                this.validForm = false;
            }
            if(this.enName.val === ''|| this.enName.val.length < 5){
                this.enName.error = "لا يمكن ان يترك فارغ او عدد الاحرف اقل من 5 ";
                this.validForm = false;
                this.enName.valid = false;

            }
            if(this.email.val === ''|| !this.email.val.includes("@")){
                this.email.error = "لا يمكن ان يترك فارغ او لا يحتوى على @ ";
                this.validForm = false;
                this.email.valid = false;


            }
            if(this.pass.val === ''|| this.pass.val.length < 5){
                this.pass.error = "لا يمكن ان يترك فارغ او عدد الاحرف اقل من 5 و يجب ان يحتوى على احرف كبيره و صغيره و علامات خاصة";
                this.validForm = false;
                this.pass.valid = false;

            }
            if(this.confirmPass.val === ''|| this.confirmPass.val.length < 5){
                this.confirmPass.error = "لا يمكن ان يترك فارغ او عدد الاحرف اقل من 5 و يجب ان يحتوى على احرف كبيره و صغيره و علامات خاصة";
                this.validForm = false;
                this.confirmPass.valid = false;

            }
            if(!(this.pass.val === this.confirmPass.val)){
                this.pass.error = "كلمات المرور غير متطابقه";
                this.confirmPass.error = "كلمات المرور غير متطابقه";
                this.pass.valid = false;
                this.confirmPass.valid= false;
           
                this.validForm = false;
            }

        },
        async submitData(){
            this.validForm = true;
            this.isValidForm();
            if(!this.validForm){
               return;
            }
            const user = {
                arName :this.arName.val,
                enName :this.enName.val ,
                userName:this.userName.val,
                email : this.email.val,
                pass:this.pass.val

            }
            this.isLoading = true;
            try{
                  await  this.$store.dispatch('auth/SignUp',user);
                    location.reload();
            }catch(e){
                this.error = new Error(e.message || "failed Try again");

            }
            this.isLoading = false;
        }
        
    }

}
</script>


<style lang="scss" scoped>

.mainForm {
    background: rgba(0,0,0,.6);
    color:white;
}
input{
 color: black;
}
</style>