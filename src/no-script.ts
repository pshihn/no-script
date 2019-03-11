interface BlockScriptElement extends HTMLScriptElement {
  __src: string | null; // original source
  __type: string | null; // original type
}

export const ALLOW_ATTRIBUTE = 'allow-execution'

export class NoScriptElement extends HTMLElement {
  private observer = new MutationObserver(this.handleMutations.bind(this));
  private processedScripts = new WeakMap<BlockScriptElement, boolean>();
  private observerAttached = false;

  constructor() {
    super();
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

  private attachObserver() {
    this.observer.observe(this, {
      childList: true,
      subtree: true
    });
    this.observerAttached = true;
  }

  private detachObserver() {
    this.observer.disconnect();
    this.observerAttached = false;
  }

  private handleMutations(mutations: MutationRecord[]) {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'script') {
          this.block(node as BlockScriptElement);
        }
      });
    });
  }

  block(script: BlockScriptElement) {
    if (!this.processedScripts.has(script)) {
      if (script.hasAttribute(ALLOW_ATTRIBUTE)) {
        this.processedScripts.set(script, false);
      } else {
        script.__type = script.type || script.getAttribute('type');
        script.__src = script.src || script.getAttribute('src');
        script.innerHTML = '';
        script.type = 'javascript/blocked';
        script.src = '';
        script.removeAttribute('src');

        // Firefox specific code
        const beforeScriptExecuteListener = function (event: Event) {
          event.preventDefault();
          script.removeEventListener('beforescriptexecute', beforeScriptExecuteListener);
        };
        script.addEventListener('beforescriptexecute', beforeScriptExecuteListener);

        this.processedScripts.set(script, true);
      }
    }
  }
}

window.customElements.define('no-script', NoScriptElement);