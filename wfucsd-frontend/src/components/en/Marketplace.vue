<template>
  <div>
    <div class="container">
      <div class="row col-sm-12 ">
        <div class="panel panel-info ">
          <div class="panel-heading  ">Announcement</div>
          <div class="panel-body ">
           This is a marketplace for warframe trading information. 
           <br>Please post your item,price and either wfid or contact infomation below, and enjoy the game!
          </div>
        </div>
      </div>
    </div>
    <!--item input-->
    <div class="panel panel-default">
      <div class="panel-heading ">
        Post your items
      <!--  <span class="glyphicon glyphicon-chevron-down pull-right"></span> -->
      </div>
      <div class="panel-body ">
        <form id="form" class="input-group col-md-9 col-md-offset-1  " v-on:submit.prevent="addItem">
          <div class="form-group col-sm-2">
            <input type="text" class="form-control" placeholder="itemName" v-model="newItemObj.itemName">
          </div>
          <div class="form-group col-sm-2">
            <input type="text" class="form-control" placeholder="itemPrice" v-model="newItemObj.itemPrice">
          </div>
          <div class="form-group col-sm-2">
            <input type="text" class="form-control" placeholder="Number" v-model="newItemObj.NumberOfItem">
          </div>
          <div class="form-group col-sm-2">
            <input type="text" class="form-control" placeholder="wfid" v-model="newItemObj.wfid">
          </div>
          <div class="form-group col-sm-3">
            <input type="text" class="form-control" placeholder="contact" v-model="newItemObj.contact">
          </div>
          <span class="input-group-btn col-sm-2">  <input type="submit" class="btn btn-primary" value="Add"></span>
        </form>
      </div>
    </div>
    <!--item list-->
    <div class="panel panel-default">
      <div class="panel-heading">Trade items list:</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Number</th>
            <th>warfarme Id</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td>{{item.itemName}}</td>
            <td>{{item.itemPrice}}</td>
            <td>{{item.NumberOfItem}}</td>
            <td>{{item.wfid}}</td>
            <td>{{item.contact}}</td>
            <td><span class="glyphicon glyphicon-trash" aria-hidden="true" v-on:click="removeItem(item)"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
  import toastr from 'toastr'
  import axios from 'axios'
  export default {
    name: 'MarketPlace',
    data() {
      return {
        newItemObj: {
          wfid: '',
          itemName: '',
          NumberOfItem: '',
          itemPrice: '',
          contact: ''
        },
        items:''
      }
    },
    methods: {
      addItem: function() {
        var self = this
        if (this.newItemObj.itemName && this.newItemObj.itemPrice && (this.newItemObj.wfid || this.newItemObj.contact)) {
          if (!this.newItemObj.NumberOfItem) {
            this.newItemObj.NumberOfItem = '1'
          }
          var submitItem = confirm('Please confirm your post: \n' + 'itemName: ' + this.newItemObj.itemName + '\n' +
            'itemPrice: ' + this.newItemObj.itemPrice + '\n' + 'NumberOfItem: ' + this.newItemObj.NumberOfItem + '\n' + 'wfid: ' + this.newItemObj.wfid +
            '\n' + 'contact: ' + this.newItemObj.contact + '\n')
          if (submitItem === true) {
            axios.post('http://127.0.0.1:9000/api/marketplacedb', self.newItemObj)
              .then(function(response) {
                toastr.success('Lottery Added successfully')
                self.getItems()
                self.newItemObj.wfid = ''
                self.newItemObj.itemName = ''
                self.newItemObj.itemPrice = ''
                self.newItemObj.NumberOfItem = ''
                self.newItemObj.wfid = ''
                self.newItemObj.contact = ''
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
        else{
          toastr.warning('Please input necessary information!')
        }
      },
      getItems:function(){
        axios.get(`http://localhost:9000/api/marketplacedb`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.items = response.data
          })
          .catch(e => {
            console.log(this.errors)
          })
      },
      removeItem: function(Item) {
        console.log(Item)
        axios.delete(`http://localhost:9000/api/marketplacedb/`+Item._id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.Item = response.data
             this.getItems()
          })
          .catch(e => {
            console.log(this.errors)
          })
        toastr.success('Item removed successfully')
      }
    },
  created:function(){
    this.getItems()
  }
  }
</script>

<style>
  .right-buffer {
    margin-right: 10px;
  }
</style>
