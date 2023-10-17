<template>
    <div class="app">
        <!-- <h1>主页</h1>
        <v-button @click="testRequest">test</v-button> -->

        <div class="box">
            <template>
                <v-tabs active-tab-key="1">
                    <v-tab-pane tab-key="1" icon="environment" tab="站站搜索">
                        <div class="tip">车站</div>
                        <div class="stationSerachUp">
                            <v-input v-model="start" size="large"></v-input>
                            <img src="../images/Reverse.png" @click="reverse"
                                style="height: 20px;line-height: 32px; padding: 3px;">
                            <v-input v-model="end" size="large"></v-input>
                        </div>
                        <div class="stationSeachDown">
                            <!-- <v-date-picker v-model="date1" clearable @change="change"></v-date-picker> -->
                            <br><br>
                            <div>
                                <v-radio v-model="radio" label="高铁">高铁</v-radio>
                                <v-radio v-model="radio" label="动车">动车</v-radio>
                            </div>
                            <v-button class="searchButton" type="primary" icon="search"
                                @click="getByStations"><span>搜索</span></v-button>
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
                    <v-tab-pane tab-key="3" icon="global" tab="车站搜索">
                        <span class="tip">车站查询</span>
                        <div class="search_box">
                            <v-input placeholder="车站搜索,如汉中" v-model="station" size="large"></v-input>
                            <v-button size="large" type="primary" icon="search"
                                @click="getByStation"><span>搜索</span></v-button>
                        </div>
                        <br><br>
                        <div>
                            <v-radio v-model="radio" label="高铁">高铁</v-radio>
                            <v-radio v-model="radio" label="动车">动车</v-radio>
                        </div>
                    </v-tab-pane>
                </v-tabs>
            </template>
            <v-button class="exitButton" @click="exit">注销</v-button>
            <!-- <v-button class="adminButton" @click="back">后台</v-button> -->
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
            start: '',
            end: '',
            radio: '高铁',
            station: '',
        }
    },
    methods: {
        // back() {
        //     this.$router.push('/adminLogin')
        // },
        exit() {
            // 退出,则删除本地存储的用户数据
            localStorage.removeItem('userInfo')
            this.$router.push('/')
        },
        // 根据车站名获取车站信息
        getByStation() {
            if (this.station == '') {
                this.$message.info("请输入车站")
                return
            }

            axios.get(`/train/getByStation?station=${this.station}&type=${this.radio}`).then(res => {
                if (res.data.data.length == 0) {
                    this.$message.info("暂无此车站信息")
                    return
                }
                localStorage.setItem('stationTrain', JSON.stringify(res.data.data))
                this.$router.push("/stationInfo")
            })

        },
        // 根据车站<=>车站获取信息
        getByStations() {
            // 校验车站是否正确
            if (this.start == '' || this.end == '') {
                this.$message.info("请输入车站")
                return
            }
            axios.get(`/train/getByStations?start=${this.start}&end=${this.end}&type=${this.radio}`)
                .then(res => {
                    if (res.data.data.length == 0) {
                        this.$message.info("暂无信息")
                        return
                    }
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
        // 根据车次获取信息
        getByNumber() {

            if (this.trainNumber == null) {
                this.$message.info("请输入车次")
                return
            }

            axios.get(`/train/getByNumberLike/${this.trainNumber}`).then(res => {

                if (res.data.data.length == 0) {
                    this.$message.info("暂无此列车信息")
                    return
                }
                
                // 将用户输入的列车车次存入本地存储
                localStorage.setItem('trainNumberLike', this.trainNumber)
                // 将后端返回的数据存入
                localStorage.setItem('trainsInfo', JSON.stringify(res.data.data))
                this.$router.push("/trainLikeView")
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
}
</script>

<style scoped>

.adminButton {
    position: absolute;
    bottom: 0;
    right: 60px;
}

.exitButton {
    position: absolute;
    bottom: 0;
    right: 0;
}


.stationSeachDown {
    width: 100%;
    height: 100px;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    position: relative;
}

.searchButton {
    bottom: 30px;
    right: 10px;
    position: absolute;
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
    position: relative;
}
</style>