const studentsArray = [
  { name: 'Евгений', surname: 'Процик', lastname: 'Игоревич', birthDay: new Date(1994, 11, 28), years: 2014, faculty: 'Программист' },
  { name: 'Максим', surname: 'Воробьев', lastname: 'Владиславович', birthDay: new Date(2001, 3, 13), years: 2022, faculty: 'Строитель' },
  { name: 'Иван', surname: 'Иванов', lastname: 'Иванович', birthDay: new Date(1994, 12, 5), years: 2019, faculty: 'Инженер' },
  { name: 'Максим', surname: 'Башлыков', lastname: 'Витальевич', birthDay: new Date(2000, 7, 11), years: 2021, faculty: 'Фотограф' },
  { name: 'Георгий', surname: 'Медведев', lastname: 'Валерьевич', birthDay: new Date(1995, 5, 22), years: 2018, faculty: 'Историк' },
]

let copyStudentsArray = [...studentsArray];

let newArr = [];

let date = new Date();

let sortMark = 'fio',
    sortDir = true

const app = document.getElementById('app'),
      table = document.createElement('table'),
      thead = document.createElement('thead'),
      tbody = document.createElement('tbody'),

      formAdd = document.getElementById('add-form'),
      inputSurname = document.getElementById('surname'),
      inputName = document.getElementById('name'),
      inputLastname = document.getElementById('lastname'),
      inputBirthdate = document.getElementById('birth-date'),
      inputYears = document.getElementById('period'),
      inputFaculty = document.getElementById('faculty'),
      wrong  = document.querySelector('.wrong-text'),

      filterForm = document.createElement('form'),
      filterInpName = document.createElement('input'),
      filterInpFaculty = document.createElement('input'),
      filterInpYears = document.createElement('input'),
      filterInpBirthDay = document.createElement('input'),

      tableHeadTr = document.createElement('tr'),
      tableHeadThName = document.createElement('th'),
      tableHeadThBirthDate = document.createElement('th'),
      tableHeadThYears = document.createElement('th'),
      tableHeadThFaculty = document.createElement('th')

filterForm.classList.add('mb-3', 'filter-form');
filterInpName.classList.add('form-control', 'mb-3');
filterInpFaculty.classList.add('form-control', 'mb-3');
filterInpYears.classList.add('form-control', 'mb-3');
filterInpBirthDay.classList.add('form-control', 'mb-3');

filterInpName.placeholder = 'Ф. И. О.';
filterInpFaculty.placeholder = 'Факультет';
filterInpYears.placeholder = 'Год поступления';
filterInpBirthDay.placeholder = 'Год рождения';

table.classList.add('table', 'table-dark', 'table-striped', 'table-hover')
tableHeadThName.textContent = 'Ф.И.О.';
tableHeadThBirthDate.textContent = 'Дата рождения и возраст';
tableHeadThYears.textContent = 'Годы обучения и номер курса';
tableHeadThFaculty.textContent = 'Факультет';

tableHeadTr.append(tableHeadThName);
tableHeadTr.append(tableHeadThBirthDate);
tableHeadTr.append(tableHeadThYears);
tableHeadTr.append(tableHeadThFaculty);

filterForm.append(filterInpName);
filterForm.append(filterInpFaculty);
filterForm.append(filterInpYears);
filterForm.append(filterInpBirthDay);
app.append(filterForm);

thead.append(tableHeadTr);
table.append(thead);
table.append(tbody);
app.append(table);

document.querySelectorAll('th').forEach(function(element) {element.classList.add('student-info')});

function addStudent(arrData) {
  const studentTr = document.createElement('tr'),
        studentName = document.createElement('td'),
        studentBirthDate = document.createElement('td'),
        studentYears = document.createElement('td'),
        studentFaculty = document.createElement('td')

  studentName.textContent = arrData.fio;
  studentBirthDate.textContent = arrData.birthYears;
  studentYears.textContent = arrData.yearsCourse;
  studentFaculty.textContent = arrData.faculty;
  
  studentTr.append(studentName);
  studentTr.append(studentBirthDate);
  studentTr.append(studentYears);
  studentTr.append(studentFaculty);
  return studentTr;
}

function filter(arr, prop, value) {
  return arr = arr.filter(function(oneStudent) {
    if (String(oneStudent[prop]).includes(value.trim())) return true;
  })
}

