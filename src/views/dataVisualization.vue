<template>
  <div class="fillcontain">
    <div class="head_style">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="font-size:20px;background:#FF9800">每日数据:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{dailyVisitData[0]}}</span>新增访问
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{dailyVisitData[1]}}</span>新增评论
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{dailyVisitData[2]}}</span>新增Star
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple" style="font-size:20px;background:#20A0FF;">总数据量:</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{allVisitData[0]}}</span>访问量
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{allVisitData[1]}}</span>评论数
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <span style="font-size:20px;font-weight:bold;">{{allVisitData[2]}}</span>Star
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="myChart" :style="{width: '100%', height: '80%'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dailyVisitData: [0, 0, 0],
      allVisitData: [0, 0, 0],
      dateList: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      visitsList: [0, 0, 0, 0, 0, 0, 0],
      commentsList: [0, 0, 0, 0, 0, 0, 0],
      starsList: [0, 0, 0, 0, 0, 0, 0]
    };
  },
  created: function() {
    //请求每日数据
    this.$axios.get("/admin/visitData/dailyData").then(resp => {
      if (resp.data.success) {
        var data = resp.data.data;
        this.dailyVisitData = [data.visits, data.comments, data.stars];
      }
    });
    //获取总数据
    this.$axios.get("/admin/visitData/allData").then(resp => {
      if (resp.data.success) {
        var data = resp.data.data;
        this.allVisitData = [data.visits, data.comments, data.stars];
      }
    });
  },
  mounted() {
    //获取历史七天数据,为了使趋势图等待获取数据后刷新，故写在挂载函数里
    this.$axios.get("/admin/visitData/sevenDaysData").then(resp => {
      if (resp.data.success) {
        var data = resp.data.data;
        data.reverse();
        var dateList = [];
        var visitsList = [];
        var commentsList = [];
        var starsList = [];
        for (var i = 0; i < 7; i++) {
          dateList.push(data[i].date);
          visitsList.push(data[i].visits);
          commentsList.push(data[i].comments);
          starsList.push(data[i].stars);
        }
        this.dateList = dateList;
        this.visitsList = visitsList;
        this.commentsList = commentsList;
        this.starsList = starsList;
        this.drawLine();
      }
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "流量趋势图·历史七天"
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
          data: this.dateList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "访问量",
            type: "line",
            data: this.visitsList
          },
          {
            name: "评论数",
            type: "line",
            data: this.commentsList
          },
          {
            name: "Star",
            type: "line",
            data: this.starsList
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