let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
let store = { deliveries: [], employers: [], customers: [], meals: [] };
//
class Customer{
  constructor(name, employer = {}){
    this.name = name
    this.employer = employer.id
    this.id = ++customerId
    store.customers.push(this)
  }

  meals(){
    return this.deliveries().map(each => {
      return each.meal();
    });
  }

  deliveries(){
    return store.deliveries.filter(each => {
      return each.customerId === this.id
    });
  }

  totalSpent() {
   return this.meals().reduce(function(sum, meal) {
     return sum + meal.price;
   }, 0);
  }
}

class Meal{
  constructor(title, price){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(eachDelivery => {
      return eachDelivery.mealId === this.id
    });
  }

  customers(){
    return this.deliveries().map(each => {
      return each.customer()
    });
  }

  static byPrice(){
    return store.meals.sort(function(a,b){
      return a.price < b.price
    })
  }
}

class Delivery{
  constructor(meal = {}, customer = {}) {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
      return store.meals.find(meal => {
        return meal.id === this.mealId;
      });
    }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }
}


class Employer{
  constructor(name){
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(each => {
      return each.employer === this.id
    });
  }

  deliveries(){
    let allDeliveries = this.employees().map(each => {
      return each.deliveries();
    });
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals(){
    let allMeals = this.deliveries().map(each => {
      return each.meal();
    });

    let merged = [...new Set(allMeals)]
    return merged
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

  }

}
