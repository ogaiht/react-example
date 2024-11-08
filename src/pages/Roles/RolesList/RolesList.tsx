import { FC } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useRolesList from './useRolesList';

interface RolesListProps { }

const RolesList: FC<RolesListProps> = () => {

    const {
        error,
        handleDeleteRole,
        loading,
        roles,
        showDetail
    } = useRolesList();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h1>Role Management</h1>
            <Container>
                <Button size='sm' onClick={() => showDetail('new')}>Add Role</Button>
                <Table>
                    <thead>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {roles?.map((r) => (
                            <tr key={r.id}>
                                <td>
                                    <Button size='sm' onClick={() => showDetail(r.id)}>Edit</Button>                                    
                                    <Button size='sm' variant='danger' onClick={() => handleDeleteRole(r.id)}>Delete</Button>
                                </td>
                                <td>{r.name}</td>
                                <td>{r.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default RolesList;
