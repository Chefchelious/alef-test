<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-toolbar-title
          class="cursor-pointer container flex items-center justify-between no-wrap"
          @click="globalProperties?.$router.push('/')"
        >
          <q-icon :name="`img:${logo}`" size="64px" />
        </q-toolbar-title>

        <div class="flex items-center no-wrap q-gutter-x-md col-7">
          <q-item
            v-for="item in sideBarList"
            dense
            :key="item.id"
            class="text-weight-regular" clickable
            :to="item.route ? item.route : null">
            <q-item-section class="text-grey-5">
              {{ item.name }}
            </q-item-section>
          </q-item>
        </div>
      </q-toolbar>
      <q-separator size="1px" color="grey-3" />
    </q-header>
    <q-page-container>
      <main class="q-pa-sm">
        <router-view />
      </main>
    </q-page-container>

    <q-footer class="bg-grey-3 text-black q-py-sm">
      <q-toolbar>
        <q-toolbar-title class="row justify-center items-center">
          <div class="text-subtitle2 text-weight-light">all rights reserved</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import logo from 'src/assets/logo.svg';
import type { ISidebarItem } from 'src/types';

defineOptions({
  name: 'MainLayout'
});

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const sideBarList: ISidebarItem[] = [
  { id: '1', name: 'Форма', route: '/form' },
  { id: '2', name: 'Превью', route: '/preview' }
];
</script>
