interface BlockScriptElement extends HTMLScriptElement {
    __src: string | null;
    __type: string | null;
}
export declare const ALLOW_ATTRIBUTE = "allow-execution";
export declare class NoScriptElement extends HTMLElement {
    private observer;
    private processedScripts;
    private observerAttached;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private attachObserver;
    private detachObserver;
    private handleMutations;
    block(script: BlockScriptElement): void;
}
export {};
