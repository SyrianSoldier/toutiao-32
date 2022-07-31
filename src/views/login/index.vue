<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />

    <!-- 表单/收集手机号和密码 -->
    <!-- 输入框: van-field包括密码框, 文本框, 文本域 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCode = true"
            v-else
          />
        </template>
      </van-field>

      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rules'
import { login, getCodeAPI } from '@/api'
// 1. @/api/index  --> api下有index
// 2.index里面 有login, getCodeAPI

// 为什么点击发送验证码, 触发了sybmit事件
//  - form表单当中, 如果说有任意的button, 都会触发submit事件

// token干什么的?
//  - 用户唯一标识

// 存储token
//  - localstorage --> 数据不是响应式
//  - vuex  --> vuex是响应式的

// 解构赋值
//  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
//  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
//  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
//  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}

export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      // 如果表单校验不通过, 这个方法不会触发

      // q1: res是什么?
      //  - axios封装的对象, 她把服务端返回的数据放在res.data里

      // q2: res是什么?
      //  - Promise的resolve的值

      // q3: error是什么?
      //  - Promise reject的结果
      //  - axios封装的error
      //  - error.response.data是服务端返回的数据
      //  - error.response.status 是服务端返回的状态码

      try {
        this.loading()

        const {
          data: { data: token }
        } = await login(this.mobile, this.code)

        this.$store.commit('SET_TOKEN', token)

        // 跳转到profile
        this.$router.push('/profile')

        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        const status = error.response.status

        let message = '请重新登陆'

        if (status === 400) {
          message = error.response.data.message
        }

        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        // loading
        this.loading()

        try {
          // 2. 发送请求
          await getCodeAPI(this.mobile)

          this.$toast.success('获取验证码成功')

          // 3. 显示倒计时
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status

          let message = '手机号不正确'

          if (status === 429) {
            message = error.response.data.message
          }

          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// 穿透样式
// :deep(穿透的类名)
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
// 验证码样式
// & 代表着父亲的类名
// .code-btn.van-button--mini
:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eeeeee;
    color: #a9929b;
  }
}
</style>
