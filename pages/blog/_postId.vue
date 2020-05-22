<template>
  <div v-editable="story.content">
    <div :style="{backgroundImage: 'url(' + story.content.thumbnail + ')'}" class="bg-cover bg-center h-40 w-full" />
    <h1>{{ story.content.title }}</h1>
    <p class="whitespace-pre-line">
      {{ story.content.content }}
    </p>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi.get('cdn/stories/blog/' + context.params.postId, {
      version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
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

<style>

</style>
