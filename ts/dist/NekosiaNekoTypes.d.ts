export interface Booru {
    artist?: string;
    created_at?: string;
    id?: string;
    source?: string;
    tags?: any[];
    url?: string;
}
export interface BooruLoadMatch {
    id: string;
}
export interface BooruListMatch {
    limit?: number;
    page?: number;
    tag?: string;
    $action?: string;
    [action: string]: any;
}
export interface BooruCreateData {
    artist?: string;
    created_at?: string;
    id?: string;
    source?: string;
    tags?: any[];
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface Image {
    artist?: string;
    id?: string;
    source?: string;
    tags?: any[];
    url?: string;
}
export interface ImageLoadMatch {
    count?: number;
    $action?: string;
    [action: string]: any;
}
