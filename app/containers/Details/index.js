import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSetStateDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
// import Utils from '../../utils/common';
import Header from '../../components/Header/Loadable';
import DetailsPage from './component/detail';
import './style.scss';

const brandsList = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Steel_Authority_of_India_logo.svg/1200px-Steel_Authority_of_India_logo.svg.png',
    'data:image/png;base64,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',
    'https://banner2.cleanpng.com/20180624/fwe/kisspng-jindal-steel-power-limited-jindal-steel-and-powe-5b2fc6d3a31274.762174511529857747668.jpg',
    'https://seeklogo.com/images/J/jsw-steel-logo-82ED4A72F6-seeklogo.com.png',
];

export function Details({ detailPage, history }) {
    useInjectReducer({ key: 'detailPage', reducer });
    useInjectSaga({ key: 'detailPage', saga });

    const { type } = detailPage.urlParams;
    const getBrandList = () =>
        brandsList.map(item => (
            <div className="brandsList" key={item}>
                <span className="brandIcon">
                    <img src={item} alt="brands" />
                </span>
            </div>
        ));

    const toggleMenu = () => {};
    return (
        <>
            <Header toggleMenu={toggleMenu} isCustomHeader type={type} goBack={history.goBack} />
            <div className="pageWrapper">
                <div className="detailsPageWrapper">
                    <div className="brandWrapper">
                        <div className="brandsList allWrapper active">
                            <span className="all">All</span>
                            <span className="text">Brand</span>
                        </div>
                        {getBrandList()}
                    </div>
                </div>
                <DetailsPage type={type} />
            </div>
        </>
    );
}

Details.propTypes = {
    detailPage: PropTypes.object,
    history: PropTypes.object.isRequired,
};

Details.defaultProps = {
    detailPage: {},
};

const mapStateToProps = createStructuredSelector({
    detailPage: makeSetStateDetails(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Details);
