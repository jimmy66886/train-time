<template>
  <div class="app">
    <h1>列车信息</h1>
    <button class="addButton" @click="handleAdd">添加</button>
    <!-- 修改酒店的弹框 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisibleAdd" width="50%">

      <el-form :model="addTrain">
        <el-divider content-position="left">基本信息</el-divider>

        <el-form-item label="车次信息">
          <el-input v-model="addTrain.trainNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列车类型">
          <el-input v-model="addTrain.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="始发站">
          <el-input v-model="addTrain.departureStation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="终点站">
          <el-input v-model="addTrain.terminal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="始发时间">
          <el-input v-model="addTrain.departureTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="到达时间">
          <el-input v-model="addTrain.arrivalTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-divider content-position="left">详细信息</el-divider>
        <el-form-item label="途径车站,以逗号隔开">
          <el-input v-model="addTrain.routeSite" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="途径车站到达时间,如无请填'---'">
          <el-input v-model="addTrain.routeTimeA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="途径车站发车时间,如无请填'---'">
          <el-input v-model="addTrain.routeTimeE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="耗时">
          <el-input v-model="addTrain.costTime" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addTrainMethod">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改酒店的弹框 -->
    <el-dialog title="更改信息" :visible.sync="dialogVisible" width="50%">

      <el-form :model="updateTrain">
        <el-divider content-position="left">基本信息</el-divider>

        <el-form-item label="车次信息">
          <el-input v-model="updateTrain.trainNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="列车类型">
          <el-input v-model="updateTrain.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="始发站">
          <el-input v-model="updateTrain.departureStation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="终点站">
          <el-input v-model="updateTrain.terminal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="始发时间">
          <el-input v-model="updateTrain.departureTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="到达时间">
          <el-input v-model="updateTrain.arrivalTime" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-divider content-position="left">详细信息</el-divider>
        <el-form-item label="途径车站">
          <el-input v-model="updateTrain.routeSite" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="途径车站到达时间">
          <el-input v-model="updateTrain.routeTimeA" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="途径车站发车时间">
          <el-input v-model="updateTrain.routeTimeE" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="耗时">
          <el-input v-model="updateTrain.costTime" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTrainMethod">确 定</el-button>
      </span>
    </el-dialog>

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
      <el-table-column prop="departureTime" sortable label="始发时间">
      </el-table-column>
      <el-table-column prop="arrivalTime" sortable label="到达时间">
      </el-table-column>
      <!-- <el-table-column prop="routeSite" sortable label="途径车站">
      </el-table-column>
      <el-table-column prop="routeTimeA" sortable label="途径车站的到达时间">
      </el-table-column>
      <el-table-column prop="routeTimeE" sortable label="途径车站的发车时间">
      </el-table-column> -->
      <el-table-column prop="costTime" sortable label="耗时">
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from '../js/axios'
export default {
  name: 'TrainManageView',
  data() {
    return {
      trains: [],
      updateTrain: {},
      dialogVisible: false,
      dialogVisibleAdd: false,
      addTrain: {},
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisibleAdd = true
    },
    addTrainMethod() {
      axios.post('/admin/train/add', this.addTrain).then(res => {
        if (res.data.code == 0) {
          this.$message.info(res.data.msg)
          return
        }
        this.$message.info('添加成功')
        this.dialogVisibleAdd = false
        this.flushTrainData()
      })
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      // 根据id查询
      console.log(row.id)
      axios.get(`/admin/train/getById/${row.id}`).then(res => {
        this.updateTrain = res.data.data
      }).catch(res => {
        this.$message.info('未知错误')
      })
    },
    updateTrainMethod() {
      axios.post('/admin/train/update', this.updateTrain).then(res => {
        if (res.data.code == 0) {
          this.$message.info(res.data.msg)
          return
        }
        this.$message.info('更改成功')
        this.dialogVisible = false
        this.flushTrainData()
      })
    },
    handleDelete(index, row) {

      this.$confirm('是否删除该列车信息?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(`/admin/train/delete/${row.id}`).then(res => {
          this.$message.success("删除成功")
          this.flushTrainData()
        }).catch(err => {
          this.$message.info(err.data.msg)
        })
      }).catch(() => {
        console.log("取消删除")
      });


    },
    flushTrainData() {
      axios.get('/admin/train/getAllTrain').then(res => {
        this.trains = res.data.data
      })
    }
  },
  created() {
    this.flushTrainData()
  }
}
</script>

<style>
.addButton {
  width: 56px;
  height: 28px;
  position: absolute;
  right: 35px;
  top: 60px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 3px;
}

.app {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

.app h1 {
  font-size: 26px;
  color: rgb(147, 149, 149);
  margin-top: 50px;
}
</style>