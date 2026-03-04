function Person(name) {
  this.name = name;
  this.say = () => {
    console.log(`Hi,my name is ${this.name}`);
  };
}

const p1 = new Person("zmq");
const p2 = new Person("lyq");

// Person.prototype.say = function () {
//   console.log(`Hi,I'm ${this.name}`);
// };

p1.say();
p2.say();
