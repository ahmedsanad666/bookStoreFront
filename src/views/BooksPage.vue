<template>
    <section class="container my-4 py-5 min-h-screen">
      <quiz-section
        ref="quiz"
        :showD="show"
        @try-close="closeQuiz"
      ></quiz-section>
      <base-spinner v-if="isLoading"></base-spinner>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-1"
        v-if="allBooks.length > 0"
      >
        <div
          class="card max-w-sm m-auto bg-white ounded-lg shadow-lg rounded-lg"
          v-for="(book, k) in allBooks"
          :key="k"
        >
          <div class="image">
            <img
              class="rounded-lg w-full h-auto"
              :src="`data:image/png;base64;,${book.imgByte} `"
              alt=""
            />
          </div>
          <div class="p-5">
            <a href="#">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ book.title }}
              </h5>
            </a>
            <p class="mb-3 font-normal des text-gray-700 dark:text-gray-400">
              {{ book.description }}
            </p>
            <div
              class="justify-between items-center flex gap-1 md:flex-row flex-col"
            >
              <a
                :href="book.pdfUrl"
                class="py-1 cursor-pointer px-2 bg-slate-700 text-white rounded-md"
              >
                Download
              </a>
              <button
                class="py-1 px-2 bg-emerald-400 text-white rounded-md"
                @click="showQuiz(book.id, book.daysToRead, book.title, book.isbn)"
              >
                Grent Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 v-else class="text-center md:text-3xl text-2xl my-4 py-4">
       لم يتم تحميل ملفات بعد
      </h1>
    </section>
  </template>
  
  <script>
  import QuizSection from "../components/UI/QuizSection.vue";
  export default {
    components: { QuizSection },
    data() {
      return {
        isLoading: false,
        allBooks: [],
        show: false,
        qtest: [],
        allQuestions: [],
      };
    },
    methods: {
      closeQuiz() {
        this.show = false;
      },
      async showQuiz(id, days, title, isbn) {
        this.show = true;
        this.$refs.quiz.loadData(id, days, title, isbn);
      },
      async loadBooks() {
        this.isLoading = true;
        const catId = this.$route.params.catId;
        try {
          await this.$store.dispatch("book/AllBooks");
          this.allBooks = this.$store.getters["book/allBooks"];
            
       this.allBooks = this.allBooks.filter(el=> el.bookCategoryId == catId);
        } catch (e) {
          this.Error = "failed to Get Courses" || e.message;
        }
        this.isLoading = false;
      },
    },
    watch:{
        $route(to,from){
            this.loadBooks();
        }
    },
    created() {
      this.loadBooks();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .des {
    text-align: right;
    max-width: 13em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .card {
    // border: 1px red solid;
    max-height: 89vh;
    position: relative;
  }
  .image {
    // border: 1px red solid;
    position: relative;
    height: 50%;
  
    img {
      object-fit: cover;
      // width: 100%;
      // height: 100%;
      aspect-ratio: 1/1;
    }
  }
  </style>
  