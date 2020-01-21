import { push } from 'connected-react-router';

export const Navigate = url => push(url);

const Navigation = {
    home: '/',
    login: '/login',
};

export default Navigation;
