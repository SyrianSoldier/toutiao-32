<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新文章成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        :immediate-check="false"
        :finished="isFinished"
        :error.sync="error"
        error-text="加载文章失败, 请点击重新加载"
        offset="0"
        finished-text="没有更多文章了~"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// loading为false时候 可以触发load事件 loading为true不可已触发load事件
// 触发 load 事件自动将将 loading 设置成 true。
import { getArticleAPI } from '@/api'
// 引入组件
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取第一页的数据
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())

        this.articles = data.data.results

        // 保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        // 提示刷新重新获取
        this.$toast.fail('请刷新重新获取文章.')
      }
    },
    // 加载下一页文章
    async loadNextPageArticle() {
      try {
        // 1. 发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)

        const timestamp = data.data.pre_timestamp

        const results = data.data.results
        // 判断是否加载完成
        if (timestamp === null) {
          this.isFinished = true
        }
        // 2. 存储数据
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        // 3. 更新时间戳
        this.pre_timestamp = timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 4. 更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
