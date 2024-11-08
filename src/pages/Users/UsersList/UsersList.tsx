import { FC } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useUsersList from './useUsersList';

interface UsersListProps { }

const UsersList: FC<UsersListProps> = () => {
    const {
        error,
        loading,
        handleDeleteUser,
        showDetail,
        showRoles,
        users
    } = useUsersList();    

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Users Management</h1>
            <Container>
                <Button size='sm' onClick={() => showDetail('new')}>New User</Button>
                <Table>
                    <thead>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {users?.map((u) => (
                            <tr key={u.id}>
                                <td>
                                    <Button size='sm' onClick={() => showDetail(u.id)}>Edit</Button>
                                    <Button size='sm' variant='danger' onClick={() => handleDeleteUser(u.id)}>Delete</Button>
                                    <Button size='sm' onClick={() => showRoles(u.id)}>Roles</Button>
                                </td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default UsersList;
