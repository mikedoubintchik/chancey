import historicalData from './mockHistoricalData.json';
import { parseMegaRecord } from 'utils/lottery-utils';

const records = historicalData.data;

const mockHistoricalData = records.map(parseMegaRecord);

export default mockHistoricalData;
