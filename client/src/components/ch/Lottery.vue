<template>
  <div>
    <!-- prize-->
    <div class="container">
      <div class="row col-sm-12 " v-if="showTimeLeft">
        <div class="panel panel-info ">
          <div class="panel-heading  ">奖品</div>
          <div class="panel-body ">
            <ol>
              <li>{{prize1}}</li>
                <li>{{prize2}}</li>
                <li>{{prize3}}</li>
                <li>{{prize4}}</li>
                <li>{{prize5}}</li>
            </ol>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row col-sm-5 ">
          <div class="panel panel-info ">
            <div class="panel-heading  ">奖品</div>
            <div class="panel-body ">
              <ol>
                <li>{{prize1}}</li>
                <li>{{prize2}}</li>
                <li>{{prize3}}</li>
                <li>{{prize4}}</li>
                <li>{{prize5}}</li>
              </ol>
            </div>
          </div>
        </div>
        <!-- Winners-->
        <div class="row col-sm-5 col-sm-offset-2 ">
          <div class="panel panel-info ">
            <div class="panel-heading  ">中奖名单</div>
            <div class="panel-body">
              <ol>
                <li v-for="(winner,index) in winners" v-if="index<5">{{winner.wfid}}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- show Info before event-->
    <div class="panel panel-info " v-if="eventState==0">
      <div class="panel-heading ">新一期的活动时间为 <span style="color:red"> {{eventStartTime}} </span> 到 <span style="color:red"> {{eventEndTime}} </span>。</div>
    </div>
    <!-- Timeleft-->
    <div class="panel panel-info " v-if="eventState==1">
      <div class="panel-heading ">活动剩余时间: <span style="color:red"> {{timeLeft}} </span></div>
    </div>
    <!-- Lucky Number-->
    <div class="panel panel-info" v-if="eventState==2">
      <div class="panel-heading ">本期幸运数字: <span style="color:red"> 
                      <tr v-for="(number,index) in luckyNumber" v-if="index<1">
                            <td>{{number.luckyNumber}}</td>
                      </tr>
                      </span></div>
    </div>
    <!--get start-->
    <div class="panel panel-default">
      <div class="panel-heading ">开始抽奖</div>
      <div class="panel-body ">
        <form id="form" class="input-group  col-sm-8 col-sm-offset-2 " v-on:submit.prevent="addLottery" >
          <span class="input-group-addon" id="basic-addon1">@</span>
          <div class="form-group ">
            <input type="text" class="form-control" placeholder="warframe Id" v-model="newlotteryObj.wfid">
          </div>
          <span class="input-group-btn">  <input type="submit" class="btn btn-default" value="Go!"></span>
        </form>
      </div>
    </div>
    <!--Participator list-->
    <div class="panel panel-default">
      <div class="panel-heading">参与者名单</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>warframe Id</th>
            <th>抽奖号码</th>
            <th v-if="showTimeLeft==false">差值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lottery in this.lotteries">
            <td>{{lottery.wfid}}</td>
            <td>{{lottery.lotteryKey}}</td>
            <!--
              <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeLottery(lottery)"></span></td>
              -->
            <td v-if="showTimeLeft==false"><span>{{lottery.diff}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import toastr from 'toastr'
  import axios from 'axios'
  import hostconfig from '../../../../hostconfig.json'
  export default {
    data() {
      return {
        newlotteryObj: {
          wfid: '',
          lotteryKey: ''
        },
        lotteries:null,
        prize1:'',
        prize2:'',
        prize3:'',
        prize4:'',
        prize5:'',
        timeLeft: '',
        luckyNumber: 0,
        winners:[],
        distance: 0,
        showTimeLeft: true,
        eventState:0,
        eventStartTime:"",
        eventEndTime:""
      }
    },
    methods: {
      addLottery: function() {
        var self=this
        if (this.eventState===2) {
       //  toastr.warning('Lottery event has already passed. Please come back early next time!')
         toastr.warning('本期抽奖活动已经结束，尽请关注下次活动信息！')
          return
        }
        if (this.eventState===0) {
       //  toastr.warning('Event has not start yet, please come back later!')
         toastr.warning('抽奖活动还没开始，请稍后回来！')
          return
        }
        if (this.eventState===1) {
       // var submitLottery = confirm('Please confirm your warframe Id. If the warframe Id is not correct, this lottery will not count!')
        var submitLottery = confirm('重复投票，ID不正确或者非氏族成员，抽奖结果将被视为作废处理！请确认你的 warframe Id：'+ this.newlotteryObj.wfid)
        if (submitLottery === true && this.newlotteryObj.wfid) {
          this.newlotteryObj.lotteryKey = Math.floor((Math.random() * 1000) + 1)
          axios.post('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/lotteries',  self.newlotteryObj)
            .then(function(response) {
              toastr.success('奖票添加成功,感谢您的参与!')
              self.getlotteries()
              self.newlotteryObj.wfid=''
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
      },
      getlotteries: function (){
        axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/lotteries')
        
          .then(response => {
            // JSON responses are automatically parsed.
            this.lotteries = response.data
          })
          .catch(e => {
            console.log(this.errors)
          })
      },
      getWinner:function (){
        axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/winners')
          .then(response => {
            // JSON responses are automatically parsed.
            this.winners = response.data
          })
          .catch(e => {
            console.log(this.errors)
          })
      },

      getLuckyNumber: function() {
         axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/luckynumberdb')
          .then(response => {
            // JSON responses are automatically parsed.
            this.luckyNumber = response.data
          })
          .catch(e => {
            console.log(this.errors)
          })
      },
      getPrize: function() {
         axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/eventdata')
          .then(response => {
            // JSON responses are automatically parsed.
            this.prize1 = response.data.prize1
            this.prize2 = response.data.prize2
            this.prize3 = response.data.prize3
            this.prize4 = response.data.prize4
            this.prize5 = response.data.prize5
            this.eventStartTime=response.data.eventStartTime
            this.eventEndTime=response.data.eventEndTime
          })
          .catch(e => {
            console.log(this.errors)
          })
      },
      getTime: function() {
        axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/eventdata/countdown')
          .then(response => {
            // JSON responses are automatically parsed.
            this.distance = response.data.countdown
          })
          .catch(e => {
            console.log(this.errors)
          })
      },
      getEventState:function(){
        axios.get('http://'+hostconfig.hostip+':'+ hostconfig.hostport+'/api/eventdata/state')
          .then(response => {
            // JSON responses are automatically parsed.
            this.eventState = response.data.state
          })
          .catch(e => {
            console.log(this.errors)
          })
      }
    },
    watch: {
       showTimeLeft: {
         handler: function() {
           this.getLuckyNumber()
           this.getWinner()
         }
       }
    },
    created: function() {
      var vm = this
      this.getEventState()
      this.getPrize()
      this.getTime()
      this.getlotteries()
      this.getWinner()
      this.getLuckyNumber()
      vm.distance = this.distance
      setInterval(function() {
        var days = Math.floor(vm.distance / (1000 * 60 * 60 * 24))
        var hours = Math.floor((vm.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var minutes = Math.floor((vm.distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((vm.distance % (1000 * 60)) / 1000)
        if (vm.distance > 0) {
          vm.timeLeft = (days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ')
          vm.showTimeLeft = true
        } else {
          vm.showTimeLeft = false
        }
        vm.distance = vm.distance - 1000
      }, 1000)
      return vm.timeLeft
    }
  }
</script>

<style>
  .right-buffer {
    margin-right: 10px;
  }
</style>


