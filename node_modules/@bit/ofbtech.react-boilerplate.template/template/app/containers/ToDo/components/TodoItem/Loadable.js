/**
 *
 * Asynchronously loads the component for TodoItem
 *
 */

import loadable from '../../../../utils/loadable';

export default loadable(() => import('./index'));
