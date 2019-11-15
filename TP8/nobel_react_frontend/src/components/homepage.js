import React from "react";
import axios from "axios";
import uniqid from "uniqid";

import { Link } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      entitiesLoaded: false
    };
  }

  componentDidMount() {
    let _url =
      "http://clav-api.dglab.gov.pt/api/entidades?apikey=" +
      process.env.REACT_APP_API_KEY;
    axios
      .get(_url)
      .then(response => {
        this.setState({ entities: response.data, entitiesLoaded: true });
      })
      .catch(err => console.log("ERRO!! " + err));
  }

  render() {
    const rows = this.state.entities.map(entity => {
      return (
        <tr key={uniqid()}>
          <td>
            <Link to={`/detail/${entity.id}`}>{entity.designacao}</Link>
          </td>
          <td>{entity.sigla}</td>
          <td>{entity.estado}</td>
          <td>{entity.sioe}</td>
          <td>{entity.id}</td>
        </tr>
      );
    });

    return (
      <div className="container mt-5">
        <h1>Lista de Entidades Públicas Portuguesas</h1>
        {this.state.entitiesLoaded ? (
          <Table striped bordered size="sm" className="mt-5">
            <thead className="thead-dark">
              <tr>
                <th>Designacao</th>
                <th>Sigla</th>
                <th>Estado</th>
                <th>Sioe</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <Spinner animation="border" variant="info" />
          </div>
        )}
      </div>
    );
  }
}
