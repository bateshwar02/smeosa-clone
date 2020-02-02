// import Request from '../../utils/request';

const category = {
    data: {
        brandProductPriceMap: {
            '6621638625215910302': [
                {
                    productId: '6621965910204748212',
                    productName: '5MM',
                    productPrice: 10.0,
                },
            ],
            '6621638625215910303': [
                {
                    productId: '6621965910208942517',
                    productName: '10MM',
                    productPrice: 20.0,
                },
            ],
        },
        brandMap: {
            '6621638625215910303': {
                brandId: '6621638625215910303',
                brandName: 'TATA',
                s3UrlPath:
                    'data:image/png;base64,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',
                isVisible: true,
            },
            '6621638625215910302': {
                brandId: '6621638625215910302',
                brandName: 'SAIL',
                s3UrlPath:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Steel_Authority_of_India_logo.svg/1200px-Steel_Authority_of_India_logo.svg.png',
                isVisible: true,
            },
        },
    },
    success: true,
    errorMessage: null,
    errorCode: null,
    meta: null,
};

const brand = {
    data: {
        productCateoryProductPriceMap: {
            '6621640703258661282': [
                {
                    productId: '6621965910204748212',
                    productName: '5MM',
                    productPrice: 10.0,
                },
            ],
            '6621640703443210660': [
                {
                    productId: '6621965910221525434',
                    productName: 'Item1',
                    productPrice: 50.0,
                },
            ],
            '6621640703443210661': [
                {
                    productId: '6621965910229914044',
                    productName: 'SampleA',
                    productPrice: 70.0,
                },
            ],
        },
        productCategoryMap: {
            '6621640703443210660': {
                name: 'Polymers',
                productCategoryId: '6621640703443210660',
                parentProductCategoryId: null,
                s3UrlPath: 'https://5.imimg.com/data5/AG/XL/MY-990457/thermoplastic-acrylics-500x500.png',
                isVisible: true,
            },
            '6621640703443210661': {
                name: 'Cement',
                productCategoryId: '6621640703443210661',
                parentProductCategoryId: null,
                s3UrlPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPuJgmakqsigW9Uk3WQmn6tST1YeFlgqGbscgAuZBoLupg1-w&s',
                isVisible: true,
            },
            '6621640703258661282': {
                name: 'TMT',
                productCategoryId: '6621640703258661282',
                parentProductCategoryId: null,
                s3UrlPath: 'https://3.imimg.com/data3/FW/TT/MY-20996693/tmt-steel-bar-250x250.jpg',
                isVisible: true,
            },
        },
    },
    success: true,
    errorMessage: null,
    errorCode: null,
    meta: null,
};

const Service = {
    // getDetailsDataByBrand(regionId, brandId) {
    //     const url = `/api/v1/smeosaPricing/pricesByBrand/${regionId}/${brandId}`;
    //     return Request.get(url);
    // },
    // getDetailsDataByCategory(regionId, productCategoryId) {
    //     const url = `/api/v1/smeosaPricing/pricesByCategory/${regionId}/${productCategoryId}`;
    //     return Request.get(url);
    // },

    getDetailsDataByBrand() {
        return brand;
    },
    getDetailsDataByCategory() {
        return category;
    },
};
export default Service;
