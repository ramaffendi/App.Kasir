import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { numberWithCommas } from "../Utils/numberWithCommas";
import axios from "axios";
import { API_URL } from "../Utils/Constans";
import { Link } from "react-router-dom";

export default class TotalBayar extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((item) => {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        });
      })
      .catch((e) => {
        console.log("error woi", e);
      });
  }
  submitTotalBayar = (totalBayar) => {
 
    const pesanan = {
      total_bayar: totalBayar,
      menu: this.props.keranjangs,
    };

    axios
      .post(API_URL + "pesanans", pesanan)
      .then((res) => {
        this.props.history.push("/sukses");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const isKeranjangsEmpty =
      !this.props.keranjangs || this.props.keranjangs.length === 0;
    const totalBayar = isKeranjangsEmpty
      ? 0
      : this.props.keranjangs.reduce(
          (result, item) => result + item.total_harga,
          0
        );

    return (
      <>
      {/* Web */}
      <div className="fixed-bottom d-none d-md-block" style={{ overflow: "hidden" }}>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>Total Harga : Rp {numberWithCommas(totalBayar)}</h5>
            <Button
              variant="primary"
              onClick={() => this.submitTotalBayar(totalBayar)}
              disabled={isKeranjangsEmpty}
              as={isKeranjangsEmpty ? "button" : Link}
              to={isKeranjangsEmpty ? "" : "/sukses"}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Bayar
            </Button>
          </Col>
        </Row>
      </div>
      
      {/* Mobile */}
      <div className="d-sm-block d-md-none" style={{ overflow: "hidden" }}>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>Total Harga : Rp {numberWithCommas(totalBayar)}</h5>
            <Button
              variant="primary"
              onClick={() => this.submitTotalBayar(totalBayar)}
              disabled={isKeranjangsEmpty}
              as={isKeranjangsEmpty ? "button" : Link}
              to={isKeranjangsEmpty ? "" : "/sukses"}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Bayar
            </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
