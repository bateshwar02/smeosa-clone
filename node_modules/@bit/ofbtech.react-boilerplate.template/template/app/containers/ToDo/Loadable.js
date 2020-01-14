/**
 *
 * Asynchronously loads the component for ToDo
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'));
