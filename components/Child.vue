<template>
  <div style="background-color: #eee; padding: 1rem">
    <h2>아이템 추가하기</h2>
    <ul>
      <li v-for="(obj, idx) in computedItem" :key="idx">{{ obj }}</li>
    </ul>
    <form action="" @submit.prevent="handleAddItem">
      <input v-model="newItemName" type="text" />
      <button type="submit">부모에게 데이터 올리기 (Emit)</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
const newItemName = ref('');
const props = defineProps({
  propData: {
    type: Object,
    required: true,
  },
});
const { propData } = props;
const emit = defineEmits(['newItem']);

// 부모에게 받은 Props Data를 특정한 상황에 따라 가공하여 부모로 올려야 하는 경우
const computedItem = computed({
  // 1.Props로 내려받은 데이터 컴포넌트에 반환하는 경우 -> 일반적인 get처리
  get() {
    return propData.items;
  },
  // 2.(읽기전용)인 computed를 가공하여 다시 반환하는 경우
  set(newItem) {
    emit('newObj', newItem);
  },
});

// Input State
const handleAddItem = () => {
  computedItem.value = newItemName.value;
  newItemName.value = '';
};
</script>

<style lang="scss" scoped></style>
