import { environment } from '../environments';
import { IComment } from '../interfaces';

const { BASE_API } = environment;

const auth: string = `${BASE_API}auth`;
const managers: string = `${BASE_API}managers`;
const applications: string = `${BASE_API}applications`;

const urls = {
  auth: {
    me: `${auth}/me`,
    login: `${auth}/login`,
    logout: `${auth}/logout`,
    register: `${auth}/register`,
    refresh: `${auth}/refresh`,
  },
  managers: {
    base: managers,
    getById: (managerId: string): string => `${managers}/${managerId}`,
    deleteById: (managerId: string): string => `${managers}/${managerId}`,
  },
  applications: {
    getAll: applications,
    create: `${applications}/create`,
    createComment: (applicationId: string) =>
      `${applications}/comment/${applicationId}`,
    deleteComment: (applicationId: string, commentId: string) =>
      `${applications}/comment/${applicationId}/${commentId}`,
    getCommentsById: (): string => `${applications}/comments/ids`,
    deleteById: (orderId: number): string => `${applications}/${orderId}`,
    updateById: (orderId: number): string =>
      `${applications}/update/${orderId}`,
  },
};

export { urls };
