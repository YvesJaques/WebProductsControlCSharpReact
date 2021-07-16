import React, { Component } from "react"

export class Product {
    constructor() {
        this.id = 0;
        this.description = "";
    }
}


export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", product: new Product(), loading: true };
        this.inicialize();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }

    async inicialize() {
        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Products/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", product: data, loading: false });
        } else {
            this.state = { title: "Create", product: new Product(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Loading... </em> </p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Product</h3>
                {contents}
            </div>
        );
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-product");
    }

    async handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.product.id > 0) {
            const response1 = await fetch('api/Products/' + this.state.product.id, { method: "PUT", body: data });
            this.props.history.push("/fetch-product");
        } else {
            const response2 = await fetch('api/Products/' , { method: "POST", body: data });
            this.props.history.push("/fetch-product");
        }
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.product.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="description" defaultValue={this.state.product.description} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.product.id}>Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }
}

