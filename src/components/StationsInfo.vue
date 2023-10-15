<template>
    <div class="app">
        <div class="nav">
            <v-breadcrumb>
                <v-breadcrumb-item>
                    <router-link to="/homeInfo">首页</router-link>
                </v-breadcrumb-item>
                <v-breadcrumb-item>
                    <a href="#">列车时刻表</a>
                </v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <h1><span>"{{ trains[0].startStation }} - </span> <span>{{ trains[0].arrivalStation }}"</span>列车时刻表查询</h1>
        <!-- <div class="table-container">
            <table>
                <thead>
                    <th @click="sort($event)">序号</th>
                    <th @click="sort($event)">车次</th>
                    <th @click="sort($event)">列车类型</th>
                    <th @click="sort($event)">始发站</th>
                    <th @click="sort($event)">终点站</th>
                    <th @click="sort($event)">出发站</th>
                    <th @click="sort($event)">发车时间</th>
                    <th @click="sort($event)">到达站</th>
                    <th @click="sort($event)">到达时间</th>
                    <th @click="sort($event)">耗时</th>
                </thead>
                <tbody>
                    <tr v-for="(train, index) in trains" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ train.trainNumber }}</td>
                        <td>{{ train.type }}</td>
                        <td>{{ train.departureStation }}</td>
                        <td>{{ train.terminal }}</td>
                        <td>{{ train.startStation }}</td>
                        <td>{{ train.startTime }}</td>
                        <td>{{ train.arrivalStation }}</td>
                        <td>{{ train.endTime }}</td>
                        <td>{{ train.tmpTime }}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        <div class="el_table">
            <el-table :data="trains" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
                <!-- <el-table-column type="index" label="序号" sortable>
                </el-table-column> -->
                <el-table-column prop="trainNumber" label="车次" sortable>
                </el-table-column>
                <el-table-column prop="type" label="列车类型" sortable>
                </el-table-column>
                <el-table-column prop="departureStation" sortable label="始发站">
                </el-table-column>
                <el-table-column prop="terminal" sortable label="终点站">
                </el-table-column>
                <el-table-column prop="startStation" sortable label="出发站">
                </el-table-column>
                <el-table-column prop="startTime" sortable label="发车时间">
                </el-table-column>
                <el-table-column prop="arrivalStation" sortable label="到达站">
                </el-table-column>
                <el-table-column prop="endTime" sortable label="到达时间">
                </el-table-column>
                <el-table-column prop="tmpTime" sortable label="耗时">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StationsInfo',
    data() {
        return {
            trains: [],
        }
    },
    methods: {
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        }
    },
    mounted() {
        // this.trains = JSON.parse(localStorage.getItem('trains'))
    },
    created() {
        // 初始化数据
        this.trains = JSON.parse(localStorage.getItem('trains'))
    }
}
</script>

<style scoped>

.nav{
    margin-bottom: 10px;
    margin-top: 60px;
}

h1 {
    font-size: 28px;
    color: #767272;
    text-align: center;
}

h1 span {
    font-size: 28px;
    color: #FC9000;
}

.app {
    width: 1000px;
    margin: 0 auto;
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