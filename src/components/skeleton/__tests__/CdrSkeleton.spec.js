import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '../../../../test/vue-jest-style-workaround.js';
import { h } from 'vue';
import CdrSkeleton from '../CdrSkeleton.vue';
import CdrSkeletonBone from '../CdrSkeletonBone.vue';

describe('CdrSkeleton', () => {
  let wrapper;
  describe('component snapshot', () => {
    beforeEach(() => {
      wrapper = mount(CdrSkeleton, {
        slots: {
          default: [
            h(CdrSkeletonBone, { type: 'heading'}),
            h(CdrSkeletonBone, { type: 'text'}),
          ],
        },
        attachTo: document.body
      });
    });

    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
