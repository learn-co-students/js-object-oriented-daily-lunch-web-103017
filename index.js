let store = {customers: [], meals: [], deliveries: [], employers: []}

let employeeId =0;
let customerId =0;
let deliveryId =0;
let mealId =0;

class Customer{
  constructor(name, employer){
    this.id = ++customerId;
    this.name = name;
    if(employer){
      this.employerId = employer.id
    }
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter((delivery) => {return this.id === delivery.customerId})
  }
  meals(){
    return this.deliveries().map(function(delivery){return delivery.meal()})
  }

  totalSpent(){
    return this.meals().reduce(function(acc, meal, meals){return acc + meal.price},0)
  }
}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price =  price;
    store.meals.push(this);
  }
  static byPrice(){
    return store.meals.sort(function(a,b){return b.price - a.price})
  }
  deliveries(){
    return store.deliveries.filter((delivery) => this.id === delivery.mealId)
  }
  customers(){
    return this.deliveries().map(function(delivery){
      return delivery.customer();
    })
  }
}

class Delivery{
  constructor(meal, customer){
    this.id = ++deliveryId;
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id
    }
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find((meal) => {return meal.id === this.mealId})
  }
  customer(){
    return store.customers.find((customer) => {return customer.id === this.customerId})

    // return store.customers.find(function(customer){return customer.id === this.customerId}).bind(this)
  }
}

class Employer{
  constructor(name){
    this.id = ++employeeId;
    this.name = name;
    store.employers.push(this);
  }
  employees(){
    return store.customers.filter((customer) => {return this.id === customer.employerId})
  }
  deliveries(){
    const deliveries = [];
    this.employees().forEach(function(employee){
      deliveries.push.apply(deliveries, employee.deliveries())
    })
    return deliveries;
  }
  meals(){
    const meals = [];
    // employees.forEach(function(employee){
    //   const empDelv = employee.meals();
    //   for(const del of empDelv){
    //     meals.push(del)
    //   }
    // })
    this.employees().forEach(function(employee){
      meals.push.apply(meals, employee.meals())
    })

    return [...new Set(meals)];
  }
  mealTotals(){
    const meals = this.deliveries().map(function(delivery){
      return delivery.meal()
    })

    const output = {};

    meals.forEach(function(meal){
      output[meal.id] = 0;
    })

    meals.forEach(function(meal){
      output[meal.id] += 1;
    })

    return output
  }
}
