<template>
  <div class="create">
    <p>Hello,world!</p>
    <p> {{ contents }}</p>
    <Input v-model="title" clearable size="large" placeholder="title" />
    <Input v-model="username" clearable size="large" placeholder="username" />
    <Input v-model="password" clearable size="large" placeholder="password" />
    <Input v-model="url" clearable size="large" placeholder="url" />
    <Input v-model="comments" clearable size="large" placeholder="comments" />
    <button @click="encrpytContents()">send</button>
    <p> {{ title }}</p>
    <p> {{ username }}</p>
    <p> {{ password }}</p>
    <p> {{ url }}</p>
    <p> {{ comments }}</p>


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
    };
  },
  methods: {
    test() {
      var obj = {
        title: "title",
        username: "username",
        password: "this.password",
        url: "this.url"
      };
      var myString = JSON.stringify(obj);
      this.mystring = myString;
    },
    encrpytContents (){
      // encrpyt the information by using the API
      var CryptoJS = require("crypto-js");
      var obj = {
        title: this.title,
        username: "poming",
        password: "123456",
        url: "http://google.com",
        comments:this.comments,
      };
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
