const priorities = {
	LOW: "Low",
	HIGH: "High",
}

class Reminde {
	constructor(name, deadline, description = "", category = "", isRepeatTask = false, howDay) {
		this.name = name
		this.isCompleted = false
		this.date = new Date()
		this.dateUpdated = new Date()
		this.deadline = deadline
		this.description = description
		this.category = category
		this.priority = priorities.LOW
		this.id = Math.random
		this.assignedTo = ""
		this.createdBy = ""
		this.isRepeatTask = isRepeatTask
		this.howDay = howDay
	}
	remeAboutTask() {
		const date = new Date(`${this.deadline}`)
		date.setDate(date.getDate() - 1)
		const name = this.name
		const nowDate = new Date()
		setTimeout(function () {
			console.log(`Do do task: ${name}`)
		}, date - nowDate.getTime())
	}
	setAsDone() {
		this.isCompleted = true
	}
}

const task = new Reminde("title", new Date("2022-10-8 13:27"))
//task.remeAboutTask()
task.setAsDone()
// console.log(task)

class Reminders {
	constructor() {
		this.tasks = []
	}
	// TODO odświeżenie i zammiana deadlinu i zamianna na licie z zadaniami
	refresh() {
		const repeatTasks = this.tasks.filter(task => {
			// console.log(task.deadline)
			const date = new Date(`${task.deadline}`).toDateString()
			const nowDate = new Date().toDateString()
			return task.isRepeatTask && nowDate === date
		})
		
		repeatTasks.forEach(task => {
			const taskIndex = this.tasks.indexOf(task)
			// console.log(this.tasks[taskIndex].deadline)
			// console.log(typeof task.deadline)
			const deadline = task.deadline
			const newDate = new Date(
				deadline.getFullYear(),
				deadline.getMonth(),
				deadline.getDate() + task.howDay,
				deadline.getHours(),
				deadline.getMinutes()
			)
			this.tasks[taskIndex] = { ...task, deadline: newDate }
			// console.log(this.tasks[taskIndex].deadline)
		})
		// const tasksIndex = this.tasks.indexOf(task)
		// this.tasks.pop(tasksIndex)
	}
	getAll() {
		return this.tasks
	}

	getAllNotCompleted() {
		return this.tasks.filter(task => !task.isCompleted)
	}

	getAllForToday() {
		return this.tasks.filter(task => {
			const date = new Date(`${task.deadline}`).toDateString()
			const nowDate = new Date().toDateString()
			return date === nowDate
		})
	}

	getAllWithPhrase(phrase) {
		return this.tasks.filter(task => task.name.includes(phrase) || task.description.includes(phrase))
	}
	addTask(task) {
		this.tasks.push(task)
	}

	deleteTask(task) {
		const tasksIndex = this.tasks.indexOf(task)
		this.tasks.pop(tasksIndex)
	}

	editTask(updatedTask, index) {
		this.tasks[index] = { ...this.tasks[index], ...updatedTask }
	}
}

const task1 = new Reminde("name1", new Date(2022, 5, 11, 09, 28, 00), "abc", "12", true, 5)
const task2 = new Reminde("name2", new Date(2022, 6, 11, 09, 28, 00), "abc", "12")
const task3 = new Reminde("name3", new Date(2022, 13, 11, 09, 28, 00), "abc", "12")
const task4 = new Reminde("name4", "2022-10-17", "abc", "12")
const task5 = new Reminde("name5", "2022-10-25", "abc", "12")
const task6 = new Reminde("name6", "2022-10-19", "abc", "12")
const task7 = new Reminde("name7", "2022-10-17", "abc", "12")
const task8 = new Reminde("name8", "2022-10-15", "abc", "12")
const task9 = new Reminde("name9", "2022-10-20", "abc", "12")
const task10 = new Reminde("name10", "2022-10-17", "abc", "12")
const task11 = new Reminde("name11", "2022-10-25", "abc", "12")
const task12 = new Reminde("name12", "2022-10-19", "abc", "12")
const task13 = new Reminde("name13", "2022-10-20", "abc", "12")
const task14 = new Reminde("name14", "2022-10-17", "abc", "12")
const task15 = new Reminde("name15", "2022-10-25", "abc", "12")
const task16 = new Reminde("name16", "2022-10-19", "abc", "12")
const task17 = new Reminde("name17", "2022-10-17", "abc", "12")
const task18 = new Reminde("name18", "2022-10-18", "abc", "12")
const task19 = new Reminde("name19", "2022-10-20", "abc", "12")
const task20 = new Reminde("name20", "2022-10-17", "abc", "12")

const updated = new Reminde("updated", "2022-10-25", "abc", "12")

const tasks = new Reminders()
tasks.addTask(task1)
tasks.addTask(task2)
tasks.refresh()
tasks.addTask(task3)
// tasks.addTask(task4)
// tasks.addTask(task5)
// tasks.addTask(task6)
// tasks.addTask(task7)
// tasks.addTask(task8)
// tasks.addTask(task9)
// tasks.addTask(task10)
// tasks.addTask(task11)
// tasks.addTask(task12)
// tasks.addTask(task13)
// tasks.addTask(task14)
// tasks.addTask(task15)
// tasks.addTask(task16)
// tasks.addTask(task17)
// tasks.addTask(task18)
// tasks.addTask(task19)
// tasks.addTask(task20)

// console.log(tasks.getAll())
//console.log(tasks.getAllNotCompleted())
//console.log(tasks.getAllForToday())
//console.log(tasks.getAllWithPhrase("2"))
// tasks.deleteTask(task20)
// console.log(tasks.getAll())
// tasks.editTask(updated, 18)
// console.log(tasks.getAll())

// const date = new Date()
// console.log(date.getFullYear())
// const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7)


const week = document.querySelector('.week');
const days = document.querySelectorAll('.day');

/////Szukamy poczatku tygodnia, szukamy taska pomiedzy poczatkiem a końcem tygodnia. Mając taką grupę tasków dzielimy je na dni tygodnia.///////


const assignTaskWeek = (tasks,nameDay) => {
    const oneDay = tasks.filter(task => task.deadline.getDay() === nameDay /*task.deadline.getDate() === date.getDate()*/);
    return oneDay
}


let weekObject = {}


for (let i = 0; i < 7; i++ ) {
weekObject[i]= assignTaskWeek(tasks.getAll(), i);
}


console.log(weekObject)

const getStartDateWeek = nowDate => {
	const startDate = nowDate.getDate() - nowDate.getDay()

	let date
	if (startDate === -1) {
		const month = nowDate.getMonth()
		console.log(month)

		switch (month) {
			case 10:
				date = new Date()
				date.setMonth(9)
				date.setDate(31)
				break
		}
	} else date = new Date(2022, 10, startDate)
	return date
}



