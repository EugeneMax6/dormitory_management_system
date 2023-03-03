<!-- 首页 -->
<template>
  <el-card shadow="hover" style="height: 800px;width: 100%;">
   <div class="box">
       <div ref='mapbox' class="mapbox">
       </div>
   </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import axios from "axios";
const option = {
    title:{
        text:"全校学生生源地数据可视化",
        subtext:'全校学生生源地 地图热力图可视化'
    },
    series:[{
        name:"人数",
        type:'map',
        map:'china',
        label:{
            show:true,
            color:'#000',
            fontSize:10
        },
        roam:true,
        zoom:1.2,
        emphasis:{
            label:{
                color:'#fff',
                fontSize:12
            },
            itemStyle:{
                areaColor:'#83b5e7'
            }
        }
    }],
    data:[],
    visualMap:[{
        type:'piecewise',
        show:true,
        pieces:[
            {min:100},
            {min:61,max:99},
            {min:31,max:60},
            {min:10,max:30},
            {min:1,max:9},
            {max:0}
        ],
        inRange:{
            symbol:'rect',
            color:['#eee','#9c0505']
        },
        itemWidth:20,
        itemHeight:10
    }],
    tooltip:{
        trigger:'item'
    },
    toolbox:{
        show:true,
        orient:'vertical',
        left:'right',
        top:'center',
        feature:{
            dataView:{readOnly:false},
            restore:{},
            saveAsImage:{}
        }
    }
};
export default {
    data () {
       return {
         list:[],
       };
    },

    components: {},
    mounted(){
        this.mychart = echarts.init(this.$refs.mapbox);
        this.mychart.setOption(option);
        this.getData();
        window.addEventListener('resize',()=>{
            this.mychart.resize()
        })
    },
    methods: {
        getData(){
          axios.get('/api/all/select_echart2').then(res=>{
            this.list = JSON.parse(JSON.stringify(res.data))
            option.series[0].data = this.list;
            this.mychart.setOption(option)
          })
        },
    }
}

</script>
<style>
.mapbox{
    height:700px;
    width:800px;
    margin:50px auto;
}
.box{
    display: flex
}
</style>