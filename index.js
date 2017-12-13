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
    return store.deliveries.filter((delivery) => this.id === delivery.customerId)
  }
  meals(){
    const mealIds = this.deliveries().map(function(delivery){
      return delivery.mealId;
    })
    const meals = []
    for(const id of mealIds){
      const cust = store.meals.find(function(meal){return meal.id === id})
      meals.push(cust)
    }
    return meals
  }

  totalSpent(){
    const delCust = store.deliveries.filter((delivery) => {return this.id === delivery.customerId })
    const meals = []
    for (const del of delCust){
      meals.push(del.meal())
    }
    return meals.reduce(function(acc, meal, meals){return acc + meal.price},0)
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
    const customerIds = this.deliveries().map(function(delivery){
      return delivery.customerId;
    })
    const customers = []
    for(const id of customerIds){
      const cust = store.customers.find(function(customer){return customer.id === id})
      customers.push(cust)
    }
    return customers
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
    const employees = this.employees()
    const deliveries = [];
    employees.forEach(function(employee){
      const empDelv = employee.deliveries();
      for(const del of empDelv){
        deliveries.push(del)
      }
    })
    return deliveries;
  }
  meals(){
    const employees = this.employees()
    const meals = [];
    // employees.forEach(function(employee){
    //   const empDelv = employee.meals();
    //   for(const del of empDelv){
    //     meals.push(del)
    //   }
    // })
    employees.forEach(function(employee){
      const empDelv = employee.meals();
      meals.push.apply(meals, empDelv)
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
