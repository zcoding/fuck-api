import Vue          from 'vue';
import VueRouter    from 'vue-router';
import routes       from './routes';
import filters      from './filters';
import directives   from './directives';
import Localforage  from 'localforage';
import config       from './app.config';
import { cooker }   from 'utils';
// 全局组件
import uiNotificationTips from 'components/uiNotificationTips.vue';
import uiMessageTips from 'components/uiMessageTips.vue';

const OM_APP_VERSION = config.version;

Vue.config.debug = config.debug;

Vue.use(VueRouter);

let Router = new VueRouter();

let App = Vue.extend({

  components: {
    uiMessageTips, uiNotificationTips
  },

  methods: {
    toggleNarrow() {
      this.isNarrow = !this.isNarrow;
      Localforage.setItem('narrow', this.isNarrow, (err, result) => {
        if (err) {
          console.warn('Cannot store item: narrow');
        }
      });
    }
  },

  data() {
    return {
      operator: '',
      isNarrow: false
    };
  },

  created() {
    this.operator = cooker.getItem('om_operator');
    if (!this.operator) {
      location.href = '/login';
    }
    Localforage.getItem('om-app-version', (err, version) => {
      if (version == null) {
        Localforage.setItem('om-app-version', OM_APP_VERSION);
      } else {
        if (OM_APP_VERSION !== version) { // 如果版本不对，说明需要更新
          //
          Localforage.setItem('om-app-version', OM_APP_VERSION);
        }
      }
    });
  },

  ready() {
    Localforage.getItem('narrow', (err, isNarrow) => {
      if (isNarrow == null) {
        Localforage.setItem('narrow', this.isNarrow);
      } else {
        this.isNarrow = isNarrow;
      }
    });
  },

  events: {
    "message": function(tips) {
      this.$broadcast('global-message-tips', tips);
    },
    "tips": function(tips) {
      this.$broadcast('global-notification-tips', tips);
    }
  }
});

Router.map(routes);

Router.beforeEach(function (transition) {
  NProgress.start();
  transition.next();
});

Router.start(App, '#app-main');
