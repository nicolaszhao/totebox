import { expect } from 'chai';
import { parseNumberPlaceholder } from '@totebox/util';
import Events from '../src/index';

describe('Events', () => {
  const events = new Events();

  const test = (description, event, result, options = {}) => {
    description = parseNumberPlaceholder(
      description,
      typeof event === 'string'
        ? JSON.stringify(event)
        : JSON.stringify(
          Object.keys(event).reduce((r, e, i) => {
            r[e] = `handle${i + 1}`;
            return r;
          }, {})
        )
    );

    const { afterBind, once = false } = options;

    it(description, () => {
      once ? events.once(event, () => {}) : events.on(event, () => {});
      afterBind && afterBind();
      const { callbacks, callbacksWithNamespace } = events;

      const getHandlerSize = (handlers) => {
        if (typeof handlers === 'number') {
          return handlers;
        }
        if (Array.isArray(handlers)) {
          return handlers.length;
        }
        return 0;
      };

      if (!result.callbacks) {
        result.callbacks = {};
      }
      if (!result.callbacksWithNamespace) {
        result.callbacksWithNamespace = {};
      }

      const callbacksEventNames = Object.keys(callbacks);

      // 验证 callbacks 的绑定事件类型数量
      expect(callbacksEventNames).to.have.lengthOf(Object.keys(result.callbacks).length);

      // 验证 callbacks 的每个事件的 handler 数量
      callbacksEventNames.forEach((name) => {
        expect(callbacks[name]).to.have.lengthOf(getHandlerSize(result.callbacks[name]));
      });

      const namespaces = Object.keys(callbacksWithNamespace);

      // 验证带命名空间事件的命名空间数量
      expect(namespaces).to.have.lengthOf(Object.keys(result.callbacksWithNamespace).length);

      namespaces.forEach((ns) => {
        const nsCallbacksEventNames = Object.keys(callbacksWithNamespace[ns]);

        // 验证各命名空间下的绑定事件类型数量
        expect(nsCallbacksEventNames).to.have.lengthOf(
          Object.keys(result.callbacksWithNamespace[ns]).length
        );

        // 验证各命名空间下，每个事件的 handler 数量
        nsCallbacksEventNames.forEach((name) => {
          expect(callbacksWithNamespace[ns][name]).to.have.lengthOf(
            getHandlerSize(result.callbacksWithNamespace[ns][name])
          );
        });
      });
    });
  };

  beforeEach(() => {
    events.off();
  });

  describe('#.on(event, callback)', () => {
    test(
      `绑定 event 为单个事件名: {0}`,
      'change',
      {
        callbacks: {
          change: 1,
        },
      },
    );

    test(
      `绑定 event 为多个相同的事件名: {0}`,
      'change change',
      {
        callbacks: {
          change: 2,
        },
      },
    );

    test(
      `绑定 event 为多个不同的事件名: {0}`,
      'change update',
      {
        callbacks: {
          change: 1,
          update: 1,
        },
      },
    );

    test(
      `绑定 event 为多个不同的事件名，并带有属性选择器: {0}`,
      'change:name update:name',
      {
        callbacks: {
          'change:name': 1,
          'update:name': 1,
        },
      },
    );

    test(
      `绑定 event 为带命名空间的事件名: {0}`,
      'change.user',
      {
        callbacksWithNamespace: {
          user: {
            change: 1,
          },
        },
      },
    );

    test(
      `绑定 event 为多个带命名空间的事件名: {0}`,
      'change.user change.settings',
      {
        callbacksWithNamespace: {
          user: {
            change: 1,
          },
          settings: {
            change: 1,
          },
        },
      },
    );

    test(
      `绑定 event 为多个带命名空间的事件名，且包含属性选择器: {0}`,
      'change:name.user change:name.settings',
      {
        callbacksWithNamespace: {
          user: {
            'change:name': 1,
          },
          settings: {
            'change:name': 1,
          },
        },
      },
    );

    test(
      `绑定 event 为多个事件名，其中部分带有命名空间和属性选择器: {0}`,
      'change change:name change.user change:name.user',
      {
        callbacks: {
          change: 1,
          'change:name': 1,
        },
        callbacksWithNamespace: {
          user: {
            change: 1,
            'change:name': 1,
          },
        },
      },
    );

    test(
      `绑定 event 为对象（多个事件名映射）: {0}`,
      {
        'change': () => {},
        'change:name': () => {},
        'change.user': () => {},
        'change:name.user': () => {},
      },
      {
        callbacks: {
          change: 1,
          'change:name': 1,
        },
        callbacksWithNamespace: {
          user: {
            change: 1,
            'change:name': 1,
          },
        },
      },
    );
  });

  describe('#.once(event, callback)', () => {
    test(
      `执行 events.once({0}, handler)，并触发一次事件: {0}`,
      'change',
      {
        callbacks: {
          change: 0,
        }
      },
      {
        once: true,
        afterBind() {
          events.trigger('change');
        },
      },
    );

    test(
      `执行 events.once({0})，并触发一次事件: "change"`,
      'change update',
      {
        callbacks: {
          change: 0,
          update: 1,
        },
      },
      {
        once: true,
        afterBind() {
          events.trigger('change');
        },
      },
    );

    test(
      `执行 events.once({0})，并触发一次事件: "change.user"`,
      'change.user change.settings',
      {
        callbacksWithNamespace: {
          user: {
            change: 0,
          },
          settings: {
            change: 1,
          },
        },
      },
      {
        once: true,
        afterBind() {
          events.trigger('change.user');
        },
      },
    );
  });

  describe('#.off(event)', () => {
    test(
      `events.off("change:name.user")，应该只移除事件：{0} 中的 "change:name.user"`,
      'change change:name change.user change:name.user',
      {
        callbacks: {
          change: 1,
          'change:name': 1,
        },
        callbacksWithNamespace: {
          user: {
            change: 1,
          },
        },
      },
      {
        afterBind() {
          events.off('change:name.user');
        },
      },
    );

    test(
      `events.off("change.user")，应该移除事件：{0} 中 ".user" 命名空间下的所有 "change" 事件`,
      'change change:name change.user change:name.user',
      {
        callbacks: {
          change: 1,
          'change:name': 1,
        },
        callbacksWithNamespace: {
          user: {},
        },
      },
      {
        afterBind() {
          events.off('change.user');
        },
      },
    );

    test(
      `events.off("change:name")，应该移除事件：{0} 中带 "change:name" 的事件，包括命名空间下的`,
      'change change:name change.user change:name.user',
      {
        callbacks: {
          change: 1,
        },
        callbacksWithNamespace: {
          user: {
            change: 1,
          },
        },
      },
      {
        afterBind() {
          events.off('change:name');
        },
      },
    );

    test(
      `events.off("change")，应该移除事件：{0} 中所有的 "change" 事件，包括命名空间下的`,
      'change update change:name change.user change:name.user update.user',
      {
        callbacks: {
          update: 1,
        },
        callbacksWithNamespace: {
          user: {
            update: 1,
          },
        },
      },
      {
        afterBind() {
          events.off('change');
        },
      },
    );

    test(
      `events.off(".user")，应该移除事件：{0} 中带 ".user" 命名空间的所有事件`,
      'change change.user update.user',
      {
        callbacks: {
          change: 1,
        },
        callbacksWithNamespace: {},
      },
      {
        afterBind() {
          events.off('.user');
        },
      },
    );

    test(
      `events.off()，应该移除所有事件`,
      'change change.user update.user change:name.user',
      {
        callbacks: {},
        callbacksWithNamespace: {},
      },
      {
        afterBind() {
          events.off();
        },
      },
    );
  });

  describe('#.trigger(event, ...data)', () => {
    const testTrigger = (description, event, result, trigger) => {
      description = parseNumberPlaceholder(description, JSON.stringify(event));

      let count = 0;

      it(description, () => {
        events.on(event, () => {
          count++;
        });

        trigger();
        expect(count).to.equal(result);
      });
    };

    testTrigger(
      `events.trigger("change:name.user")，应该触发绑定事件：{0} 中的 "change:name.user"`,
      'change change:name change.user change:name.user',
      1,
      () => {
        events.trigger('change:name.user');
      },
    );

    testTrigger(
      `events.trigger("change.user")，应该触发事件：{0} 中带命名空间 ".user" 下的所有 "change" 事件，包括属性选择器的`,
      'change change:name change.user change:name.user',
      2,
      () => {
        events.trigger('change.user');
      },
    );

    testTrigger(
      `events.trigger("change:name")，应该触发事件：{0} 中的所有 "change:name" 事件，包括所有命名空间下的`,
      'change change:name change.user change:name.user change:name.settings',
      3,
      () => {
        events.trigger('change:name');
      },
    );

    testTrigger(
      `events.trigger("change")，应该触发事件：{0} 中的所有 "change" 事件，包括所有命名空间下的和属性选择器的`,
      'change change:name change.user change:name.user change:name.settings update',
      5,
      () => {
        events.trigger('change');
      },
    );
  });
});
