const gameScores = [123, 456, 789, 321, 654]; // Array to store game scores
const favoriteThings = [
  "raindrops on roses",
  "whiskers on kittens",
  "bright copper kettles",
  "warm woolen mittens",
  "brown paper packages tied up with strings",
];
const voters = [
  { name: "Bob", age: 30, voted: true },
  { name: "Jake", age: 32, voted: true },
  { name: "Kate", age: 25, voted: false },
  { name: "Sam", age: 20, voted: false },
  { name: "Phil", age: 21, voted: true },
];

function getLastItem<PlaceholderType>(
  arr: PlaceholderType[],
): PlaceholderType | undefined {
  return arr[arr.length - 1];
}

console.log(getLastItem(gameScores));
console.log(getLastItem(favoriteThings));
console.log(getLastItem(voters));

export default function test_3() {
  return <div className="">page component</div>;
}
