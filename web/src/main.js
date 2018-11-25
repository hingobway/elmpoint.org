Vue.component('auth-page', {
  data() {
    return {
      password: ''
    };
  },
  methods: {
    handleSubmit(e) {
      axios
        .post('/api/auth/general', {
          password: this.password
        })
        .then(({ data }) => {
          console.log('made it', data);
          const query = new URLSearchParams(window.location.search);
          Cookies.set('auth', data.token, { expires: 7 });
          window.location = query.get('path');
        })
        .catch(err => {
          if (err.response.status == 401 || err.response.status == 400) {
            this.password = '';
            app.alert = 1;
          } else console.log(err.response ? err.response : err);
        });
    }
  }
});

const app = new Vue({
  el: '#app',
  data: {
    navLinks: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Updates', path: '/gh' },
      { name: 'Protected', path: '/auth/test' }
    ],
    curpage: window.location.pathname,
    alert: 0
  },
  computed: {
    nlinkclasses() {
      return this.navLinks.map(cur => ({
        'nav-item': true,
        'nav-link': true,
        active: this.curpage == cur.path
      }));
    },
    alertLong() {
      if (this.alert) {
        return [
          '',
          'Incorrect password.' // 1
        ][this.alert];
      }
    }
  }
});
