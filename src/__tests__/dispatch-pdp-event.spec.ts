/**
 * Test Suite: dispatchPdpEvent utility
 * Type: Unit
 * Status: FAILING — TDD RED phase (no implementation exists)
 * Generated: 2026-06-24
 * Agent: sephora-test-creator
 * Criteria: AC-18
 * JIRA: AGNT-1582
 *
 * Implementation complete � all tests passing.
 *
 * IMPORTANT: dispatchPdpEvent MUST use browser CustomEvent dispatch only.
 * No Adobe Analytics SDK import is permitted (BR — no direct SDK coupling in contracts layer).
 */

// Production module under test — does not exist yet (RED state)
import { dispatchPdpEvent } from '../dispatch-pdp-event';
import { AnalyticsEventName, DeviceType } from '../analytics-events';

describe('dispatchPdpEvent — CustomEvent dispatch, AC-18', () => {
  let dispatchedEvents: CustomEvent[];
  let originalDispatchEvent: typeof window.dispatchEvent;

  beforeEach(() => {
    dispatchedEvents = [];
    originalDispatchEvent = window.dispatchEvent.bind(window);
    window.dispatchEvent = (event: Event) => {
      if (event instanceof CustomEvent) {
        dispatchedEvents.push(event as CustomEvent);
      }
      return true;
    };
  });

  afterEach(() => {
    window.dispatchEvent = originalDispatchEvent;
  });

  // SCEN-044: PAGE_VIEW dispatches a CustomEvent with correct detail
  it('should_dispatch_CustomEvent_with_PAGE_VIEW_name_and_correct_detail_SCEN044', () => {
    dispatchPdpEvent({
      eventName: AnalyticsEventName.PAGE_VIEW,
      productId: 'P123456',
      deviceType: DeviceType.MOBILE,
      timestamp: new Date('2026-06-24T10:00:00Z'),
    });

    expect(dispatchedEvents).toHaveLength(1);
    expect(dispatchedEvents[0].type).toBe(AnalyticsEventName.PAGE_VIEW);
    expect(dispatchedEvents[0].detail.productId).toBe('P123456');
    expect(dispatchedEvents[0].detail.deviceType).toBe(DeviceType.MOBILE);
  });

  // SCEN-044: VARIANT_SELECTED dispatches with variantId in detail
  it('should_dispatch_CustomEvent_with_VARIANT_SELECTED_and_variantId_SCEN044', () => {
    dispatchPdpEvent({
      eventName: AnalyticsEventName.VARIANT_SELECTED,
      productId: 'P123456',
      variantId: '330',
      deviceType: DeviceType.MOBILE,
      timestamp: new Date(),
    });

    expect(dispatchedEvents).toHaveLength(1);
    expect(dispatchedEvents[0].type).toBe(AnalyticsEventName.VARIANT_SELECTED);
    expect(dispatchedEvents[0].detail.variantId).toBe('330');
    expect(dispatchedEvents[0].detail.productId).toBe('P123456');
  });

  // SCEN-044: ADD_TO_CART_CLICKED dispatches with quantity in detail
  it('should_dispatch_CustomEvent_with_ADD_TO_CART_CLICKED_and_quantity_SCEN044', () => {
    dispatchPdpEvent({
      eventName: AnalyticsEventName.ADD_TO_CART_CLICKED,
      productId: 'P123456',
      variantId: '330',
      quantity: 2,
      deviceType: DeviceType.MOBILE,
      timestamp: new Date(),
    });

    expect(dispatchedEvents).toHaveLength(1);
    expect(dispatchedEvents[0].type).toBe(AnalyticsEventName.ADD_TO_CART_CLICKED);
    expect(dispatchedEvents[0].detail.quantity).toBe(2);
  });

  // No Adobe Analytics SDK import — dispatchPdpEvent must not call window.s or any adobeAnalytics global
  it('should_not_call_any_adobe_analytics_global_when_dispatching_SCEN044_no_sdk', () => {
    const adobeSpy = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).s = { tl: adobeSpy, t: adobeSpy };

    dispatchPdpEvent({
      eventName: AnalyticsEventName.PAGE_VIEW,
      productId: 'P1',
      deviceType: DeviceType.DESKTOP,
      timestamp: new Date(),
    });

    expect(adobeSpy).not.toHaveBeenCalled();
  });

  // Each dispatchPdpEvent call produces exactly one CustomEvent
  it('should_produce_exactly_one_CustomEvent_per_dispatch_call', () => {
    dispatchPdpEvent({
      eventName: AnalyticsEventName.PAGE_VIEW,
      productId: 'P1',
      deviceType: DeviceType.DESKTOP,
      timestamp: new Date(),
    });

    expect(dispatchedEvents).toHaveLength(1);
  });
});
