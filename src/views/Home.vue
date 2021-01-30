<template>
  <div class="home">

    <section class="section">
      <div class="container">

        <div class="tabs">
          <ul>
            <li class="is-active"><a>Chatwork</a></li>
            <li><a style="text-decoration: line-through;">Slack</a></li>
          </ul>
        </div>

        <div class="field">
          <label class="label">Chatworkトークン</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="chatworkSetting.token">
          </div>
        </div>
        <div class="field">
          <label class="label">Chatworkルーム</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="chatworkSetting.roomId">
          </div>
        </div>
        <button class="button is-primary">Save</button>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="card" v-for="message in messages" :key="message.name">
          <div class="card-content">
            <div class="content">
              <Message v-model:text="message.text"></Message>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Message from "@/components/Message.vue"

@Options({components: { Message }})
export default class Home extends Vue {
  messages = [
    {
      text: "",
    },
    {
      text: "",
    },
  ];

  chatworkSetting = {
    token: "",
    roomId: "",
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 32px;
}
</style>
