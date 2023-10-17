<template>
    <div class="app">
        <div class="title">"<span>{{ trainNumberLike }}</span>"相关车次列车时刻查询</div>
        <el-table :data="trainInfo" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="trainNumber" label="车次" sortable>
                <template scope="scope">
                    <div style="cursor:pointer; color: rgb(231, 177, 60);" @click="turnToDetails(scope.row)">{{
                        scope.row.trainNumber }}</div>
                </template>
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
            <el-table-column prop="costTime" sortable label="全长时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import axios from '../js/axios';

export default {
    name: 'TrainLikeView',
    data() {
        return {
            trainInfo: [],
            trainNumber: '',
            trainNumberLike: '',
        }
    },
    methods: {
        turnToDetails(row) {
            console.log("test:", row)
            axios.get(`/train/getByNumber/${row.trainNumber}`).then(res => {

                localStorage.setItem('trainNumber', row.trainNumber)
                // 将后端返回的数据存入
                localStorage.setItem('trainInfo', JSON.stringify(res.data.data))
                this.$router.push("/trainInfo")
            })
        }
    },
    created() {
        this.trainInfo = JSON.parse(localStorage.getItem('trainsInfo'))
        this.trainNumberLike = localStorage.getItem('trainNumberLike')
    }
}
</script>

<style scoped>

.title{
    font-size: 26px;
    text-align: center;
    margin-top: 50px;
}

.title span{
    color: orange;
}

.app {
    width: 1000px;
}
</style>