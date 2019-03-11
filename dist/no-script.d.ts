interface BlockScriptElement extends HTMLScriptElement {
    __src: string | null;
    __type: string | null;
}
declare class NoScriptElement extends HTMLElement {
    private observer;
    private blockedScripts;
    private observerAttached;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private attachObserver();
    private detachObserver();
    private handleMutations(mutations);
    block(script: BlockScriptElement): void;
}
