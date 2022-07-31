<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>

    <!-- 底部导航 -->
    <!-- route:路由模式 -->
    <!-- 拿到 path 和每一个 tabbaritem的to属性对比 -->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
          <span> {{ item.text }} </span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  font-size: 30px;

  .toutiao {
    font-size: 40px;
  }
}
</style>
