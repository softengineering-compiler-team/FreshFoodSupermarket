<template>
    <div class="small">
        <canvas :id="type+'profit'+'chart'" width="800px" height="400px"></canvas>
    </div>
</template>
<script>
import Chart from "chart.js";

export default {
  components: {},
  data() {
    return {
      data: {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: [""],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              xAxisID:0,
              yAxisID:0,
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              pointStrokeColor: "#fff",
              pointStyle: "crossRot",
              data: [65, 59, 1, 81, 56],
              cubicInterpolationMode: "monotone",
              spanGaps: "false",
              fill: "false"
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
        }]
    }
        }
      }
    };
  },
  mounted() {
    // var ctx2 = document.getElementById("myChart2");
    // var myChart2 = new Chart(ctx2, this.data);
  },
  props:[
    'type',
  ],
  methods: {},
  created:function(){
    console.log(this.type);
    
     this.axios
        .get(this.serverUrl+`/query/${this.type}profit`,this.headconfig)
        .then(res => {
          if(res.data.code==0){
              console.log(res.data.data);
              
            this.data.data.labels=[]
            this.data.data.datasets[0].data=[]
            for (let i = 0; i < res.data.data.length; i++) {
              this.data.data.labels.push(res.data.data[i].subType)
              this.data.data.datasets[0].data.push(res.data.data[i].total)
              
            }
            var ctx2 = document.getElementById(this.type+'profitchart');              
            var myChart2 = new Chart(ctx2, this.data);
          }
          else{
              this.$Message.error('获取信息失败');
          }
        })
        .catch(error => {
          this.$Message.error('获取信息失败');
          console.log(error)
          // this.errored = true
        })
  }
};
</script>
<style>
.small {
  width: 800px;
  height: 400px;
  text-align: center;
  margin: 0 auto;
}
</style>