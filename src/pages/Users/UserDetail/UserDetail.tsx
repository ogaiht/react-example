import { FC } from 'react';
import { Button, ButtonGroup, Container, Form } from 'react-bootstrap';
import useUserDetail from './userUserDetail';

interface UserDetailProps { }

const UserDetail: FC<UserDetailProps> = () => {
    const {
        isEditMode,
        handleCancel,
        handleChange,
        handleSubmit,
        user
     } = useUserDetail();

    return (
        <div>
            <h1>{isEditMode ? `Editing user ${user.name}` : 'Adding new User'}</h1>
            <Container>
                <Form>
                    <Form.Group className='mb-3' controlId='users.Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='name'
                            name='name'
                            value={user.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='users.Password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='password'
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='users.Email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='email'
                            name='email'
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <ButtonGroup>
                        <Button type='submit' onClick={() => handleSubmit()}>Save</Button>
                        <Button type='button' onClick={() => handleCancel()}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            </Container>
        </div>
    );
};

export default UserDetail;
