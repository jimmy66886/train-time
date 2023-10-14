<template>
    <div>
        <h1>主页</h1>
        <v-button @click="testRequest">test</v-button>
    </div>
</template>

<script>
import axios from '../js/axios'
import * as echarts from "echarts"

export default {
    name: 'HomeInfo',
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        testRequest() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log(this.userInfo)
            axios.get('/user/testToken').then(res => {
                console.log(res.data)
            }).catch(()=>{
                this.$message.error('账户已过期')
                this.$router.push('/')
            })
        },
    }
}
</script>

<style scoped></style>