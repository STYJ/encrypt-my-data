<template>
  <div class="create">
    <v-layout v-if='imported' column fill-height>
      <v-flex xs12>
        <v-combobox
        v-model="title"
        label="Title"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-combobox
        v-model="username"
        label="Username"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-combobox
        v-model="password"
        label="Password"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-combobox
        v-model="url"
        label="Url"
        ></v-combobox>
      </v-flex>
      <v-flex xs12>
        <v-combobox
        v-model="memo"
        label="Any comments"
        ></v-combobox>
      </v-flex>
      <v-checkbox v-model="checkbox1" :label="`I'm sure that everything is correct.`"></v-checkbox>
      <v-bottom-sheet>
        <template v-slot:activator>
          <v-btn
          color="green"
          dark
          @click="createRecord()"
          >
          Submit
          </v-btn>
          <v-btn
          color="orange"
          dark
          @click="goBack()"
          >
          Cancel
          </v-btn>
        </template>
        <v-list>
          <v-subheader>Submission success</v-subheader>
        </v-list>
      </v-bottom-sheet>
      <v-alert
        :value="alertShow"
        type="info"
        style="margin-top: 40px"
        >
        Transaction success! The hash is {{ txHash }}.
      </v-alert>
      <v-alert
        :value="err"
        type="info"
        style="margin-top: 40px"
        >
        Transaction failed!
      </v-alert>
      <router-view></router-view>
    </v-layout>
    <v-alert
      :value="!imported"
      type="info"
      style="margin-top: 40px"
      >
      Please Import your seed first, before Getting your Secrets.
    </v-alert>




  </div>

</template>

<script>
import datapay from 'datapay';

export default {
  data () {
    console.log("hehe")
    return {
      //address:'1QkEz7sar8Z2rf9FrGsg9vqpcwv7CKko5',
      title:'',
      username:'',
      password:'',
      url:'',
      memo:'',
      contents: '',
      mystring: '',
      checkbox1: false,
      txHash:'',
      show_contents:[],
      alertShow:false,
      err: false,
    };
  },
  computed: {
    address() {
      return this.$store.getters.address;
    },
    privateKey() {
      return this.$store.getters.hdPrivateKey.toString();
    },
    imported() {
      return this.privateKey !== 'Not Connected';
    }
  },

  methods: {
    encrpytContents (){
      // encrpyt the information by using the API

      if (this.checkbox1 == false) {
        alert("You must check the checkbox!")
        return
      }

      var CryptoJS = require("crypto-js");
      var obj = {
        title: this.title,
        username: this.username,
        password: this.password,
        url: this.url,
        comments:this.memo,
      };
      //console.log(this.memo)
      this.show_contents = [this.title, this.username, this.password, this.url, this.memo];
      var myString = JSON.stringify(obj);
      this.mystring = myString
      //console.log(myString)
      // this.mystring = myString
      // Need to get the mypassword
      var myPassword = this.privateKey; // todo:
      //console.log(myPassword)
      var result = CryptoJS.AES.encrypt(myString, myPassword);
      //console.log(result.toString());
      //alert(result)
      this.contents = result.toString();
      // console.log(contents);
    },

    async createRecord() {
      var vm = this;
      if(this.title === '' || this.username === '' || this.password === '') {
          alert('Title, username or password cannot be null');
          return;
      }
      this.encrpytContents();
      console.log('encrypt success!')
      var config = {
        data: [this.address, this.contents],
        pay: {
          //key: this.privateKey, // private key
          key:this.privateKey,
          rpc: "https://api.bitindex.network",
        }
      };
      await datapay.send(config, function (err, res) {
          if(err){
            vm.err = true;
          }
          else {
            vm.txHash = res;
            vm.alertShow = true;
            setTimeout( function(){
              vm.goBack()
            },3000);
          }
        }
      );

    },

    goBack() {
      this.$router.push('/list');
    }
  },
};
</script>

<style lang="css" scoped></style>
