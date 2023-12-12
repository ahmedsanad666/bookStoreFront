<template>
  <section class="space-y-6 md:w-1/2 w-3/4 rounded-md bg-[#ccc]" v-if="showD">
    <Teleport to="body">
      <div class="overlay" @click="$emit('TryClose')"></div>
    </Teleport>
    <!-- question -->
    <div v-if="currentMood === 'quiz' && currentQ">
      <div class="h-full w-[90%] space-y-6 m-auto py-6">
        <div class="bg-mianColor py-7 shadow-lg px-5 rounded-xl mx-auto">
          <p class="text-center max-w-xl mx-auto">
            {{ currentQ.questionText }}
          </p>
        </div>
        <div>
          <ul class="space-y-4">
            <li
              class="bg-mianColor rounded-lg shadow-md py-2 px-10 tracking-wide hover:bg-slate-400"
              v-for="(el, key) in currentQ.choices"
              :key="key"
              ref="myli"
              @click="checkAns(key)"
            >
              <span class="flex justify-center items-center">{{ key }}</span>

              {{ el }}
            </li>
          </ul>
        </div>
        <div class="controller">
          <button @click="next" class="py-2 px-3 rounded-md bg-primary-green">
            التالى
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="currentMood === 'win'">
      <base-spinner v-if="isLoading"></base-spinner>

      <h1 class="text-center my-4 py-4 text-3xl" v-if="error">{{ error }}</h1>
      <h1 class="text-center my-4 py-4 text-3xl" v-if="message">
        {{ message }}
      </h1>
      <div class="w-full py-2 mt-3 text-center ">
        <router-link to="/grants" class=" border rounded-md   hover:text-slate-900 bg-slate-200 py-2 px-4 text-xl font-bold m-auto"
          >View Grant</router-link
        >
      </div>
    </div>
    <div v-else-if="currentMood === 'noQuiz'">
      <h1 class="text-center my-4 py-4 text-3xl">
        غير متاح امتحان على هذا الكتاب
      </h1>
    </div>
    <div v-else-if="currentMood === 'lose'">
      <h1 class="text-center my-4 py-4 text-3xl">you failed</h1>
    </div>
    <div v-else>
      <h1 class="text-center my-4 py-4 text-3xl">Already Token</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    showD: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentMood: "quiz",
      isRightAns: false,
      showAns: false,
      Questions: [],
      questionCounter: 0,
      currentQ: [],
      bookId: 0,
      currentChoice: 0,
      isLoading: false,
      rightAnsCount: 0,
      message: "",
      error: "",
      daysToread: 0,
      isbn: "",
      title: "",
    };
  },

  methods: {
    next() {
      if (this.questionCounter >= this.Questions.length - 1) {
        return;
      }
      let li = this.$refs.myli;
      li.forEach((el) => {
        el.classList.remove("wrong");
        el.classList.remove("right");
      });
      this.questionCounter++;
      this.loadCurrentQ();
    },
    async loadData(id, days, title, isbn) {
      this.bookId = id;
      this.isLoading = true;
      this.daysToread = days;
      this.isbn = isbn;
      this.title = title;

      try {
        const userId = this.$store.getters["auth/userId"];
        await this.$store.dispatch("book/GetGrants");
        const allGrants = this.$store.getters["book/grants"];
        console.log(this.currentMood);
        if (
          allGrants.some(
            (e) => e.apiUserId === userId && e.bookId === this.bookId
          )
        ) {
          this.currentMood = "alreadyDone";
        } else {
          // this.currentMood = 'quiz';
          await this.$store.dispatch("book/getBookQuestions");

          const allQuestions = this.$store.getters["book/bookQuesions"];

          const bookQ = allQuestions.filter((e) => e.bookId === this.bookId);
          if (bookQ.length === 0) {
            this.currentMood = "noQuiz";
            return;
          }
          this.Questions = bookQ;
          this.loadCurrentQ();
        }
      } catch (e) {
        this.Error = "failed to Get Courses" || e.message;
      }
      this.isLoading = false;
    },
    loadCurrentQ() {
      this.currentQ = this.Questions[this.questionCounter];
    },

    async checkAns(key) {
      this.currentChoice = key;
      const choice = this.currentChoice + 1;
      const rithAns = this.currentQ.answer;
      let li = this.$refs.myli;
      let lastQuestion =
        this.questionCounter == this.Questions.length - 1 ? true : false;

      if (choice == rithAns) {
        this.rightAnsCount++;
        this.isRightAns = true;
        li[key].classList.add("right");
        const userId = this.$store.getters["auth/userId"];
        this.isLoading = true;
        const paylaod = {
          apiUserId: userId,
          questionId: this.currentQ.id,
        };
        try {
          await this.$store.dispatch("book/AddQuestionData", paylaod);
        } catch (e) {
          console.log("faild to send data");
        }
        this.isLoading = false;
      } else {
        this.isRightAns = false;
        li.forEach((el) => {
          el.classList.add("wrong");
        });
        li[rithAns - 1].classList.add("right");
        li[rithAns - 1].classList.remove("wrong");
      }

      if (lastQuestion) {
        if (this.rightAnsCount == this.Questions.length) {
          this.currentMood = "win";

          // add user grant
          const userId = this.$store.getters["auth/userId"];
          const grant = {
            apiUserId: userId,
            grantCode: Date.now().toString(),
            validTillDate: this.daysToread,
            bookTitle: this.title,
            isbn: this.isbn,
            bookId: this.bookId,
          };

          this.isLoading = true;
          try {
            await this.$store.dispatch("book/AddGrant", grant);
            this.message = "congratulations your have got your BookGrant";
          } catch (e) {
            this.error = "failed to Get Courses" || e.message;
          }
          this.isLoading = false;
        } else {
          this.currentMood = "lose";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li.checked {
  background: rgb(148 163 184);
}

li.right {
  background: green;
}
li.wrong {
  background: red;
}
li {
  cursor: pointer;
  transition: 0.3s linear;
  position: relative;

  span {
    position: absolute;
    background: #2c3e50;
    top: 0;
    left: 0;
    height: 100%;
    padding: 0.5rem;
    color: white;
    font-weight: 500;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
}
section {
  height: 80vh;
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
}
</style>
