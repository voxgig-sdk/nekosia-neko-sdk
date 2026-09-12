import { NekosiaNekoEntityBase } from '../NekosiaNekoEntityBase';
import type { NekosiaNekoSDK } from '../NekosiaNekoSDK';
import type { Control } from '../types';
import type { Booru, BooruLoadMatch, BooruListMatch, BooruCreateData } from '../NekosiaNekoTypes';
declare class BooruEntity extends NekosiaNekoEntityBase<Booru> {
    constructor(client: NekosiaNekoSDK, entopts: any);
    make(this: BooruEntity): BooruEntity;
    load(this: any, reqmatch?: BooruLoadMatch, ctrl?: Control): Promise<BooruEntity>;
    list(this: any, reqmatch?: BooruListMatch, ctrl?: Control): Promise<BooruEntity[]>;
    create(this: any, reqdata?: BooruCreateData, ctrl?: Control): Promise<BooruEntity>;
}
export { BooruEntity };
