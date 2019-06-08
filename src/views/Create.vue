<template>
  <div class="create">
    <v-app>
      <v-navigation-drawer app></v-navigation-drawer>
      <v-toolbar app color="brown darken-4" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Create new record</v-toolbar-title>
        <v-btn flat>Menu</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat>SIGN IN</v-btn>
        <v-btn color="brown lighten-3">JOIN</v-btn>
      </v-toolbar&gt;&lt;/template>
      <v-content>
        <v-container fluid>
          <v-layout align-center justify-center column fill-height/>
            <v-flex xs12>
              <v-combobox
              v-model="title"
              :items="items"
              label="Title"
              ></v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-combobox
              v-model="username"
              :items="items"
              label="Username"
              ></v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-combobox
              v-model="password"
              :items="items"
              label="Password"
              ></v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-combobox
              v-model="url"
              :items="items"
              label="Url"
              ></v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-combobox
              v-model="comments"
              :items="items"
              label="Any comments"
              ></v-combobox>
            </v-flex>
          <p> {{ contents }}</p>
          <v-bottom-sheet v-model="sheet">
            <template v-slot:activator>
              <v-btn
              color="purple"
              dark
              @click="encrpytContents()"
              >
              Submit
              </v-btn>
            </template>
            <v-list>
              <v-subheader>Open in</v-subheader>
              <v-list-tile
                v-for="tile in tiles"
                :key="tile.title"
                @click="sheet = false"
                >
                <v-list-tile-avatar>
                  <v-avatar size="32px" tile>
                    <img
                    :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                    :alt="tile.title"
                    >
                  </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-bottom-sheet>

          <p>{{ show_contents }}</p>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>


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
      return key;
    },
    async createRecord() {
      var vm = this;
      if(this.title === '' || this.username === '' || this.password === '') {
          alert('title, username or password cannot be null');
          return;
      }
      this.encryptContents();
      var key = getPassword();

      var config = {
        data: [this.address, this.contents],
        pay: {
          key: key, // private key
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
