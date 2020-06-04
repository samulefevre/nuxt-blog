<template>
  <section v-editable="story.content" class="p-16 mx-auto max-w-screen-xl">
    <h1>{{ story.content.title }}</h1>
    <p class="whitespace-pre-line">
      {{ story.content.content }}
    </p>
  </section>
</template>

<script>
export default {
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi.get('cdn/stories/about', {
      version
    }).then((res) => {
      return res.data
    })
  },
  data () {
    return {
      story: { content: { content: '' } }
    }
  },
  mounted () {
    // use the bridge to listen to events
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true
        })
      }
    })
  }

}
</script>

<style></style>
