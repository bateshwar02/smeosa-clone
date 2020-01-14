/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const NOTIFICATION_SUCCESS = 'app/App/NOTIFICATION_SUCCESS';
export const NOTIFICATION_ERROR = 'app/App/NOTIFICATION_ERROR';
export const NOTIFICATION_WARN = 'app/App/NOTIFICATION_WARN';
export const PAGE_INFO = 'app/App/PAGE_INFO';
