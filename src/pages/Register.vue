<template>
  <q-page padding class="flex flex-center">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      class="full-width no-shadow"
      animated
    >
      <q-step
        :name="1"
        title="Basic Information"
        icon="account_circle"
        :done="step > 1"
        :disable="disabledParentTab"
      >
        <q-form
          @submit="submitBasic"
          @reset="resetBasic"
          class="q-gutter-md"
        >

          <q-input
            class="col-auto"
            v-model="parentInfo.name"
            label="Your name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="parentInfo.email"
            label="Your Email *"
            lazy-rules
            :rules="[val => !!val || 'Email is missing', isValidEmail]"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
          </div>
        </q-form>
      </q-step>
      <q-step
        :name="2"
        title="Child Information"
        icon="face"
        :done="step > 2"
        :disable="disabledChildTab"
      >
        <q-form
          @submit="submitChild"
          @reset="resetChild"
          class="q-gutter-md">
          <q-input
            v-model="childInfo.name"
            label="Your child`s name *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            v-model="childInfo.age"
            label="Your child`s age *"
            lazy-rules
            :rules="[
                        val => val !== null && val !== '' || 'Please type your child`s age',
                        val => val > 0 && val < 100 || 'Please type a real age'
                             ]"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
          </div>
        </q-form>

      </q-step>
      <q-step
        :name="3"
        title="registering class"
        icon="cast_for_education"
        :disable="disabledClassTab"
      >
        <q-select
          :options="classOptions"
          v-model="classRegister.classId"
          label="Select a class"
          emit-value
          map-options
        />

        <q-stepper-navigation>
          <q-btn @click="submitClass" label="Submit" type="submit" color="primary"/>
          <q-btn flat to="/account" color="primary" label="register later" class="q-ml-sm"/>
        </q-stepper-navigation>
      </q-step>

    </q-stepper>

  </q-page>
</template>

<script>
  export default {
    // name: 'PageName',
    data() {
      return {
        tab: 'basic',
        step:3,
        parentInfo: {
          name: null,
          email: null
        },
        childInfo: {
          name: null,
          age: null,
          classId: null
        },
        classRegister: {
          classId: null
        },
        disabledChildTab: true,
        disabledParentTab: false,
        disabledClassTab: true,
        parentLoading: false,
        childLoading: false,
        classLoading: false,
      }
    },
    methods: {
      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid email';
      },
      submitBasic() {
        this.parentLoading = true
        this.$classes.createParent(this.parentInfo).then(() => {
          this.$q.notify({message: 'parent created successfully', type: 'positive'});
          this.parentLoading = false;
          this.disabledChildTab = false;
          this.step = 2
          this.disabledParentTab = true;
        }).catch(() => {
          this.parentLoading = false
        })
      },
      submitChild() {
        this.childLoading = true
        this.$classes.createChild(this.childInfo).then(() => {
          this.$q.notify({message: 'child created successfully', type: 'positive'});
          this.childLoading = false;
          this.disabledClassTab = false;
          this.step = 3;
        }).catch(() => {
          this.childLoading = false
        })
      },
      submitClass() {
        this.classLoading = true
        this.$classes.createClass(this.classRegister).then(() => {
          this.$q.notify({message: 'class registered successfully', type: 'positive'});
          this.classLoading = false;
          this.disabledClassTab = false;
          this.$router.push('/account')
        }).catch(() => {
          this.classLoading = false
        })
      },
      resetBasic() {
        this.parentInfo = {
          name: null,
          email: null
        }
      },
      resetChild() {
        this.childInfo = {
          name: null,
          age: null,
          classId: null,
        }
      },
      resetClass() {
        this.classRegister = {
          classId: null,
        }
      },
      loadData() {
        return new Promise((resolve, reject) => {
          return this.$classes.classes().then(() => {
            resolve()
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
      classOptions: {
        get() {
          return this.$store.state.classroom.classes
        }
      }
    }
  }
</script>
