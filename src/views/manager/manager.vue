<template>
  <div>
    <el-container>
      <el-header>
        <div class="nav">
          <ul>
            <li><a @click="show1 = true; show2 = false; show3 = false;show4 = false;"><i class="el-icon-user-solid"></i>个人首页</a></li>
            <li><a @click="show1 = false; show2 = true; show3 = false;show4 = false;"><i class="el-icon-s-home"></i>宿舍信息</a></li>
            <li><a @click="show1 = false; show2 = false; show3 = true;show4 = false;"><i class="el-icon-school"></i>学生信息</a></li>
            <li><a @click="show1 = false; show2 = false; show3 = false;show4 = true;"><i class="el-icon-s-order"></i>维修信息</a></li>
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
          <span style="font-size:small "> {{user.Jname}} </span>
          <el-divider direction="vertical"></el-divider>
          <el-button type="success" size="mini" @click="dialogFormVisible = true">修改密码</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" size="mini" @click="exitLogin">退出登录</el-button>
        </el-divider>
        <transition name="el-fade-in-linear">
          <div id="manager1" v-show="show1" >
            <div style="width: 100%;height: 400px;margin-top: 20px">
              <repair-table></repair-table>
            </div>
            <div style="width: 100%;height: 500px;margin-top: 20px">
              <repair-type></repair-type>
            </div>
            <div style="width: 100%;height: 700px">
              <stumap></stumap>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div id="manager2" v-show="show2" >
            <el-divider> <i class="el-icon-search" style="font-size: large"></i><span style="font-size:large ">下面是你负责的<el-tag>{{user.Bno}}</el-tag>栋宿舍的信息</span></el-divider>
            <div style="margin:20px" >
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <div style="margin:20px">
                  <el-descriptions  direction="horizontal" :column="2" title="宿舍信息" >
                    <el-descriptions-item label="楼栋号">{{Dor.bno }}</el-descriptions-item>
                    <el-descriptions-item label="楼栋名称">{{Dor.bname }}</el-descriptions-item>
                    <el-descriptions-item label="宿舍类别">{{Dor.bsex }}生宿舍</el-descriptions-item>
                    <el-descriptions-item label="地址">{{Dor.location }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </div>
            <el-divider> <i class="el-icon-search" style="font-size: large"></i><span style="font-size:large ">下面是你负责的<el-tag>{{user.Bno}}</el-tag>栋宿舍的宿管信息，该栋共有<el-tag>{{manager.length+1}}</el-tag>位宿管</span></el-divider>
            <div style="margin:20px" >
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <div style="margin:20px">
                  <el-descriptions  direction="horizontal" :column="2" title="我的个人信息" >
                    <el-descriptions-item label="姓名">{{user.Jname}}</el-descriptions-item>
                    <el-descriptions-item label="工号">{{user.Jno }}</el-descriptions-item>
                    <el-descriptions-item label="负责楼栋号">{{user.Bno }}</el-descriptions-item>
                    <el-descriptions-item label="联系电话">{{user.telephone }}</el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </div>
            <div v-if="manager.length!== 0">
              <el-divider><span style="font-size:large "><el-tag>{{user.Bno}}</el-tag>栋宿舍的其他宿管信息</span></el-divider>
              <div style="margin:20px" v-for="(item) in manager" :key="item" >
                <el-card :body-style="{ padding: '0px'}" shadow="hover">
                  <div style="margin:20px">
                    <el-descriptions  direction="horizontal" :column="2"  >
                      <el-descriptions-item label="姓名">{{item.jname}}</el-descriptions-item>
                      <el-descriptions-item label="工号">{{item.jno }}</el-descriptions-item>
                      <el-descriptions-item label="负责楼栋号">{{item.bno }}</el-descriptions-item>
                      <el-descriptions-item label="联系电话">{{item.telephone }}</el-descriptions-item>
                    </el-descriptions>
                  </div>
                </el-card>
              </div>
            </div>
            <div v-if="manager.length === 0">
              <el-empty description="没有其他宿管了">
              </el-empty>
            </div>
            <el-drawer
                title="宿舍信息"
                size="50%"
                :visible.sync="drawer2"
                :direction="direction">
              <div style="margin: 20px;display: flow">
                <el-form>
                  <el-form-item>
                    <el-form-item>
                      <el-tag>楼栋号</el-tag>
                      <el-divider direction="vertical"></el-divider>
                      <el-input v-model="DorForm.bno" placeholder="请输入楼栋号" style="width: 30%"></el-input>
                      <el-divider direction="vertical"></el-divider>
                      <el-tag>宿舍号</el-tag>
                      <el-divider direction="vertical"></el-divider>
                      <el-input v-model="DorForm.dno"  placeholder="请输入宿舍号" style="width: 30%"></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form>
                    <el-form-item>
                      <el-tag>空位数量</el-tag>
                      <el-divider direction="vertical"></el-divider>
                      <el-input v-model="DorForm.remain"   style="width: 30%"></el-input>
                      <el-divider direction="vertical"></el-divider>
                      <el-tag>已有人数</el-tag>
                      <el-divider direction="vertical"></el-divider>
                      <el-input v-model="DorForm.people_use"  style="width: 30%"></el-input>
                      <el-divider direction="vertical"></el-divider>
                    </el-form-item>
                  </el-form>
                </el-form>
                <el-form>
                  <el-form-item label="宿舍类型">
                    <el-select v-model="DorForm.dtype" placeholder="请选择" :disabled="!insertD">
                      <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form>
                  <el-form-item>
                    <el-button type="primary" size="medium" @click="handleDor">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-drawer>
            <el-divider>
              <i class="el-icon-search" style="font-size: large"></i><span style="font-size:large ">下面是你负责的<el-tag>{{user.Bno}}</el-tag>栋宿舍列表</span>
              <el-divider direction="vertical"></el-divider>
              <el-button type="primary" size="mini" @click="insertDor">添加宿舍</el-button>
            </el-divider>
            <div style="margin-left: 5px;margin-top: 10px">
              <el-table
                  :data="Dortable"
                  stripe
                  :default-sort = "{prop: 'bno', order: 'ascending'}"
                  style="width: 100%">
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
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="dno"
                    label="宿舍号"
                    sortable
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="location"
                    label="地址"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="dtype"
                    label="宿舍类型"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="people_use"
                    label="已有人数"
                    sortable
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="remain"
                    label="剩余空位"
                    sortable
                    width="100">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template slot-scope="props">
                  <el-button size="mini" icon="el-icon-edit" type="success" @click="handleEditDor(props.row)">编辑</el-button>
                  <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDeleteDor(props.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
                background
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                layout="total, prev, pager, next, jumper"
                :total="listLen2">
            </el-pagination>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div id="manager3" v-show="show3" >
            <el-drawer
                title="学生信息"
                size="50%"
                :visible.sync="drawer1"
                :direction="direction">
              <div style="margin: 20px">
                <el-form>
                  <el-form-item>
                    <el-tag>学号</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.sno" placeholder="请输入学号" style="width: 40%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>姓名</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.sname"  placeholder="请输入姓名" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-tag>专业</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.sdept" placeholder="请输入专业名称" style="width: 40%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>电话</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.telephone"  placeholder="请输入联系电话" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-tag>性别</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <template>
                      <el-divider direction="vertical"></el-divider>
                      <el-radio v-model="formStu.ssex" label="男">男</el-radio>
                      <el-radio v-model="formStu.ssex" label="女">女</el-radio>
                    </template>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>宿舍号</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.dno"  placeholder="请输入宿舍号" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-tag>入学时间</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.entrytime" placeholder="请输入入学时间" style="width: 20%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>籍贯</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formStu.address"  placeholder="请输入籍贯" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="stuinfo">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-drawer>
            <el-divider>以下是你管理的学生信息</el-divider>
            <div style="margin-left: 30px;margin-top: 10px">
              <el-divider content-position="right">
                <el-button type="success" size="mini" @click="stuInsert"> 添加</el-button>
              </el-divider>
              <el-table
                  :data="student"
                  :default-sort = "{prop: 'dno', order: 'ascending'}"
                  stripe
                  style="width: 100%">
                <el-table-column
                    prop="sno"
                    label="学号"
                    sortable
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="sname"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="sdept"
                    sortable
                    label="专业"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="ssex"
                    label="性别"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="dno"
                    label="宿舍号"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="entrytime"
                    label="入学时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="籍贯"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="telephone"
                    label="联系电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                  <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleEditStudent(scope.$index,scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDeleteStudent(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 20px">
              <el-pagination
                  background
                  @current-change="handleCurrentChange1"
                  :current-page="currentPage1"
                  layout="total, prev, pager, next, jumper"
                  :total="listLen1">
              </el-pagination></div>
            </div>
          </div>
        </transition>
        <transition name="el-fade-in-linear">
          <div id="manager4" v-show="show4" >
            <el-drawer
                title="修改维修记录"
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
                  <el-descriptions-item label="故障类型">
                    <el-tag size="mini">{{tmp_repair.type}}</el-tag>
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
            <el-drawer
                title="维修员信息"
                size="50%"
                :visible.sync="drawerR"
                :direction="direction">
              <div style="margin: 20px">
                <el-form>
                  <el-form-item>
                    <el-tag>工号</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="repair.rno" placeholder="请输入维修员工号" style="width: 40%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>姓名</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="repair.rname"  placeholder="请输入维修员姓名" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-tag>职称</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="repair.title" placeholder="请输入维修员职称" style="width: 20%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>电话</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="repair.telephone"  placeholder="请输入联系电话" style="width: 40%"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭住址">
                    <el-input v-model="repair.address"  placeholder="请输入地址" style="width: 40%"></el-input>
                  </el-form-item>
                </el-form>
                <div style="margin-top: 40px">
                  <el-divider content-position="left"><el-button type="primary" size="mini" @click="handleRepair">提交</el-button></el-divider>
                </div>
              </div>
            </el-drawer>
            <el-drawer
                title="添加维修记录"
                size="50%"
                :visible.sync="drawerRD"
                :direction="direction">
              <div style="margin: 20px">
                <el-form>
                  <el-form-item>
                    <el-tag>宿舍号</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formRD.dno" placeholder="请输入宿舍号" style="width: 40%"></el-input>
                    <el-divider direction="vertical"></el-divider>
                    <el-tag>申报人学号</el-tag>
                    <el-divider direction="vertical"></el-divider>
                    <el-input v-model="formRD.sno"  placeholder="请输入申报人的学号" style="width: 30%"></el-input>
                  </el-form-item>
                  <el-form-item label="维修员" required>
                    <el-select v-model="formRD.rno" placeholder="请选择">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="故障详情" required>
                    <el-input v-model="formRD.info"  style="width: 40%"></el-input>
                  </el-form-item>
                </el-form>
                <div style="margin-top: 40px">
                  <el-divider content-position="left"><el-button type="primary" size="mini" @click="handleInsertRD">提交</el-button></el-divider>
                </div>
              </div>
            </el-drawer>
            <el-divider><i class="el-icon-s-tools" style="font-size: large"></i><span style="font-size: large">以下是维修员列表</span></el-divider>
            <div style="margin-left: 30px;margin-top: 10px;">
              <el-table
                  :data="repair_p"
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
                <el-table-column
                    prop="address"
                    label="家庭住址"
                    width="180">
                </el-table-column>
                <el-table-column
                    width="300px"
                    align="right">
                  <template slot="header">
                    <el-button type="primary" size="mini" @click="insertRepair">添加维修员</el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEditR(scope.$index, scope.row)">修改</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteR(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-divider><i class="el-icon-s-order" style="font-size: large">
            </i><span style="font-size: large">维修记录</span>
              <el-divider direction="vertical"></el-divider>
              <el-button type="primary" size="mini" @click="insertRD">添加记录</el-button>
            </el-divider>
            <div id="tableRepair" style=" margin-top: 2px;margin-left: 20px">
              <el-table
                  :data="repairList"
                  max-height="1000px"
                  row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  :row-class-name="tableRowClassName"
                  style="width: 100%"
                  ref="table">
                  <el-table-column type="expand">
                  <template slot-scope="props">
                    <div style="margin: 20px;display: block">
                      <el-divider content-position="right">
                        <el-button  type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(props.row)">修改</el-button>
                        <el-button  type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(props.$index,props.row)">删除</el-button>
                      </el-divider>
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
                    label="编号"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="bno"
                    label="楼栋号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="dno"
                    label="宿舍号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="location"
                    label="宿舍地址"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="info"
                    label="故障明细"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="rno"
                    label="维修员编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="rstatus"
                    label="维修状态"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="rtime"
                    label="报修日期"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="ftime"
                    label="完成日期"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="sname"
                    label="报修人"
                    width="120">
                </el-table-column>
              </el-table>
              <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="total, prev, pager, next, jumper"
                  :total="listLen">
              </el-pagination>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
import Changepw from "@/components/changepw";
import RepairTable from "@/components/RepairTable";
import RepairType from "@/components/RepairType";
import stumap from "@/components/stumap";

export default {
  name: "manager",
  components:{ stumap,RepairType,RepairTable, Changepw},
  data(){
    return{
      drawer:false,
      drawer1:false,
      drawer2:false,
      drawerR:false,
      drawerRD:false,
      direction:'rtl',
      currentPage: 1,
      currentIndex: '',
      pagesize: 7,
      show1:true,
      show2:false,
      show3:false,
      show4:false,
      username:'',
      user:{
        Jno:'',
        Jname:'',
        telephone:'',
        Bno:'',
      },
      Dor:{
        bno:'',
        bname:'',
        bsex:'',
        location:'',
      },
      form1:{
        id:0,
        info:'',
        rstatus:'',
      },
      options:[],
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
      options2:[
        {
          value:'四人寝室',
          label:'四人寝室'
        },
        {
          value:'六人寝室',
          label:'六人寝室'
        },
      ],
      student:[],
      Dortable:[],
      manager:[],
      listLen:0,
      listLen1:0,
      listLen2:0,
      currentPage1:1,
      currentPage2:1,
      repairList:[],
      repair_p:[],
      repair:{
        rno:'',
        rname:'',
        telephone:'',
        address: '',
        title:''
      },
      tmp_repair:{},
      studentindex:0,
      formStu:{
        sno:'',
        sname:'',
        ssex:'',
        sdept:'',
        telephone: '',
        entrytime: '',
        address:'',
        dno:''
      },
      insertStu:false,
      DorForm:{
        bno:'',
        dno:'',
        people_use: 0,
        remain:null,
        dtype:'',
      },
      insertD:false,
      insertR:false,
      formRD:{
        dno:'',
        info:'',
        sno:'',
        rno:''
      },
      dialogFormVisible:false
    }
  },

  created() {
    this.username = sessionStorage.getItem('username')
    this.user.Jno = this.username
    this.$axios.get('/api/keeper/select_building/'+ this.username).then((res => {
      this.Dor = res.data
    }))
    this.$axios.get('/api/keeper/select_dormitory_view/?Jno='+ this.username + '&page=1').then((res => {
      this.Dortable = res.data
    }))
    this.$axios.get('/api/keeper/select_keeper1/'+ this.username).then((res => {
      for(let i = 0 ;i<res.data.length;i++){
        if(res.data[i].jno !== this.user.Jno){
          this.manager.push(res.data[i])
        }else{
          this.user.Bno = res.data[i].bno
          this.user.Jname = res.data[i].jname
          this.user.telephone = res.data[i].telephone
        }
      }
    }))
    this.$axios.get('/api/all/select_repair_p').then((res => {
      this.repair_p = res.data
      for(let i = 0;i< res.data.length;i++){
        var obj = new Object()
        obj.label = res.data[i].rname + '-' + res.data[i].title
        obj.value = res.data[i].rno
        this.options.push(obj)
      }


    }))
    this.$axios.get('/api/keeper/select_repair_document/?Jno='+ this.username + '&page=1').then((res => {
      this.repairList = JSON.parse(JSON.stringify(res.data))
    }))
    this.$axios.get('/api/keeper/getnumber_repair_document/'+ this.username ).then((res => {
      this.listLen = res.data
    }))
    this.$axios.get('/api/keeper/select_student/?Jno='+ this.username + '&page=1').then((res => {
      this.student = res.data
    }))
    this.$axios.get('/api/keeper/getnumber_student/'+ this.username ).then((res => {
      this.listLen1 = res.data
    }))
    this.$axios.get('/api/keeper/getNumberDormitory/'+ this.username ).then((res => {
      this.listLen2 = res.data
    }))
  },
  methods:{
    exitLogin() {
      sessionStorage.clear();
      localStorage.clear();
      this.$axios.post('/api/logout').then((res => {
        console.log(res)
        this.$router.push('/')
      }))
    },
    tableRowClassName(row) {
      if (row.row.rstatus==="待维修") {
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
    handleCurrentChange(val) {
      this.currentPage= val
      this.currentPage= val
      this.$axios.get('/api/keeper/select_repair_document/?Jno='+ this.user.Jno + '&page=' + val).then((res => {
        this.repairList = JSON.parse(JSON.stringify(res.data))
      }))
    },
    handleCurrentChange1(val) {
      this.currentPage1= val
      this.$axios.get('/api/keeper/select_student/?Jno='+ this.user.Jno + '&page=' + val).then((res => {
        this.student = JSON.parse(JSON.stringify(res.data))
      }))
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
      this.$axios.get('/api/keeper/select_dormitory_view/?Jno='+ this.username + '&page=' + val).then((res => {
        this.Dortable = JSON.parse(JSON.stringify(res.data))
      }))
    },
    handleEditStudent(index,row){
      console.log(index)
      console.log(row)
      this.drawer1 = true
      this.insertStu = false
      this.formStu.sno = row.sno
      this.formStu.sname = row.sname
      this.formStu.ssex = row.ssex
      this.formStu.sdept = row.sdept
      this.formStu.telephone = row.telephone
      this.formStu.entrytime = row.entrytime
      this.formStu.address = row.address
      this.formStu.dno = row.dno
    },
    stuinfo(){
      if(this.insertStu === true){
       console.log(this.formStu)
        this.$axios.post('/api/keeper/insert_student',qs.stringify(this.formStu)).then((res => {
            if(res.data === 1){
              this.$message({
                message:'添加成功',
                showClose: true,
                type: 'success',
                center: true
              });
              setTimeout(()=>{
                this.handleCurrentChange1(this.currentPage1)
              },1500)
              this.drawer1 = false
            }
          else{
            this.$message({
              message:'添加失败',
              showClose: true,
              type: 'error',
              center: true
            });
          }
        }))
      }else{
        this.$axios.post('/api/keeper/update_student',qs.stringify(this.formStu)).then((res => {
          if(res.data === 1){
            this.$message({
              message:'修改成功',
              type: 'success',
              showClose: true,
              center: true
            });
            setTimeout(()=>{
              this.handleCurrentChange1(this.currentPage1)
            },1500)
            this.drawer1 = false
          }
          else{
            this.$message({
              message:'修改失败',
              type: 'error',
              showClose: true,
              center: true
            });
          }
        }))
      }
    },
    handleDeleteStudent(index,row){
      axios.get('/api/keeper/delete_student/' + row.sno).then((res => {
        if(res.data === 1){
          this.$message({
            message:'删除成功',
            type: 'success',
            showClose: true,
            center: true
          });
          this.student.splice(index,1)
        }
        else{
          this.$message({
            message:'删除失败',
            type: 'error',
            showClose: true,
            center: true
          });
        }
      }))
    },
    stuInsert(){
      this.insertStu = true
      this.drawer1 = true
      this.formStu.sno = ''
      this.formStu.sname = ''
      this.formStu.ssex =  '男'
      this.formStu.sdept =  ''
      this.formStu.telephone =  ''
      this.formStu.entrytime = ''
      this.formStu.address = ''
      this.formStu.dno = ''
    },
    handleEdit(row){
      this.drawer = true
      this.tmp_repair = row
      this.form1.rstatus = row.rstatus
      this.form1.info = row.info
      this.form1.id = row.id
    },
    EditRepair(){
      this.$axios.post('/api/keeperAndRepair_p/update_repair_document/',qs.stringify(this.form1)).then((res => {
        if(res.data === 1){
          this.$message({
            message:'修改成功',
            showClose: true,
            type: 'success',
            center: true
          });
          this.drawer = false
          setTimeout(()=>{
            this.handleCurrentChange(this.currentPage)
          },1500)
        }
        else{
          this.$message({
            message:'修改失败',
            type: 'error',
            showClose: true,
            center: true
          });
        }
      }))
    },
    handleDelete(index,row){
      console.log(this.repairList)
      this.$axios.get('/api/keeper/delete_repair_document/' + row.id).then((res => {
        if(res.data === 1){
          this.$message({
            message:'删除成功',
            showClose: true,
            type: 'success',
            center: true
          });
          this.repairList.splice(index,1)
        }
        else{
          this.$message({
            message:'删除失败',
            type: 'error',
            showClose: true,
            center: true
          });
        }
      }))
    },
    insertDor(){
      this.insertD = true
      this.drawer2 = true
      this.DorForm.dno = ''
      this.DorForm.bno = ''
      this.DorForm.dtype = ''
      this.DorForm.remain = null
      this.DorForm.people_use = 0
    },
    handleEditDor(row){
      console.log(row.dtype)
      this.insertD = false
      this.drawer2 = true
      this.DorForm.dno = row.dno
      this.DorForm.bno = row.bno
      this.DorForm.dtype = row.dtype
      this.DorForm.remain = row.remain
      this.DorForm.people_use = row.people_use
    },
    handleDor(){
      console.log(this.DorForm)
      if(this.insertD === true){
        this.$axios.post('/api/keeper/insert_dormitory',qs.stringify(this.DorForm)).then((res => {
          if(res.data === 1){
            this.$message({
              message:'添加成功',
              showClose: true,
              type: 'success',
              center: true
            });
            setTimeout(()=>{
              this.handleCurrentChange2(this.currentPage2)
            },1500)
            this.drawer2 = false
          }
          else{
            this.$message({
              message:'添加失败',
              showClose: true,
              type: 'error',
              center: true
            });
          }
        }))
      }else{
        this.$axios.post('/api/keeper/update_dormitory',qs.stringify(this.DorForm)).then((res => {
          if(res.data === 1){
            this.$message({
              message:'修改成功',
              showClose: true,
              type: 'success',
              center: true
            });
            setTimeout(()=>{
              this.handleCurrentChange2(this.currentPage2)
            },1500)
            this.drawer2 = false
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
    handleDeleteDor(row){
      this.$axios.get('/api/keeper/delete_dormitory/' + row.dno).then((res => {
        console.log(res.data)
        if(res.data === 1){
          this.$message({
            message:'删除成功',
            showClose: true,
            type: 'success',
            center: true
          });
          setTimeout(()=>{
            this.handleCurrentChange2(this.currentPage2)
          },1500)
          this.drawer2 = false
        }
        else{
          this.$message({
            message:'删除失败',
            showClose: true,
            type: 'error',
            center: true
          });
        }
      }))
    },
    handleEditR(index,row){
      this.insertR = false
      this.repair.rno = row.rno
      this.repair.address = row.address
      this.repair.rname = row.rname
      this.repair.telephone = row.telephone
      this.repair.title = row.title
      this.drawerR = true
      console.log(index,row)

    },
    handleDeleteR(index,row){
      console.log(index)
      this.$axios.get('/api/keeper/repair_document/' + row.id).then((res => {
        console.log(res.data)
        if(res.data === 1){
          this.$message({
            message:'删除成功',
            showClose: true,
            type: 'success',
            center: true
          });
          setTimeout(()=>{
            this.handleCurrentChange2(this.currentPage2)
          },1500)
          this.drawer2 = false
        }
        else{
          this.$message({
            message:'删除失败',
            showClose: true,
            type: 'error',
            center: true
          });
        }
      }))
    },
    insertRepair(){
      this.insertR = true
      this.repair.rno = ''
      this.repair.address = ''
      this.repair.rname = ''
      this.repair.telephone = ''
      this.repair.title = ''
      this.drawerR = true
    },
    handleRepair(){
      if(this.insertR === true){
        this.$axios.post('/api/keeper/insert_repair_p',qs.stringify(this.repair)).then((res => {
          if(res.data === 1){
            this.$message({
              message:'添加成功',
              showClose: true,
              type: 'success',
              center: true
            });
            setTimeout(()=>{
              this.$axios.get('/api/all/select_repair_p/').then((res => {
                this.repair_p = res.data
              }))
            },1500)
            this.drawerR = false
          }
          else{
            this.$message({
              message:'添加失败',
              showClose: true,
              type: 'error',
              center: true
            });
          }
        }))
      }else{
        this.$axios.post('/api/keeper/update_repair_p',qs.stringify(this.repair)).then((res => {
          if(res.data === 1){
            this.$message({
              message:'修改成功',
              showClose: true,
              type: 'success',
              center: true
            });
            setTimeout(()=>{
              this.$axios.get('/api/all/select_repair_p/').then((res => {
                this.repair_p = res.data
              }))
            },1500)
            this.drawerR = false
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
    insertRD(){
      this.drawerRD = true;
    },
    handleInsertRD(){
      this.$axios.post('/api/keeperAndStudent/insert_repair_document',qs.stringify(this.formRD)).then((res => {
        if(res.data === 1){
          this.$message({
            message:'添加成功',
            showClose: true,
            type: 'success',
            center: true
          });
          setTimeout(()=>{
            this.handleCurrentChange(this.currentPage)
          },1500)
          this.drawerRD = false
        }
        else{
          this.$message({
            message:'添加失败',
            showClose: true,
            type: 'error',
            center: true
          });
        }
      }))
    }
  },

}
</script>

<style scoped>
el-table-column {
  text-align: center;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand >>> .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

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
  background: rgba(		211,211,211,0.4);
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