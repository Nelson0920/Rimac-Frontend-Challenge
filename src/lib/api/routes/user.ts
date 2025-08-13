import { API_ROUTES } from '../cache'
import { type User } from '../../types/types'
import {
  APIQuery,
  genericAuthRequest,
} from '../config'


export const useGetUser = () => {
  return APIQuery<User>({
    fetcher: async () => await genericAuthRequest(
      'get', API_ROUTES.user,
    ),
    queryKey: [],
  })
}