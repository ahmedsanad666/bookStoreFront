<template>
  <section class="min-h-screen py-3">
    <div class="book-grant-list md:w-3/4 w-[90%] m-auto">
      <h1 class="text-center md:text-3xl text-2xl my-4 py-4">مكتباتنا</h1>

      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-if="libraries.length > 0">
        <li
          v-for="(el, index) in libraries"
          :key="index"
          class="book-grant rounded-md shadow-lg py-3 px-5"
        >
          <div class="book-title">{{ el.name }}</div>
          <div class="book-details">
            <span class="isbn"> الدولة: {{ el.country }}</span>
            <span class="grant-code">
              <a :href="el.place">تابع الموقع من خلال الخريطة  </a>
            </span>
            <span class="valid-days">البريد الالكتروني : {{ el.email }}</span>
            <span class="valid-days">الموقع الابكتروني : {{ el.website }}</span>
            <span class="valid-days">الهاتف : {{ el.phoneNumber }}</span>
          </div>
        </li>
      </ul>
      <h1
        v-else-if="libraries.length === 0 && error === ''"
        class="text-center md:text-3xl text-2xl my-4 py-4"
      >
        لم تحصل على هدايا بعد
      </h1>

      <h1 v-else class="text-center md:text-3xl text-2xl my-4 py-4">
        {{ error }}
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      libraries: [],
      isLoading: false,
      error: "",
    };
  },
  methods: {
    async allLibraries() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("book/GetLibraries");
        this.libraries = this.$store.getters["book/libraries"];
      } catch (e) {
        this.error = new Error(
          e.message || "failed to get data try again later "
        );
      }
      this.isLoading = false;
    },
  },
  created() {
    this.allLibraries();
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
    a{
      color:blue;
      &:hover{
        color:brown;
      }
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
