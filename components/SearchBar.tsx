import { useState } from 'react';

const SearchBar = ({ components, onSearch }:{components: any, onSearch: any}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredComponents = components.filter((component: any) =>
      component.props.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredComponents);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Caută un algoritm"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#5865F2] text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;