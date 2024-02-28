import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function UserDetail() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/users/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    });
    
    return (
        <Container className='d-flex flex-column w-100 justify-content-center align-items-center p-4'>
            <div className='w-50 rounded bg-white border shadow px-5 pt-3 pb-5'>
                <h1>Detail of User</h1>
                <div className='mb-2'>
                    <strong>First Name: {data.firstName}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Last Name: {data.lastName}</strong>
                </div>
                <div className='mb-2'>
                    <strong>NPI Number: {data.npiNumber}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Business Address: {data.address}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Telephone Number: {data.telephone}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Email Address: {data.email}</strong>
                </div>
                <Link to={`/user/update/${data.id}`} className='btn btn-success'>Update</Link>
                <Link to="/users" className='btn btn-primary ms-3'>Back</Link>
            </div>
        </Container>
    );
}

export default UserDetail;
