import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        const confirm = window.confirm('Do you want to delete the user');
        if(confirm) {
            axios.delete('http://localhost:8000/users/' + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
        }
    };

    return (
        <Container className='d-flex flex-column justify-content-center align-items-center p-4'>
            <h1>Registered Users</h1>
            <div className='w-100 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link className="btn btn-sm btn-primary mb-2" to={`/user/create`}>Add New (+)</Link>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>NPI Number</th>
                            <th>Business Address</th>
                            <th>Telephone</th>
                            <th>Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.npiNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link className='btn btn-sm btn-success me-1' to={`/user/detail/${item.id}`}>Detail</Link>
                                        <Link className='btn btn-sm btn-primary me-1' to={`/user/update/${item.id}`}>Update</Link>
                                        <Button variant='danger' className='btn-sm' onClick={ e => handleDelete(item.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default UserList;
