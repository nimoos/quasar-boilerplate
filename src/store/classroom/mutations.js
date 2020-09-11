export function setClassOptions(state, data) {
  let opt = []
  data.map((v, i) => {
    opt.push({
      label: v.name,
      value: v.id
    })
  })
  state.classes = opt
  console.log(state.classes)
}

export function setClassesList(state, data) {
  state.classes = data
}
export function setStudentsList(state, data) {
  state.students = data
}
export function setStudents(state, data) {
  let opt = []
  data.map((v, i) => {
    opt.push({
      label: v.name,
      value: v.id
    })
  })
  state.students = opt
}
