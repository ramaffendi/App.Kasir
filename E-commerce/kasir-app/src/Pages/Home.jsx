import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Hasil from "../Component/Hasil";
import ListCategory from "../Component/ListCategory";

import Menu from "../Component/Menu";
import { API_URL } from "../Utils/Constans";
import axios from "axios";
import swal from "sweetalert";
// import "../Component/Style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        const menu = res.data;
        this.setState({ menu });
      })
      .catch((e) => {
        console.log(e);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         console.log('cek')
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }

getListKeranjang = () => {
  axios
  .get(API_URL + "keranjangs")
  .then((res) => {
    const keranjangs = res.data;
    this.setState({ keranjangs });
  })
  .catch((e) => {
    console.log(e);
  });
}

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menu: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menu = res.data;
        this.setState({ menu });
      })
      .catch((e) => {
        console.log(e);
      })
     
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjangBelanja = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjangBelanja)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses masuk keranjang",
                text: "Sukses masuk keranjang " + keranjangBelanja.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          const keranjangBelanja = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjangBelanja)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses masuk keranjang",
                text: "Sukses masuk keranjang " + keranjangBelanja.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { menu, categoryYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              categoryYangDipilih={categoryYangDipilih}
            />

            <Col>
              <h5>Daftar Produk</h5>
              <hr />
              
              <Row  style={{ overflowY: "auto", maxHeight: "500px" }}>
                {menu &&
                  menu.map((menu) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            
            </Col>
            <Hasil keranjangs={keranjangs} getListKeranjang={this.getListKeranjang}/>
          </Row>
        </Container>
      </div>
    );
  }
}
