<template>
  <div class="home">
    <h1>ログイン済み</h1>
    <amplify-sign-out></amplify-sign-out>
    <BoxList></BoxList>
  </div>
</template>

<script>
import BoxList from "@/components/BoxList";

export default {
  name: "Home",
  components: {
    BoxList
  }
};
</script>
