let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
let store = {drivers: [], meals: [], employers: [], customers: [], deliveries: []}


class Customer {

	constructor(name, employer = {}){
		this.name = name
		this.id = ++customerId
		this.employerId = employer.id
		store.customers.push(this)
	}
	totalSpent() {
		return this.meals().reduce(function(sum, meal) { return sum + meal.price}, 0)
	}
	deliveries() {
		return store.deliveries.filter(delivery => {
			return delivery.customerId === this.id
		})
	}
	meals() {
		return this.deliveries().map(delivery => {
			return delivery.meal()
		})
	}
}

class Meal {
	constructor(title, price){
		this.title = title
		this.price = price
		this.id = ++mealId
		store.meals.push(this)
	}

	deliveries(){
		return store.deliveries.filter(delivery => {
			return delivery.mealId === this.id
		})
	}

	customers(){
		return this.deliveries().map(delivery => {
			return delivery.customer()
		})
	}

	static byPrice() {
		return store.meals.sort(function (b,a) {
			return a.price - b.price
		})
	}

}


class Delivery {
	constructor(meal = {}, customer = {}){
		this.id = ++deliveryId
		this.mealId = meal.id
		this.customerId = customer.id
		store.deliveries.push(this)
	}
	customer(){
		return store.customers.find(customer => {
			return this.customerId === customer.id
		})
	}
	meal(){
		return store.meals.find(meal => {
			return this.mealId === meal.id
		})
	}
}

class Employer{
	constructor(name){
		this.name = name
		this.id = ++employerId
		store.employers.push(this)
	}

	employees(){
		return store.customers.filter(customer => {
			return customer.employerId === this.id
		})
	}

	deliveries(){
		let allDeliveries = this.employees().map(customer => {
			return customer.deliveries()
		})
		return [].concat.apply([], allDeliveries)
	}

	meals(){
		let allMeals = this.deliveries().map(delivery => {
			return delivery.meal()
		})
		return [...new Set(allMeals)]
	}

	mealTotals() {
		let allMeals = this.deliveries().map(delivery => {
			return delivery.meal()
		})
		let totals = {}
		allMeals.forEach(function(meal) {
			totals[meal.id] = 0
		})
		allMeals.forEach(function(meal) {
			totals[meal.id] += 1
		})
		return totals
	}


}
