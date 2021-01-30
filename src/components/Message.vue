<template>
  <div>
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
    text: String,
    url: String,
  },
  emits: {
    text: String,
  }
})
export default class Message extends Vue {
  text!: string;
  url!: string;
}
</script>