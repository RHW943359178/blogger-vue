<template>
    <el-dialog :visible="visible" ref="chat_dialog" width="500px" :modal="false" append-to-body :modal-append-to-body="false" :show-close="false" :title="username" 
                @open="dialogOpen" @close="dialogClose" :lock-scroll="false" custom-class="b_chat" v-dialogDrag>
      <div class="chat_title"></div>
      <div class="chat_show_box"></div>
      <div class="chat_input">
        <div class="input_bar">
          <el-tooltip class="chat_tip" effect="light" style="padding: 0" content="聊天记录" placement="right">
            <i class="el-icon-chat-dot-round"></i>
          </el-tooltip>
        </div>
        <textarea v-model="message" @keyup.enter="sendMessage"></textarea>
      </div>
      <div slot="footer">
        <el-button size="mini" type="success" plain @click="sendMessage">发送(enter)</el-button>
        <el-button size="mini" type="success" class="el-icon-close" plain circle @click="handleDialogClose"></el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  props: ['visible', 'username'],
  data () {
    return {
      chatDialog: {
        // visible: visible
      },
      message: ''
    }
  },
  created() {
  },
  mounted() {

  },
  //  离开路由之后断开 websocket 连接
  destroyed() {
  },
  methods: {
    dialogOpen() {

    },
    dialogClose() {

    },
    //  关闭dialog
    handleDialogClose() {
      //  我们不在子组件在修改状态，所以调用父类的方法来修改
      this.$parent.closeDialog()
    },
    //  发送消息
    sendMessage() {
      console.log(1111)
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/chat.scss';
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0; 
  }
</style>
