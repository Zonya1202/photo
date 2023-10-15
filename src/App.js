import React from 'react';
import axios from 'axios';

import './index.scss';
import Collection from './Collection';
import Pagination from './Pagination';
import Skeleton from './Skeleton';

const App = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const categories = [
    { name: 'Все' },
    { name: 'Море' },
    { name: 'Горы' },
    { name: 'Архитектура' },
    { name: 'Города' },
  ];

  const fetchCollections = async () => {
    setIsLoading(true);
    const category = activeCategory > 0 ? `category=${activeCategory}` : '';
    try {
      const res = await axios.get(
        `https://65197d05818c4e98ac606e7d.mockapi.io/photos-collection?page=${currentPage}&limit=4&${category}`,
      );
      setCollections(res.data);
    } catch (err) {
      console.log('Ошибка получения данных', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCollections();
  }, [activeCategory, currentPage]);

  const photos = collections
    .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj, i) => <Collection key={i} name={obj.name} images={obj.photos} />);

  const sekeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              key={i}
              onClick={() => setActiveCategory(i)}
              className={activeCategory === i ? 'active' : ''}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">{isLoading ? sekeletons : photos}</div>
      <Pagination onChangePage={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default App;
