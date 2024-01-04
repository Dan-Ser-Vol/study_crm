
import {environment} from "../environments"

const {BASE_API} = environment;

const auth:string = `${BASE_API}auth`;
const users:string = `${BASE_API}users`;
const orders:string = `${BASE_API}orders`;

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
  orders: {
    getAll: orders,
    create: `${orders}/create`,
    addImage: (orderId: number):string => `${orders}/image/${orderId}`,
    deleteImage: (orderId: number):string => `${orders}/image/${orderId}`,
    getById: (orderId: number):string => `${orders}/${orderId}`,
    deleteById: (orderId: number):string => `${orders}/${orderId}`,
    updateById: (orderId: number):string => `${orders}/update/${orderId}`,
  },
};

export {urls};
