type UserRole = "admin" | "user" | "guest";
type User = {
  id: number;
  username: string;
  role: UserRole;
};
let nextUserId = 1;

const people: User[] = [
  { id: nextUserId++, username: "John", role: "admin" },
  { id: nextUserId++, username: "Jane", role: "user" },
  { id: nextUserId++, username: "Bob", role: "guest" },
];

function fetchUserDetails(username: string): User {
  const user = people.find((person) => person.username === username);
  if (!user) {
    throw new Error(`User with username "${username}" not found`);
  }
  return user;
}

function updateUser(id: number, updates: Partial<User>) {
  const foundUser = people.find((user) => user.id === id);
  if (!foundUser) {
    console.error(`User with ID ${id} not found`);
    return;
  }
  Object.assign(foundUser, updates);
}

updateUser(1, { role: "guest" });

console.log(people);

export default function Test_2() {
  // Example of safe usage in try-catch
  try {
    const adminUser = fetchUserDetails("John");
    return (
      <div className="">
        <h1>User Details</h1>
        <p>Username: {adminUser.username}</p>
        <p>Role: {adminUser.role}</p>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">Error: {(error as Error).message}</div>
    );
  }
}
