export enum LocaleCode {
  EN_US = 'en-US',
  EN_CA = 'en-CA',
  FR_CA = 'fr-CA',
}

export interface PriceDto {
  current: number;
  original: number | null;
  currency: string;
  isOnSale: boolean;
}

export interface ProductImageDto {
  url: string;
  altText: string;
  displayOrder: number;
}

export interface ProductVariantDto {
  variantId: string;
  label: string;
  type: string;
  swatchImageUrl: string;
  heroImageUrl: string;
  price: PriceDto;
  inStock: boolean;
}

export interface PdpPageDto {
  productId: string;
  brandName: string;
  productName: string;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  ingredientList: string;
  howToUse: string;
  images: ProductImageDto[];
  price: PriceDto;
  variants: ProductVariantDto[];
  locale: LocaleCode | string;
  reviewCount: number;
  averageRating: number | null;
}
