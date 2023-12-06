import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Login from "./Login";


const RouteApp =()=> {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 아래에 main과 about을 링크할 수 있는 하이퍼링크 텍스트 navbar*/}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default RouteApp;