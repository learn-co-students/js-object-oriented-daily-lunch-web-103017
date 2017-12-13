const store = {employers: [], customers: [], deliveries: [], meals: []}

let deliveryId = 0
let employerId = 0
let customerId = 0
let mealId = 0

class Delivery {
  constructor(meal, customer){
    // debugger
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
}

class Employer {
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
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
}

class Customer {
  constructor(name, employer) {
    this.name = name
    this.employerId = employer.id
    this.id = ++customerId
    store.customers.push(this)
  }
}
