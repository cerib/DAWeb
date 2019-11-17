import React from "react";
import axios from "axios";

import { Fragment } from "react";
import uniqid from "uniqid";

import { Table, Container, Spinner, Card } from "react-bootstrap";

export default class EntityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      entity: {},
      typology: [],
      ownerOf: [],
      participantOf: [],
      ready: false
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
          this.setState({
            entity: ent.data,
            typology: tipo.data,
            ownerOf: dono.data,
            participantOf: participante.data,
            ready: true
          });
        })
      )
      .catch(err => console.log("ERRO!! " + err));
  }

  render() {
    let entJsx = null;
    let typoJsx = null;
    let ownerJsx = null;
    let particJsx = null;

    if (this.state.ready) {
      entJsx = (
        <Fragment>
          <thead>
            <tr>
              <th>Designação</th>
              <th>Estado</th>
              <th>Sigla</th>
              <th>Sioe</th>
              <th>Internacional</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.entity.designacao}</td>
              <td>{this.state.entity.estado}</td>
              <td>{this.state.entity.sigla}</td>
              <td>{this.state.entity.sioe}</td>
              <td>{this.state.entity.internacional}</td>
            </tr>
          </tbody>
        </Fragment>
      );
      typoJsx = (
        <Fragment>
          <thead>
            <tr>
              <th>Designação</th>
              <th>Sigla</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {this.state.typology.map(typ => {
              return (
                <tr key={uniqid()}>
                  <td>{typ.designacao}</td>
                  <td>{typ.sigla}</td>
                  <td>{typ.id}</td>
                </tr>
              );
            })}
          </tbody>
        </Fragment>
      );
      ownerJsx = (
        <Fragment>
          <thead>
            <tr>
              <th>Título</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ownerOf.map(own => {
              return (
                <tr key={uniqid()}>
                  <td>{own.titulo}</td>
                  <td>{own.codigo}</td>
                </tr>
              );
            })}
          </tbody>
        </Fragment>
      );
      particJsx = (
        <Fragment>
          <thead>
            <tr>
              <th>Título</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {this.state.participantOf.map(partic => {
              return (
                <tr key={uniqid()}>
                  <td>{partic.titulo}</td>
                  <td>{partic.codigo}</td>
                </tr>
              );
            })}
          </tbody>
        </Fragment>
      );
    }
    return (
      <div>
        {entJsx && typoJsx && ownerJsx && particJsx ? (
          <Container className="mt-5">
            {" "}
            <Card className="mt-5">
              <Card.Header as="h5">Descrição da Entidade</Card.Header>
              <Card.Body>
                <Table>{entJsx}</Table>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Header as="h5">Tipologias a que pertence</Card.Header>
              <Card.Body>
                <Table>{typoJsx}</Table>
              </Card.Body>
            </Card>
            <Card className="mt-5">
              <Card.Header as="h5">Processos das quais é dona</Card.Header>
              <Card.Body>
                <Table>{ownerJsx}</Table>
              </Card.Body>
            </Card>
            <Card className="mt-5 mb-5">
              <Card.Header as="h5">
                Processos das quais é participante
              </Card.Header>
              <Card.Body>
                <Table>{particJsx}</Table>
              </Card.Body>
            </Card>{" "}
          </Container>
        ) : (
          <Container>
            <div
              className="row justify-content-center align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <Spinner animation="border" variant="info" />
            </div>
          </Container>
        )}
      </div>
    );
  }
}
