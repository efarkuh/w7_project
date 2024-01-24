import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage"; // Import the HomePage component
import Professional from "./pages/Professional";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function App() {
 
  // need to add function which fetches our data and renders it on screen
  const [messages, setMessages] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [form, setForm] = useState({name: "", message: "", category: ""});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  

  useEffect(() => {
    handleGetMessages();
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  async function handleGetMessages() {
    // make a fetch request to my api
    const response = await fetch("https://w7-server.onrender.com");
    const data = await response.json();

    // get all the messages
    setMessages(data);
  }
  
  async function handleDelete(id) {
    const response = await fetch(`https://w7-server.onrender.com/${id}`, { method: 'DELETE' });
    const data = await response.json();
    console.log(data);
    handleGetMessages()
  }

  const fetchCategories = async () => {
    const response = await fetch("https://w7-server.onrender.com/categories");
    const data1 = await response.json();
    setCategories(data1);
  };

  // submit form
    
  async function handleSubmit(event) {
    event.preventDefault();
    const formValues = {
      "name": name,
      "message": message,
      "category": category
    };
    console.log(formValues);
    try {
      const response = await fetch("https://w7-server.onrender.com/", { 
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formValues)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Form has been submitted successfully", data);
  
      // Additional logic after successful form submission (e.g., resetting form fields, updating UI)
      // Clear the form by resetting the state variables
        setName('');
        setMessage('');
        setCategory(''); // or set to the initial value if you have one

    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors (e.g., show error message to the user)
    };
    handleGetMessages()
  }
  
  const getCategoryName = (categoryId) => {
    // Convert both categoryId and cat.id to the same type (e.g., both to strings) to ensure correct comparison
    const category = categories.find(cat => String(cat.id) === String(categoryId));
    return category ? category.types : "Unknown"; // Return "Unknown" or some default text if the category is not found
  };
  
  

const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("https://w7-server.onrender.com/categories", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ types: newCategoryName })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Category added successfully", data);

        // Reset the newCategoryName state
        setNewCategoryName('');

        // Optionally, update the categories state to include the new category
        // setCategories([...categories, data]);

    } catch (error) {
        console.error("Error adding category:", error);
    }
};

  // and another function called handleSubmit which adds a new post to the database 

    return (
      
      <div> 
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Professional">Professional</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage 
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          message={message}
          setMessage={setMessage}
          category={category}
          setCategory={setCategory}
          categories={categories}
          messages={messages}
          getCategoryName={getCategoryName}
          // handleLike={handleLike}
          handleDelete={handleDelete}
          handleCategorySubmit={handleCategorySubmit}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
        />} />
        <Route path="/Professional" element={<Professional messages={messages} />} />
      </Routes>
    </div>
  );
}