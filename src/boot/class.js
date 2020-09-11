export default ({app, store, Vue}) => {
  var helper = {}

  helper.createParent = (data) => {
    return store.dispatch('classroom/createParent', {data: data})
  }
  helper.createChild = (data) => {
    return store.dispatch('classroom/createChild', {data: data})
  }
  helper.createClass = (data) => {
    return store.dispatch('classroom/createClass', {id: data.classId})
  }
  helper.edit = (data, id) => {
    return store.dispatch('classroom/edit', {data: data, id: id})
  }
  helper.classes = (data) => {
    return store.dispatch('classroom/getAll',{data:data})
  }
  helper.students = () => {
    return store.dispatch('classroom/getAllStudents')
  }
  helper.classroom = (id) => {
    return store.dispatch('classroom/getClass', {id: id})
  }
  helper.removeStudentEnrollment = (id) => {
    return store.dispatch('classroom/removeStudentEnrollment', {id: id})
  }
  helper.removeStudent = (id) => {
    return store.dispatch('classroom/removeStudent', {id: id})
  }
  helper.classesList = (pagination, filter) => {
    console.log('u')
    return store.dispatch('classroom/getClassesList', {pagination: pagination, filter: filter})
  }
  helper.studentsList = (pagination, filter) => {
    return store.dispatch('classroom/getStudentsList', {pagination: pagination, filter: filter})
  }
  helper.addStudentToClass = (stdId,classId)=>{
    return store.dispatch('classroom/addStudentToClass',{std:stdId,cl:classId})
  }
  Vue.prototype.$classes = helper

}
