import React from "react";
import { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from "../Utils/Constans";
import { numberWithCommas } from "../Utils/numberWithCommas";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import axios from "axios";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Sukses update keranjang",
          text: "Sukses update keranjang " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Sukses hapus keranjang",
          text:
            "Sukses hapus keranjang " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h5>
          <strong>Harga</strong>
        </h5>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup
            variant="flush"
            style={{ overflowY: "auto", maxHeight: "450px" }}
          >
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row key={menuKeranjang.id}>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="danger">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h6>{menuKeranjang.product.nama}</h6>
                    <p> Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <p className="float-right">
                      {" "}
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
