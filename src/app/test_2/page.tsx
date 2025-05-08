type UserRole = "admin" | "user" | "guest";
type User = {
  username: string;
  role: UserRole;
};

const people: User[] = [
  { username: "John", role: "admin" },
  { username: "Jane", role: "user" },
  { username: "Bob", role: "guest" },
];

function fetchUserDetails(username: string): User {
  const user = people.find((person) => person.username === username);
  if (!user) {
    throw new Error(`User with username "${username}" not found`);
  }
  return user;
}

// Correct usage - searching for existing usernames
console.log(fetchUserDetails("John")); // This will work
// console.log(fetchUserDetails("admin")); // This would throw error

export default function Test_2() {
  // Example of safe usage in component
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
