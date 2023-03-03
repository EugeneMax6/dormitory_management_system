<template>
  <div>
  <el-container>
    <el-header>
      <div class="nav">
        <ul>
          <li><a @click="show1 = true; show2 = false; show3 = false;"><i class="el-icon-user-solid"></i>个人首页</a></li>
          <li><a @click="show1 = false; show2 = true; show3 = false;"><i class="el-icon-user-solid"></i>维修员信息</a></li>
          <li><a @click="show1 = false; show2 = false; show3 = true;"><i class="el-icon-s-order"></i>维修记录</a></li>
        </ul>
      </div>
    </el-header>
  </el-container>
    <el-container>
      <el-main>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <changepw></changepw>
        </el-dialog>
        <el-divider content-position="right">
          <span>{{this.user.rname}} </span>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" size="mini" @click="dialogFormVisible = true">修改密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" size="mini" @click="exitLogin">退出登录</el-button>
        </el-divider>
        <transition name="el-fade-in-linear">
          <div id="repair1" v-show="show1" >
            <div style="width: 100%;height: 400px;margin-top: 20px">
              <repair-table></repair-table>
            </div>
            <div style="width: 100%;height: 500px;margin-top: 20px">
              <repair-type></repair-type>
            </div>
            <div style="width: 100%;height: 700px;margin-top: 20px">
              <stumap></stumap>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div id="repair2" v-show="show2" >
            <el-divider>以下是你的个人信息</el-divider>
            <div style="margin:20px">
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <div style="margin:20px">
                  <el-descriptions  direction="horizontal" :column="2" >
                    <el-descriptions-item label="姓名">{{user.rname}}</el-descriptions-item>
                    <el-descriptions-item label="工号">{{user.rno }}</el-descriptions-item>
                    <el-descriptions-item label="职称">{{user.title }}</el-descriptions-item>
                    <el-descriptions-item label="家庭住址">{{user.addr }}</el-descriptions-item>
                    <el-descriptions-item label="联系电话">{{user.tel }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </div>
            <el-divider>以下是维修员列表</el-divider>
            <div style="margin-left: 30px;margin-top: 10px">
              <el-table
                  :data="table1"
                  stripe
                  style="width: 100%">
                <el-table-column
                    prop="rno"
                    label="工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="rname"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="职称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="telephone"
                    label="联系电话"
                    width="180">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </transition>
        <el-drawer
            title="修改维修记录信息"
            size="50%"
            :visible.sync="drawer"
            :direction="direction">
          <div style="margin: 20px">
            <el-descriptions>
              <el-descriptions-item label="编号">
                <el-tag size="mini">{{tmp_repair.id}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="楼栋号">
                <el-tag size="mini">{{tmp_repair.bno}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="宿舍楼名">
                <el-tag size="mini">{{tmp_repair.bname}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="宿舍号">
                <el-tag size="mini">{{tmp_repair.rno}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="宿舍地址">
                <el-tag size="mini">{{tmp_repair.location}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="报修人">
                <el-tag size="mini">{{tmp_repair.sname}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="维修员编号">
                <el-tag size="mini">{{tmp_repair.rno}}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="维修员姓名">
                <el-tag size="mini">{{tmp_repair.rname}}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div style="margin: 20px">
            <el-form>
              <el-form-item label="故障详情">
                <el-input v-model="form1.info" style="width: 40%"></el-input>
              </el-form-item>
              <el-form-item label="维修状态">
                <el-select v-model="form1.rstatus" placeholder="请选择">
                  <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="margin-top: 40px">
              <el-divider content-position="left"><el-button type="primary" size="mini" @click="EditRepair">提交修改</el-button></el-divider>
            </div>
          </div>
        </el-drawer>
        <transition name="el-fade-in-linear">
          <div id="repair3" v-show="show3" >
            <el-divider><i class="el-icon-s-order"></i>下面是你的维修记录</el-divider>
            <div style="margin-left: 30px;margin-top: 10px">
              <el-table
                  :data="table2"
                  border
                  :default-sort = "{prop: 'id', order: 'ascending'}"
                  :row-class-name="tableRowClassName"
                  style="width: 100%"
                  ref="table">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-divider content-position="right">
                      <el-button  type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(props.$index,props.row)">修改</el-button>
                    </el-divider>
                    <div style="margin: 20px;display: block">
                      <el-descriptions>
                        <el-descriptions-item label="编号">
                          <el-tag size="mini">{{props.row.id}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="楼栋号">
                          <el-tag size="mini">{{props.row.bno}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="宿舍楼名">
                          <el-tag size="mini">{{props.row.bname}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="宿舍号">
                          <el-tag size="mini">{{props.row.rno}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="宿舍地址">
                          <el-tag size="mini">{{props.row.location}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="报修人">
                          <el-tag size="mini">{{props.row.sname}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="维修状态">
                          <el-tag size="mini">{{props.row.rstatus}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="维修员编号">
                          <el-tag size="mini">{{props.row.rno}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="维修员姓名">
                          <el-tag size="mini">{{props.row.rname}}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="故障详情">
                          {{props.row.info}}
                        </el-descriptions-item>
                      </el-descriptions>
                      <div class="block" style="display:inline-block;width: 60%;margin: 30px 300px 20px;">
                        <el-steps :active="sta(props.row.rstatus)">
                          <el-step title="待维修" icon="el-icon-s-check"></el-step>
                          <el-step title="维修中" icon="el-icon-help"></el-step>
                          <el-step title="已完成" icon="el-icon-success"></el-step>
                        </el-steps>
                        <div v-if="props.row.rstatus === '待维修'" style="margin-top: 20px">
                          <el-alert
                              title="待维修"
                              type="warning"
                              description="维修信息已提交，等待维修中！"
                              :closable="false"
                              show-icon>
                          </el-alert>
                        </div>
                        <div v-if="props.row.rstatus === '维修中'" style="margin-top: 20px">
                          <el-alert
                              title="维修中"
                              type="info"
                              description="维修信息已提交，正在维修中！"
                              :closable="false"
                              show-icon>
                          </el-alert>
                        </div>
                        <div v-if="props.row.rstatus === '已完成'" style="margin-top: 20px">
                          <el-alert
                              title="已结束"
                              type="success"
                              description="该维修已完成！"
                              :closable="false"
                              show-icon>
                          </el-alert>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="序号"
                    sortable
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="bno"
                    label="楼栋号"
                    sortable
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="bname"
                    label="楼栋名"
                    sortable
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="dno"
                    label="宿舍号"
                    sortable
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="rname"
                    label="维修员"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="rno"
                    label="维修员号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="sname"
                    label="报修人"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="rtime"
                    label="报修时间"
                    sortable
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="ftime"
                    label="完成时间"
                    sortable
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="location"
                    label="宿舍地址"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="info"
                    label="故障内容"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="rstatus"
                    label="维修状态"
                    sortable
                    width="120">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import qs from "qs";
import Changepw from "@/components/changepw";
import RepairTable from "@/components/RepairTable";
import RepairType from "@/components/RepairType";
import stumap from "@/components/stumap";

export default {
  name: "repair",
  components:{stumap,RepairType,RepairTable, Changepw},
  data(){
    return{
      options1:[
        {
          value:'待维修',
          label:'待维修'
        },
        {
          value:'维修中',
          label:'维修中'
        },
        {
          value:'已完成',
          label:'已完成'
        },
      ],
      form1:{
        id:0,
        info:'',
        rstatus:'',
      },
      drawer:false,
      direction:'rtl',
      show1:true,
      show2:false,
      show3:false,
      table1:[],
      table2:[],
      username:'',
      user:{
        rno:'',
        rname:'',
        addr:'',
        tel:'',
        title:'',
      },
      unrepair:0,
      tmp_repair:{},
      index:'',
      dialogFormVisible:false
    }
  },
  created() {
    this.username = sessionStorage.getItem('username')
    this.user.rno = this.username
    this.$axios.get('/api/repair/select_oneRepair_p/' + this.username).then((res => {
      this.user.tel = res.data.telephone
      this.user.rname = res.data.rname
      this.user.title = res.data.title
      this.user.addr = res.data.address
    }))
    this.$axios.get('/api/all/select_repair_p').then((res => {
      this.table1 = res.data
    }))
    this.$axios.get('/api/repair_p/select_repair_document_view2/' + this.user.rno ).then((res => {
      this.table2 = res.data
    }))
    this.$axios.get('/api/repair_p/getnumber_repair_document_view2/'+ this.user.rno).then((res => {
      this.unrepair = res.data
    }))
  },
  methods:{
    exitLogin(){
      sessionStorage.clear();
      localStorage.clear();
      this.$axios.post('/api/logout').then((res => {
        console.log(res)
        this.$router.push('/')
      }))
    },
    tableRowClassName(row) {
      if (row.row.rstatus === "待维修") {
        return 'waiting-row';
      } else if (row.row.rstatus === "已完成") {
        return 'success-row';
      }else if (row.row.rstatus === "维修中"){
        return 'going-row'
      }return 'none-row';
    },
    sta(stat){
      if (stat==="待维修") {
        return 1;
      }else if(stat === "维修中"){
        return 2;
      } else if (stat === "已完成") {
        return 3;
      } else{
        return null;
      }
    },
    handleEdit(index,row){
      this.drawer = true
      this.tmp_repair = row
      this.form1.rstatus = row.rstatus
      this.form1.info = row.info
      this.form1.id = row.id
      this.index = index
    },
    EditRepair(){
      this.$axios.post('/api/keeperAndRepair_p/update_repair_document',qs.stringify(this.form1)).then((res => {
        console.log(res)
        if(res.data === 1){
          this.$message({
            message:'修改成功',
            showClose: true,
            type: 'success',
            center: true
          });
          this.drawer = false
          this.table2[this.index].rstatus = this.form1.rstatus
          this.table2[this.index].info = this.form1.info
          setTimeout(()=>{
            this.$axios.get('/api/repair_p/select_repair_document_view2/' + this.user.rno ).then((res => {
              this.table2 = res.data
            }))
          },1500)
        }
        else{
          this.$message({
            message:'修改失败',
            showClose: true,
            type: 'error',
            center: true
          });
        }


      }))

    }
  },
  watch:{
    show3(newValue){
      if(newValue === true){
        this.$message({
          message:'有'+this.unrepair + '条维修记录未完成',
          type: 'warning',
          center: true
        });
      }
    }
  }
}
</script>

<style scoped>

.el-table >>> .going-row {
  background: rgba(	225,255,255,0.5)
}
.el-table >>> .success-row {
  background: rgba(	144,238,144,0.3)
}
.el-table >>> .waiting-row {
  background: rgba(	255,222,173,0.4);
}
.el-table >>> .none-row {
  background: rgba(	211,211,211,0.4);
}
.nav{
  position: absolute;
  display: inline-block;
  width: 98%;
  height: 80px;
  box-shadow:0 0 3px 2px #999;
}
.nav ul{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  margin: 0;
  padding: 0;
}
.nav ul li{
  list-style: none;
}
.nav ul li a{
  position: relative;
  display: block;
  text-align: center;
  margin: 0 25px;
  color:#262626;
  font-size: 20px;
  text-decoration: none;
  transition: .5s;
  padding:5px 10px;
}
.nav ul li a:before {
  content: '';
  position: absolute;
  bottom:0;
  left:0;
  width:12px;
  height: 12px;
  border: solid #e91e63;
  border-width: 0 0 3px 3px;
  transition: .5s;
  opacity: 0;
}

.nav ul li a:after {
  content: '';
  position: absolute;
  top:0;
  right: 0;
  width: 12px;
  height: 12px;
  border: solid #e91e63;
  border-width:3px 3px 0 0;
  transition: .5s;
  opacity: 0;
}
.nav ul li a:hover{
  color:#fff;
  background: #e91e63;
}
.nav ul li a:hover::before {
  left: -12px;
  bottom: -12px;
  opacity: 1;
}

.nav ul li a:hover::after {
  top: -12px;
  right: -12px;
  opacity: 1;
}
</style>