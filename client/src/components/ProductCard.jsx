import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useCallback } from "react";
import { createOrder } from '../api/index';
import useRazorpay from "react-razorpay";
import env from "react-dotenv";

const ProductCard = ({ product, token, currentUser }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [Razorpay] = useRazorpay();

  const handleBuyClick = useCallback(async () => {
    try {console.log(currentUser);
      const orderData = {
        productId: product._id,
        userId: currentUser._id,
        quantity: 1,
        totalAmount: product.price
      };
      const order = await createOrder(orderData, token);
      alert('Order created successfully!');

      const options = {
        key: "rzp_test_UEfJKv7WUJzZGw",
        amount: product.price*100,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: (res) => {
          console.log(res);
        },
        prefill: {
          name: "Shahbaaz Alam",
          email: "shahbazalam92399.com",
          contact: "9038506761",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();

    } catch (error) {
      console.error('Error creating order:', error);
    }
  }, [Razorpay]);

  return (
    <MDBCard>
      <div className="header-cover" style={{ backgroundImage: `url(${product.image})`, height: '130px', backgroundSize: 'cover' }}></div>
      <MDBCardBody className="text-center">
        <MDBCardImage
          src={product.image}
          className="img-fluid rounded-circle"
          style={{ width: '100px', marginTop: '-50px', border: '5px solid white' }}
          alt="Product avatar"
        />
        <MDBCardTitle className="mt-3">{product.name}</MDBCardTitle>
        <MDBCardText>{product.price}</MDBCardText>
        <div className="user-button">
          <MDBRow>
            <MDBCol>
              <MDBBtn size="sm" color="primary" onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? 'Hide Description' : 'Show Description'}
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn size="sm" color="light" onClick={handleBuyClick}>
                Buy
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
        {showDescription && (
          <MDBCardText className="mt-3">{product.description}</MDBCardText>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProductCard;
