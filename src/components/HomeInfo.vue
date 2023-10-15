<template>
    <div class="app">
        <!-- <h1>主页</h1>
        <v-button @click="testRequest">test</v-button> -->

        <div class="box">
            <template>
                <v-tabs active-tab-key="1">
                    <v-tab-pane tab-key="1" icon="environment" tab="站站搜索">
                        <div>车站</div>
                        <div class="stationSerachUp">
                            <v-input v-model="start" size="large"></v-input>
                            <img src="../images/Reverse.png" @click="reverse"
                                style="height: 20px;line-height: 32px; padding: 3px;">
                            <v-input v-model="end" size="large"></v-input>
                        </div>
                        <div class="stationSeachDown">
                            <v-date-picker v-model="date1" clearable @change="change"></v-date-picker>
                            <v-button type="primary" icon="search" @click="getByStations"><span>搜索</span></v-button>
                        </div>
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

export default {
    name: 'HomeInfo',
    data() {
        return {
            userInfo: {},
            trainNumber: '',
            date1: '',
            start: '',
            noteDate: '',
            end: '',
            // 暂时支持查询的车站
            stationArr: ['汉中', '西安北']
        }
    },
    watch: {
        date1(val) {
            console.log('watch:', val)
            this.noteDate = val
            console.log("更新后的时间为:" + this.noteDate)
        },
    },
    methods: {
        getByStations() {
            // 校验车站是否正确
            if(!this.stationArr.includes(this.start)||!this.stationArr.includes(this.end)){
                this.$message.info("未包含此车站")
                return
            }
            // 存在该车站数据,发送请求
            axios.get(`/train/getByStations?start=${this.start}&end=${this.end}`)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('trains', JSON.stringify(res.data.data))
                this.$router.push('/stationsInfo')
            })

        },
        // 反转车站顺序
        reverse() {
            var tmp = this.start
            this.start = this.end
            this.end = tmp
        },
        change(time) {
            console.log('change:', time)
        },
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
        getCurrentDate() {
            const currentDate = new Date();

            // 获取年、月、日
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            const day = currentDate.getDate().toString().padStart(2, '0');

            // 拼接成 "YYYY-MM-DD" 格式
            const formattedDate = `${year}-${month}-${day}`;

            this.date1 = formattedDate;
        },
    },
    mounted() {
        if (localStorage.getItem('userInfo') == null) {
            this.$message.info("请先登录")
            this.$router.push("/")
        }
    },
    created() {
        // 获取当前时间
        this.getCurrentDate()
    }
}
</script>

<style scoped>
.stationSeachDown {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stationSerachUp {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* 添加这一行 */
}

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