<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="light-blue" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

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
              <v-icon :class="item.iconClass">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon @click="openNewPage(item.url)" color="grey lighten-1">link</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <div class="text-xs-center">
            <v-btn outline round color="primary" dark>
                <span>more</span>
            </v-btn>
          </div>
          <v-divider inset></v-divider>

          <v-subheader inset>Files</v-subheader>

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
  </v-layout>
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
          { icon: 'image', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
          { icon: 'image', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' }
        ],
        page: 1,
        loading: false,
        dataList: [],
      }
    },
    created: function() {
        this.loadDataList();
    },
    methods: {
        async loadDataList() {
            this.loading = true;
            var query = {
                'v': 3,
                'q': {
                    "find": {
                        "out.e.a": "1LmWGihCJjg1TG7UMC86Fo7DLPiGce1QMw"
                    },
                    'limit': 5,
                    'skip': 5 * (this.page - 1),
                    "project": { "tx.h": 1, "out.s5":1,"out.s6":1, "blk": 1 }
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
            // dealing with unconfirmed txs
            let unconfirmList = resp.u;
            for(var unconfirmTx of unconfirmList) {
                let txid = unconfirmTx.tx.h;
                // 检查输出
                let outputs = unconfirmTx.out;
                try {
                  for (let output of outputs) {
                      if (!output.s6) {
                          continue;
                      }
                      let contentEncrypted = output.s6;
                      let jsonObj = this.decryptPayloads(contentEncrypted);
                      jsonObj.txid = txid;
                      jsonObj.height = 0;
                      jsonObj.timestamp = 0;
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
                      if (!output.s6) {
                          continue;
                      }
                      let contentEncrypted = output.s6;
                      let jsonObj = this.decryptPayloads(contentEncrypted);
                      jsonObj.txid = txid;
                      jsonObj.height = height;
                      jsonObj.timestamp = timestamp;
                      this.dataList.push(jsonObj);
                  }
                }catch(e) {
                  continue;
                }
                
            }
            this.loading = false;
        },
        // decrypt the payload and return objects
        decryptPayloads(encrypted){
          try{
            // todo import password
            let jsonString = cryptoJs.AES.decrypt(encrypted, 'L3ireqzmJB8V83XGAgWdsyZkSwCd5gjQRMubWEpeQpGa74RVwvmG').toString(cryptoJs.enc.Utf8);
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

    },
  }
</script>