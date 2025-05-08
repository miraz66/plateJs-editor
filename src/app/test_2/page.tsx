type Person = {
  name: string;
  age: number;
  isStudent: boolean;
};

const person_1: Person = {
  name: "John",
  age: 25,
  isStudent: false,
};

const person_2: Person = {
  name: "Jane",
  age: 22,
  isStudent: true,
};

const people: Array<Person> = [person_1, person_2];

export default function Test_2() {
  console.log("people", people);

  return <div className="">page component</div>;
}
