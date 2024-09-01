<template>
  <q-page :class="{ 'q-pa-md': $q.screen.gt.sm }">
    <div class="container-md">
     <div v-if="parentData" class="parent-data">
       <h4 class="text-body1 q-mb-lg text-bold">Персональные данные</h4>
       <p class="text-weight-bold q-mb-xl">{{ parentData.name }}, {{ parentData.age }} лет</p>

       <div v-if="parentData.children.length">
         <p class="q-mb-lg">Дети</p>

         <ul v-for="(child, index) in parentData.children" :key="index">
           <li class="child-item q-mb-md">
             <p class="text-weight-bold">{{ child.name }}, {{ child.age }} лет</p>
           </li>
         </ul>
       </div>
     </div>
      <h4 v-else>нет данных...</h4>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IParent } from 'src/types';

const parentData = ref<IParent | null>(null);

onMounted(() => {
  const parentDataFromLS = localStorage.getItem('parent');

  if (parentDataFromLS) {
    parentData.value = JSON.parse(parentDataFromLS) as IParent;
  } else {
    parentData.value = null;
  }

});
</script>

<style scoped>
.child-item {
  background-color: #F1F1F1;
  border-radius: 5px;
  width: max-content;
  padding: 10px 20px;
}
</style>
