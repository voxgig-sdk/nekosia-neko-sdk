"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekosiaNekoError = void 0;
class NekosiaNekoError extends Error {
    isNekosiaNekoError = true;
    sdk = 'NekosiaNeko';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NekosiaNekoError = NekosiaNekoError;
//# sourceMappingURL=NekosiaNekoError.js.map