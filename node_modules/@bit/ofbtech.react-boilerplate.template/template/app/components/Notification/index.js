/**
 *
 * Notification
 *
 */

import React, { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
    return <ToastContainer />;
}

export default memo(Notification);
