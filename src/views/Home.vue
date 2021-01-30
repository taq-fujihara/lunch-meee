<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <div class="card" v-for="message in messages" :key="message.name">
          <div class="card-content">
            <div class="content">
              <Message
                v-model:name="message.name"
                v-model:text="message.text">
              </Message>
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
      name: "foo",
      text: "",
    },
    {
      name: "bar",
      text: "",
    },
  ];
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 32px;
}
</style>
