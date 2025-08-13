import { API_ROUTES } from '../cache'
import { type PlansList } from '../../types/types'
import {
  APIQuery,
  genericAuthRequest,
} from '../config'


export const useGetPlans = () => {
  return APIQuery<PlansList>({
    fetcher: async () => await genericAuthRequest(
      'get', API_ROUTES.plan,
    ),
    queryKey: [],
  })
}