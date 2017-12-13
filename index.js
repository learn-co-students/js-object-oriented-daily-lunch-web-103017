const store = {employers: [], customers: [], deliveries: [], meals: []}

let deliveryId = 0
let employerId = 0
let customerId = 0
let mealId = 0

class Delivery {
  constructor(meal, customer){
    // debugger
    if (customer){this.mealId = meal.id}
    if (meal) {this.customerId = customer.id}
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find( meal => {
      return meal.id === this.mealId
    })
  }

  customer(){
    return store.customers.find( customer => {
      return customer.id === this.customerId
    })
  }
}

class Employer {
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter( (customer) => {
      return customer.employerId === this.id
    })
  }

  deliveries(){
    const arr = []
    for (const customer of this.employees()){
      console.log(typeof customer.deliveries())
      // console.log(Array.prototype.customer.deliveries())
      for (const delivery of customer.deliveries()){
        arr.push(delivery)
      }
    }
    return arr
  }

  meals(){
    const arr = []
    this.employees().map(employee => {
      employee.meals().forEach(meal => {
        if (!arr.includes(meal)){
          arr.push(meal)
        }
      })
    })
    return arr
  }

  mealTotals(){
    const output = {}
    // console.log(this.meals())
    for (const meal of this.meals()){
      // console.log(meal.id)
      output[meal.id] = 0
      for (const delivery of this.deliveries()){
        if (delivery.mealId === meal.id){
          output[meal.id] += 1
        }
      }
    }
    return output
  }

}

class Meal {
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  static byPrice(){
    return store.meals.sort(function(a, b){
      return b.price - a.price
    })
  }
  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return this.deliveries().map((delivery) => {
      return delivery.customer()
    })
  }

}

class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer){this.employerId = employer.id}
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter( delivery =>{
      return delivery.customerId === this.id
    })
  }

  meals(){
    return this.deliveries().map(delivery =>{
      return delivery.meal()
    })
  }

  totalSpent(){
    let sum = 0
    for(const meal of this.meals()){
        sum += meal.price
      }
    return sum
  }
}
