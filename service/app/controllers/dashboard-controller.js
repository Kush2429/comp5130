import { setResponse, setResponseWithError } from './response-handler.js';
import * as DashboardService from '../services/dashboard-service.js';

export const getDashboardData = async (req, res) => {
  try {
    const response = await DashboardService.getDashboardData();
    setResponse(res, response);
  } catch (error) {
    setResponseWithError(res, error);
  }
};
