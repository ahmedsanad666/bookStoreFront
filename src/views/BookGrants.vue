<template>
  <section class="min-h-screen py-3">
    <div class="book-grant-list md:w-3/4 w-[90%] m-auto">
      <h1 class="text-center md:text-3xl text-2xl my-4 py-4">
        Your BookGrants
      </h1>

      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-if="bookGrants.length > 0">
        <li
          v-for="(grant, index) in bookGrants"
          :key="index"
          class="book-grant rounded-md shadow-lg py-3 px-5"
        >
          <div class="book-title">{{ grant.bookTitle }}</div>
          <div class="book-details">
            <span class="isbn">رقم الكتاب: {{ grant.isbn }}</span>
            <span class="grant-code">كود الهدية: {{ grant.grantCode }}</span>
            <span class="valid-days"
              >عدد الأيام الصالحة: {{ grant.validTillDate }}</span
            >
            <span class="grant-date"
              >تاريخ الهدية: {{ grant.recordedDate }}</span
            >
          </div>
        </li>
      </ul>
      <h1
        v-else-if="bookGrants.length === 0 && error === ''"
        class="text-center md:text-3xl text-2xl my-4 py-4"
      >
        لم تحصل على هدايا بعد
      </h1>

      <h1 v-else class="text-center md:text-3xl text-2xl my-4 py-4">
        {{ error }}
      </h1>

      <!-- ............ -->
    </div>
  </section>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/en";
export default {
  data() {
    return {
      bookGrants: [],
      isLoading: false,
      error: "",
    };
  },
  methods: {
    async getGrants() {
      this.isLoading = true;
      const userId = this.$store.getters["auth/userId"];

      try {
        await this.$store.dispatch("book/GetGrants");
        const allGrants = this.$store.getters["book/grants"];
        this.bookGrants = allGrants.filter((el) => el.apiUserId === userId);
        this.bookGrants = this.bookGrants.map((el) => {
          el.recordedDate = dayjs(el.recordedDate).format("ddd MMM YYYY");
          return el;
        });
        console.log(this.bookGrants)
      } catch (e) {
        this.error = new Error(
          e.message || "failed to get grants try again later "
        );
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getGrants();
  },
};
</script>

<style lang="scss" scoped>
.book-grant-list {
  text-align: right;
  margin-top: 20px;

  .book-grant {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .book-title {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .book-details {
      display: flex;
      flex-direction: column;

      .isbn,
      .grant-code,
      .valid-days,
      .grant-date {
        margin-bottom: 3px;
      }
    }
  }
}
</style>
