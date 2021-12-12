import customAxios from './customAxios';
import {TaskType} from '../constants/dataTSTypes';

const services = {
  getTask: () => {
    let url = '/task';
    return customAxios().get(url);
  },
  createTask: (data: TaskType) => {
    let url = '/task';
    return customAxios().post(url, data);
  },
  updateTask: (id: string, data: {status?: number; content?: string}) => {
    let url = `/task/${id}`;
    return customAxios().put(url, data);
  },
  removeTask: (id: string) => {
    let url = `/task/${id}`;
    return customAxios().delete(url);
  },
};
export default services;
