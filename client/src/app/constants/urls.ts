import { environment } from '../environments';
import { update } from '@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker';
const { BASE_API } = environment;

const auth: string = `${BASE_API}auth`;
const managers: string = `${BASE_API}managers`;
const comments: string = `${BASE_API}comments`;
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
    getById: (managerId: string): string => `${managers}/${managerId}`,
    deleteById: (managerId: string): string => `${managers}/${managerId}`,
  },

  comments: {
    createComment: (applicationId: string) =>
      `${comments}/create/${applicationId}`,
    deleteComment: (applicationId: string, commentId: string) =>
      `${comments}/${applicationId}/${commentId}`,
    getCommentsById: (): string => `${comments}/ids`,
  },

  applications: {
    getAll: applications,
    create: `${applications}/create`,
    addManager: () => `${applications}/addManager`,
    update: (appId: string) => `${applications}/update/${appId}`,
    byId: (appId: string) => `${applications}/${appId}`,
  },
};

export { urls };
