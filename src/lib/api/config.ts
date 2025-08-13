import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { SERVER } from '../consts/var'

export const API = axios.create({
  baseURL: SERVER,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export const genericAuthRequest = async (
  method: 'get',
  path: string,
  headers?: Record<string, string>,
) => {
  const response = await API({
    method,
    url: path,
    headers: headers ? { ...API.defaults.headers.common, ...headers } : undefined,
  })

  return response.data
}

type APIProps<T> = {
  fetcher: () => Promise<T>
  queryKey: unknown[]
}

export const APIQuery = <T>({
  fetcher,
  queryKey,
}: APIProps<T | null>) => {
  const query = useQuery({
    queryKey: queryKey.filter(x => x),
    queryFn: async () => {
      try { return await fetcher() }
      catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404 && error.response.statusText === 'Not Found')
            return null
        }

        throw error
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1 * 1000 * 10,
  })

  if (query.error) {
    console.log('error: ', query.error)
  }

  return query
}