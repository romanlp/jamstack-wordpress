export default async ({ store }) => {
  await store.dispatch('getBlogInfo')
  await store.dispatch('getPages')
}
