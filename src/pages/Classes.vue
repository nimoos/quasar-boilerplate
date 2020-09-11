<template>
  <q-page padding>
    <q-table
      :data="classes"
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
          Classes
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
      <q-td slot="body-cell-seats" slot-scope="props" :props="props">
        <q-badge class="text-h6" color="secondary" :label="props.row.childs.length" v-if="props.row.childs"/>
        <q-badge color="info" label="empty" v-else/>
      </q-td>
      <q-td slot="body-cell-action" slot-scope="props" :props="props">
        <q-btn flat
               round
               rounded
               dense
               icon="more_vert"
        >
          <q-menu>
            <q-item clickable @click="enrollment(props.row.id)">
              <q-item-section side>
                <q-icon name="add"/>
              </q-item-section>
              <q-item-section>
                Add or remove students
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </q-td>
    </q-table>
    <q-dialog v-model="studentsDialog" persistent>
      <q-card>
        <q-card-actions>
          <q-btn outline flat icon="add" @click="addStudent(classroom.id)" label="Add new Student" no-caps
                 color="secondary"/>
          <q-btn outline flat icon="close" v-close-popup no-caps @click="exitEnrollDialog" color="negative"/>
        </q-card-actions>
        <q-card-section>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered>
              <q-item v-for="(std,i) in classroom.childs" :key="i">
                <q-item-section>
                  {{std.name}}
                </q-item-section>
                <q-item-section side>
                  <q-btn dense icon="delete" flat @click="removeStudent(std.id)" color="negative"/>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="selectStudentDialog">
      <q-card class="full-width">
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" @click="exitSelectStudent" v-close-popup/>
        </q-card-actions>
        <q-card-section>
          <q-select
            label="select a student"
            v-model="studentId"
            :options="studentOptions"
            emit-value
            map-options
            @input="addToClass"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  export default {
    // name: 'PageName',
    data() {
      return {
        loading: true,
        visibleColumns: ['name', 'seats', 'action'],
        filter: null,
        separator: 'horizontal',
        columns: [
          {name: 'id', field: 'id', label: 'ID', align: 'left'},
          {name: 'name', field: 'name', label: 'Name', align: 'left'},
          {name: 'seats', label: 'reserved seats', align: 'left'},
          {name: 'description', field: 'description', align: 'left', label: 'Description'},
          {name: 'action', field: 'action', label: 'Actions', align: 'left'},
        ],
        classroom: {},
        studentsDialog: false,
        selectStudentDialog: false,
        studentId: null,
      }
    },
    methods: {
      removeStudent(id) {
        this.$classes.removeStudentEnrollment(id).then(() => {
          this.$classes.classroom(this.classroom.id).then((res) => {
            this.classroom = res
          }).catch(() => {

          })
        }).catch(() => {

        })
      },
      exitSelectStudent() {
        this.studentId = null;
      },
      exitEnrollDialog() {
        this.classroom = {};
        this.studentId = null;
        this.request({pagination: this.pagination, filter: this.filter})
      },
      stdExists(arr, id) {
        return arr.some(function (el) {
          return el.id === id;
        });
      },
      addToClass(val) {
        if (!this.stdExists(this.classroom.childs, val)) {
          this.$classes.addStudentToClass(val, this.classroom.id).then(() => {
            this.selectStudentDialog = false;
            this.$classes.classroom(this.classroom.id).then((res) => {
              this.classroom = res
            }).catch(() => {
            })
          }).catch(() => {
          })
        } else {
          this.$q.notify({message: 'this student is already in this class', type: 'warning'})
        }
      },
      addStudent(id) {
        this.selectStudentDialog = true
      },
      enrollment(id) {
        this.$classes.classroom(id).then((res) => {
          this.classroom = res
          this.studentsDialog = true
        }).catch(() => {
          this.$q.notify({message: 'something happened, try again', type: 'negative'})
        })
      },
      filterTable(){
        this.request({pagination:this.pagination,filter:this.filter})
      },
      request({pagination, filter}) {
        this.loading = true
        this.$classes.classesList(pagination,filter).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      loadData() {
        return new Promise((resolve, reject) => {
          return this.$classes.students().then(() => {
            this.request({pagination: this.pagination, filter: this.filter}).then(() => {
              resolve()
            })
          }).catch(() => {
            reject()
          })
        })
      }
    },
    created() {
      this.$q.loading.show()
      this.loadData().then(() => {
        this.$q.loading.hide()
      }).catch(() => {
        this.$q.loading.hide()
      })
    },
    computed: {
      pagination: {
        get() {
          return this.$store.state.classroom.paginate
        },
        set(newVal) {

        }
      },
      classes: {
        get() {
          return this.$store.state.classroom.classes
        }
      },
      studentOptions: {
        get() {
          return this.$store.state.classroom.students
        }
      }
    }
  }
</script>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
