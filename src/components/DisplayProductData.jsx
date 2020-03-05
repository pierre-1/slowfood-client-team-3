import React, { Component } from "react";
import { getData } from '../modules/products';

class DisplayProductData extends Component {
    state = {
		productData: []
	}

	componentDidMount() {
		this.getProductData()
	}
  
    async getProductData() {
    let result = await getData();
    this.setState({ productData: result.data.products })
    }

  render() {
    let dataIndex
    if (Array.isArray(this.state.productData) && this.state.productData.length) {
        dataIndex = (
            <div id="index">
                {this.state.productData.map(item => {
                    return (
                        <div key={item.id} id={`product-${item.id}`}>
                            {item.name}{item.description}{item.price}
                        </div>
                    )
                })}
            </div>
        )
      }
  

  return (
      <div>
          {dataIndex}
      </div>
  
    // <>
    //   <h1 id="menu-header">Menu</h1>
    //   <div id="index">products</div>
    // </>
    )
  }
};

export default DisplayProductData;