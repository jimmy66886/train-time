<template>
    <div class="app">
        <div class="title">注册</div>
        <div class="box">
            <v-form direction="vertical">
                <v-form-item label="手机号">
                    <v-input placeholder="手机号" v-model="user.account" size="large"></v-input>
                </v-form-item>
                <v-form-item label="密码" required>
                    <v-input type="password" v-model="user.password" placeholder="密码" size="large"></v-input>
                </v-form-item>
                <v-form-item style="margin-top:24px">
                    <v-button type="primary" @click="loginUp">确定</v-button>
                    <a @click="showModal">
                        <p>已有账号? 点击登录</p>
                    </a>
                </v-form-item>
            </v-form>
        </div>
    </div>
</template>

<script>

import axios from '../js/axios'

export default {
    name: 'RegisterView',
    data() {
        return {
            user: {
                account: '',
                password: '',
            },
        }
    },
    methods: {

        showModal() {
            this.$router.push('/')
        },

        loginUp() {
            // 手机号正则
            var phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

            if (this.user.account == '' || this.user.password == '') {
                // 输入为空
                this.$message.info('请输入内容', 2)
                return
            }

            if (!phoneReg.test(this.user.account)) {
                // 手机号不正确
                console.log("hfa")
                this.$message.info('手机号格式错误', 2)
                return
            }

            // 发送请求,注册用户
            axios.post('/user/register', this.user)
                .then(res => {
                    console.log(res.data)
                    // 出现异常
                    if (res.data.code == 0) {
                        this.$message.info(res.data.msg)
                        return
                    }
                    this.$message.info('注册成功,跳转至登录界面', 1)
                    localStorage.setItem('replayName',JSON.stringify(this.user.account))
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                })
        }
    }
}
</script>

<style scoped>
.box {
    height: 300px;
    width: 600px;
    border: 1px solid rgb(0, 173, 236);
    border-radius: 10px;
    margin: 0 auto;
    padding: 10px;
}


.title{
    font-size: 20px;
    margin-top: 100px;
    text-align: center
}
.app {
    overflow: hidden;
}
</style>