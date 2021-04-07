<template>
  <main class="post individual">
    <h1>{{ post.title.rendered }}</h1>
    <section v-html="post.content.rendered"></section>
  </main>
</template>

<script>
export default {
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    post() {
      return this.pages.find(el => el.slug === 'about');
    }
  },
  data() {
    return {
      slug: this.$route.params.slug
    };
  }
};
</script>

<style lang="scss" scoped>
main.post {
  margin: 60px auto 50px;
  max-width: 800px;
  padding: 0 30px 70px;
}

h1 {
  color: black;
  font-size: 40px;
}

section {
  color: #444;
}

.date {
  text-align: center;
}
</style>
