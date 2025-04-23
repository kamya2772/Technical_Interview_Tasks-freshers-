import UserList from "./component/UserList";
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">User Directory</h1>
      <UserList />
    </div>
  );
}

export default App;
