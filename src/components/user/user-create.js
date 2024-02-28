import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function UserCreate() {
    const [values, setValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        npiNumber: '',
        address: '',
        telephone: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        values.id = uuid();
        axios.post('http://localhost:8000/users', values)
            .then(res => {
                console.log(res);
                navigate("/users")
            })
            .catch(err => console.log(err))
    };

    return (
        <Container className='d-flex flex-column w-100 vh-100 justify-content-center align-items-center p-4'>
            <div className='w-50 rounded bg-white border shadow px-5 pt-3 pb-5'>
                <h1>Create User</h1>
                <Form onSubmit={ handleSubmit }>
                    <Form.Group className="mb-2" controlId="userForm.controlFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" onChange={ e => setValues({...values, firstName: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" onChange={ e => setValues({...values, lastName: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlNpiNumber">
                        <Form.Label>NPI Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter NPI Number" onChange={ e => setValues({...values, npiNumber: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlAddress">
                        <Form.Label>Business Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Business Address' onChange={ e => setValues({...values, address: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlTelephone">
                        <Form.Label>Telephone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Telephone" onChange={ e => setValues({...values, telephone: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={ e => setValues({...values, email: e.target.value}) } />
                    </Form.Group>
                    <Button variant='success' type='submit'>Submit</Button>
                    <Link to="/users" className='btn btn-primary ms-3'>Back</Link>
                </Form>
            </div>
        </Container>
    );
}

export default UserCreate;
