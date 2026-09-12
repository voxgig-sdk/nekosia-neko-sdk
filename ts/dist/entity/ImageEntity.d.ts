import { NekosiaNekoEntityBase } from '../NekosiaNekoEntityBase';
import type { NekosiaNekoSDK } from '../NekosiaNekoSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch } from '../NekosiaNekoTypes';
declare class ImageEntity extends NekosiaNekoEntityBase<Image> {
    constructor(client: NekosiaNekoSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
}
export { ImageEntity };
