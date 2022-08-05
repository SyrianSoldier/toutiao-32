<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button round size="small" class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <!-- :class="{ 类名:bool }" -->
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsAPI } from '@/api'
// filter
//  - 返回值: 新数组
//  - return true 将遍历到的哪一项加入到新数组当中

// find 从数组当中查找满足条件的元素
//  - 返回值 如果查找到返回元素 如果没有查找到undifined
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  // 如果说, 我的频道里有aItem
  // const results = !!this.myChannels.find((mItem) => aItem.id === mItem.id)
  // if (results) {
  //   return false
  // } else {
  //   return true
  // }
  computed: {
    recommendChannels() {
      // 所有频道减去我的频道
      // 减-->删选
      // 如果aItem在MyChaneels数组里出现了,过滤掉

      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  },
  methods: {
    // 请求所有频道
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI()

        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast.fail('刷新重新获取所有频道')
      }
    },
    // 改变tab的active
    //  this.$parent: 当前组件实例的亲身父亲的组件
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return

        this.$emit('del-channel', item.id)
      } else {
        // 1.关闭弹窗
        // this.$parent.$parent.show = false

        this.$emit('close')

        // 2.切换tab active
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }

  :deep(.van-grid-item__content) {
    background-color: #eee;
  }

  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
  }

  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
