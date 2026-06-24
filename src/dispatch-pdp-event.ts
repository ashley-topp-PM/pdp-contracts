import type { PdpAnalyticsEvent } from './analytics-events';

export function dispatchPdpEvent(event: PdpAnalyticsEvent): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(
    new CustomEvent(event.eventName, { detail: event, bubbles: true, composed: true })
  );
}
