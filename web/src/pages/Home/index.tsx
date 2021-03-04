import react from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./style.css";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <Header />
        <main>
          <h1>Seu Marketplace de coleta de resíduos.</h1>
          <p>
            Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.
          </p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponde de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
