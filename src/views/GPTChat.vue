<template>
  <section class="h-screen ">
    <div class="min-h-screen bg-[#22222a]  ">
      <div
        class="shadow-md h-screen md:w-[50%] w-full m-auto flex flex-col justify-between items-center text-white bg-[#343541]  rounded-md px-1"
      >
        <div class="py-8 chatSec">
          <ul v-if="chat.length > 0">
            <li v-for="(el, k) in chat" :key="k">
              <p class="py-4 bg-[#343541] shadow-lg px-2 leading-8">
                <font-awesome-icon
                  :icon="['fas', 'comment-dots']"
                  size="2x"
                  class="mx-2"
                />
                {{ el.questoin }}
              </p>
              <p class="py-4 bg-[#444654] px-3 rounded-md leading-8">
                <font-awesome-icon :icon="['fas', 'circle']" class="mx-2" />

                {{ el.answer }}
              </p>
            </li>
          </ul>
        </div>

        <div
          class="py-4 my-2 w-full px-5 flex flex-col justify-center items-center gap-4"
        >
          <div>
            <span v-if="isLoading" class="loader"></span>
          </div>
          <div class="w-3/4 flex gap-4">
            <button
              @click="sendQuestion"
              class="py-1 px-8 bg-[#40414F] rounded-lg"
            >
              send
            </button>
            <input
              class="w-[80%] bg-[#40414F] py-2 px-5 rounded-md outline-none border-none"
              type="text"
              @keydown.enter="sendQuestion"
              v-model.trim="question"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      isLoading: false,
      chat: [],
      error: "",
    };
  },
  methods: {
    async sendQuestion() {
      this.isLoading = true;

      try {
        const data = await this.$store.dispatch(
          "book/chatGptChat",
          this.question
        );
        this.question = "";
        this.chat.push(data);
      } catch (e) {
        this.error = e.message || "failed to send message";
      }

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.chatSec {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
.chatSec::-webkit-scrollbar {
  width: 0.5em;
}
.chatSec::-webkit-scrollbar-track {
  background: transparent;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #fff;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left: 4px solid #ff3d00;
  border-bottom: 4px solid transparent;
  animation: rotation 0.5s linear infinite reverse;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
