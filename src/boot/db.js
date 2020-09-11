import Dexie from 'dexie'
import relationships from 'dexie-relationships'

const db = new Dexie('EdTech', {addons: [relationships]})
db.version(1).stores({
  parents: '++id, name, email',
  classes: '++id, name, description, seats',
  childs: '++id, name, age, parentId-> parents.id,classId-> classes.id',
});
db.transaction('rw', db.parents, db.classes, db.childs, () => {
  // classes
  db.classes.bulkPut([{
    id: 1,
    name: 'Programming',
    description: 'a programming class',
    seats: 0
  }, {
    id: 2,
    name: 'Mathematics',
    description: 'a Mathematics class',
    seats: 0
  }, {
    id: 3,
    name: 'Art',
    description: 'an Art class',
    seats: 0
  },])
})
db.open();
export {db}
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({Vue}) => {
  Vue.prototype.$db = db
}
