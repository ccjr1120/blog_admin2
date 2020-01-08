<template>
  <div class="fillcontain">
    <div class="head_style">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="font-size:20px;background:#FF9800">每日数据:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">121</span>新增访问
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">15</span>新增评论
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">14</span>新增Star
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="font-size:20px;background:#20A0FF;">总数据量:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">321</span>访问量
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">45</span>评论数
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">72</span>Star
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="myChart" :style="{width: '100%', height: '80%'}"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "流量趋势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["访问量", "评论数", "Star"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "访问量",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "评论数",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "Star",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scrope>
@import "../style/mixin";
.head_style {
  width: 100%;
  text-align: center;
  padding-left: 12%;
  margin-bottom: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>