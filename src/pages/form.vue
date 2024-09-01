<template>
  <q-page :class="{ 'q-pa-md': $q.screen.gt.sm }">
    <q-form class="container-md" ref="form" greedy no-error-focus>
      <h4 class="text-body1 q-mb-lg text-bold">Персональные данные</h4>
      <div>
        <q-input
          v-model="formData.name"
          label="Имя"
          outlined
          lazy-rules="ondemand"
          no-error-icon
          :rules="[(val: string) => !!val || 'обязательное поле']" />
      </div>
      <div>
        <q-input
          v-model="formData.age"
          label="Возраст"
          outlined
          mask="##"
          lazy-rules="ondemand"
          no-error-icon
          :rules="[(val: string) => !!val || 'обязательное поле']"
        />
      </div>

      <div class="q-mt-md">
        <div class="q-mb-md flex justify-between items-center">
          <h5 v-if="formData.children.length > 0">Дети (макс. 5)</h5>
          <q-btn
            v-if="formData.children.length < 5"
            @click="addChild"
            label="Добавить ребенка"
            class="q-ml-auto"
            icon="add"
            no-caps
            color="blue-5"
            outlinВ
            rounded
          />
        </div>

        <div v-for="(child, index) in formData.children" :key="index">
          <div class="flex items-center justify-between q-gutter-md q-mb-lg">
            <div class="col">
              <q-input
                v-model="child.name"
                label="Имя"
                outlined
                class="q-pa-none"
                lazy-rules="ondemand"
                no-error-icon
                :rules="[(val: string) => !!val || 'обязательное поле']"
              />
            </div>
            <div class="col">
              <q-input
                v-model="child.age"
                label="Возраст"
                outlined
                class="q-pa-none"
                lazy-rules="ondemand"
                no-error-icon
                :rules="[(val: string) => !!val || 'обязательное поле']"
              />
            </div>
            <div>
              <q-btn
                @click="removeChild(index)"
                label="Удалить"
                no-caps
                class="text-blue-5"
                rounded
                unelevated
              />
            </div>
          </div>
        </div>
        <q-btn
          @click="save"
          label="Сохранить"
          class="add-btn text-weight-light"
          color="blue-6"
          rounded
          no-caps
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';
import { IChild } from 'src/types';

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const form = ref();

const formData = reactive({
  name: '',
  age: '',
  children: [] as IChild[]
});

const addChild = () => {
  if (formData.children.length < 5) {
    formData.children.push({ name: '', age: '' });
  }
};

const removeChild = (index: number) => {
  if (formData.children.length > 0) formData.children.splice(index, 1);
};

const save = async () => {
  try {
    const is_valid = await form.value.validate();
    if (!is_valid) {
      return alert('Не заполнены обязательные поля');
    }
    localStorage.setItem('parent', JSON.stringify(formData));

    alert('Сохранено успешно');

    globalProperties?.$router.push('/preview');
  } catch (e: unknown) {
    console.error('save', e);
  }
};
</script>

