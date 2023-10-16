<template>
  <div class="app">
    <div class="title">列车时刻后台管理</div>
    <div class="box">
      <v-form direction="vertical">
        <v-form-item label="账号">
          <v-input placeholder="账号" v-model="loginUser.account" size="large"></v-input>
        </v-form-item>
        <v-form-item label="密码" required>
          <v-input type="password" v-model="loginUser.password" placeholder="密码" size="large"></v-input>
        </v-form-item>
        <v-form-item style="margin-top:24px">
          <v-button type="primary" @click="enter">确定</v-button>&nbsp;&nbsp;&nbsp;
        </v-form-item>
      </v-form>

    </div>
  </div>
</template>

<script>

import axios from '../js/axios'

export default {
  name: 'AdminLoginView',
  data() {
    return {
      loginUser: {
        account: '',
        password: '',
      },
      // 后端返回的user对象
      user: {},
    }
  },
  methods: {
    enter() {

      if (this.loginUser.account == '' || this.loginUser.password == '') {
        // 输入为空
        this.$message.info('请输入内容', 2)
        return
      }

      // 发送请求,用户登录
      axios.post('/admin/train/login', this.loginUser)
        .then(res => {
          console.log(res.data)
          // 出现异常
          if (res.data.code == 0) {
            this.$message.info(res.data.msg)
            return
          }
          this.$router.push('/trainManage')
        }).catch(res => {
          this.$message.info("未知错误")
        })
    },
  },
}
</script>

<style>
.box {
  height: 300px;
  width: 600px;
  border: 1px solid rgb(0, 173, 236);
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;
}

.title {
  font-size: 20px;
  margin-top: 100px;
  text-align: center
}

.app {
  position: relative;
  overflow: hidden;
}
</style>