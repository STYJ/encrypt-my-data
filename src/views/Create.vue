<template>
  <div class="create">
    <p>Hello,world!</p>
    <p> {{ mystring }}</p>
    <input type="text" v-model="input">
    <button @click="test()">send</button>
    <Row>
        <Col span="12">
            <Input type="text" v-model="Title" clearable size="large" placeholder="title"/>
        </Col>
    </Row>
    <br>
    <Row>
      <Col span="12">
        <Input v-model="Username" clearable size="large" placeholder="username" />
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="12">
        <Input v-model="Password" clearable size="large" placeholder="password" />
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Input v-model="Comment" type="textarea" :rows="15" placeholder="Enter some comments..." />
      </Col>
    </Row>
    <br>
    <Row>
      <Col span=“8”>
        <Button
          type="info"
          @click="createRecord"
          ghost>
          Publish
        </Button>
      </Col>
      <Col span="8">
        <BalanceInfo ref="BalanceInfo" :address=address />
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Alert v-show="alertShow" closable>
          Submit success!
        </Alert>
      </Col>
    </Row>
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
        title: "title",
        username: "username",
        password: "this.password",
        url: "this.url"
      };
      var myString = JSON.stringify(obj);
      this.mystring = myString
      // Need to get the mypassword
      myPassword = this.getPassword();
      var contents = CryptoJS.AES.encrypt(myString, myPassword);
      this.contents = contents;
    },
    getPassword() {
      // get my password

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
