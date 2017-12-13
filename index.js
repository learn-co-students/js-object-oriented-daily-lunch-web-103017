let store = {customers: [], employers: [], meals: [], deliveries: []}

let customerId = 0

class Customer{

  constructor(name, employer){
    this.name = name
    this.employer = employer
    this.id = ++customerId
    if (employer){
      this.employerId = employer.id
    }

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){return delivery.customerId === this.id}.bind(this))
  }

  meals(){
    return this.deliveries().map(function(delivery){
      return delivery.meal()
    })
  }

  totalSpent(){
    return this.meals().reduce(function(total, meal){
      return meal.price + total
    }, 0)
  }

}

let employerId = 0

class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId

    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(function(customer){return customer.employerId === this.id}.bind(this))
  }

  deliveries(){
    let allDel =  this.employees().map(function(customer){
      return customer.deliveries()
    })
    let merged= [].concat.apply([], allDel)
    return merged
  }

  meals(){
    let allDel =  this.deliveries().map(function(delivery){
      return delivery.meal()
    })
    let merged= [...new Set(allDel)]
    return merged
  }

  mealTotals() {
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
}

}
let deliveryId = 0

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId
    if (meal){
      this.mealId = meal.id
    }
    if (customer){
      this.customerId = customer.id
    }

    store.deliveries.push(this)
  }


  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId
    }.bind(this))
  }

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId
    }.bind(this))
  }



}
let mealId = 0

class Meal{

  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(function(delivery){return delivery.mealId === this.id}.bind(this))
  }

  customers(){
    return this.deliveries().map(function(delivery){
      return delivery.customer()
    })
  }

  static byPrice(){
    return store.meals.sort(function(mealA, mealB){
      return mealB.price - mealA.price
    })
  }


}
