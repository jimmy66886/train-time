<template>
    <div class="app">
        <div class="baseInfo">
            <div class="nav">
                <v-breadcrumb>
                    <v-breadcrumb-item>
                        <router-link to="/homeInfo">首页</router-link>
                    </v-breadcrumb-item>
                    <v-breadcrumb-item>
                        <a href="#">{{ trainInfo.trainNumber }}列车时刻表</a>
                    </v-breadcrumb-item>
                </v-breadcrumb>
            </div>
            <h1>从<span style="color: #4e4ee6;">{{ trainInfo.departureStation }}</span>开往<span style="color: #4e4ee6;">{{
                trainInfo.terminal }}</span>的<span style="color: #ebc52e;">{{ trainInfo.trainNumber }}</span>次列车时刻表</h1>
            <table class="train-info-table">
                <tr>
                    <td>列车类型</td>
                    <td>{{ trainInfo.type }}</td>
                </tr>
                <tr>
                    <td>列车车次</td>
                    <td>{{ trainInfo.trainNumber }}</td>
                </tr>
                <tr>
                    <td>始发站点</td>
                    <td>{{ trainInfo.departureStation }}</td>
                </tr>
                <tr>
                    <td>到达车站</td>
                    <td>{{ trainInfo.terminal }}</td>
                </tr>
                <tr>
                    <td>全程耗时</td>
                    <td>{{ trainInfo.costTime }}</td>
                </tr>
                <tr>
                    <td>始发时间</td>
                    <td>{{ trainInfo.departureTime }}</td>
                </tr>
                <tr>
                    <td>到达时间</td>
                    <td>{{ trainInfo.arrivalTime }}</td>
                </tr>
            </table>

        </div>
        <div class="stationInfo">
            <h1>{{ trainInfo.trainNumber }}次列车时刻表</h1>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>车站</th>
                            <th>到达时间</th>
                            <th>发车时间</th>
                            <th>停靠时间(分钟)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(station, index) in stations" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ station.station }}</td>
                            <td>{{ station.arrivalTime }}</td>
                            <td>{{ station.departureTime }}</td>
                            <td>{{ station.dockingTime }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TrainInfo',
    data() {
        return {
            trainInfo: {},
            stations: []
        }
    },
    methods: {
        showTable() {
            const routeData = {
                routeSite: this.trainInfo.routeSite,
                routeTimeA: this.trainInfo.routeTimeA,
                routeTimeE: this.trainInfo.routeTimeE,
                dockingTimes: this.trainInfo.dockingTimes
            };

            const stations = routeData.routeSite.split(",");
            const arrivalTimes = routeData.routeTimeA.split(",");
            const departureTimes = routeData.routeTimeE.split(",");
            const dockingTimesArr = routeData.dockingTimes.split(",");

            const tableData = stations.map((station, index) => ({
                station,
                arrivalTime: arrivalTimes[index],
                departureTime: departureTimes[index],
                dockingTime: dockingTimesArr[index]
            }));
            this.stations = tableData
            console.log(tableData)
        },
    },
    created() {
        // 获取列车数据
        this.trainInfo = JSON.parse(localStorage.getItem('trainInfo'))
        this.showTable()
    },
    beforeCreate() {
        // 离开页面,删除数据
        // localStorage.removeItem('trainInfo')
    }
}
</script>

<style scoped>
.nav{
    margin-bottom: 10px;
}

.app {
    width: 800px;
    margin: 0 auto;
    overflow: hidden;
}

.baseInfo {
    margin-top: 60px;
    margin-bottom: 50px;
    font-size: 14px;
}

.train-info-table {
    width: 100%;
    border-collapse: collapse;
}

.train-info-table td {
    padding: 10px;
    border: 1px solid #ccc;
}

.train-info-table tr:nth-child(odd) {
    background-color: #f2f2f2;
}

.train-info-table tr:hover {
    background-color: #e0e0e0;
}

.table-container {
    /* margin: 20px; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 10px;
    text-align: left;
}

thead {
    background-color: #f1f1f1;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

tbody tr:hover {
    background-color: #e0e0e0;
}
</style>