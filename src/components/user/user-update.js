import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UserUpdate() {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get('http://localhost:8000/users/' + id)
            .then(res => setValues(res.data))
            .catch(err => console.log(err))
    }, []);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/users/' + id, values)
            .then(res => {
                console.log(res);
                navigate("/users")
            })
            .catch(err => console.log(err))
    };
    
    return (
        <Container className='d-flex flex-column w-100 vh-100 justify-content-center align-items-center p-4'>
            <div className='w-50 rounded bg-white border shadow px-5 pt-3 pb-5'>
                <h1>Update User</h1>
                <Form onSubmit={ handleUpdate }>
                    <Form.Group className="mb-2" controlId="userForm.contorFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" value={values.firstName}
                         onChange={ e => setValues({...values, firstName: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" value={values.lastName}
                         onChange={ e => setValues({...values, lastName: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlNpiNumber">
                        <Form.Label>NPI Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter NPI Number" value={values.npiNumber}
                         onChange={ e => setValues({...values, npiNumber: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlAddress">
                        <Form.Label>Business Address</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Business Address' value={values.address}
                         onChange={ e => setValues({...values, address: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlTelephone">
                        <Form.Label>Telephone Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Telephone" value={values.telephone}
                         onChange={ e => setValues({...values, telephone: e.target.value}) } />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="userForm.controlEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={values.email}
                         onChange={ e => setValues({...values, email: e.target.value}) }  />
                    </Form.Group>
                    <Button variant='success' type='submit'>Update</Button>
                    <Link to="/users" className='btn btn-primary ms-3'>Back</Link>
                </Form>
            </div>
        </Container>
    );
}

export default UserUpdate;
