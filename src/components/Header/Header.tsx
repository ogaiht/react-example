import { FC } from 'react';
import useHeader from './useHeader';

interface HeaderProps {
    title:string;
}

const Header: FC<HeaderProps> = (props:HeaderProps) => {
    const { handleLogout, profile } = useHeader();

    return (
        <>
            <header>
                <h1>{props.title}</h1>
            </header>
            <div>
                <div>
                    <h3>Welcome to the Dashboard!</h3>
                    <button onClick={handleLogout}>logout</button>
                </div>
                <div>
                    <b>User</b> { profile?.name }
                </div>
            </div>
        </>
    );
};

export default Header;