import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamData from './components/TeamData';
import Players from "./components/Players";
import Position from "./components/Position";
import News from "./components/News";

function App() {
  useEffect(() => {
    document.title = 'NBA Catalogue';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="data" element={<TeamData />} />
          <Route path="players" element={<Players />} />
          <Route path="position" element={<Position />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;