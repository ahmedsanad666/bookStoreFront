<template>
  <section class="min-h-screen">
    <h1 class="my-4 py-2 font-bold md:text-3xl text-2xl text-center">
      اضافة كتاب
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
              <th scope="col" class="px-6 py-3">عنوان</th>
              <th scope="col" class="px-6 py-3">الناشر</th>
              <th scope="col" class="px-8 py-3 text-start">صورة</th>
              <!-- <th scope="col" class="px-6 py-3">القسم</th> -->
              <th scope="col" class="px-6 py-3">İSBN</th>
              <th scope="col" class="px-6 py-3 text-start">الوصف</th>
              <!-- <th scope="col" class="px-6 py-3">تاريخ</th>
              <th scope="col" class="px-6 py-3">اخر تحيث</th> -->
              <th scope="col" class="px-6 py-3 text-center">التحكم</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, key) in allCourses" :key="key">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ el.title }}
              </th>
              <td class="px-6 py-4 text-center">{{ el.author }}</td>
              <td class="px-6 py-4">
                <img
                  :src="`data:image/png;base64;,${el.imgByte} `"
                  class="m-auto"
                  alt=""
                />
              </td>
              <td class="px-6 py-4">{{ el.isbn }}</td>
              <td class="px-6 py-4 des">{{ el.description }}</td>
              <!-- <td class="px-6 py-4">{{ el.Date }}</td> -->
              <!-- <td class="px-6 py-4">{{ el.updateD }}</td> -->
              <td class="px-6 py-4 text-white text-center">
                <router-link
                  class="py-2 px-4 rounded-md bg-amber-800 border"
                  :to="`/book/${el.id}`"
                >
                  اضافة اسئلة
                </router-link>
              </td>
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
          <label for="name">العنوان</label>
          <input type="text" id="name" v-model.trim="book.title" />
        </div>
        <div class="form-control">
          <label for="des">الوصف</label>
          <textarea
            type="text"
            id="des"
            v-model.trim="book.description"
          ></textarea>
        </div>
        <div class="form-control">
          <label for="active">صوره</label>
          <input ref="fileInput" type="file" @change="uploadImage" />
          <div v-if="imageUrl">
            <img :src="book.imageUrl" alt="Uploaded Image" />
          </div>
        </div>

        <div class="form-control">
          <label for="feat">ISBN</label>
          <input type="text" id="feat" v-model="book.ISBN" />
        </div>
        <div class="form-control">
          <label for="feat">عدد الصفح</label>
          <input type="number" id="feat" v-model="book.pages" />
        </div>
        <div class="form-control">
          <label for="feat">رابط الكتاب </label>
          <input type="text" id="feat" v-model="book.pdfUrl" />
        </div>
        <div class="form-control">
          <label for="feat"> رقم الطبعة </label>
          <input type="text" id="feat" v-model="book.ImprintId" />
        </div>
        <div class="form-control">
          <label for="feat"> الكاتب </label>
          <input type="text" id="feat" v-model="book.author" />
        </div>
        <div class="form-control">
          <label for="feat"> عدد ايام القراءة </label>
          <input type="number" id="feat" v-model="book.daysToRead" />
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
export default {
  data() {
    return {
      hidden: true,
      isLoading: false,
      allCourses: [],
      error: "",
      courseId: 0,
      selectedFile: null,
      book: {
        title: "",
        description: "",
        userId: "", //...
        author: "",
        imageUrl: "",
        ISBN: "",
        pages: "",
        ImprintId: 0,
        pdfUrl: "",
        daysToRead: "",
      },
      formIsValid: true,
      AddNewMood: false,
    };
  },
  methods: {
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      this.selectedFile = fileInput.files[0];
      this.book.imageUrl = window.URL.createObjectURL(this.selectedFile);
    },
    async loadBooks() {
      this.isLoading = true;
      const catId = this.$route.params.catId;

      try {
        await this.$store.dispatch("book/AllBooks");
        this.allCourses = this.$store.getters["book/allBooks"];
        this.allCourses = this.allCourses.filter(
          (el) => el.bookCategoryId == catId
        );
      } catch (e) {
        this.Error = "failed to Get Courses" || e.message;
      }
      this.isLoading = false;
    },
    async DeleteCourse(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("courses/deleteCourse", id);
        await this.$store.dispatch("courses/AllCourses");
        this.allCourses = this.$store.getters["courses/allCourses"];
      } catch (e) {
        this.error = e.message || "failed to delete";
      }
      this.isLoading = false;
    },
    update(id) {
      let course = this.allCourses.find((el) => el.id == id);
      this.AddNewMood = false;
      this.courseId = id;
      this.updateCourseData = course;
      this.hidden = false;
    },
    addNew() {
      this.AddNewMood = true;
      this.hidden = false;
    },
    async submitData() {
      this.formIsValid = true;
      if (
        this.book.title === "" ||
        this.book.description === "" ||
        this.book.ISBN === "" ||
        this.book.ImprintId === "" ||
        this.book.pdfUrl === "" ||
        this.book.daysToRead === ""
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      let payload;

      const userId = this.$store.getters["auth/userId"];
      const catId = this.$route.params.catId;
      if (!this.selectedFile) {
        this.error = "empty image input";
        return;
      }
      const data = new FormData();
      data.append("title", this.book.title);
      data.append("description", this.book.description);
      data.append("author", this.book.author);
      data.append("image", this.selectedFile);
      data.append("isbn", this.book.ISBN);
      data.append("bookCategoryId", catId);
      data.append("pages", this.book.pages);
      data.append("apiUserId", userId);
      data.append("imprintId", this.book.ImprintId);
      data.append("pdfUrl", this.book.pdfUrl);
      data.append("daysToRead", this.book.daysToRead);

      try {
        await this.$store.dispatch("book/AddBook", data);

        location.reload();
      } catch (e) {
        this.error = e.message || "failed to update";
        location.reload();
      }
      this.isLoading = false;
    },
  },

  created() {
    this.loadBooks();
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
img {
  width: 2.5rem;
  height: 2.5rem;
  aspect-ratio: 1/2;
}
</style>
