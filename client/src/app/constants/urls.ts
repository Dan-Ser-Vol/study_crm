
import {environment} from "../environments"

const {BASE_API} = environment;

const auth = `${BASE_API}auth`;
const users = `${BASE_API}users`;
const posts = `${BASE_API}posts`;

const urls = {
  auth: {
    register: `${auth}/register`,
    login: `${auth}/login`,
    logout: `${auth}/logout`,
  },
  // users: {
  //   base: users,
  // },
  // posts: {
  //   getAll: posts,
  //   create: `${posts}/create`,
  //   addImage: (postId: number) => `${posts}/image/${postId}`,
  //   deleteImage: (postId: number) => `${posts}/image/${postId}`,
  //   getById: (postId: number) => `${posts}/${postId}`,
  //   deleteById: (postId: number) => `${posts}/${postId}`,
  //   updateById: (postId: number) => `${posts}/update/${postId}`,
  // },
};

export {urls};
