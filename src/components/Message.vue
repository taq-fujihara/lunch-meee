<template>
  <div>
    <div class="field">
      <label class="label">送信するメッセージ</label>
      <div class="control">
        <textarea
          class="textarea"
          rows="2"
          placeholder="昼休憩に入ります。"
          :value="text"
          @input="$emit('text', $event.target.value)"
          :readonly="readonly">
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
    id: String,
    text: String,
    readonly: Boolean,
  },
  emits: {
    text: String,
  }
})
export default class Message extends Vue {
  id!: string;
  text!: string;
  readonly = false;

  get url() {
    const protocol = window.location.protocol
    const host = window.location.host
    return `${protocol}//${host}/messages/send/${this.id}`
  }
}
</script>