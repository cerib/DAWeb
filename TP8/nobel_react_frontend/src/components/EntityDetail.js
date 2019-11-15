import React from "react";
import axios from "axios";

export default class EntityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      entity: {},
      typology: [],
      ownerOf: [],
      participantOf: []
    };
  }

  componentDidMount() {
    let id = this.state.id;
    let urlEnt = `http://clav-api.dglab.gov.pt/api/entidades/${id}?apikey=${process.env.REACT_APP_API_KEY}`;
    let urlTipo = `http://clav-api.dglab.gov.pt/api/entidades/${id}/tipologias?apikey=${process.env.REACT_APP_API_KEY}`;
    let urlDono = `http://clav-api.dglab.gov.pt/api/entidades/${id}/intervencao/dono?apikey=${process.env.REACT_APP_API_KEY}`;
    let urlParticipante = `http://clav-api.dglab.gov.pt/api/entidades/${id}/intervencao/participante?apikey=${process.env.REACT_APP_API_KEY}`;
    axios
      .all([
        axios.get(urlEnt),
        axios.get(urlTipo),
        axios.get(urlDono),
        axios.get(urlParticipante)
      ])
      .then(
        axios.spread((ent, tipo, dono, participante) => {
          console.log(ent.data);
          console.log(tipo.data);
          console.log(dono.data);
          console.log(participante.data);
        })
      )
      .catch(err => console.log("ERRO!! " + err));
  }

  render() {
    return (
      <div>
        <p>{this.state.id}</p>
      </div>
    );
  }
}
