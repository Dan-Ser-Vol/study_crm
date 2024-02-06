import { environment } from '../environments';

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
    createMessage: (id: string) => `${applications}/message/${id}`,
    deleteMessage: (message: string) => `${applications}/message/${message}`,
    getById: (orderId: number): string => `${applications}/${orderId}`,
    deleteById: (orderId: number): string => `${applications}/${orderId}`,
    updateById: (orderId: number): string =>
      `${applications}/update/${orderId}`,
  },
};

export { urls };
