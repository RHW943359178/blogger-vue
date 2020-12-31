<template>
  <div class="markdown_nav">
    <ul>
      <li v-for="(item, index) in nodes" :key="index">{{ index }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['rootId'],
  data() {
    return {
      nodes: []
    }
  },
  mounted() {
    this.$nextTick(() => {
    this.handleGetAllLabel(this.rootId)
    })
  },
  methods: {
    //  从文章内容里取出所有的 标题标签内容（h1-h6）
    handleGetAllLabel(id) {
      if (!id) {
        return
      }
      this.nodes = []
      for (let i = 1; i <= 6; i++) {
        let arr = document.querySelectorAll(`#${this.rootId} h${i}`)
        arr.forEach(item => {
          if (this.nodes.indexOf(item) == -1) {
          this.nodes.push(item)
          }
        })
      }
      console.log(this.nodes, '123')
      // return nodes
    },
    //  处理数据，用于dom渲染
    // handleNodeData() {
    //   let data = this.handleGetAllLabel(id)
    //   if (!data.length) {
    //     return
    //   }
    //   console.log(data, 'data')
    // },
  }
}
</script>

<style scoped>
  .markdown_nav {
    width: 240px;
    height: 350px;
    border: 1px solid #ccc;
    background: #FFFFFF;
    position: absolute;
  }
</style>