<template>
  <div class="create">
    <p>hello,world!</p>
    <Row>
      <Col span="12">
        <Input v-model="Title" clearable size="large" placeholder="title" />
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
import BalanceInfo from '@/components/BalanceInfo';
import datapay from 'datapay'

export default {
  components: {
    BalanceInfo,
  },
  data () {
    return {
      address:'',
      title:'',
      username:'',
      password:'',
      url:'',
      contents: '',// todo, the type of the encrped contents,
    };
  },
  methods: {
    encrpytContents (){
      // encrpyt the information by using the API
    },
    async createRecord() {
      var vm = this;
      if(this.title === '' || this.username === '' || this.password === '') {
          alert('title, username or password cannot be null');
          return;
      }
      var config = {
        data: [this.address, this.contents],
        pay: {
          key: // private key
          rpc: "https://api.bitindex.network",
        }
      };
      await datapay.send(config, function (err, res) {
        vm.alertShow = true;
      });
    },
  },

  mounted: function() {
    this.$refs.BalanceInfo.getBalance();
  },

};
</script>

<style>

</style>
