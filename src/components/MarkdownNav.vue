<template>
  <div class="markdown_nav">
    <ul>
      <li v-for="(item, index) in nodes" :key="index" :class="{'active': activeId == item.id}">
        <!-- <a :class="`${item.label}`" :href="'/#' + item.id" @click="goAnchor(item.id)">{{ item.text }}</a> -->
        <a :class="`${item.label}`" href="javascript:void(0)" @click="goAnchor(item.id)">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['rootId', 'scrollTop'],
  data() {
    return {
      nodes: [],
      activeId: '',
      pageTop: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.pageTop = this.scrollTop
    })
  },
  watch: {
    scrollTop (val) {
      this.onScroll()
      this.pageTop = val
    }
  },
  methods: {
    //  从文章内容里取出所有的 标题标签内容（h1-h6）
    handleGetAllLabel(id) {
      if (!id) {
        return
      }
      this.handleGetHLabel().forEach(item => {
        this.nodes.push({id: item.childNodes[0].id, text: item.childNodes[1].data, label: item.localName})
      })
    },
    //  锚点跳转
    goAnchor(id) {
      this.activeId = id
      id = '#' + id
      document.querySelector(id).scrollIntoView()
    },
    onScroll() {
      this.handleGetHLabel().forEach(item => {
        //  这里的147需要根据具体的情况来计算：标题h标签元素到父类容器的高度值（offsetTop）到滚轮开始滚动的位置的差值
        if (this.scrollTop >= item.offsetTop + 147) {
          this.activeId = item.childNodes[0].id
        }
      })
      //  滚轮向上做处理，超过一定值取消滚动锚点定位值
      if (this.handleGetHLabel().length) {
        if (this.scrollTop < this.handleGetHLabel()[0].offsetTop + 120) {
          this.activeId = ''
        }
      }
    },
    //  获取不重复h标签方法
    handleGetHLabel() {
      let tmp = [], tmpJson = [], returnArr = []
      for (let i = 1; i <= 6; i++) {
        let arr = document.querySelectorAll(`#${this.rootId} h${i}`)
        //  数据处理
        arr.forEach(item => {
          tmp.push(item.childNodes[0].id)
        })
        tmp = Array.from(new Set(tmp))
      }
      tmp.forEach(item => {
        //  这里根据唯一id获取元素，再取其父类元素
        returnArr.push(document.querySelector(`#${item}`).parentElement)
      })
      return returnArr
    }
  }
}
</script>

<style lang="scss" scoped>
  .markdown_nav {
    width: 240px;
    height: 350px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #FFFFFF;
    position: fixed;
    right: 20px;
    bottom: 200px;
    z-index: 0;
    ul {
      list-style: none;
      padding-inline-start: 0;
      li {
        padding: 4px 7px;
        line-height: 1.5;
        a {
          color: #555;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
        }
        a:hover {
          color: #519cea;
        }
        .h1 {
          padding-left: 10px;
        }
        .h2 {
          padding-left: 15px;
        }
        .h3, h4, h5, h6 {
          padding-left: 20px;
        }
        // :hover {
        //   background: #f5f5f5;
        // }

      }
      .active {
        background: #f5f5f5;
        a {
          color: #519cea;
        }
      }
      & > li:hover {
        background: #f5f5f5;
      }
      // .active {
      //   background: #f5f5f5;
      // }
    }
  }
</style>