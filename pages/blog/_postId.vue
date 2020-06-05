<template>
  <div v-editable="story.content" class="mx-auto max-w-screen-xl">
    <div :style="{backgroundImage: 'url(' + story.content.thumbnail + ')'}" class="bg-cover bg-center h-40 w-full" />
    <h1>{{ story.content.title }}</h1>
    <div class="whitespace-pre-line" v-html="body" />
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

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
  computed: {
    body () {
      return marked(this.story.content.content, {
        highlight (md) {
          return highlight.highlightAuto(md).value
        }
      })
    }
  },
  mounted () {
    // Prism.highlightAll()
    // hljs.initHighlightingOnLoad()
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

<style lang="css">

img {
  @apply h-64 mx-auto;
}

</style>
