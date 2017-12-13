let store = {customers: [], employers: [], deliveries: [], meals: []}

let customerId = 0

class Customer {

  constructor(name, employer) {
    this.name = name
    this.employer = employer
    this.id = ++customerId
    if (employer) {
      this.employerId = employer.id
    }
    store.customers.push(this)
  }

// class methods
    meals() {
      return this.deliveries().map(delivery => delivery.meal())
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    totalSpent() {
      return this.meals().reduce(function (total, meal) {
  return total + meal.price;
}, 0);
    }
}

let employerId = 0
class Employer {

  constructor(name) {
    this.name = name
    this.id = ++employerId

    store.employers.push(this)

  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)
  }

  deliveries() {
    let allDel =  this.employees().map(employee => employee.deliveries())
    let merged = [].concat.apply([], allDel)
    return merged
  }

  meals() {
    let arr = this.deliveries().map(delivery => delivery.meal())
    // look back at this
    let uniqueArray = [...new Set(arr)]
    return uniqueArray
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

  customer() {
    return store.customers.find(function(customer){ return customer.id === this.customerId}.bind(this))
  }

  meal() {
    return store.meals.find(function(meal){ return meal.id === this.mealId}.bind(this))
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function(a,b) {
      return b.price - a.price
    })
  }
}
