import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {

    const { signOut } = useAuthenticator();
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>
        Successful login
      </h1>
            <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
