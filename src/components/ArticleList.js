import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the API
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Article List</h1>
      {articles.map((article) => (
        <div key={article._id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <p>Author: {article.author.username}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
