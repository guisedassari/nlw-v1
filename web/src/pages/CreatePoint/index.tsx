import react from "react";
import { Link } from "react-router-dom";

import "./style.css";
import Header from "../../components/Header";
import { FiArrowLeft } from "react-icons/fi";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <Header />
      <Link to="/">
        <FiArrowLeft />
        Voltar para home
      </Link>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whats">Whatsapp</label>
              <input type="text" name="Whatsapp" id="Whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione um UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione um Cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="" alt="Teste" />
              <span>Oleo de cozinha</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponde de Coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
