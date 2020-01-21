import React from 'react';
import './home.scss';

const category = [
    { name: 'TMT', image: 'https://3.imimg.com/data3/FW/TT/MY-20996693/tmt-steel-bar-250x250.jpg', key: 'tmt' },
    { name: 'Steel', image: 'https://www.infrabazaar.com/site_assets/material_images/02e83080f47488589fab94f7cfa566bfddc203fc.jpg', key: 'steel' },
    { name: 'Polymers', image: 'https://5.imimg.com/data5/AG/XL/MY-990457/thermoplastic-acrylics-500x500.png', key: 'polymers' },
    { name: 'Cement', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPuJgmakqsigW9Uk3WQmn6tST1YeFlgqGbscgAuZBoLupg1-w&s', key: 'cement' },
    { name: 'Ingot', image: 'http://sc01.alicdn.com/kf/Hf56c8626da6f47e98dbbc0e91e748b1bU/Zinc-ingot-used-for-die-casting-alloy.png', key: 'ingot' },
    { name: 'Scrap', image: 'https://eredanltd.com/wp-content/uploads/2018/11/shredded-steel-scrap.jpg', key: 'scrap' },
];

function Home() {
    const getDetails = val => {
        window.location = `/details?type=${val}`;
    };

    const getCategory = () =>
        category.map(item => (
            <div
                className="contentWrapper"
                onClick={() => {
                    getDetails(item.key);
                }}
                role="button"
                tabIndex={0}
            >
                <span className="image">
                    <img src={item.image} alt="tmt description" />
                </span>
                <span className="name">{item.name}</span>
            </div>
        ));

    return (
        <div className="homeWrapper">
            <div className="categoryWrapper">
                <span className="header">Category</span>
                <div className="content row">{getCategory()}</div>
            </div>
            <div className="brandWrapper">
                <span className="header">Brands</span>
                <div className="content row">
                    <div className="contentWrapper"></div>
                    <div className="contentWrapper"></div>
                    <div className="contentWrapper"></div>
                    <div className="contentWrapper"></div>
                    <div className="contentWrapper"></div>
                    <div className="contentWrapper"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
