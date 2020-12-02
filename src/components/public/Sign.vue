<template>
  <div class="b_sign">
    <div class="logo">
      <a href="#/blogger">
        <img src="../../assets/img/logo_blue.png" alt="">
        <span>博客</span>
      </a>
    </div>
    <div class="sign_body">
      <div class="container">
      <div class="header_logo">
        <img src="../../assets/img/logo_blue.png" alt="">
        <span>博客</span>
      </div>
        <div class="title">
          <ul>
            <li>
              <a href="#/blogger/signUp" @click="signType = 1" :class="{'sign-active': signType() === 1}">登录</a>
            </li>
            <li></li>
            <li>
              <a href="#/blogger/signIn" @click="signType = 2" :class="{'sign-active': signType() === 2}">注册</a>
            </li>
          </ul>
        </div>
        <div class="body">
          <el-form :model="form" :rules="signType() === 1 ? rules2 : rules1" ref="ruleForm">
            <el-form-item prop="username">
              <el-input v-model="form.username" prefix-icon="el-icon-user-solid" placeholder="你的昵称"></el-input>
            </el-form-item>
            <el-form-item v-if="signType() === 2" prop="email">
              <el-input v-model="form.email" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="form.pwd" type="password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item v-if="signType() === 2" prop="cpwd">
              <el-input v-model="form.cpwd" type="password" prefix-icon="el-icon-lock" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="signType() === 2" type="success" :loading="loginFlag" :disabled="loginFlag" round @click="submitForm(2, 'ruleForm')">注册</el-button>
              <el-button v-if="signType() === 1" type="primary" round @click="submitForm(1, 'ruleForm')">登录</el-button>
              <div class="loginInfo" v-if="loginFlag" ref="loginInfo">
                即将跳转到登录页
                <span v-for="(item, index) in jumpTime" :key="index">.</span>
                </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <div class="motto">
            <div class="line"></div>
            <div class="content">
              <div>积累</div>
              <div class="split"></div>
              <div>坚持</div>
              <div class="split"></div>
              <div>自律</div>
            </div>
            <div class="line"></div>
          </div>
          <!-- <div class="footer_logo">
            <img src="../../assets/img/logo_blue.png" alt="">
            <span>博客</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../../utils/common'
import USER from '../../api/user'
export default {
  data () {
    return {
      //  表单数据
      form: {
        username: '', //  昵称
        email: '',  //  邮箱
        pwd: '',    //  密码
        cpwd: '', //    确认密码
      },
      rules1: {
        username: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min:2, max: 15, message: '昵称长度在2~15个字符之间', trigger: 'blur'},
          {validator: (rule, value, callback) => {
            //  当前为登录操作时不校验
            if (this.signType() === 1) {
              return
            }
            let params = {
              condition: this.form.username
            }
            //  检查用户名是否存在异步校验
            USER.handleUsernameValidate({params}).then(result => {
              if (result && result.code == 200) {
                if (result.data === 0) {
                  callback()
                } else {
                  callback(new Error('用户名已存在'))
                }
              }
            })
          }, trigger: "blur"}
        ],
        email: [
          {validator: common.validateMailFormat(), trigger: "blur"}
        ],
        pwd: [
          {validator: common.validatePwd(), trigger: "blur"}
        ],
        cpwd: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value === this.form.pwd) {
                callback()
              } else {
                callback(new Error('两次输入密码不一致'))
              }
            }
          }
        ]
      },
      rules2: {
        username: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min:2, max: 15, message: '昵称长度在2~15个字符之间', trigger: 'blur'},
        ],
        pwd: [
          {validator: common.validatePwd(), trigger: "blur"}
        ]
      },
      test: 1,
      loginFlag: false,
      jumpTime: 3,  //  跳转时间
    }
  },
  computed: {
  },
  mounted() {

  },
  methods: {
    //  判断当前路由  1 登录 2 注册
    signType() {
      if (this.$route.path === '/blogger/signUp') {
        return 1
      } else {
        return 2
      }
    },
    //  表单验证
    submitForm(type, formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (type === 1) {
            this.handleSignUp()
          } else {
            this.handleSignIn()
          }
        } else {
          return false
        }
      })
    },
    //  注册
    handleSignIn() {
      let params = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.pwd
      }
      USER.handleUserSave(params).then(result => {
        if (result && result.code == 200) {
          this.$message({type: 'success', message: result.message})
          //  注册过程中将状态置灰
          this.loginFlag = true
          let time = setInterval(() => {
            this.jumpTime --
            if (this.jumpTime == 0) {
              clearInterval(time)
              //  跳转到登录页
              this.$router.push('/blogger/signUp')
            }
          }, 1000)
        }
      })
    },
    //  登录
    handleSignUp() {
      let params = {
        username: this.form.username,
        password: this.form.pwd
      }
      USER.handleUerLoginValidate(params).then(result => {
        if (result && result.code == 200 && result.data.status == 2) {
          //  跳转到主页
          this.$router.push('/blogger')
          this.$store.commit('updateUserInfo', result.data)
        } else {
          this.$message({type: 'error', message: result.message})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/sign.scss';
</style>