describe('http', () => {
  const http = $totebox.http;

  it('req id: 1, 直接使用 http(url, { method: "GET" }) 请求接口', (done) => {
    http('http://www.mocky.io/v2/5da0576b3000002900f89db4', { method: 'GET' })
      .then(() => done())
      .catch(err => done(err));
  });

  const request = http.create({
    interceptors: {
      response(data) {
        if (data.status !== 0) {
          return Promise.reject(new Error(`# interceptors.response: ${data.message}`));
        }

        return data.data;
      },
      error(err, statusText, url) {
        return new Error(`# interceptors.error: url: "${url}", message: "${err.message}"${statusText
          ? `, status: "${statusText}"` : ''}`
        );
      }
    },
  });

  it('req id: 2, 使用 http.create(...).get(url) 后的实例请求接口', (done) => {
    request.get('http://www.mocky.io/v2/5da0576b3000002900f89db4')
      .then(() => done())
      .catch(err => done(err));
  });

  it('req id: 3, 使用 http.create(...).get(url) 后的实例请求，返回 status=-1 应该失败', (done) => {
    request.get('http://www.mocky.io/v2/5da06efb3000002a00f89e92')
      .then((data) => done(data))
      .catch(err => {
        console.log(`req id: 3 failed, ${err.message}`);
        done()
      });
  });

  it('req id: 4, 使用 http.create(...).get(url) 后的实例请求，响应 500 应该失败', (done) => {
    request.get('http://www.mocky.io/v2/5da13e133000005600f8a204')
      .then((data) => done(data))
      .catch((err) => {
        console.log(`req id: 4 failed, ${err.message}`);
        done()
      });
  });

  it('req id: 5, 使用 http.create(...).get(url, null, { timeout: 100 }) 后的实例请求，应该超时', (done) => {
    request.get('http://www.mocky.io/v2/5da0576b3000002900f89db4', null ,{ timeout: 100 })
      .then((data) => done(data))
      .catch((err) => {
        console.log(`req id: 5 failed, ${err.message}`);
        done()
      });
  });

  it('req id: 6, 多次请求后，前一次请求应该中止', (done) => {
    const api = (id, done) => {
      if (api.req) {
        api.req.abort();
      }

      api.req = request.get('http://www.mocky.io/v2/5da0576b3000002900f89db4');
      api.req
        .catch((err) => {
          console.log(`req id: 6 (call api ${id}) failed, ${err.message}`);
          done();
        })
        .then(() => {
          api.req = null;
        });
    };

    api(1, done);
    api(2, done);
  });
});
