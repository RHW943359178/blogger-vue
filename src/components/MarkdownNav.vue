<template>
  <el-container>
      <el-aside width="300px" class="leftNav">
        <el-scrollbar style="height:100%">
          <bc-menu v-if="navList.length > 0" ref="bcMenu" :menuData="navList"></bc-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="rightCont">
        <el-scrollbar style="height:100%" ref="helpDocs" @scroll="handleScroll">
          <div class="main-cont">
            <div class="markdownBox" v-html="compiledMarkdown"></div>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
</template>
<script>
// export default {
  import marked from 'marked'
import bcMenu from 'bcMenu'  // elementui 菜单
export default {
  data () {
    return {
      navList: [],
      activeIndex: 0,
      docsFirstLevels: [],
    }
  },
  components: {
    bcMenu
  },
  mounted () {
    if (this.mdContent) {
      this.navList = this.handleNavTree();
      this.getDocsFirstLevels(0);
    }
  },
  methods: {
    change (value, render) {
      this.$nextTick(() => {
        this.mdContent = value;
        this.htmlCont = render;
      })
      // render 为 markdown 解析后的结果[html]
    },
    // markdown方法结束
    getDocsFirstLevels (times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll('h2'), element => {
          firstLevels.push(element.offsetTop - 60)
        })
        this.docsFirstLevels = firstLevels;
 
        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    // 
    handleScroll () {
      // 根据滚动右侧内容定位到左侧菜单
      if (this.$refs['helpDocs']) {
        let scrollTop = this.$refs['helpDocs'].wrap.scrollTop;
        let _article = document.querySelectorAll('.step-jump')
        _article.forEach((item, index) => {
          if (scrollTop >= item.offsetTop - 70) {
            this.$refs.bcMenu.getCurrent(`index-${index}`);
          }
        })
      }
    },
    getTitle (content) {
      let nav = [];
      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
        let title = match.replace('\n', '');
        if (title.indexOf('</font>') > -1) {
          return false;
        }
        let level = m1.length;
        tempArr.push({
          name: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
          level: level,
          children: [],
          icon: 'icon-dian'
        });
      });
      // 处理菜单，以及添加与id对应的index值
      nav = tempArr.filter(item => item.level <= 4 && item.level > 1) || [];
      // 设置大标题
      let nameFind = tempArr.find(item => item.level == 1) || {};
      this.name = nameFind.name
      let index = 0;
      // eslint-disable-next-line no-return-assign
      return nav = nav.map(item => {
        item.index = index++;
        item.code = item.index;
        item.anchor = `index-${item.index}`;
        return item;
      });
    },
    // 将标题数据处理成树结构
    handleNavTree () {
      let navs = this.getTitle(this.content);
      // 设置了4级导航
      let navLevel = [1, 2, 3, 4];
      let retNavs = [];
      let toAppendNavList, parentNavList = [];
 
      navLevel.forEach(level => {
        // 遍历标题，将同一级的标题组成新数组
        toAppendNavList = this.find(navs, {
          level: level
        });
        parentNavList = this.find(navs, {
          level: level - 1
        });
        if (retNavs.length === 0) {
          // 处理一级标题
          retNavs = retNavs.concat(toAppendNavList);
        } else {
          // 处理其他标题，并将其他标题添加到对应的父级标题的children中
          toAppendNavList.forEach(item => {
            item = Object.assign(item);
            let parentNavIndex = this.getParentIndex(navs, item.index);
            return this.appendToParentNav(parentNavList, parentNavIndex, item);
          });
        }
      });
      return retNavs;
    },
    find (arr, condition) {
      return arr.filter(item => {
        for (let key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        return true;
      });
    },
    getParentIndex (nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    },
    appendToParentNav (nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
        index: parentIndex
      });
      nav[index].children = nav[index].children.concat(newNav);
    },
    findIndex (arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
        for (var key in condition) {
          if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
            return false;
          }
        }
        ret = index;
      });
      return ret;
    }
  },
  computed: {
    content () {
      return this.mdContent
    },
    compiledMarkdown: function () {
      let index = 0, that = this;
      rendererMD.heading = function (text, level) {
        // 导航
        if (level <= 4 && level != 1) {
          return `<h${level} id="index-${index++}" class="step-jump">${text}</h${level}>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      };
      rendererMD.code = function (code, language) {
        code = code.replace(/\r\n/g, '<br>')
        code = code.replace(/\n/g, '<br>');
        return `<div class="text">${code}</div>`;
      };
      return marked(this.content);
    }
  }
}
</script>
<style scoped>

</style>
