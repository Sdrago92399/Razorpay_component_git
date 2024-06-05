import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const TransactionList = ({ transactions }) => {
  return (
    <MDBRow className="mt-5">
      {transactions.map((transaction, index) => (
        <MDBCol md="4" key={index}>
          <MDBCard>
            <MDBCardBody className="text-center">
              <MDBCardTitle>Transaction {transaction._id}</MDBCardTitle>
              <MDBCardText>Amount: {transaction.amount}</MDBCardText>
              <MDBCardText>Status: {transaction.status}</MDBCardText>
              <MDBCardText>Date: {new Date(transaction.createdAt).toLocaleString()}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      ))}
    </MDBRow>
  );
};

export default TransactionList;
