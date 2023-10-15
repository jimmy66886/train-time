<template>
    <div class="app">
        <!-- <h1>主页</h1>
        <v-button @click="testRequest">test</v-button> -->

        <div class="box">
            <template>
                <v-tabs active-tab-key="1">
                    <v-tab-pane tab-key="1" icon="environment" tab="站站搜索">
                    </v-tab-pane>
                    <v-tab-pane tab-key="2" icon="car" tab="车次搜索">
                        <span class="tip">车次查询</span>
                        <div class="search_box">
                            <v-input placeholder="车次编号,如G686" v-model="trainNumber" size="large"></v-input>
                            <v-button size="large" type="primary" icon="search"
                                @click="getByNumber"><span>搜索</span></v-button>
                        </div>
                    </v-tab-pane>
                </v-tabs>
            </template>
        </div>

    </div>
</template>

<script>
import axios from '../js/axios'
import * as echarts from "echarts"

export default {
    name: 'HomeInfo',
    data() {
        return {
            userInfo: {},
            trainNumber: '',
        }
    },
    methods: {
        getByNumber() {
            axios.get(`/train/getByNumber/${this.trainNumber}`).then(res => {

                if (res.data.data == null) {
                    this.$message.info("暂无此列车信息")
                    return
                }

                localStorage.setItem('trainInfo', JSON.stringify(res.data.data))
                this.$router.push("/trainInfo")
            })
        },
        testRequest() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log(this.userInfo)
            axios.get('/user/testToken').then(res => {
                console.log(res.data)
            })
        },
    },
    mounted() {
        if (localStorage.getItem('userInfo') == null) {
            this.$message.info("请先登录")
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.search_box {
    display: flex;
    justify-content: center;

}

.tip {
    font-size: 16px;
}

.app {
    overflow: hidden;
}

.box {
    border: 1px solid rgb(179, 179, 255);
    border-radius: 10px;
    margin: 0 auto;
    width: 600px;
    height: 500px;
    margin-top: 100px;
    padding: 15px;
}
</style>