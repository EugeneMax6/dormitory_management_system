<template>
    <div>
      <el-card shadow="hover" style=" width: 100%;height: 400px">
        <div id="repairGraph" style="width: 100%;height: 380px"></div>
      </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  name: "RepairTable",
  data(){
    return{
      list:[],
      repair:[],
      sortTable:[]
    }
  },
  methods:{
    getData(){
      axios.get('/api/all/select_echart1').then(res=>{
        this.list = JSON.parse(JSON.stringify(res.data))
        for(let i=0;i<this.list.length;i++){
          this.repair.push([this.list[i].date,this.list[i].value])
          this.sortTable.push([parseInt(this.list[i].date.substring(0,4))*100 + parseInt(this.list[i].date.substring(5,7)),this.list[i].value])
        }
        this.sortTable.sort((a,b)=>{
          return a[0]-b[0]
        })
        this.getRepair()
      })

    },
    getRepair(){
      var chartDom = document.getElementById('repairGraph');
      var myChart = echarts.init(chartDom);
      var option;

      const dateList = this.sortTable.map(function (item) {
        return (item[0].toString().substring(0,4) + '-' + item[0].toString().substring(4,6)) ;
      });
//       const dateList = this.repair.map(function (item) {
//         return item[0];
//       });
      const valueList = this.sortTable.map(function (item) {
        return item[1];
      });
      option = {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 20
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList.length - 1
          }
        ],
        title: [
          {
            left: 'center',
            text: '全校每月提交的维修数量'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: dateList
          },
        ],
        yAxis: [
          {},
        ],
        grid: [
          {
            bottom: '20%'
          },
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: valueList
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