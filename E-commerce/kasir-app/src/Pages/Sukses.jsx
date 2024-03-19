import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

export default class Sukses extends Component {
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="imagesKasir/Protection.png" width={450} />
        <h4>Sukses pesan</h4>
        <p>Terima kasih sudah memesan</p>
        <Link to="/">
          <button className="btn btn-primary">Kembali </button>
        </Link>
      </div>
    );
  }
}
