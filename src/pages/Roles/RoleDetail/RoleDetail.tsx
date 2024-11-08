import { FC } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import useRoleDetail from './useRoleDetail';

interface RoleDetailProps { }

const RoleDetail: FC<RoleDetailProps> = () => {

    const {
        isEditMode,
        handleCancel,
        handleChange,
        handleSave,
        role
    } = useRoleDetail();

    return (
        <div>
            <h1>{isEditMode ? `Editing role ${role.name}` : 'Adding new Role'}</h1>
            <Container>
                <Form>
                    <Form.Group className='mb-3' controlId='users.Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='name'
                            name='name'
                            value={role.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='users.Email'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='description'
                            name='description'
                            value={role.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button onClick={() => handleSave()}>Save</Button>
                        <Button onClick={() => handleCancel()}>Cancel</Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
};

export default RoleDetail;
