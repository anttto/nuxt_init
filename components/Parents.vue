<template>
  <div style="background-color: #f90; padding: 1rem">
    <h3>
      나의 보유 아이템: {{ data.items }}
      <em class="num">
        {{ data.items.length }}
      </em>
    </h3>
    <Child v-if="isLogin" :prop-data="data" @new-obj="handleAddItem" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoginStore } from '~/store/loginStore';

const loginStore = useLoginStore();
const { isLogin, user } = storeToRefs(loginStore);

const data = reactive({
  name: '도사은',
  items: ['양손검2', '십자방패2'],
});

// console.log(user.value);
const handleAddItem = (newItem: string) => {
  console.log('Emit Data :', newItem);
  data.items = [...data.items, newItem];
};
</script>

<style lang="scss" scoped>
.num {
  font-weight: bold;
  background-color: black;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  font-size: 1.2rem;
  font-style: normal;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
