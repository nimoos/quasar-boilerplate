<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Register Parent
        </q-toolbar-title>
        <q-space/>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
      </q-toolbar>
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <q-list>
          <q-item-label header>
            Other Pages
          </q-item-label>
          <q-item clickable to="/register">
            <q-item-section side>
              <q-icon name="how_to_reg"></q-icon>
            </q-item-section>
            <q-item-section>
              Register
            </q-item-section>
          </q-item>
          <q-item clickable to="/admin/classes">
            <q-item-section side>
              <q-icon name="class"></q-icon>
            </q-item-section>
            <q-item-section>
              Classes
            </q-item-section>
          </q-item>
          <q-item clickable to="/admin/students">
            <q-item-section side>
              <q-icon name="people_alt"></q-icon>
            </q-item-section>
            <q-item-section>
              Students
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
