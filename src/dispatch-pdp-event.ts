import type { PdpAnalyticsEvent } from './analytics-events';

export function dispatchPdpEvent(event: PdpAnalyticsEvent): void {
  /* istanbul ignore next — SSR guard: window is always defined in jsdom tests */
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(
    new CustomEvent(event.eventName, { detail: event, bubbles: true, composed: true })
  );
}
