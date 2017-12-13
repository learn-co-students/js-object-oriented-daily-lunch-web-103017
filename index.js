let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    if (employer) {this.employerId = employer.id}
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals() {
    let ds = this.deliveries()
    return ds.map( delivery => delivery.meal());
  }

  totalSpent() {
    let total = 0
    let ms = this.meals()
    ms.forEach(function(meal) {total += meal.price})
    return total
    // let total = this.meals().reduce((acc, meal) => acc + meal.price)
    // return total
  }
}

let mealId = 0
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers(){
    let ds = this.deliveries()
    return ds.map( delivery => delivery.customer());
  }
  static byPrice(){
    return store.meals.sort(function(a, b) {
    return b.price - a.price })
  }
}

let deliveryId = 0
class Delivery {
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal) { this.mealId = meal.id}
    if (customer) {this.customerId = customer.id}
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(meal => this.mealId === meal.id)
  }

  customer(){
    return store.customers.find(customer => this.customerId === customer.id)
  }

}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    let es = this.employees()
    let result = es.map(function(e) {return e.deliveries()})
    return [].concat.apply([], result)
  }

  meals(){
    let ds = this.deliveries()
    let ms = ds.map(function(delivery){return delivery.meal()})
    return [...new Set(ms)]
  }

  mealTotals(){
    let ds = this.deliveries()
    console.log(ds)
    let counter = {}
    for (let element in ds) {
      console.log("element is", ds[element].mealId)
      if (counter.hasOwnProperty(ds[element].mealId)){
        counter[ds[element].mealId] += 1
      } else {
        counter[ds[element].mealId] = 1
      }

    }
    console.log(counter)
    return counter
    }

    // ds.forEach(function(delivery){
    //   if (result[delivery.mealId] === undefined){
    //     result[delivery.mealId] = 0
    //   } else {
    //     result[delivery.mealId] += 1
    //   }
    // })
    // console.log(result)
    // return counter
    //get all deliveries.  empID, mealID
    //returnhash[mealId] += 1
    //return returnhast
  }

//
// bob = new Customer("bob")
// soup = new Meal("soup", 50)
// d1 = new Delivery(soup, bob)
