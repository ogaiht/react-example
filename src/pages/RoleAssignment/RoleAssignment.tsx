import { FC } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import useRoleAssignment from './useRoleAssignment';

interface RoleAssignmentProps {
}

const RoleAssignment: FC<RoleAssignmentProps> = (props: RoleAssignmentProps) => {

    const {
        assignedRoles,
        handleAdd,
        handleCancel,
        handleDelete,
        handleSave,
        isValidUser,
        roles,
        setSelectedRoleId,
        user
    } = useRoleAssignment();

    if (!isValidUser) {
        return <></>;
    }

    return (
        <div>
            <h3>Role Assignment to {user?.name}</h3>
            <Container>
                <Form.Select aria-label='Select Role' onChange={(e) => setSelectedRoleId(parseInt(e.target.value))}>
                    <option value='-1' defaultChecked>Select</option>
                    {roles.filter((r) => assignedRoles.indexOf(r.id) === -1).map((r) =>
                        <option value={r.id}>{r.name}</option>
                    )}
                </Form.Select>
                <Button onClick={() => { handleAdd() }}>+</Button>
                <Table>
                    <thead>
                        <th>Action</th>
                        <th>Role</th>
                    </thead>
                    <tbody>
                        {assignedRoles?.map((id) => (
                            <tr key={id}>
                                <td>
                                    <Button size='sm' variant='danger' onClick={() => handleDelete(id)}>Delete</Button>
                                </td>
                                <td>{roles.find((r) => r.id === id)?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Button onClick={() => handleSave()}>Save</Button>
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                </div>
            </Container>

        </div>
    );
}

export default RoleAssignment;
