<template>
  <div>
    <div class="field">
      <label class="label">名前</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="im-going-lunch"
          :value="name"
          @input="$emit('name', $event.target.value)">
      </div>
    </div>
    <div class="field">
      <label class="label">送信するメッセージ</label>
      <div class="control">
        <textarea
          class="textarea"
          rows="3"
          placeholder="昼休憩に入ります。"
          :value="text"
          @input="$emit('text', $event.target.value)">
        </textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">このメッセージを送信するためのURL</label>
      <div class="control">
        <input class="input" type="text" readonly :value="url">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue  } from "vue-class-component";

@Options({
  props: {
    name: String,
    text: String,
  },
  emits: {
    name: String,
    text: String,
  }
})
export default class Message extends Vue {
  name!: string;
  text!: string;

  public get url() : string {
    return `${window.location.href}send/${this.name}`;
  }
}
</script>