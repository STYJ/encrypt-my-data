<template>
  <div class="page-body">
    <v-layout v-if='imported' row>
      <v-flex xs12 sm6 offset-sm3 >
        <v-card>
          <v-toolbar color="light-blue" dark>
            <v-toolbar-side-icon 
              @click="routeToCreate()"
            >
              <v-icon medium>add_circle</v-icon>
            
            </v-toolbar-side-icon>
            <v-toolbar-title>My secrets</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line subheader>
            <v-subheader inset>Passwords</v-subheader>
            <v-list-tile
              v-for="item in dataList"
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <v-icon 
                  :class="item.iconClass"
                  @click="openBlockchainBrowser(item.txid)"
                >{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content
                  @click.stop="openDetailDialog(item)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }} {{ item.height }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon @click="openNewPage(item.url)" color="grey lighten-1">link</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>

            <div class="text-xs-center">
              <v-btn 
                outline 
                round 
                color="primary" 
                @click="loadDataList()"
                :disabled="loadingDialog"
                dark>
                  <span>more</span>
              </v-btn>
            </div>
            <v-divider inset></v-divider>

            <v-subheader inset>Confidential Files (coming soon)</v-subheader>

            <v-list-tile
              v-for="item in examples"
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            
          </v-list>
        </v-card>
      </v-flex>

      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Details 
          </v-card-title>

          <!-- <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text> -->

          <v-card-text>
            <!-- <v-subheader>User Controls</v-subheader> -->
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Transaction Hash: </v-list-tile-title>
                <v-list-tile-sub-title>
                  <a 
                    :href="'https://whatsonchain.com/tx/' + secretDetail.txid"
                    target="_blank"
                  >
                  {{ secretDetail.txid }}
                  </a>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Title: <b>{{ secretDetail.title }}</b></v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>          
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title 
                >
                Url: <a :href="secretDetail.url" target="_blank">{{ secretDetail.url }}</a>
                
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>          
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Username: <b>{{ secretDetail.username }}</b></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>          
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Password: <b>{{ secretDetail.password }}</b></v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>          
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>Comment: <b>{{ secretDetail.comments }}</b></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>                    
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              Gocha!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="loadingDialog"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      
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
  import cryptoJs from 'crypto-js';

  export default {
    name: "SecretList",
    data () {
      return {
        items: [
          { icon: 'lock', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
          { icon: 'lock', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
        ],
        examples: [
          { icon: 'image', iconClass: 'blue white--text', title: 'My Private Image', subtitle: 'Jan 20, 2014' },
          { icon: 'mail', iconClass: 'amber white--text', title: 'Important Mails', subtitle: 'Jan 10, 2014' },
          { icon: 'file_copy', iconClass: 'green white--text', title: 'My SSH KEY FILE', subtitle: 'Jan 10, 2014' }
        ],
        page: 1,
        loading: false,
        dataList: [],
        dialog: false,
        loadingDialog: false,
        secretDetail: {},
      }
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
    watch: {
      loadingDialog (val) {
        if (!val) return

        setTimeout(() => (this.loadingDialog = false), 4000)
      },
      imported (val) {
        if(!val) {
          return;
        }
        this.loadDataList();
      }
    },
    created: function(){
      if(!this.imported) {
        return;
      }
      this.loadDataList();
    },
    methods: {
        async loadDataList() {
            this.loadingDialog = true
            var query = {
                'v': 3,
                'q': {
                    "find": {
                        "out.e.a": this.address
                    },
                    'limit': 5,
                    'skip': 5 * (this.page - 1),
                    "project": { "tx.h": 1, "out.s2":1, "blk": 1 }
                }
            };
            var b64 = btoa(JSON.stringify(query));
            var url = 'https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/' + b64;
            var header = { headers: { key: '1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU' } };
            var result = await fetch(url, header).then(function(r) {
                return r.json()
            }).then(function(r) {

                return r;
                // changeTableData(r);
            });
            this.addSecrets(result)
            this.page ++;
        },

        addSecrets(resp) {
            // dealing with unconfirmed txs(we need to reverse the unconfirmed to insure the order)
            let unconfirmList = resp.u.reverse();
            for(var unconfirmTx of unconfirmList) {
                let txid = unconfirmTx.tx.h;
                // 检查输出
                let outputs = unconfirmTx.out;
                try {
                  for (let output of outputs) {
                      if (!output.s2) {
                          continue;
                      }
                      let contentEncrypted = output.s2;
                      let jsonObj = this.decryptPayloads(contentEncrypted);
                      jsonObj.txid = txid;
                      jsonObj.height = 0;
                      jsonObj.timestamp = 0;
                      jsonObj.subtitle = 'tx unconfirmed';
                      this.dataList.push(jsonObj);
                  }
                }catch(e) {
                  continue;
                }
            }
            let confirmList = resp.c;
            for(let confirmTx of confirmList) {
                let txid = confirmTx.tx.h;
                let timestamp = confirmTx.blk.t;
                let height = confirmTx.blk.i;
                // 检查输出
                let outputs = confirmTx.out;
                try{
                  for (let output of outputs) {
                      if (!output.s2) {
                          continue;
                      }
                      let contentEncrypted = output.s2;
                      let jsonObj = this.decryptPayloads(contentEncrypted);
                      jsonObj.txid = txid;
                      jsonObj.height = height;
                      jsonObj.timestamp = timestamp;
                      jsonObj.subtitle = new Date(timestamp * 1000).toLocaleString();
                      this.dataList.push(jsonObj);
                  }
                }catch(e) {
                  continue;
                }
                
            }
            this.loadingDialog = false;
        },
        // decrypt the payload and return objects
        decryptPayloads(encrypted){
          try{
            // todo import password
            let jsonString = cryptoJs.AES.decrypt(encrypted, this.privateKey).toString(cryptoJs.enc.Utf8);
            let result = JSON.parse(jsonString);
            result.icon =  'lock'
            result.iconClass = 'grey lighten-1 white--text';
            // todo: transform into date string 
            result.subtitle = 'Jan 9, 2014';
            return result;
          }catch (e) {
            throw e;
          }
        },

        openNewPage(url) {
          window.open(url, '_blank');
        },

        openBlockchainBrowser(txid) {
          window.open("https://whatsonchain.com/tx/" + txid, '_blank');

        },

        openDetailDialog(item) {
           this.dialog = true;
           this.secretDetail = item;
        },

        routeToCreate() {
          this.$router.push("/create");
        }

    },
  }
</script>

<style scoped>
  .page-body {
    min-height : 600px;
  }
</style>