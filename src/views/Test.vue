<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

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
              <v-list-tile-title>Title:</v-list-tile-title>
              <v-list-tile-sub-title>$mytitle</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Url:</v-list-tile-title>
              <v-list-tile-sub-title>$myurl</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Username:</v-list-tile-title>
              <v-list-tile-sub-title>$myusername</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Password:</v-list-tile-title>
              <v-list-tile-sub-title>$mypassword</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>          
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Comment:</v-list-tile-title>
              <v-list-tile-sub-title>$mycomment</v-list-tile-sub-title>
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
            Gotcha!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>