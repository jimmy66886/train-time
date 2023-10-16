<template>
    <div class="app">
        <div class="nav">
            <v-breadcrumb>
                <v-breadcrumb-item>
                    <router-link to="/homeInfo">首页</router-link>
                </v-breadcrumb-item>
                <v-breadcrumb-item>
                    <a href="#">{{ this.stationInfo[0].stationName }}站</a>
                </v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <div class="info">
            <span>{{ this.stationInfo[0].stationName }}列车时刻表</span>
        </div>
        <div class="el_table">
            <el-table :data="stationInfo" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
                <el-table-column prop="trainNumber" label="车次" sortable>
                </el-table-column>
                <el-table-column prop="type" label="列车类型" sortable>
                </el-table-column>
                <el-table-column prop="departureStation" sortable label="始发站">
                </el-table-column>
                <el-table-column prop="terminal" sortable label="终点站">
                </el-table-column>
                <el-table-column prop="departureTime" sortable label="始发时间">
                </el-table-column>
                <el-table-column prop="arrivalTime" sortable label="到达时间">
                </el-table-column>
                <el-table-column prop="stationName" sortable label="经过站">
                </el-table-column>
                <el-table-column prop="stationArrivalTime" width="150" sortable label="经过站到达时间">
                </el-table-column>
                <el-table-column prop="stationStartTime" width="150" sortable label="经过站发车时间">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StationInfo',
    data() {
        return {
            stationInfo: []
        }
    },
    methods: {

    },
    created() {
        this.stationInfo = JSON.parse(localStorage.getItem('stationTrain'))
    }
}
</script>

<style scoped>

.info{
    margin: 0 auto;
    text-align: center;
    font-size: 26px;
}

.nav{
    margin-bottom: 10px;
    margin-top: 60px;
}
.app {
    width: 1000px;
    margin: 0 auto;
}
</style>