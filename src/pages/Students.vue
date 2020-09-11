<template>
  <q-page padding>
    <q-table
      :data="students"
      :columns="columns"
      :filter="filter"
      :visible-columns="visibleColumns"
      :separator="separator"
      row-key="id"
      ref="table"
      color="primary"
      :pagination.sync="pagination"
      :loading="loading"
      binary-state-sort
      @request="request"
    >
      <template v-slot:top="props">
        <div class="text-h5">
          Students
        </div>
        <q-space/>
        <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
        />
        <q-select
          v-model="separator"
          emit-value
          map-options
          borderless
          dense
          :options="[
        { label: 'Horizontal (default)', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
        { label: 'Cell', value: 'cell' },
        { label: 'None', value: 'none' },
      ]"
        />
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
        />
      </template>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn flat
               round
               rounded
               dense
               icon="more_vert"
        >
          <q-menu>
            <q-item clickable @click="deleteStudent(props.row.id)">
              <q-item-section side>
                <q-icon name="delete" color="negative"/>
              </q-item-section>
              <q-item-section>
                remove student
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </q-td>
    </q-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      loading: false,
      visibleColumns: ['name', 'action'],
      filter: '',
      separator: 'horizontal',
      columns: [
        {name: 'id', field: 'id', label: 'ID', align: 'left'},
        {name: 'name', field: 'name', label: 'Name', align: 'left'},
        {name: 'action', field: 'action', label: 'Actions', align: 'left'},
      ],
    }
  },
  methods:{
    deleteStudent(id){
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure to delete',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$classes.removeStudent(id).then(()=>{
          this.request({pagination: this.pagination, filter: this.filter})
        }).catch(()=>{

        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      })

    },
    request({pagination, filter}) {

      this.loading = true
      this.$classes.studentsList(pagination, filter).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
  },
  created() {
    this.request({pagination: this.pagination, filter: this.filter})
  },
  computed:{
    pagination: {
      get() {
        return this.$store.state.classroom.paginate
      },
      set(newVal) {

      }
    },
    students: {
      get() {
        return this.$store.state.classroom.students
      }
    },
  }
}
</script>
