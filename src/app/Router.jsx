import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Character from '../pages/Character';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    </BrowserRouter>
);

export default Router;