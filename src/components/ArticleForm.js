import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create article object
    const articleData = {
      title,
      content,
    };

    try {
      // Send a POST request to the API to create the article
      const response = await axios.post('/api/articles', articleData);
      console.log('Article created:', response.data);
      // Clear form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div>
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ArticleForm;
