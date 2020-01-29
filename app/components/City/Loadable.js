/**
 *
 * Asynchronously loads the component for City
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
