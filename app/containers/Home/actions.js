import { DATA_BY_REGION } from './constants';

export function getDataByRegion(data) {
    // console.log('region data =====', data);
    return {
        type: DATA_BY_REGION,
        dataByRegion: data,
    };
}
