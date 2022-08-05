<template>
  <div>
    <!-- 搜索框 -->
    <!-- form的作用:在ios系统下可以显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- is指定动态组件的名字, 字符串, 并且名字应该从components -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 引入组件
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'

export default {
  name: 'Search',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data() {
    return {
      keywords: '',
      // 用于记录用户是否搜索了
      isShowSearchResult: false
    }
  },
  computed: {
    componentName() {
      // 如果输入的是空字符串那么渲染搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        // 用变量记录是否显示搜索结果
        return 'SearchResult'
      }

      // 即不显示搜索历史, 也不显示搜索结果,就渲染搜索建议
      return 'SearchSuggestion'
    }
  },
  methods: {
    // 搜索
    onSearch() {
      console.log('正在搜索')
      // 用户搜索了, 显示搜索结果
      this.isShowSearchResult = true
    },
    // 当用户聚焦了搜索框
    onSearchFocus() {
      // 如果keywords为'' 显示搜索历史
      // 如果keywords有值, 显示搜索建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
// 搜索框样式
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
