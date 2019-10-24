const expect = chai.expect;

describe('ajax', () => {
  const ajax = $totebox.ajax({
    interceptors: {
      response(data, config) {
        if (config.responseType && config.responseType !== 'json') {
          return data;
        }

        if (data.status !== 0) {
          return Promise.reject(new Error(data.message + ' # interceptors.response'));
        }

        return data.data;
      },
      error(err) {
        err.message = `${err.message} # interceptors.error`
        return err;
      },
    }
  });

  it(`reqId: 0, $totebox.ajax(url) 应该成功`, (done) => {
    $totebox.ajax('http://www.mocky.io/v2/5da0576b3000002900f89db4')
      .then(() => done())
      .catch((err) => done(err));
  });

  it(`reqId: 1, 响应数据: { status: 0, data: { id: 1 }, message: ""} 应该成功`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da0576b3000002900f89db4')
      .then(() => done())
      .catch((err) => done(err));
  });

  it(`reqId: 2, 响应数据: { status: -1, message: "System error." } 应该失败`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da06efb3000002a00f89e92')
      .catch((err) => {
        console.log(`reqId: 2 error`, err.message);
        done()
      });
  });

  it(`reqId: 3, 响应数据: <ul><li>nz</li><li>nicolas</li></ul> 应该为字符串`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da13960300000a65ff8a1f8', null, { responseType: 'text' })
      .then((data) => {
        expect(data).to.be.an('string');
        done();
      })
      .catch((err) => done(err));
  });

  it('reqId: 4, 响应 500 的服务器状态应该失败', (done) => {
    ajax.get('http://www.mocky.io/v2/5da13e133000005600f8a204')
      .catch((err) => {
        console.log(`reqId: 4 error`, err.message);
        done()
      });
  });

  const api = (id, done) => {
    if (api.xhr) {
      api.xhr.abort();
    }

    api.xhr = ajax.get('http://www.mocky.io/v2/5da0576b3000002900f89db4');
    api.xhr
      .then((data) => {
        api.xhr = null;
        done && done(data);
      })
      .catch((err) => {
        console.log('reqId: 5 error', err.message);
        api.xhr = null;
        done && done();
      });
  };

  it(`reqId: 5, 第 1 次请求应该被成功取消`, (done) => {
    api(1, done);
    api(2);
  });
});
