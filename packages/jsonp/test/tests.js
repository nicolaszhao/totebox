describe('jsonp', () => {
  it('callback=jsonp should be ok', (done) => {
    totebox.jsonp(
      'http://www.mocky.io/v2/5d8de643310000b75f2b5195?callback=jsonp',
      (err, data) => {
        if (!err) {
          done();
        }
      });
  });

  it('callback=? should be ok', (done) => {
    totebox.jsonp(
      'http://www.mocky.io/v2/5d8de643310000b75f2b5195?callback=?',
      (err, data) => {
        if (!err) {
          done();
        }
      });
  });

  it('jsonpCallback=jsonp should be ok', (done) => {
    totebox.jsonp(
      'http://www.mocky.io/v2/5d8de643310000b75f2b5195',
      {
        jsonpCallback: 'jsonp'
      },
      (err, data) => {
        if (!err) {
          done();
        }
      });
  });

  it('timeout=100 should be fail', (done) => {
    totebox.jsonp(
      'http://www.mocky.io/v2/5d8de643310000b75f2b5195?callback=?',
      {
        timeout: 100
      },
      (err, data) => {
        if (err) {
          done()
        }
      }
    );
  });
});
