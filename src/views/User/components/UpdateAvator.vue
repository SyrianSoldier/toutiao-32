<template>
  <div class="update-avator">
    <!-- src可识别的数据: 路径, 外部链接, base64, 图片对象 -->
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShowAvator = false">取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
// yarn add cropperjs
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadAvator() {
      // 1. 获取裁减后的图像的file对象
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '图片正在上传...',
          forbidClick: true
        })

        try {
          // 2. 发送请求
          const { data } = await uploadAvator(blob)
          // 3. 更改父组件里的头像
          this.$emit('update-avator', data.data.photo)
          // 4. 关闭弹层
          this.$parent.$parent.isShowAvator = false
          // 5. 提示成功
          this.$toast.success('图片上传成功')
        } catch (error) {
          this.$toast.fail('图片上传失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
