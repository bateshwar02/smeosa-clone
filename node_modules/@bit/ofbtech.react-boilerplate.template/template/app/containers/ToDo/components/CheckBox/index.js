/**
 *
 * CheckBox
 *
 */

import React, { memo, Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
        };
    }

    handleChange(e) {
        const { checked } = e.target;

        this.setState({ checked });
        this.props.onChange(checked);
    }

    render() {
        return <input type="checkbox" checked={this.state.checked} onChange={this.handleChange.bind(this)} />;
    }
}

CheckBox.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
};

CheckBox.defaultProps = {
    onChange: () => {},
    checked: false,
};

export default memo(CheckBox);
