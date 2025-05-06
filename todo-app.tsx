"use client"

import type React from "react"

import { useState } from "react"
import { Check, Pencil, Plus, Trash2, X } from "lucide-react"

export default function TodoApp() {
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  // Add a new todo
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === "") return

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, newTodoItem])
    setNewTodo("")
  }

  // Toggle todo completion status
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Start editing a todo
  const startEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  // Save edited todo
  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null)
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">My Todo List</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6 max-w-md">
        {/* Todo Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-colors"
            aria-label="Add todo"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 my-10">No tasks yet. Add one above!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`border rounded-md p-3 flex items-center gap-2 ${
                  todo.completed ? "bg-gray-50" : "bg-white"
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    todo.completed ? "bg-purple-500 border-purple-500" : "border-gray-300"
                  }`}
                  aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {todo.completed && <Check className="h-3 w-3 text-white" />}
                </button>

                {/* Todo Text */}
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow p-1 border rounded focus:outline-none focus:ring-1 focus:ring-purple-300"
                    autoFocus
                  />
                ) : (
                  <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
                )}

                {/* Action Buttons */}
                <div className="flex gap-1">
                  {editingId === todo.id ? (
                    <>
                      <button onClick={saveEdit} className="text-green-600 hover:text-green-800" aria-label="Save edit">
                        <Check className="h-5 w-5" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-600 hover:text-red-800" aria-label="Cancel edit">
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="text-blue-600 hover:text-blue-800"
                        aria-label="Edit todo"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete todo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          <p>Todo List App &copy; {new Date().getFullYear()}</p>
          <p className="text-xs mt-1">Made with React</p>
        </div>
      </footer>
    </div>
  )
}
