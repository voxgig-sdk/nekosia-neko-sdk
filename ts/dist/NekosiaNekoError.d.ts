import { Context } from './Context';
declare class NekosiaNekoError extends Error {
    isNekosiaNekoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NekosiaNekoError };
