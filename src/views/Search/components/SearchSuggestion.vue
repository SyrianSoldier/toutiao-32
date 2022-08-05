<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionsAPI } from '@/api'
import { debounce } from 'lodash'
// #region
// 1. 动态正则
//  - 字面量 /aasdasd/ig
//  - new RegExp(变量,'ig')

// 2. 字符串的replace
// -  第一个参数可以是正则
// -  第二个参数可以是函数, 函数的返回值是要替换的字符串
// -  match: 正则匹配上的字符
/*
'Auglar'.replace(/a/ig,function(match){
    return `<span>${match}</span>`
})
*/
// #endregion
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    // map:映射 返回一个新数组, 新数组的长度和原数组一样
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')

      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggetion()
      }
    }
  },
  methods: {
    // #region
    // 获取搜索建议
    // 防抖
    // 1. 延迟执行
    // 2. 干掉上一次的定时器
    //  - clearTimeout(id)

    // 处理搜索建议+防抖
    // 单一职责原则
    // #endregion
    getSearchSuggetion: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionsAPI(this.keywords)

        // 等价于data.data.options.filter((str)=>Boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
