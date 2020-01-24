import React, { Component, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Home from './home';
import { getDataByRegion } from './actions';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sideDrawerOpen: false,
            isLoadLandingPage: true,
        };
    }

    componentDidMount() {
        this.updateState();
    }

    updateState = () => {
        setTimeout(() => {
            this.setState({ isLoadLandingPage: false });
        }, 1500);
    };

    drawerToggleClickHandler = () => {
        this.setState(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };

    getLandingPage = () => (
        <div className="landingPageWrapper">
            <div className="logo"></div>
            <div className="logoText">
                <span className="header">SMEosa</span>
                <span className="text">Metal Pricing Engine</span>
            </div>
        </div>
    );

    backDrop = () => <div className="backdrop" onClick={this.backdropClickHandler} role="button" tabIndex={0} />;

    render() {
        if (this.state.isLoadLandingPage) {
            return this.getLandingPage();
        }
        return (
            <section className="pageWrapper">
                <Header
                    toggleMenu={this.drawerToggleClickHandler}
                    isCustomHeader={false}
                    getCategoryBrandDataByRegion={this.props.getCategoryBrandDataByRegion}
                />
                <Sidebar show={this.state.sideDrawerOpen} />
                <div className="contentDataWrapper">
                    <Home />
                </div>
                {this.state.sideDrawerOpen && this.backDrop()}
            </section>
        );
    }
}

HomePage.propTypes = {
    getCategoryBrandDataByRegion: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
    getCategoryBrandDataByRegion: regionId => dispatch(getDataByRegion(regionId)),
});
const withConnect = connect(
    null,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(HomePage);

// export default HomePage;
