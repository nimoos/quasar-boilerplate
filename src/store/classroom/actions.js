import {db} from '../../boot/db'
import {Notify} from 'quasar'

export function getAll(context) {
  db.classes.toArray().then((row) => {
    context.commit('setClassOptions', row)
  })
}

export function getAllStudents(context) {
  db.childs.toArray().then((row) => {
    context.commit('setStudents', row)
  })
}

export function createParent(context, {data}) {
  return new Promise((resolve, reject) => {
    return db.transaction('rw', db.parents, function () {
      let insert_object = {name: data.name, email: data.email};
      db.parents.add(insert_object);
      resolve()
    }).catch(function (err) {
      console.error(err.stack || err);
      reject()
    });
  })

}

export function createChild(context, {data}) {
  db.parents.orderBy('id').last().then(row => {
    return new Promise((resolve, reject) => {
      return db.transaction('rw', db.childs, function () {
        let insert_object = {
          name: data.name, age: data.age, classId: null, parentId: row.id
        };
        db.childs.add(insert_object)
        resolve()
      }).catch(function (err) {
        console.error(err.stack || err);
        reject()
      });
    })
  })
}

export function createClass(context, {id}) {
  console.log(id)
  return new Promise((resolve, reject) => {
    return db.classes.where('id').equals(id).with({childs: 'childs'}).then((row) => {
      let lastSeat=row[0].childs.length
      if (lastSeat < 4) {
        db.childs.orderBy('id').last().then(row2 => {
          return db.transaction('rw', db.childs, function () {
            db.childs.update(row2.id, {classId: id})
          }).then(()=>{
            db.transaction('rw', db.classes, function () {
              db.classes.update(row.id, {seats:lastSeat+1})
              resolve()
            })
          }).catch((err)=>{
            console.error(err.stack || err);
            reject()
          })
        }).catch((err) => {
          console.error(err.stack || err);
          reject()
        }).catch((err) => {
          console.error(err.stack || err);
          reject()
        })
      } else {
        Notify.create({type: 'negative', message: 'the class is full'})
        reject()
      }
    })
  })
}

export function getClassesList(context, {pagination, filter}) {

  return new Promise((resolve, reject) => {
    return db.classes.with({childs: 'childs'}).then((row) => {
      context.commit('setClassesList', row)
      resolve()
    }).catch((err) => {
      console.error(err.stack || err);
      reject()
    })
  })

}

export function getStudentsList(context, {pagination, filter}) {
  return new Promise((resolve, reject) => {
    return db.childs.reverse()
      .limit(pagination.per_page)
      .toArray().then((row) => {
        context.commit('setStudentsList', row)
        resolve()
      }).catch((err) => {
        console.error(err.stack || err);
        reject()
      })
  })

}

export function getClass(context, {id}) {
  return new Promise((resolve, reject) => {
    return db.classes.where('id').equals(id).with({childs: 'childs'}).then((row) => {
      resolve(row[0])
    }).catch((err) => {
      console.error(err.stack || err);
      reject()
    })
  })
}

export function addStudentToClass(context, {std, cl}) {

  return new Promise((resolve, reject) => {
    return db.classes.where('id').equals(cl).with({childs:'childs'}).then((row) => {
      let lastSeat=row[0].childs.length
      if (lastSeat < 4) {
        db.childs.where('id').equals(std).last().then(row2 => {
          return db.transaction('rw', db.childs, function () {
            db.childs.update(std, {classId: cl})
          }).then(()=>{
            db.transaction('rw', db.classes, function () {
              db.classes.update(std, {seats:lastSeat+1})
              resolve()
            })
          }).catch((err)=>{
            console.error(err.stack || err);
            reject()
          })
        }).catch((err) => {
          console.error(err.stack || err);
          reject()
        }).catch((err) => {
          console.error(err.stack || err);
          reject()
        })
      } else {
        Notify.create({type: 'negative', message: 'the class is full'})
        reject()
      }
    })

  })
}

export function removeStudentEnrollment(context, {id}) {
  return new Promise((resolve, reject) => {
    return db.transaction("rw", db.childs, async () => {
      await db.childs.update(id, {classId: null})
      resolve()
    })
  })
}

export function removeStudent(context, {id}) {
  return new Promise((resolve, reject) => {
    return db.transaction("rw", db.childs, async () => {
      await db.childs.delete(id)
      resolve()
    })
  })
}
