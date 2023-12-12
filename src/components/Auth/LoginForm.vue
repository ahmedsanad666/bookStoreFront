<template>
  <section class="lg:w-[40%] md:w-[55%] w-[90%] m-auto">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="mainForm w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl"
          >
            تسجيل الدخول
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submitData">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium e"
                >البريد الالكتروني</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                v-model.trim="email"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium"
                >كلمة المرور</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                v-model.trim="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >نسيت كلمة المرور؟</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-[#313A49] bg-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              تسجيل الدخول
            </button>
            <p class="text-sm font-light">
              ليس لديك حساب بعد?
              <button
                @click="$emit('ToggleMood')"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                انشاء حساب
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error:'',
      isLoading:false
    };
  },
  methods:{
    async submitData(){
        if(this.email === '' || this.password === ''){
            this.error = "لا يمكن ترك الخانات فارغة";
            return;  }

            const user = {
                email :this.email,
               password :this.password
            }
            this.isLoading = true;
            try{
                await this.$store.dispatch('auth/logIn',user);
               await  this.$router.replace('/');
                location.reload();

            }catch(e){
                this.error = new Error(e.message || "failed to login");
            }

            this.isLoading = false;


    }
  }
};
</script>

<style lang="scss" scoped>
.mainForm {
  background: rgba(0, 0, 0, 0.6);
  color: white;
}
</style>
