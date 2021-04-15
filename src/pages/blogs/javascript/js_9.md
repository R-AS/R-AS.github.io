---
title: 'Clean Code JavaScript'
date: '2021-04-15'
thumbnail: 'javascript/index.png'
type: 'javascript'
---
```toc
```
---
### 变量
**1. 取变量名需要语义化**

**Bad:**
```js
const yyyymmdstr = moment().format('YYYY/MM/DD')
```
**Good:**
```js
const currentDate = moment().format('YYYY/MM/DD')
```

**2. 对相同类型的变量使用相同的词汇**

**Bad:**
```js
getUserInfo()
getClientData()
getCustomerRecord()
```
**Good:**
```js
getUser()
```

**3. 使用可搜索的名称**

**Bad:**
```js
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000)
```
**Good:**
```js
// Declare them as capitalized named constants.
const MILLISECONDS_IN_A_DAY = 60 * 60 * 24 * 1000 //86400000

setTimeout(blastOff, MILLISECONDS_IN_A_DAY)
```

**4. 使用解释变量**

**Bad:**
```js
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
)
```
**Good:**
```js
const address = 'One Infinite Loop, Cupertino 95014'
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/
const [_, city, zipCode] = address.match(cityZipCodeRegex) || []
saveCityZipCode(city, zipCode)
```

**5. 避免使用重复性的变量**

**Bad:**
```js
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue'
}

function paintCar(car) {
  car.carColor = 'Red'
}
```
**Good:**
```js
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
}

function paintCar(car) {
  car.color = 'Red'
}
```

**6. 使用默认值**
**Bad:**
```js
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.'
  // ...
}
```
**Good:**
```js
function createMicrobrewery(name = 'Hipster Brew Co.') {
  // ...
}
```
---

### 函数
**1. 函数参数个数控制在 2 个以内**

**Bad:**
```js
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu(’Foo’, ’Bar’, ’Baz’, true)
```
**Good:**
```js
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: ’Foo’,
  body: ’Bar’,
  buttonText: ’Baz’,
  cancellable: true
})
```

**2. 函数应该只负责一个功能**

**Bad:**
```js
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}
```
**Good:**
```js
function isActiveClient(client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}

function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email)
}
```

**3. 函数名称应说明其作用**

**Bad:**
```js
function addToDate(date, month) {
  // ...
}

const date = new Date()

// It's hard to tell from the function name what is added
addToDate(date, 1)
```
**Good:**
```js
function addMonthToDate(month, date) {
  // ...
}

const date = new Date()
addMonthToDate(1, date)
```

**4. 避免复制代码**

**Bad:**
```js
function showDeveloperList(developers) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary()
    const experience = developer.getExperience()
    const githubLink = developer.getGithubLink()
    const data = {
      expectedSalary,
      experience,
      githubLink
    }

    render(data)
  })
}

function showManagerList(managers) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary()
    const experience = manager.getExperience()
    const portfolio = manager.getMBAProjects()
    const data = {
      expectedSalary,
      experience,
      portfolio
    }

    render(data)
  })
}
```
**Good:**
```js
function showEmployeeList(employees) {
  employees.forEach(employee => {
    const expectedSalary = employee.calculateExpectedSalary()
    const experience = employee.getExperience()

    const data = {
      expectedSalary,
      experience
    }

    switch (employee.type) {
      case 'manager':
        data.portfolio = employee.getMBAProjects()
        break
      case 'developer':
        data.githubLink = employee.getGithubLink()
        break
    }

    render(data)
  })
}
```

**5. 给 Object.assign 设置默认对象**

**Bad:**
```js
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
}

function createMenu(config) {
  config.title = config.title || 'Foo'
  config.body = config.body || 'Bar'
  config.buttonText = config.buttonText || 'Baz'
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true
}

createMenu(menuConfig)
```
**Good:**
```js
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true
}

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: 'Foo',
      body: 'Bar',
      buttonText: 'Baz',
      cancellable: true
    },
    config
  )
  return finalConfig
  // config now equals: {title: 'Order', body: 'Bar', buttonText: 'Send', cancellable: true}
  // ...
}

createMenu(menuConfig)
```

**6. 不要写全局函数**

**Bad:**
```js
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray)
  return this.filter(elem => !hash.has(elem))
}
```
**Good:**
```js
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray)
    return this.filter(elem => !hash.has(elem))
  }
}
```

**7. 封装判断条件**

**Bad:**
```js
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
```
**Good:**
```js
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode)
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
---
### 对象和数据结构

**1. 使用 getters 和 setters**

**Bad:**
```js
function makeBankAccount() {
  // ...

  return {
    balance: 0
    // ...
  }
}

const account = makeBankAccount()
account.balance = 100
```
**Good:**
```js
function makeBankAccount() {
  // this one is private
  let balance = 0

  // a 'getter', made public via the returned object below
  function getBalance() {
    return balance
  }

  // a 'setter', made public via the returned object below
  function setBalance(amount) {
    // ... validate before updating the balance
    balance = amount
  }

  return {
    // ...
    getBalance,
    setBalance
  }
}

const account = makeBankAccount()
account.setBalance(100)
```

**2. 给对象添加私有成员**

**Bad:**
```js
const Employee = function(name) {
  this.name = name
}

Employee.prototype.getName = function getName() {
  return this.name
}

const employee = new Employee('John Doe')
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
delete employee.name
console.log(`Employee name: ${employee.getName()}`) // Employee name: undefined
```
**Good:**
```js
function makeEmployee(name) {
  return {
    getName() {
      return name
    }
  }
}

const employee = makeEmployee('John Doe')
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
delete employee.name
console.log(`Employee name: ${employee.getName()}`) // Employee name: John Doe
```
---
**摘自[https://github.com/ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)**