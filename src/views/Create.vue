<template>
  <div class="create">
    <p>Hello,world!</p>
    <p> {{ contents }}</p>

    <input type="text" v-model="title" placeholder="title">
    <input type="text" v-model="username" placeholder="username">
    <input type="text" v-model="password" placeholder="password">
    <input type="text" v-model="url" placeholder="url">
    <input type="text" v-model="comments" placeholder="comments">
    <button @click="encrpytContents()">send</button>
    <p>{{ show_contents }}</p>


  </div>

</template>

<script>
import bsv from 'bsv';
import datapay from 'datapay';
export default {
  data () {
    return {
      address:'1QkEz7sar8Z2rf9FrGsg9vqpcwv7CKko5',
      title:'',
      username:'',
      password:'',
      url:'',
      comments:'',
      contents: '',// todo, the type of the encrped contents,
      mystring: '',
      show_contents:[],
    };
  },
  methods: {
    encrpytContents (){
      // encrpyt the information by using the API
      var CryptoJS = require("crypto-js");
      var obj = {
        title: this.title,
        username: this.username,
        password: this.password,
        url: this.url,
        comments:this.comments,
      };
      this.show_contents = [this.title,this.username, this.password, this.url, this.comments];
      var myString = JSON.stringify(obj);
      console.log(myString)
      // this.mystring = myString
      // Need to get the mypassword
      var myPassword = 'L3ireqzmJB8V83XGAgWdsyZkSwCd5gjQRMubWEpeQpGa74RVwvmG';
      var result = CryptoJS.AES.encrypt(myString, myPassword);

      //console.log(result.toString());
      //alert(result)
      this.contents = result.toString();
      // console.log(contents);
    },
    getPassword() {
      // get mypassword
    },
    async createRecord() {
      var vm = this;
      if(this.title === '' || this.username === '' || this.password === '') {
          alert('title, username or password cannot be null');
          return;
      }
      this.encryptContents();
      var config = {
        data: [this.address, this.contents],
        pay: {
          key:'', // private key
          rpc: "https://api.bitindex.network",
        }
      };
      await datapay.send(config, function (err, res) {
        vm.alertShow = true;
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
