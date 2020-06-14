<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
            <em class="bold">已有美团账号？</em>
            <a href="/login">
              <el-button type="primary" size="small">登陆</el-button>
            </a>
        </span>   
      </header>
    </article>
    <section>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="regRuleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input type="text" v-model="ruleForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input type="password" v-model="ruleForm.cpwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">
            同意以下协议并注册
          </el-button>
          <el-button @click="resetForm('regRuleForm')">重置</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: "blank",
  data() {
    return{
      error: '',
      statusMsg: '',
      ruleForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        cpwd: ""
      },
      rules: {
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        cpwd: [
          {required: true , message: '请输入密码', trigger: 'blur'},
          {
            valiData:(rule, value, callback) => {
              if (value === "") {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      let namePass
      let emailPass
      if (this.timerid) {
        return
      }
      this.$refs['regRuleForm'].validateField('name', valid => {
        namePass = valid
      })
      this.statusMsg = ''
      if (namePass) {
        return
      }
      this.$refs['regRuleForm'].validateField('email', valid => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        this.$axios.post('/users/verify', {
          username: encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email
        }).then(({status, data}) => {
          if (status===200 && data.code === 0) {
            let count = 60
            this.statusMsg = `验证码已发送，剩余${count--}秒`
            this.timerid = setInterval(() => {
              this.statusMsg = `验证码已发送，剩余${count--}秒`
              if (count === 0) {
                clearInterval(this.timerid)
                this.statusMsg = ''
              }
            }, 1000);
            
          } else {
            this.statusMsg = data.msg
          }
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    register() {
      this.$refs['regRuleForm'].validate((valid) => { 
        if (valid) {
          this.$axios.post('/users/signup', {
            username: window.encodeURIComponent(this.ruleForm.name),
            password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
            email: this.ruleForm.email,
            code: this.ruleForm.code
          }).then(({status, data}) => {
            if (status === 200) {  
              if (data && data.code === 0) {
                location.href = '/login'
              } else {
                this.error = data.msg
              }
            } else {
              this.error = `服务器出错， 错误码: ${status}`
            }
            setTimeout(() => {
              this.error = ''
            }, 3000)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss"
</style>