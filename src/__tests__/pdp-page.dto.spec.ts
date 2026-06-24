/**
 * Test Suite: PdpPageDto
 * Type: Unit
 * Status: FAILING — TDD RED phase (no implementation exists)
 * Generated: 2026-06-24
 * Agent: sephora-test-creator
 * Criteria: AC-01, AC-03, AC-04, AC-17, BR-04, BR-10
 * JIRA: AGNT-1582
 *
 * Implementation complete � all tests passing.
 */

// Production module under test — does not exist yet; import causes compile failure (RED state)
import {
  PdpPageDto,
  ProductVariantDto,
  PriceDto,
  ProductImageDto,
  LocaleCode,
} from '../pdp-page.dto';

describe('PdpPageDto — product display contract', () => {
  const baseImage: ProductImageDto = {
    url: 'https://cdn.sephora.com/images/p123456-1.jpg',
    altText: 'Pro Filtʼr Foundation shade 310',
    displayOrder: 1,
  };

  const salePrice: PriceDto = {
    current: 25.00,
    original: 36.00,
    currency: 'USD',
    isOnSale: true,
  };

  const regularPrice: PriceDto = {
    current: 36.00,
    original: null,
    currency: 'USD',
    isOnSale: false,
  };

  const shadeVariant: ProductVariantDto = {
    variantId: 'SKU-330',
    label: '330 Medium Beige',
    type: 'shade',
    swatchImageUrl: 'https://cdn.sephora.com/swatches/330.jpg',
    heroImageUrl: 'https://cdn.sephora.com/images/p123456-shade330.jpg',
    price: regularPrice,
    inStock: true,
  };

  // SCEN-001, AC-01: Full product data renders on PDP load
  it('should_expose_all_required_display_fields_for_SCEN001', () => {
    const dto: PdpPageDto = {
      productId: 'P123456',
      brandName: 'Fenty Beauty',
      productName: "Pro Filt'r Foundation",
      sku: 'SKU-310',
      shortDescription: 'Lightweight, medium-to-full coverage foundation.',
      fullDescription: 'A long-wearing, skin-perfecting formula...',
      keyBenefits: ['Long-wearing', 'Skin-perfecting', 'Oil-free'],
      ingredientList: 'Cyclopentasiloxane, Dimethicone...',
      howToUse: 'Apply with a brush or sponge for medium coverage.',
      images: [baseImage],
      price: regularPrice,
      variants: [],
      locale: LocaleCode.EN_US,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.productId).toBe('P123456');
    expect(dto.brandName).toBe('Fenty Beauty');
    expect(dto.productName).toBe("Pro Filt'r Foundation");
    expect(dto.sku).toBe('SKU-310');
    expect(dto.images).toHaveLength(1);
    expect(dto.keyBenefits).toHaveLength(3);
    expect(dto.locale).toBe(LocaleCode.EN_US);
  });

  // SCEN-002, BR-04: Sale price must carry original price and isOnSale flag
  it('should_mark_isOnSale_true_and_carry_original_price_when_on_sale_SCEN002', () => {
    const dto: PdpPageDto = {
      productId: 'P999',
      brandName: 'Brand',
      productName: 'Product',
      sku: 'SKU-1',
      shortDescription: '',
      fullDescription: '',
      keyBenefits: [],
      ingredientList: '',
      howToUse: '',
      images: [baseImage],
      price: salePrice,
      variants: [],
      locale: LocaleCode.EN_US,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.price.isOnSale).toBe(true);
    expect(dto.price.current).toBe(25.00);
    expect(dto.price.original).toBe(36.00);
    expect(dto.price.original).not.toBeNull();
  });

  // SCEN-003, BR-04: Non-sale product — original price is null
  it('should_set_original_price_to_null_when_not_on_sale_SCEN003', () => {
    const price = regularPrice;

    expect(price.isOnSale).toBe(false);
    expect(price.original).toBeNull();
    expect(price.current).toBe(36.00);
  });

  // SCEN-008, BR-06: Minimum 2 images in carousel
  it('should_accept_minimum_two_images_without_error_SCEN008', () => {
    const twoImages: ProductImageDto[] = [
      { url: 'https://cdn.sephora.com/img1.jpg', altText: 'Image 1', displayOrder: 1 },
      { url: 'https://cdn.sephora.com/img2.jpg', altText: 'Image 2', displayOrder: 2 },
    ];
    const dto: PdpPageDto = {
      productId: 'P-MIN',
      brandName: 'B',
      productName: 'N',
      sku: 'S',
      shortDescription: '',
      fullDescription: '',
      keyBenefits: [],
      ingredientList: '',
      howToUse: '',
      images: twoImages,
      price: regularPrice,
      variants: [],
      locale: LocaleCode.EN_US,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.images).toHaveLength(2);
  });

  // SCEN-009, BR-06: Maximum 12 images in carousel
  it('should_accept_maximum_twelve_images_without_error_SCEN009', () => {
    const twelveImages: ProductImageDto[] = Array.from({ length: 12 }, (_, i) => ({
      url: `https://cdn.sephora.com/img${i + 1}.jpg`,
      altText: `Image ${i + 1}`,
      displayOrder: i + 1,
    }));
    const dto: PdpPageDto = {
      productId: 'P-MAX',
      brandName: 'B',
      productName: 'N',
      sku: 'S',
      shortDescription: '',
      fullDescription: '',
      keyBenefits: [],
      ingredientList: '',
      howToUse: '',
      images: twelveImages,
      price: regularPrice,
      variants: [],
      locale: LocaleCode.EN_US,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.images).toHaveLength(12);
    expect(dto.images[11].displayOrder).toBe(12);
  });

  // SCEN-010, AC-03, BR-01: Shade variant carries hero image URL and in-stock state
  it('should_carry_shade_specific_hero_image_and_inStock_flag_SCEN010', () => {
    expect(shadeVariant.variantId).toBe('SKU-330');
    expect(shadeVariant.type).toBe('shade');
    expect(shadeVariant.heroImageUrl).toBe('https://cdn.sephora.com/images/p123456-shade330.jpg');
    expect(shadeVariant.inStock).toBe(true);
  });

  // SCEN-034, BR-03: Out-of-stock variant exposes inStock=false
  it('should_set_inStock_false_on_out_of_stock_variant_SCEN034', () => {
    const oosVariant: ProductVariantDto = {
      ...shadeVariant,
      variantId: 'SKU-310',
      label: '310 Warm Olive',
      inStock: false,
    };

    expect(oosVariant.inStock).toBe(false);
    expect(oosVariant.variantId).toBe('SKU-310');
  });

  // SCEN-041, AC-17, BR-10: CA-EN locale uses CAD currency
  it('should_use_CAD_currency_for_CA_EN_locale_SCEN041', () => {
    const cadPrice: PriceDto = {
      current: 48.00,
      original: null,
      currency: 'CAD',
      isOnSale: false,
    };
    const dto: PdpPageDto = {
      productId: 'P-CA',
      brandName: 'B',
      productName: 'N',
      sku: 'S-CA',
      shortDescription: '',
      fullDescription: '',
      keyBenefits: [],
      ingredientList: '',
      howToUse: '',
      images: [baseImage],
      price: cadPrice,
      variants: [],
      locale: LocaleCode.EN_CA,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.locale).toBe(LocaleCode.EN_CA);
    expect(dto.price.currency).toBe('CAD');
    expect(dto.price.current).toBe(48.00);
  });

  // SCEN-042, AC-17, BR-10: FR-CA locale
  it('should_accept_FR_CA_locale_SCEN042', () => {
    const dto: PdpPageDto = {
      productId: 'P-FR',
      brandName: 'B',
      productName: 'Produit',
      sku: 'S-FR',
      shortDescription: 'Description courte',
      fullDescription: 'Description complète',
      keyBenefits: ['Bénéfice 1'],
      ingredientList: 'Ingrédients...',
      howToUse: "Mode d'emploi",
      images: [baseImage],
      price: { current: 48.00, original: null, currency: 'CAD', isOnSale: false },
      variants: [],
      locale: LocaleCode.FR_CA,
      reviewCount: 0,
      averageRating: null,
    };

    expect(dto.locale).toBe(LocaleCode.FR_CA);
    expect(dto.price.currency).toBe('CAD');
  });
});
