<template>
  <div class="home">

    <section class="section">
      <div class="container">

        <div class="tabs">
          <ul>
            <li class="is-active"><a>Chatwork</a></li>
            <li class="unsupported"><a>Slack</a></li>
          </ul>
        </div>

        <div class="field">
          <label class="label">
            あなたの
            <a
              href="https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php"
              target="_blank"
            >
              Chatworkトークン
            </a>
          </label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="chatworkSetting.token">
          </div>
        </div>
        <div class="field">
          <label class="label">メッセージを送信するChatworkルーム</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="chatworkSetting.roomId">
          </div>
        </div>
        <button
          class="button is-primary"
          @click="saveChatworkSetting"
          :class="{'is-loading': savingChatworkSetting}"
          :disabled="!isChatworkSettingValid"
        >
          Save
        </button>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">システムデフォルトメッセージ</h1>
        <div class="card" v-for="message in systemDefaultMessages" :key="message.name">
          <div class="card-content">
            <div class="content">
              <Message v-model:text="message.text" :id="message.id" readonly></Message>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import Message from "@/components/Message.vue"
import { db, auth } from "@/firebase"

@Options({components: { Message }})
export default class Home extends Vue {
  chatworkSetting = {
    token: "",
    roomId: "",
  }

  messages = [];

  systemDefaultMessages: any[] = []

  savingChatworkSetting = false

  get isChatworkSettingValid() {
    return this.chatworkSetting.token.trim() &&
      this.chatworkSetting.roomId.trim()
  }

  async mounted() {
    // Chatwork Setting
    const userId = auth.currentUser?.uid
    const userDoc = await db.doc(`users/${userId}`).get()
    const userData = userDoc.data()
    if (userData?.chatworkSetting) {
      this.chatworkSetting.token = userData.chatworkSetting.token
      this.chatworkSetting.roomId = userData.chatworkSetting.roomId
    }

    // System Default Messages
    const messagesSnapshot = await db.collection('messages').get()
    messagesSnapshot.forEach(doc => {
      const data = doc.data();
      this.systemDefaultMessages.push({
        id: doc.id,
        text: data.text,
      })
    })
  }

  async saveChatworkSetting() {
    this.savingChatworkSetting = true

    try {
      const userId = auth.currentUser?.uid
      const userDoc = db.doc(`users/${userId}`)
      await userDoc.update({ chatworkSetting: this.chatworkSetting })
    } catch (error) {
      alert('Chatwork設定が保存できませんでした。')
    } finally {
      this.savingChatworkSetting = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 32px;
}

.unsupported {
  text-decoration: line-through;
}
</style>
