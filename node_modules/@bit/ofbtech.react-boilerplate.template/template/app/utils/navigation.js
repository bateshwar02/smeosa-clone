import { push } from 'connected-react-router';

export const Navigate = url => push(url);

const Navigation = {
    home: '/',
};

export default Navigation;