function render(arrData) {
  tbody.innerHTML = '';
  copyStudentsArray = [...arrData];
  
  for (const oneStudent of copyStudentsArray) {
    oneStudent.fio = oneStudent.surname + ' ' + oneStudent.name + ' ' + oneStudent.lastname
    oneStudent.birthYears = `${oneStudent.birthDay.getFullYear()} (${(date.getFullYear() - oneStudent.birthDay.getFullYear())} лет)`;
    if ((date.getFullYear() - oneStudent.years) > 4) {
      oneStudent.yearsCourse = `${oneStudent.years} (закончил)`;
    } else if ((date.getFullYear() - oneStudent.years) === 4 && date.getMonth() > 7) {
      oneStudent.yearsCourse = `${oneStudent.years} (закончил)`;
    } else {
      oneStudent.yearsCourse = `${oneStudent.years} (${date.getFullYear() - parseInt(oneStudent.years)} курс)`;
    }
  }

  copyStudentsArray = copyStudentsArray.sort(function(a, b) {
    let sort = a[sortMark] < b[sortMark]

    if (sortDir === false) sort = a[sortMark] > b[sortMark]

    if (sort) return -1;
  })

  if (filterInpName.value.trim() !== '') {
    copyStudentsArray = filter(copyStudentsArray, 'fio', filterInpName.value)
  }

  if (filterInpFaculty.value.trim() !== '') {
    copyStudentsArray = filter(copyStudentsArray, 'faculty', filterInpFaculty.value)
  }

  if (filterInpYears.value.trim() !== '') {
    copyStudentsArray = filter(copyStudentsArray, 'years', filterInpYears.value)
  }

  if (filterInpBirthDay.value.trim() !== '') {
    copyStudentsArray = filter(copyStudentsArray, 'birthYears', filterInpBirthDay.value)
  }

  for (const oneStudent of copyStudentsArray) {
    const newStudent = addStudent(oneStudent)

    tbody.append(newStudent)
  }
}

render(studentsArray);

tableHeadThName.addEventListener('click', function() {
  sortMark = 'fio';
  sortDir = !sortDir; 
  render(copyStudentsArray);
})

tableHeadThBirthDate.addEventListener('click', function() {
  sortMark = 'birthDay';
  sortDir = !sortDir; 
  render(copyStudentsArray);
})

tableHeadThYears.addEventListener('click', function() {
  sortMark = 'years';
  sortDir = !sortDir; 
  render(copyStudentsArray);
})

tableHeadThFaculty.addEventListener('click', function() {
  sortMark = 'faculty';
  sortDir = !sortDir; 
  render(copyStudentsArray);
})

formAdd.addEventListener('submit', function(e) {
  e.preventDefault()

  if (inputSurname.value.trim() === '') {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели фамилию';
    return
  }

  if (inputName.value.trim() === '') {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели имя';
    return
  }

  if (inputLastname.value.trim() === '') {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели отчество';
    return
  }
  
  if (inputBirthdate.valueAsDate === null || inputBirthdate.valueAsDate.getFullYear() < 1900) {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели дату рождения';
    return
  }

  if (inputYears.value.trim() === '') {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели дату поступления';
    return
  } else if (inputYears.value.trim() < 2000) {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Введите год начала обучения в диапазоне от 2000-го';
    return
  }

  if (inputFaculty.value.trim() === '') {
    wrong.classList.remove('visible-hidden')
    wrong.textContent = 'Вы не ввели факультет';
    return
  }

  studentsArray.push({
    name: inputName.value,
    surname: inputSurname.value,
    lastname: inputLastname.value,
    birthDay: inputBirthdate.valueAsDate,
    years: parseInt(inputYears.value),
    faculty: inputFaculty.value,
  })

  render(studentsArray)

  inputSurname.value = null;
  inputName.value = null;
  inputLastname.value = null;
  inputBirthdate.valueAsDate = null;
  inputYears.value = null;
  inputFaculty.value = null;
  wrong.classList.toggle('visible-hidden');
})

filterForm.addEventListener('submit', function(event) {
  event.preventDefault()
})

filterInpName.addEventListener('input', function() {
  render(studentsArray)
})

filterInpFaculty.addEventListener('input', function() {
  render(studentsArray)
})

filterInpYears.addEventListener('input', function() {
  render(studentsArray)
})

filterInpBirthDay.addEventListener('input', function() {
  render(studentsArray)
})
