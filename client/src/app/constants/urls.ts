import { environment } from '../environments';

const { BASE_API } = environment;

const auth: string = `${BASE_API}auth`;
const users: string = `${BASE_API}users`;
const applications: string = `${BASE_API}applications`;

const urls = {
  auth: {
    me: `${auth}/me`,
    login: `${auth}/login`,
    logout: `${auth}/logout`,
    register: `${auth}/register`,
    refresh: `${auth}/refresh`,
  },
  users: {
    base: users,
  },
  applications: {
    getAll: applications,
    create: `${applications}/create`,
    createMessage: (id: string) => `${applications}/message/${id}`,
    addImage: (orderId: number): string => `${applications}/image/${orderId}`,
    deleteImage: (orderId: number): string =>
      `${applications}/image/${orderId}`,
    getById: (orderId: number): string => `${applications}/${orderId}`,
    deleteById: (orderId: number): string => `${applications}/${orderId}`,
    updateById: (orderId: number): string =>
      `${applications}/update/${orderId}`,
  },
};

export { urls };
