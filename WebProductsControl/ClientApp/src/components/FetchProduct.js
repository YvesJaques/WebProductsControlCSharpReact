import React, { Component } from "react"
import { Link } from "react-router-dom"

export class FetchProduct extends Component {
    static displayName = "Products";

    constructor() {
        super();
        this.state = { products: [], loading: true }
    }

    componentDidMount() {
        this.populateProductData();
    }

    static handleEdit(id) {
        window.location.href = "/product/edit" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Are you sure you want to remove product: " + id)) {
            return;
        } else {
            fetch("api/products/" + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-product";
                    alert('Item successfully removed!');
                })
        }
    }

    static renderProductsTable(products) {
        return (
            <table className="table table-striped" aria-labelledby="labelTable">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.description}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(prod.id)}>Edit</button>&nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(prod.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Loading... </em> </p>
            : FetchProduct.renderProductsTable(this.state.products);

        return (
            <div>
                <h1 id="labelTable">Products</h1>
                <p>Products list</p>

                <p>
                    <Link to="/add-product">Register product</Link>
                </p>
                {contents}
            </div>
        );
    }

    async populateProductData() {
        const response = await fetch('api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}