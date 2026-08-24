import { describe, expect, expectTypeOf, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { adapter as lifestyleAdapter } from '../examples/Lifestyle/adapter';
import { resizeStrategy as resizeLifestyle } from '../examples/Lifestyle/handlers';
import BasePicture from '../examples/Lifestyle/BasePicture.vue';
import LifestyleFrame from '../examples/Lifestyle/LifestyleFrame.vue';
import { adapter as productAdapter } from '../examples/ProductRecommendation/adapter';
import type { ImageObject, Lifestyle } from '../examples/Lifestyle';
import type { ProductRecommendation } from '../examples/ProductRecommendation';
import { CdrFilmstripEventKey } from '../../../types/symbols';

describe('filmstrip example adapters', () => {
  it('types source models separately from frame props', () => {
    expectTypeOf(lifestyleAdapter).parameter(0).toEqualTypeOf<Partial<Lifestyle>>();
    expectTypeOf(productAdapter).parameter(0).toEqualTypeOf<Partial<ProductRecommendation>>();
  });

  it('maps lifestyle frames and applies layout defaults', () => {
    const frame = {
      cta: { target: '/camping', text: 'Shop camping' },
      media: { src: '/camping.jpg', alt: 'A campsite' },
    };

    const config = lifestyleAdapter({ frames: [frame], frameStyle: 'lifestyle-square' });

    expect(config).toMatchObject({
      description: 'Lifestyle filmstrip',
      filmstripId: 'lifestyle',
      framesToShow: 4,
      focusSelector: '[data-focus]',
      resizeStrategy: resizeLifestyle,
    });
    expect(config.frames).toEqual([
      {
        key: 'lifestyle-frame-0',
        props: { ...frame, frameStyle: 'lifestyle-square' },
      },
    ]);
  });

  it('maps product frames and placement metadata', () => {
    const item = {
      analyticsConfig: {
        linkName: 'Tent',
        location: 'homepage',
        products: '123',
        rrMessage: 'Recommended',
        rrPlacementName: 'homepage',
        rrStrategy: 'similar',
      },
      brand: 'REI Co-op',
      href: '/product/123',
      id: '123',
      name: 'Tent',
      price: { base: 199, isRange: false },
      rating: { average: 4.5, count: 10 },
      rrClickUrl: '/track/123',
    };

    const config = productAdapter({
      items: [item],
      placementName: 'homepage',
    });

    expect(config).toMatchObject({
      description: 'Product filmstrip',
      filmstripId: 'product-homepage',
      dataAttributes: { 'data-placement-name': 'homepage' },
      useDefaultResizeStrategy: true,
    });
    expect(config.frames).toEqual([{ key: 'product-frame-0', props: item }]);
  });

  it('uses safe defaults for invalid frame collections', () => {
    expect(lifestyleAdapter({ frames: null as unknown as Lifestyle['frames'] }).frames).toEqual([]);
    expect(
      productAdapter({
        items: null as unknown as ProductRecommendation['items'],
      }).frames,
    ).toEqual([]);
    expect(productAdapter({}).filmstripId).toBe('product-unknown');
  });
});

describe('lifestyle frame focus', () => {
  it('applies the managed tabindex to the primary action', () => {
    const wrapper = mount(LifestyleFrame, {
      props: {
        cta: { target: '/camping', text: 'Shop camping' },
        frameStyle: 'lifestyle-square',
        media: { src: '/camping.jpg', alt: 'A campsite' },
        tabindex: '0',
      },
      global: {
        provide: {
          [CdrFilmstripEventKey as symbol]: () => undefined,
        },
      },
    });

    expect(wrapper.attributes('tabindex')).toBeUndefined();
    expect(wrapper.find('[data-focus]').attributes('tabindex')).toBe('0');
  });
});

describe('lifestyle responsive picture', () => {
  const image = (size: string): ImageObject => ({
    alt: `${size} image`,
    attribution: null,
    caption: null,
    imageType: 'jpg',
    renditions: {
      original: { src: `/${size}.jpg`, width: 800, height: 600 },
      vertical: null,
      wide: { src: `/${size}-wide.jpg`, width: 1200, height: 600 },
    },
  });
  const images = {
    xs: image('xs'),
    sm: image('sm'),
    md: image('md'),
    lg: image('lg'),
  };

  it('builds responsive srcsets and forwards image loading attributes', () => {
    const wrapper = mount(BasePicture, {
      props: {
        alt: 'Camp',
        fetchPriority: 'high',
        images,
        lazyLoad: false,
      },
    });

    expect(wrapper.findAll('source')).toHaveLength(7);
    expect(wrapper.find('source').attributes('srcset')).toContain('/xs.jpg?im=Resize,width=350');
    expect(wrapper.find('img').attributes()).toMatchObject({
      alt: 'Camp',
      fetchpriority: 'high',
      src: '/lg.jpg',
    });
    expect(wrapper.find('img').attributes('loading')).toBeUndefined();
  });

  it('uses art-directed sources without resize parameters', () => {
    const wrapper = mount(BasePicture, {
      props: {
        images,
        useBannerCrop: true,
        useResizing: false,
      },
    });

    expect(wrapper.findAll('source')).toHaveLength(4);
    expect(wrapper.find('source').attributes('srcset')).toBe('/xs-wide.jpg');
    expect(wrapper.find('img').attributes('src')).toBe('/lg-wide.jpg');
  });
});

describe('lifestyle resize strategy', () => {
  it.each([
    [1280, 5, 4],
    [1000, 3, 2],
    [500, 2, 1],
  ])('uses the expected frame counts at %ipx', (clientWidth, visible, scroll) => {
    const layout = resizeLifestyle({
      containerWidth: clientWidth,
      model: { framesVisible: 5 },
      viewportWidth: clientWidth,
    });

    expect(layout.framesToShow).toBe(visible);
    expect(layout.framesToScroll).toBe(scroll);
  });
});
