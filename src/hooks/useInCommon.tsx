import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateForURL } from '@/service/ApiService';

export const qKey = (origin: 'event' | 'event/recruitment') => { return origin === 'event' ? 'event' : 'recruitment' }
