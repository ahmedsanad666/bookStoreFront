<template>
  <section class="my-4 py-4">
    <base-spinner v-if="isLoading"></base-spinner>

    <div class="container lg:w-1/2 w-3/4">
      <ul>
        <li class="question" v-for="(q, key) in allQuestions" :key="key">
          السؤال {{ key + 1 }}: {{ q.questionText }}؟
          <div class="flex ">
            <div class="choice" v-for="(choice, num) in q.choices" :key="num">
              <span :class="`choice-${num}`">{{ num + 1 }}) {{ choice }}</span>
            </div>
          </div>
        </li>

        <!-- Add more questions here -->
      </ul>
    </div>
    <div class="container lg:w-1/2 w-3/4 shadow-md rounded-lg py-2 px-3">
      <form @submit.prevent="submitForm" class="space-y-3">
        <div
          class="rounded-sm shadow-md w-[90%] quesitonBox m-auto mt-3 py-2 px-3"
        >
          <h1 class="text-center font-bold">اضافة سؤال</h1>

          <div class="space-y-3 flex flex-col">
            <label for="question">محتوى </label>
            <textarea
              v-model.trim="question.questionText"
              placeholder="question tex"
              id="question"
              class="bg-zinc-400"
            ></textarea>
          </div>

          <div class="my-3">
            <div v-for="(question, key) in question" :key="key"></div>
            <div>
              <input
                type="text"
                class="mx-2 py-1 px-2 rounded-sm shadow-md outline-none"
                v-model="choice"
                placeholder="اضافة اختيار"
              />
              <span
                @click="AddChoice()"
                class="py-1 px-3 bg-slate-400 hover:bg-slate-900 hover:text-white"
              >
                اضافة
              </span>
            </div>

            <ul>
              <li
                class="py-2 px-3 shadow-md w-1/3 relative"
                @click="removeChoice(key)"
                v-for="(choice, key) in currentChoices"
                :key="key"
              >
                <font-awesome-icon
                  :icon="['fas', 'xmark']"
                  class="absolute top-2 left-2 cursor-pointer p-1 bg-slate-600 text-white"
                />
                {{ key + 1 }}: {{ choice }}
              </li>
            </ul>
          </div>
          <div>
            <input
              type="number"
              v-model.number="question.answer"
              placeholder="answer"
            />
            <span> اختر رقم الاجابة الصيحيه</span>
          </div>
          <input
            type="number"
            v-model.number="question.point"
            placeholder="point"
          />
        </div>
        <div class="">
          <span
            class="py-2 px-4 cursor-pointer rounded-md text-white bg-neutral-700 md:mx-1"
            @click="submitForm()"
          >
            اضافة سؤال
          </span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { faL } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      error: "",
      isLoading: false,

      allQuestions: [],

      question: [
        {
          questionText: "",
          index: 0,
          choices: [],
          answer: 0,
          point: 0,
        },
      ],

      choice: "",
      currentChoices: [],
    };
  },
  methods: {
    async getbookQuestions() {
      this.isLoading = true;
      const bookId = +this.$route.params.bookId;
      try {
        await this.$store.dispatch("book/getBookQuestions");

        this.allQuestions = this.$store.getters["book/bookQuesions"];
        this.allQuestions = this.allQuestions.filter(e=>e.bookId === bookId);
        console.log(this.allQuestions)
      } catch (e) {
        this.error = e.message || "failed to get questions";
      }

      this.isLoading = false;
    },
    removeChoice(e) {
      // if()
      this.currentChoices.splice(e, 1);
    },
    AddChoice() {
      this.currentChoices.push(this.choice);
      this.choice = "";
    },

    // clear() {
    //   this.slide.questions.questionText = "";
    //   this.slide.content = "";
    //   this.slide.questions.answer = 0;
    //   this.slide.questions.point = 0;
    //   this.currentChoices = [];
    // },

    // addSlide() {
    //   this.slide.questions.slideId = this.slide.customId;
    //   this.slide.questions.choices = this.currentChoices;
    //   this.slide.LessonId = +this.LessonId;
    //   this.slide.questions.splice(0,1)
    //   this.allSlides.push({
    //     ...this.slide,
    //     questions: [{
    //       ...this.slide.questions,
    //     }],
    //   });

    //   // this.clear();
    // },
    // getlessonId() {
    //   this.LessonId = this.$route.params.lessonId;
    // },
    async submitForm() {
      this.isLoading = true;

      let question = {
        questionText: this.question.questionText,
        index: this.allQuestions.length + 1,
        choices: this.currentChoices,
        answer: this.question.answer,
        point: this.question.point,
        bookId: +this.$route.params.bookId,
      };

      try {
        await this.$store.dispatch("book/AddQuestion", question);
        location.reload();
      } catch (e) {
        this.error = e.message || "failed to send slides";
      }

      this.isLoading = false;
    },
  },

  created() {
    this.getbookQuestions();
  },
};
</script>

<style scoped>
.question {
  margin-bottom: 20px;
  font-weight: bold;
}

/* Style for the choices */
.choice {
  margin-right: 20px;
}

.choice span {
  margin-left: 10px;
  font-weight: normal;
}

/* Different colors for choices */
.choice .choice-0 {
  color: blue;
}
.choice .choice-1 {
  color: green;
}
.choice .choice-2 {
  color: red;
}
.choice .choice-3 {
  color: purple;
}
</style>
