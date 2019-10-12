const expect = chai.expect;

describe('ajax', () => {
  const ajax = $totebox.ajax({
    interceptors: {
      response(data, config) {
        if (config.responseType && config.responseType !== 'json') {
          return data;
        }

        if (data.status !== 0) {
          console.log(`${config.url} request error, message: ${data.message}`);
          return Promise.reject(new Error(data.message));
        }

        return data.data;
      },
      error(err) {
        console.log(`${err.config.url} request error, message: ${err.message}`);
        return new Error(err.message);
      },
    }
  });

  it(`响应数据: { status: 0, data: { id: 1 }, message: ""} 应该成功`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da0576b3000002900f89db4')
      .then(() => done())
      .catch((err) => done(err));
  });

  it(`响应数据: { status: -1, message: "System error." } 应该失败`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da06efb3000002a00f89e92')
      .catch(() => done());
  });

  it(`响应数据: <ul><li>nz</li><li>nicolas</li></ul> 应该为字符串`, (done) => {
    ajax.get('http://www.mocky.io/v2/5da13960300000a65ff8a1f8', null, { responseType: 'text' })
      .then((data) => {
        expect(data).to.be.an('string');
        done();
      })
      .catch((err) => done(err));
  });

  it('响应 500 的服务器状态应该失败', (done) => {
    ajax.get('http://www.mocky.io/v2/5da13e133000005600f8a204')
      .catch(() => done());
  });
});
