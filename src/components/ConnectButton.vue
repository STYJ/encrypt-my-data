<template lang="html">
  <v-flex shrink id="connect">
    <!-- <v-btn small v-on:click="login">Login</v-btn> -->
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="blue lighten-2"
            dark
            v-on="on"
          >
            {{ buttonName }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            {{ title }}
          </v-card-title>

          <v-card-text>
            {{ content }}
            <h1 v-if="this.connected == true">{{ mnemonic }}</h1>
            <v-text-field
              v-if="this.connected == false"
              v-model="mnemonic"
            />
          </v-card-text>

          <v-card-actions>
            <v-layout align-center justify-space-around row>
              <v-btn
                v-if="this.connected == false"
                color="primary"
                flat
                v-on:click="importMnemonic"
              >
                Import
              </v-btn>
              <v-btn
                v-if="this.connected == false"
                color="primary"
                flat
                v-on:click="createNew"
              >
                Create Wallet
              </v-btn>
              <v-btn
                v-if="this.connected == true"
                color="primary"
                flat
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      buttonName: "Connect",
      title: "Connect your BSV wallet",
      content: "Please enter your 12 character mnemonic phrase below or create a new wallet.",
      mnemonic: "",
      connected: false,
      imported: false,
    }
  },
  methods: {
    importMnemonic() {
      if(this.mnemonic.length == 0) {
        console.log("Please enter a 12 character mnemonic phrase.");
      } else {
        try {
          this.$store.dispatch('importMnemonic', this.mnemonic);
        } catch(e) {
          console.log(e)
          return
        }
        this.connected = true
        this.buttonName = "Wallet Details"
        this.mnemonic = this.$store.getters.mnemonic;
        this.title = "BSV Wallet Seed Phrase";
        this.content = `Seed phrase successfully imported!`;
      }
    },
    createNew() {
      this.$store.dispatch('createNew');
      this.connected = true;
      this.buttonName = "Wallet Details"
      this.mnemonic = this.$store.getters.mnemonic;
      this.title = "BSV Wallet Seed Phrase";
      this.content = `Please store your mnemonic phrase somewhere secure!`;
    },

  }
}
</script>


<style lang="css" scoped>
h1 {
  color: red;
}
</style>
