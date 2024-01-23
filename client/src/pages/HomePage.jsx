import React, { useState } from 'react';


const HomePage = ({ handleSubmit, name, setName, message, setMessage, category, setCategory, categories, messages, getCategoryName, handleLike, handleDelete, newCategoryName, setNewCategoryName, handleCategorySubmit }) => {
    
    return (
    <div> 

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter name"
          />
      
          <label>Message</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Enter your message"
          />
    
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option defaultValue="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.types}
                </option>
              ))}
            </select>

            <button type="submit">Submit</button>
        </form>

        <form onSubmit={handleCategorySubmit}>
        <label for="something">Type new Category</label>
            <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter new category name"
                id="categ"
            />
            <button type="submit" >Add Category</button>
        </form>

      <div>
        <h1>Messages</h1>

        <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Message</th>
            <th>Category</th>
            <th>Like</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.message}</td>
              <td>{getCategoryName(item.category)}</td>
              <td>
                <button onClick={() => handleLike(item.id)}>Like</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* <ul>
          {messages.map((item) => {
            return <li key={item.id + item.name}>{item.name}</li>;
          })}
        </ul> */}
      </div>
      </div>
    );
};

export default HomePage;