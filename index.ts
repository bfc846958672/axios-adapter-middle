import compose from 'koa-compose';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosAdapter } from 'axios';
// 默认适配器
const defaultAdapter = Axios.defaults.adapter;

/**
 * 中间件函数
 */
export interface IMiddleWare<T = any> {
  (config: AxiosRequestConfig, next: () => Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>>;
}

declare module 'axios' {
  interface AxiosAdapter {
    middleware: IMiddleWare[];
    use: (fn: IMiddleWare) => void;
  }
}

/**
 * 中间件适配器
 */
interface IMAdapter extends AxiosAdapter {
  middleware: IMiddleWare[];
  use: (fn: IMiddleWare) => void;
}
/**
 * 中间件包装适配器
 * @param adapter 请求适配器 默认：Axios.defaults.adapter
 * @returns {IMAdapter} 中间件适配器
 */
function AdapterMiddle(adapter = defaultAdapter) {
  const middleAdapter: IMAdapter = async (config: AxiosRequestConfig) => {
    const fn = (compose as any)([...middleAdapter.middleware, defaultAdapter]);
    const response = await fn(config);
    return response;
  };

  middleAdapter.middleware = [];
  middleAdapter.use = (fn: IMiddleWare) => {
    if (typeof fn !== 'function') throw new Error('middleware must be a function');
    middleAdapter.middleware.push(fn);
  };
  return middleAdapter;
}

export default AdapterMiddle;
