const siteURL = "https://areeltrip.com"

export const state = () => ({
  info: {},
  pages: [],
  posts: [],
  tags: []
})

export const mutations = {
  updateBlogInfo: (state, info) => {
    state.info = info
  },
  updatePages: (state, pages) => {
    state.pages = pages
  },
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateTags: (state, tags) => {
    state.tags = tags
  }
}

export const actions = {
  async getBlogInfo({ commit }) {
    try {
      let info = await fetch(
        `${siteURL}/wp-json`
      ).then(res => res.json())

      commit("updateBlogInfo", info)
    } catch (err) {
      console.log(err)
    }
  },
  async getPages({ state, commit }) {
    if (state.pages.length) return

    try {
      let pages = await fetch(
        `${siteURL}/wp-json/wp/v2/pages?page=1&per_page=20&_embed=1`
      ).then(res => res.json())

      pages = pages
        .filter(el => el.status === "publish")

      commit("updatePages", pages)
    } catch (err) {
      console.log(err)
    }
  },
  async getPosts({ state, commit }) {
    if (state.posts.length) return

    try {
      let posts = await fetch(
        `${siteURL}/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
      ).then(res => res.json())

      posts = posts
        .filter(el => el.status === "publish")
        .map(({ id, slug, title, excerpt, date, tags, content }) => ({
          id,
          slug,
          title,
          excerpt,
          date,
          tags,
          content
        }))

      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return

    let allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags)
    }, [])
    allTags = allTags.join()

    try {
      let tags = await fetch(
        `${siteURL}/wp-json/wp/v2/tags?page=1&per_page=40&include=${allTags}`
      ).then(res => res.json())

      tags = tags.map(({ id, name }) => ({
        id,
        name
      }))

      commit("updateTags", tags)
    } catch (err) {
      console.log(err)
    }
  }
}
