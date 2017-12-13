let store = {customers: [], employers: [], meals: [], deliveries: []}

let customerId = 0
class Customer {
  constructor(name, employer){
    this.name = name;
    this.employer = employer;
    this.id = ++customerId;
    if(employer){
      this.employerId = employer.id;
    }

    store.customers.push(this);
  }

  setEmployer(employer) {
    this.employerId = employer.id
  }

  totalSpent() {
    let allDeliveries = store.deliveries.filter(function(el) {
      return el.customer()
    }.bind(this));

    return allDeliveries.reduce(function(a, b) {
      return a.meal().price + b.meal().price;
    })
  }

  deliveries() {
    // return store.deliveries.filter(function(delivery) {
    //   return delivery.customer();
    // })
    let allDeliveries = store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id;
    }.bind(this));
    return allDeliveries;
  }

  meals() {
    let allDeliveries = store.deliveries.filter(function(delivery) {
      return delivery.customerId === this.id
    }.bind(this));

    return allDeliveries.map(function(delivery) {
      return delivery.meal();
    })
  }
}

let employerId = 0
class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerId;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id;
    }.bind(this))
  }

  deliveries() {
    let allDeliveries =  this.employees().map(function(employee) {
      return employee.deliveries();
    })
    let newarr = [].concat.apply([], allDeliveries);
    return newarr;
  }

  meals() {
    let allDeliveries = this.employees().map(function(employee) {
      return employee.meals();
    });
    let newarr = [].concat.apply([], allDeliveries)

    let uniqueArr = []

    newarr.forEach(function(el) {
      if (uniqueArr.includes(el) === false) {
        return uniqueArr.push(el)
      }
    })
    return uniqueArr;
  }

  mealTotals() {
    let obj = {}
    this.deliveries().forEach(function(delivery) {
      obj[delivery.mealId] = 0;
    })

    this.deliveries().forEach(function(delivery) {
      obj[delivery.mealId] += 1;
    })
    return obj
  }
}

let mealId = 0

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId;

    store.meals.push(this);
  }
  static byPrice() {
    return store.meals.slice().sort(function(a,b) {
      return b.price - a.price;
    })
  }

  deliveries() {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id
    }.bind(this));
  }

  customers() {
    return store.customers.filter(function(customer) {
      return customer.meals();
    });
  }
}
let deliveryId = 0
class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId

    if(meal){
      this.mealId = meal.id;
    };

    if(customer){
      this.customerId = customer.id;
    };

    store.deliveries.push(this);
  }
  setCustomer(customer){
    this.customerId = customer.id
  }

  customer(){
    return store.customers.find(function(customer) {
      return customer.id === this.customerId;
    }.bind(this))
  }

  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this))
  }
}
