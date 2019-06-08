<template>
  <div class="create">
    <v-app>
      <!-- <v-navigation-drawer app></v-navigation-drawer> -->
      <v-toolbar app color="brown darken-4" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Create new record</v-toolbar-title>
        <v-btn flat>Menu</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat>SIGN IN</v-btn>
        <v-btn color="brown lighten-3">JOIN</v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center column fill-height/>
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
                color="purple"
                dark
                @click="createRecord()"
                >
                Submit
                </v-btn>
              </template>
              <v-list>
                <v-subheader>Submission success</v-subheader>
              </v-list>
            </v-bottom-sheet>
            <p>{{ txHash }}</p>
            <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>


  </div>

</template>

<script>
import datapay from 'datapay';
export default {
  data () {
    console.log("hehe")
    return {
      address:'1QkEz7sar8Z2rf9FrGsg9vqpcwv7CKko5',
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
    };
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
      console.log(this.memo)
      this.show_contents = [this.title, this.username, this.password, this.url, this.memo];
      var myString = JSON.stringify(obj);
      this.mystring = myString
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
      key = '';
      return key;
    },
    async createRecord() {
      var vm = this;
      if(this.title === '' || this.username === '' || this.password === '') {
          alert('Title, username or password cannot be null');
          return;
      }
      this.encrpytContents();
      console.log('encrypt success!')
      //var key = getPassword();
      var config = {
        data: [this.address, this.contents],
        pay: {
          key: '', // private key
          rpc: "https://api.bitindex.network",
        }
      };
      await datapay.send(config, function (err, res) {
        vm.txHash = res;
        vm.alertShow = true;

        var txHash = vm.txHash
        if(vm.alertShow){
          alert('Transaction success! Hash is '+ txHash);
          // console.log(res.toString());
        }
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
