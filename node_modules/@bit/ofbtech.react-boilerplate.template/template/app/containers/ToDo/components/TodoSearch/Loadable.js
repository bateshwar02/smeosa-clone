/**
 *
 * Asynchronously loads the component for TodoSearch
 *
 */

import loadable from '../../../../utils/loadable';

export default loadable(() => import('./index'));
