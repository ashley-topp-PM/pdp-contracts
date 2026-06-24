export const AnalyticsEventName = {
  PAGE_VIEW: 'analytics:pdp_page_view',
  VARIANT_SELECTED: 'analytics:variant_selected',
  ADD_TO_CART_CLICKED: 'analytics:add_to_cart_click',
  IMAGE_CAROUSEL_NAVIGATED: 'analytics:image_carousel_navigated',
  QUANTITY_CHANGED: 'analytics:quantity_changed',
  MODAL_OPENED: 'analytics:cart_modal_view',
  MODAL_CLOSED: 'analytics:cart_modal_continue',
  REVIEW_SECTION_VIEWED: 'analytics:review_read_all_click',
} as const;

export type AnalyticsEventNameType = typeof AnalyticsEventName[keyof typeof AnalyticsEventName];

export enum DeviceType {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  TABLET = 'tablet',
}

interface BaseEvent {
  productId: string;
  deviceType: DeviceType;
  timestamp: Date;
}

export interface PdpPageViewEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.PAGE_VIEW;
}

export interface VariantSelectedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.VARIANT_SELECTED;
  variantId: string;
}

export interface AddToCartClickedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.ADD_TO_CART_CLICKED;
  variantId: string;
  quantity: number;
}

export interface ImageCarouselNavigatedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.IMAGE_CAROUSEL_NAVIGATED;
}

export interface QuantityChangedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.QUANTITY_CHANGED;
  quantity: number;
}

export interface ModalOpenedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.MODAL_OPENED;
}

export interface ModalClosedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.MODAL_CLOSED;
}

export interface ReviewSectionViewedEvent extends BaseEvent {
  eventName: typeof AnalyticsEventName.REVIEW_SECTION_VIEWED;
}

export type PdpAnalyticsEvent =
  | PdpPageViewEvent
  | VariantSelectedEvent
  | AddToCartClickedEvent
  | ImageCarouselNavigatedEvent
  | QuantityChangedEvent
  | ModalOpenedEvent
  | ModalClosedEvent
  | ReviewSectionViewedEvent;
