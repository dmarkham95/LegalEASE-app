import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import SearchHistory from "./views/SearchHistory";
import Users from "./views/Users";
import WikipediaSearch from "./views/WikipediaSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<WikipediaSearch />} />
          <Route path="users" element={<Users />} />
          <Route path="search-history" element={<SearchHistory />} />
          <Route path="wikipedia-history" element={<WikipediaSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
