Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

const store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0


class Customer {

  constructor(name, employer){
    this.name = name;
    if (employer){
      this.employerId = employer.id;
    }
    this.id = ++customerId;
    store.customers.push(this)
  }

  meals(){
    return store.deliveries.map(delivery =>{
      if (delivery.customer() === this){
        return delivery.meal()
      }
    }).filter(Boolean)
  }

  totalSpent(){
    return this.meals().reduce(
      ( acc, cur ) => acc + cur.price,
    0)
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id;
    })
  }
}

class Meal {

  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this)
  }

  static byPrice(){
    return store.meals.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return this.id === delivery.mealId
    })
  }

  customers(){
    return store.deliveries.map(delivery => {
      if (delivery.mealId === this.id){
        return delivery.customer();
      }
    }).filter(Boolean)
  }



}


class Delivery {
  constructor(meal, customer){
    if(meal){
      this.mealId = meal.id;
    }
    if(customer){
      this.customerId = customer.id;
    }
    this.id = ++deliveryId;
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => {
      return this.mealId === meal.id;
    })
  }

  customer(){
    return store.customers.find(customer => {
      return this.customerId === customer.id;
    })
  }
}

//
class Employer {

  constructor(name){
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this)
  }

  employees(){
    return store.customers.filter(customer => {
      return customer.employerId === this.id;
    })
  }

  deliveries(){
    let arr1 = this.employees().map(employee =>{
      return employee.deliveries();
    })

    return [].concat.apply([], arr1)
  }

  meals(){
    let arr1 = this.employees().map(employee => {
      return employee.meals();
    })

    let arr2 =  [].concat.apply([], arr1)
    return arr2.unique()
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
