import react, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";

import "./style.css";
import Header from "../../components/Header";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import axios from "axios";
import {
  LatLng,
  LatLngExpression,
  LocationEvent,
  LeafletMouseEvent,
} from "leaflet";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IbgeUfResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface IbgeCityResponse {
  id: number;
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<IbgeUfResponse[]>([]);
  const [cities, setCities] = useState<IbgeCityResponse[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [position, setPosition] = useState<[number, number]>([
    -21.1753259,
    -47.7933673,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>(
    position
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.addEventListener("click", (event: LeafletMouseEvent) => {
          setSelectedPosition([event.latlng.lat, event.latlng.lng]);
        });
      },
    });

    return <Marker position={selectedPosition}></Marker>;
  }

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
          <MapContainer center={position} zoom={15}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUF}
              >
                <option value="0">Selecione um Estado</option>
                {ufs.map((uf) => (
                  <option
                    key={uf.id}
                    value={uf.sigla}
                  >{`${uf.nome} (${uf.sigla})`}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione um Cidade</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
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
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt="Testee" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponde de Coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
