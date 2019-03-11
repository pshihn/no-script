"use strict";
class NoScriptElement extends HTMLElement {
    constructor() {
        super();
        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.blockedScripts = new WeakMap();
        this.observerAttached = false;
        this.attachObserver();
    }
    connectedCallback() {
        if (!this.observerAttached) {
            this.attachObserver();
        }
    }
    disconnectedCallback() {
        this.detachObserver();
    }
    attachObserver() {
        this.observer.observe(this, {
            childList: true,
            subtree: true
        });
        this.observerAttached = true;
    }
    detachObserver() {
        this.observer.disconnect();
        this.observerAttached = false;
    }
    handleMutations(mutations) {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'script') {
                    this.block(node);
                }
            });
        });
    }
    block(script) {
        if (!this.blockedScripts.has(script)) {
            script.__type = script.type || script.getAttribute('type');
            script.__src = script.src || script.getAttribute('src');
            script.innerHTML = '';
            script.type = 'javascript/blocked';
            script.src = '';
            script.removeAttribute('src');
            // Firefox specific code
            const beforeScriptExecuteListener = function (event) {
                event.preventDefault();
                script.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
            };
            script.addEventListener('beforescriptexecute', beforeScriptExecuteListener);
            this.blockedScripts.set(script, true);
        }
    }
}
window.customElements.define('no-script', NoScriptElement);
