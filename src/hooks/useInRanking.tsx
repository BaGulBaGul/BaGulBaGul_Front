import { useQuery } from '@tanstack/react-query';
import { fetchFromURL } from '@/service/ApiService';
import { EventType } from '@/components/common';

export const useRankEvents = (type: EventType) => {
  return useQuery({
    queryKey: ['ranking', type],
    queryFn: () => fetchFromURL(`/api/ranking/event/views?eventType=${type}&count=10`, false)
  })
}