let store = {deliveries: [], customers: [], meals: [], employers: []}

let mealId = 0
let customerId = 0
let deliveryId = 0
let employerId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    if (meal) {
      this.mealId = meal.id
    }
    if (customer) {
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }

  customer(){
    return store.customers.find(customer => {return customer.id === this.customerId})
  }

  meal(){
    return store.meals.find(meal => {return meal.id === this.mealId})
  }

}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    if (employer) {
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  totalSpent(){
    let total = 0
    let deliveries =  store.deliveries.filter(delivery => {
      // console.log(this);
       return delivery.customerId === this.id
    })
    // console.log(deliveries)
    deliveries.forEach(delivery => {
      store.meals.forEach(meal => {if (meal.id === delivery.mealId) {total += meal.price } })})
    return total
  }

  deliveries(){
    return store.deliveries.filter(delivery => {return delivery.customerId === this.id})
  }

  meals(){
    return this.deliveries().map(delivery => {return delivery.meal()})
  }

}

class Meal {
  constructor(title, price) {
      this.id = ++mealId
      this.title = title
      this.price = price

      store.meals.push(this)
  }

  static byPrice(){
    // debugger
    return store.meals.sort(function(a,b){return b.price-a.price})
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id})
  }

  customers(){
    return this.deliveries().map(delivery => {return delivery.customer()})
  }

}

class Employer {
  constructor(name) {
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {return customer.employerId === this.id})
  }

  deliveries(){
    let arr = []
    let newArr = []
    // debugger
    this.employees().forEach(employee => {
      return arr.push(employee.deliveries())
    })
    let flatArr = [].concat.apply([], arr)
    flatArr.forEach(function (x) {
      if (!newArr.includes(x)) {
        newArr.push(x)
      }
    })
    return newArr
  }

  meals(){
    let arr = []
    let flatArr = []
     this.deliveries().forEach(delivery => {arr.push( delivery.meal())})
     arr.forEach(function(x){
       if (!flatArr.includes(x)) {
         flatArr.push(x)
       }
     })
     return flatArr
  }

  mealTotals(){
    let allMeals = this.deliveries().map(delivery => {
      return delivery.meal();
    });
    let summaryObject = {};
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] = 0;
    });
    allMeals.forEach(function(meal) {
      summaryObject[meal.id] += 1;
    });
    return summaryObject;
    // let hsh = {}
    // this.meals().forEach(function(meal){
    //   hsh[`${meal.id}`] = 0
    // })
    // this.meals().forEach(function(meal){
    //   hsh[`${meal.id}`] += 1
    // })
    // // debugger
    // return hsh
  }




}
