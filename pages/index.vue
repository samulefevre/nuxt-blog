<template>
  <section class="mt-2 flex flex-col sm:flex-row justify-center items-center">
    <PostPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :title="post.title"
      :excerpt="post.previewText"
      :thumbnail-image="post.thumbnailUrl"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/PostPreview'

export default {
  components: {
    PostPreview
  },
  asyncData (context) {
    const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi.get('cdn/stories', {
      version,
      starts_with: 'blog/'
    }).then((res) => {
      return {
        posts: res.data.stories.map((bp) => {
          return {
            id: bp.slug,
            title: bp.content.title,
            previewText: bp.content.summary,
            thumbnailUrl: bp.content.thumbnail
          }
        })
      }
    })
  },
  head: {
    title: 'Home page'
  }
}
</script>
