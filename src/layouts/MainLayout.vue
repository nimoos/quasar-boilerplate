<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Edtech sample App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
