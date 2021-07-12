import { AxiosRequestConfig, AxiosResponse, AxiosAdapter } from 'axios';
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
declare function AdapterMiddle(adapter?: AxiosAdapter | undefined): IMAdapter;
export default AdapterMiddle;
