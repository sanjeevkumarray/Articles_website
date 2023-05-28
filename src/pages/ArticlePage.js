import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleDetail from '../components/ArticleDetail';

const ArticlePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Article Page</h1>
      <ArticleDetail id={id} />
    </div>
  );
};

export default ArticlePage;
