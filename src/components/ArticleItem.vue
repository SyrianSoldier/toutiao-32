<template>
  <!-- 每一篇文章 -->

  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />

  <!-- 一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    value="内容"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>

  <!-- 三张图片 -->
  <van-cell v-else :title="articleInfo.title" :label="label">
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="100"
      height="100"
      :src="item"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      // 对象和数组的默认值, 比如用函数返回
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo

      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
