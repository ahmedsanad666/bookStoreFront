<template>
  <section class="min-h-screen">
    <h1 class="my-4 py-2 font-bold md:text-3xl text-2xl text-center">
      اضافة مكتبة
    </h1>

    <base-spinner v-if="isLoading"></base-spinner>
    <div class="container py-4 my-3 md:px-2" v-else>
      <div>
        <button
          @click="addNew()"
          class="my-3 py-2 px-4 bg-slate-900 text-white"
        >
          اضافة
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3 ">الاسم</th>
              <th scope="col" class="px-6 py-3 text-start">العنوان</th>

              <th scope="col" class="px-6 py-3 text-start">الدولة</th>
              <th scope="col" class="px-6 py-3 text-start">الموقع</th>
              <th scope="col" class="px-6 py-3 r text-start">
                البريد الالكترونى
              </th>

              <!-- <th scope="col" class="px-6 py-3 text-center">التحكم</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, key) in Allcategory" :key="key">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ el.name }}
              </th>
              <td class="px-6 py-4 des">{{ el.place }}</td>
              <td class="px-6 py-4 des">{{ el.country }}</td>
              <td class="px-6 py-4 des">{{ el.website }}</td>
              <td class="px-6 py-4 des">{{ el.email }}</td>

              <!-- <td class="px-6 py-4 space-x-4 space-y-3 text-center text-white">
                <router-link
                  class="py-2 px-4 rounded-md bg-amber-800 border"
                  :to="`/categories/${el.id}`"
                >
                  اضافة كتاب
                </router-link>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ................... add new section -->

    <div class="container md:w-1/2 w-3/4" v-if="!hidden">
      <h1 class="md:text-3xl text-3xl text-center">
        {{ AddNewMood ? "اضافة كورس جديد" : "تعديل " }}
      </h1>
      <form @submit.prevent="submitData">
        <div class="form-control">
          <label for="name">الاسم</label>
          <input type="text" id="name" v-model.trim="name" required="" />
        </div>
        <div class="form-control">
          <label for="place"> رابط الموقع </label>
          <input type="text" id="place" v-model.trim="place"  required="" />
          <p class="text-start py-1">رايط الموقع من خلال خرائط جوجل </p>
        </div>
        <div class="form-control">
          <label for="countries">الدولة: {{ selectedCountry }}</label>
          <select id="countries" v-model="selectedCountry">
            <option value="">Select</option>
            <option v-for="country in countries" :key="country.cca3">
              {{ country.name.common }}
            </option>
          </select>
          
        </div>
        <div class="form-control">
          <label for="countries">رقم الهاتف </label>

          <input
            type="text"
            v-model.trim="phoneNumber"
            placeholder=" +(--) (--) (--) (--) "
            required=""
          />
        </div>
        <div class="form-control">
          <label for="website"> الموقع الالكتروني</label>

          <input
            type="text"
            id="website"
            v-model.trim="website"
            placeholder="الموقع  "
            required=""
          />
        </div>
        <div class="form-control">
          <label for="email"> البريد الالكترونى </label>

          <input
            type="email"
            id="email"
            v-model.trim="email"
            placeholder="البريد الالكتروني  "
            required=""
          />
        </div>

        <p v-if="!formIsValid">لا تترك مدخلات فارغه.</p>
        <button class="py-2 px-4 rounded-md bg-neutral-700 md:mx-1">
          ارسال
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      countries: [],
      //..............
      name: "",
      place: "",
      selectedCountry: "",
      phoneNumber: "",
      website: "",
      email: "",

      //.......
      hidden: true,
      isLoading: false,
      Allcategory: [],

      error: "",
      courseId: 0,

      formIsValid: true,
      AddNewMood: false,
    };
  },

  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        this.countries = response.data;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
    async loadLibraries() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("book/GetLibraries");

        this.Allcategory = this.$store.getters["book/libraries"];
        console.log(this.Allcategory);
      } catch (e) {
        this.Error = "failed to Get libraries" || e.message;
      }
      this.isLoading = false;
    },
    // async DeleteCourse(id) {
    //   this.isLoading = true;
    //   try {
    //     await this.$store.dispatch("courses/deleteCourse", id);
    //     await this.$store.dispatch("courses/AllCourses");
    //     this.allCourses = this.$store.getters["courses/allCourses"];
    //   } catch (e) {
    //     this.error = e.message || "failed to delete";
    //   }
    //   this.isLoading = false;
    // },
    // update(id) {
    //   let course = this.allCourses.find((el) => el.id == id);
    //   this.AddNewMood = false;
    //   this.courseId = id;
    //   this.updateCourseData = course;
    //   this.hidden = false;
    // },
    addNew() {
      this.AddNewMood = true;
      this.hidden = false;
    },
    async submitData() {
      this.formIsValid = true;
      if (
        this.name === "" ||
        this.place === "" ||
        this.selectedCountry === "" ||
        this.phoneNumber === "" ||
        this.website === "" ||
        this.email === ""
      ) {
        this.formIsValid = false;
        return;
      }

      // this.isLoading = true;

      let payload = {
        name: this.name,
        place: this.place,
        country: this.selectedCountry,
        phoneNumber: this.phoneNumber,
        website: this.website,
        email: this.email,
      };

      try {
        await this.$store.dispatch("book/AddLibrary", payload);

        location.reload();
      } catch (e) {
        this.error = e.message || "failed to add category";
      }
      this.isLoading = false;
    },
  },

  created() {
    this.loadLibraries();
    this.fetchCountries();
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.des {
  text-align: right;
  max-width: 13em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
