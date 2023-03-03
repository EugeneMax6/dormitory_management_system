<template>
  <div>
    <el-card shadow="hover" style="height: 300px;width: 450px">
      <div style="margin-left: 150px">
        <el-tag size="mini">本专业男女比例</el-tag>
      </div>
      <div id="main" style="width: 400px;height: 280px"></div>
      <el-divider></el-divider>
    </el-card>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  name: "sex",
  data(){
    return{
      username:'',
      male:0,
      female:0,
    }
  },created() {
    this.username = sessionStorage.getItem('username')
  },
  mounted() {
    setTimeout(()=>{
      this.getData()
    },250)
  },
  methods:{
      getData() {
      axios.get('/api/student/getStudentNumberMale/' + this.username).then(res=>{
        this.male = res.data
      })
        axios.get('/api/student/getStudentNumberFemale/' + this.username).then(res=>{
          this.female = res.data
          setTimeout(()=>{
            this.tableD()
          },500)
        })
    },
    tableD(){
      var chartDom1 = document.getElementById('main');
      var mapChart = echarts.init(chartDom1);
      var option1;
      option1 = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.male, name: '男' },
              { value: this.female, name: '女' }
            ]
          }
        ]
      };
      option1 && mapChart.setOption(option1);
    }
  }
}
</script>

<style scoped>

</style>