<template>
    <div class="app">
        <div class="loading"><v-spin :spinning="spinning" tip="加载中"></v-spin></div>
        <div class="title">列车时刻查询系统</div>
        <div class="box">
            <v-form direction="vertical">
                <v-form-item label="手机号">
                    <v-input placeholder="手机号" v-model="loginUser.account" size="large"></v-input>
                </v-form-item>
                <v-form-item label="密码" required>
                    <v-input type="password" v-model="loginUser.password" placeholder="密码" size="large"></v-input>
                </v-form-item>
                <v-form-item style="margin-top:24px">
                    <v-button type="primary" @click="enter">确定</v-button>&nbsp;&nbsp;&nbsp;
                    <v-button type="primary" @click="back">后台</v-button>
                    <a @click="showModal">
                        <p>没有账号? 点击注册</p>
                    </a>
                </v-form-item>
            </v-form>

        </div>
    </div>
</template>

<script>
import axios from '../js/axios'
export default {
    name: 'LoginView',
    data() {
        return {
            loginUser: {
                account: '',
                password: '',
            },
            // 后端返回的user对象
            user: {},
            spinning: false,
        }
    },
    methods: {
        back() {
            this.$router.push('/adminLogin')
        },

        showModal() {
            this.$router.push('/register')
        },


        enter() {

            this.spinning = true

            // 手机号正则
            var phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

            if (this.loginUser.account == '' || this.loginUser.password == '') {
                // 输入为空
                this.$message.info('请输入内容', 2)
                return
            }
            if (!phoneReg.test(this.loginUser.account)) {
                // 手机号格式不正确
                console.log("hfa")
                this.$message.info('手机号格式错误', 2)
                return
            }

            // 发送请求,用户登录
            axios.post('/user/login', this.loginUser)
                .then(res => {
                    console.log(res.data)
                    // 出现异常
                    if (res.data.code == 0) {
                        this.$message.info(res.data.msg)
                        return
                    }
                    // 将用户信息保存
                    localStorage.setItem('userInfo', JSON.stringify(res.data.data))
                    setTimeout(() => {
                        this.spinning = false
                        this.$router.push('/homeInfo')
                    }, 1000);
                }).catch(res => {
                    this.$message.info("未知错误")
                })
        },

    },
    mounted() {
        console.log(JSON.parse(localStorage.getItem('replayName')))
        this.loginUser.account = JSON.parse(localStorage.getItem('replayName'))
    },
    beforeDestroy() {

    },
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

.title {
    font-size: 20px;
    margin-top: 100px;
    text-align: center
}

.app {
    position: relative;
    overflow: hidden;
}

.loading {
    text-align: center;
    top: 60px;
    right: 580px;
    position: absolute;
}
</style>