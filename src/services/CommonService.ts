import ApiService from './ApiService'
import AxiosBase from '../services/axios/AxiosBase';

export async function apiGetNotificationCount() {
  // Reuse the same /pmc/applicant-alerts/ call, then get .length
  const alerts = await apiGetApplicantAlerts();
  return {'count': alerts.length};
}

export async function apiGetNotificationList() {
    return ApiService.fetchDataWithAxios<
        {
            id: string
            target: string
            description: string
            date: string
            image: string
            type: number
            location: string
            locationLabel: string
            status: string
            readed: boolean
        }[]
    >({
        url: '/notification/list',
        method: 'get',
    })
}

export async function apiGetSearchResult<T>(params: { query: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/search/query',
        method: 'get',
        params,
    })
}

export async function apiGetApplicantAlerts() {
    try {
      // This calls your new DRF endpoint returning
      // remarks for the current user’s applications
      const response = await AxiosBase.get('/pmc/applicant-alerts/');
      return response.data; // An array of { id, applicant_id, tracking_number, remarks, created_at, ... }
    } catch (error) {
      console.error('Error fetching applicant alerts:', error);
      return []; // Return an empty array if an error occurs
    }
  }