<template>
  <div>
    <el-card shadow="hover" style="height: 300px;width: 450px">
      <div style="margin-left: 150px">
        <el-tag size="mini">各栋宿舍人数</el-tag>
      </div>
      <div id="bnostu" style="width: 400px;height: 280px"></div>
      <el-divider></el-divider>
    </el-card>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  name: "BnoStu",
  data(){
    return{
      list:[],
      blist:[],
    }
  },
  created() {
  },
  methods:{
    getData(){
      axios.get('/api/all/select_echart3').then(res=>{
        console.log(res.data)
        this.list = JSON.parse(JSON.stringify(res.data))
        for(let i=0;i<this.list.length;i++){
          this.blist.push({
            value:this.list[i].value,
            name:this.list[i].Bno
          })
        }
        console.log(this.blist)
        this.tableB()
      })
    },
    tableB(){
      var chartDom1 = document.getElementById('bnostu');
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
            name: '楼栋号',
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
            data: this.blist
          }
        ]
      };
      option1 && mapChart.setOption(option1);
    }
  },
  mounted() {
    setTimeout(()=>{
      this.getData()
    },500)
  },
}
</script>

<style scoped>

</style>