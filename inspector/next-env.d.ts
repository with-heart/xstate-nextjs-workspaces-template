/// <reference types="next" />
/// <reference types="next/types/global" />

interface Window {
  hljs: {
    highlightBlock(element: HTMLElement): void
  }
}
