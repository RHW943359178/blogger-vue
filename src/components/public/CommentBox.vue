<template>
  <div :class="['b_comment', {'b_comment_blur': followCommentFlag && type === 2}]">
    <div class="comment_input">
      <textarea v-model.trim="commentContentT" @focus="conmentFocusT" placeholder="写下你的评论..."></textarea>
    </div>
    <div :class="['comment_exec', {'comment_exec_focus': focusFlagT}]">
      <div>
        <i class="el-icon-s-opportunity"></i>
        <span>Ctrl + Enter 发表</span>
      </div>
      <div>
        <el-button type="danger" :disabled="!commentContentT" :loading="commentLoading" plain size="mini" @click="commentPublish(type, commentContentT)">发布</el-button>
        <el-button type="info" plain size="mini" @click="conmentBlurT">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'id'],
  data () {
    return {
      commentContentT: '',
      commentLoading: false,
      focusFlagT: false,
      followCommentFlag: true,
      buildId: 0
    }
  },
  mounted () {
    // console.log(this.type, 's')
  },
  methods: {
    conmentFocusT () {
      if (this.type === 1) {
        this.focusFlagT = true
      } else {
        this.focusFlagT = true
        this.followCommentFlag = false
      }
    },
    //  非固定评论框 失焦
    conmentBlurT () {
      this.commentContentT = ''
      if (this.type === 1) {
        this.focusFlagT = false
      } else {
        this.followCommentFlag = true
      }
    },
    commentPublish (val) {
      this.buildId = this.id
      this.$parent.commentPublish(val, this.commentContentT, this.buildId)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/commentBox.scss';
</style>
