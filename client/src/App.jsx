import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { fetchProfiles } from './api/index';
import ProductList from './components/ProductList';
import ProfileCard from './components/ProfileCard';
import TransactionList from './components/TransactionList';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [token, setToken] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchProfilesData = async () => {
      try {
        const data = await fetchProfiles();
        setToken(data.token);
        setProfiles(data.users);
        setSelectedProfile(data.currentUser);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfilesData();
  }, []);

  return (
    <div className="vh-100">
      <MDBContainer>
        {selectedProfile && (
          <MDBRow className="justify-content-center" style={{ backgroundColor: '#9de2ff' }}>
            <MDBCol md="9" lg="7" xl="5" className="my-5">
              <ProfileCard currentUser={selectedProfile} token={token} />
            </MDBCol>
          </MDBRow>
        )}
        <ProductList token={token} currentUser={selectedProfile} />
        <TransactionList transactions={transactions} />
      </MDBContainer>
    </div>
  );
}

export default App;
