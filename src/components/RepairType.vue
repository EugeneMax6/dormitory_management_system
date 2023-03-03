<template>
    <div>
      <el-card shadow="hover" style=" width: 100%;height: 500px">
        <div id="repairType" style="width: 100%;height: 450px"></div>
      </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  name: "RepairType",
  data(){
    return{
      list:[],
      value1:[],
      value2:[]
    }
  },
  methods:{
    getData(){
      axios.get('/api/all/select_echart4').then(res=>{
        console.log(res.data)
        let tmp = null
        this.list = JSON.parse(JSON.stringify(res.data))
        for(let i=0;i<this.list.length;i++){
          if((this.list[i].Sorts === "其他")){
            tmp = this.list[i]
            continue
          }
          this.value1.push(this.list[i].Sorts)
          this.value2.push(this.list[i].value)
        }
        this.value1.push(tmp.Sorts)
        this.value2.push(tmp.value)
        this.getRepair()
      })

    },
    getRepair(){
      var chartDom = document.getElementById('repairType');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title:{
          text: '维修类型数据可视化',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.value1,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '报修数量',
            type: 'bar',
            barWidth: '60%',
            data: this.value2
          }
        ]
      };

      option && myChart.setOption(option);

    }
  },
  mounted() {
    setTimeout(()=>{
      this.getData()
    },500)
  }
}
</script>

<style scoped>

</style>