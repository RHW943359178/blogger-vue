<template>
  <div class="markdown_nav">
    <ul>
      <li v-for="(item, index) in nodes" :key="index" :class="{'active': activeId == item.id}">
        <a :class="`${item.label}`" href="javascript:void(0)" @click="goAnchor(item.id)">{{ item.text }}</a>
      </li>
    </ul>
    <div class="book_menu">
      <svg-icon icon-class="menu(1)" />
      <!-- <svg t="1610004939518" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5749" width="200" height="200"><path d="M706.637322 177.735053 706.637322 0 147.587657 178.240784l0 0L147.587657 1024l728.824686 0L876.412343 177.735053 706.637322 177.735053zM663.403624 59.174661l0 118.560392L291.5328 177.735053 663.403624 59.174661zM833.176555 980.764212 190.823445 980.764212 190.823445 220.968751l642.3552 0L833.178645 980.764212z" p-id="5750" fill="#8a8a8a"></path><path d="M283.495445 428.74462 315.410808 493.595167 331.201306 493.595167 363.281763 428.74462 363.281763 503.438106 389.765747 503.438106 389.765747 384.766955 354.120098 384.766955 323.38338 449.964408 292.834743 384.766955 257.011461 384.766955 257.011461 503.438106 283.495445 503.438106Z" p-id="5751" fill="#8a8a8a"></path><path d="M506.397257 480.011494 445.456718 480.011494 445.456718 455.393698 498.591869 455.393698 498.591869 432.811363 445.456718 432.811363 445.456718 408.364931 504.533159 408.364931 504.533159 384.766955 418.970645 384.766955 418.970645 503.438106 506.397257 503.438106Z" p-id="5752" fill="#8a8a8a"></path><path d="M556.479216 429.081078 613.012376 503.438106 639.498449 503.438106 639.498449 384.766955 613.012376 384.766955 613.012376 461.167804 554.780212 384.766955 529.995233 384.766955 529.995233 503.438106 556.479216 503.438106Z" p-id="5753" fill="#8a8a8a"></path><path d="M717.915951 504.62511c14.822922 0 26.993894-4.608 36.498286-13.836539 9.504392-9.222269 14.258678-22.436049 14.258678-39.635069l0-66.386547-26.486073 0 0 65.536c0 9.504392-2.169208 17.006759-6.532702 22.490384-4.353045 5.489894-10.265078 8.233796-17.740278 8.233796-7.460571 0-13.403951-2.743902-17.823869-8.233796-4.40529-5.483624-6.616294-12.985992-6.616294-22.490384l0-65.536-26.483984 0 0 66.386547c0 17.088261 4.779363 30.274873 14.34018 39.553567C690.8928 499.983673 703.090939 504.62511 717.915951 504.62511z" p-id="5754" fill="#8a8a8a"></path><path d="M270.041339 596.408947l483.073045 0 0 43.235788-483.073045 0 0-43.235788Z" p-id="5755" fill="#8a8a8a"></path><path d="M270.041339 724.47791l483.073045 0 0 43.235788-483.073045 0 0-43.235788Z" p-id="5756" fill="#8a8a8a"></path><path d="M270.041339 852.546873l483.073045 0 0 43.235788-483.073045 0 0-43.235788Z" p-id="5757" fill="#8a8a8a"></path></svg> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['rootId', 'scrollTop'],
  data() {
    return {
      nodes: [],
      activeId: '',
      pageTop: '',
      domArr: [],
      domArrOffsetTop: []
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
      this.domArr = this.handleGetHLabel()
      this.domArr.forEach(item => {
        this.nodes.push({id: item.childNodes[0].id, text: item.childNodes[1].data, label: item.localName})
        this.domArrOffsetTop.push({id: item.childNodes[0].id, offsetTop: item.offsetTop})
      })
      console.log(this.domArrOffsetTop, 'this.domArrOffsetTop')
    },
    //  锚点跳转
    goAnchor(id) {
      this.activeId = id
      id = '#' + id
      document.querySelector(id).scrollIntoView()
    },
    onScroll() {
      this.domArrOffsetTop.forEach(item => {
        //  这里的147需要根据具体的情况来计算：标题h标签元素到父类容器的高度值（offsetTop）到滚轮开始滚动的位置的差值
        if (this.scrollTop >= item.offsetTop + 70) {
          this.activeId = item.id
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
      let tmp = [], returnArr = []
      let arr = document.querySelectorAll(`#${this.rootId} h1, h2, h3, h4, h5, h6`)
      //  数据处理
      arr.forEach(item => {
        tmp.push(item.childNodes[0].id)
      })
      tmp = Array.from(new Set(tmp))
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
    bottom: 110px;
    z-index: 1;
    ul {
      list-style: none;
      padding-inline-start: 0;
      li {
        padding: 4px 7px;
        line-height: 1.5;
        font-size: 15px;
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
    }
  }
</style>