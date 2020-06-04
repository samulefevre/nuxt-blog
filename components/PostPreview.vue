<template>
  <nuxt-link :to="'/blog/'+ id" class="block w-full sm:w-11/12 p-4 sm:p-8 no-underline text-black">
    <article class="bg-red-300">
      <div :style="{backgroundImage: 'url(' + thumbnailImage + ')'}" class="bg-cover bg-center h-40 w-full" />
      <div class="text-center p-1">
        <h1>{{ title }}</h1>
        <p>{{ excerpt }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    thumbnailImage: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
