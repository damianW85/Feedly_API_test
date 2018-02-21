In order to get the node wrapper to work with a developer accesstoken rather than client_id and client_secret I had to hack the feedly plugin slightly and remove the auth functions.

THIS IS A TERRIBLE HAC BUT NEEDS MUST FOR NOW!


module.exports = Feedly = (function() {
    function Feedly(options) {
      this.options = utils.extend({
        port: 0,
        base: 'http://cloud.feedly.com',
        config_file: null,
        html_file: path.join(__dirname, '../html/index.html'),
        html_text: 'No HTML found',
        slop: 3600000,
        client_id: null,
        client_secret: null
      }, options);
# REMOVED ERROR MESSAGE IF ID AND SECRET ARE NOT DEFINED 
      // this.options.config_file = untildify(this.options.config_file);
      // this.options.html_file = untildify(this.options.html_file);
      // if ((this.options.client_id == null) || (this.options.client_secret == null)) {
      //   throw new Error("client_id and client_secret required");
      // }
      this.state = {};
      this.ready = q.allSettled([this._loadConfig(), this._loadHTML()]);
    } 
# REMOVED AUTH FUNCTION LOGIC
    Feedly.prototype._auth = function() {
      // var addr, ref, result, u;
      // ref = utils.qserver(this.options.port, this.options.html_text), addr = ref[0], result = ref[1];
      // u = url.parse(this.options.base);
      // return addr.then((function(_this) {
      //   return function(cb_url) {
      //     u.pathname = '/v3/auth/auth';
      //     u.query = {
      //       response_type: 'code',
      //       client_id: _this.options.client_id,
      //       redirect_uri: cb_url,
      //       scope: 'https://cloud.feedly.com/subscriptions'
      //     };
      //     open(url.format(u));
      //     return result.spread(function(results, body) {
      //       if (results.error != null) {
      //         return q.reject(results.error);
      //       }
      //       return _this._getToken(results.code, cb_url);
      //     });
      //   };
      // })(this));
    };
# REMOVED GETTOKEN FUNCTION LOGIC
    Feedly.prototype._getToken = function(code, redirect) {
      // var u;
      // u = url.parse(this.options.base);
      // u.pathname = '/v3/auth/token';
      // return utils.qrequest({
      //   method: 'POST',
      //   uri: url.format(u),
      //   body: {
      //     code: code,
      //     client_id: this.options.client_id,
      //     client_secret: this.options.client_secret,
      //     grant_type: 'authorization_code',
      //     redirect_uri: redirect
      //   }
      // }).then((function(_this) {
      //   return function(body) {
      //     _this.state = utils.extend(_this.state, body);
      //     _this.state.expires = new Date(new Date().getTime() + (body.expires_in * 1000));
      //     _this._save();
      //     return _this.state.access_token;
      //   };
      // })(this));
    };
#
    Feedly.prototype._request = function(callback, path, method, body) {
      var u;
      if (method == null) {
        method = 'GET';
      }
      if (body == null) {
        body = null;
      }
      u = url.parse(this.options.base);
      u.pathname = path;
# REMOVED CALL TO GET AUTH HERE
      // return this._getAuth().then(function(auth) {
        return utils.qrequest({
          method: method,
          uri: url.format(u),
          headers: {
            Authorization: "OAuth AytcLsNRUZjiRxFihz6aksbH2owleuJtpmWLg6IhLPmLi1Bt5-AE6LSE3yYSqbl3WU9lEGK8Zf1nis56HfGgzqvSqax4NeTZ7ANnaH4tumMJTR-Kk84jfzbsRXaCBNs21_M3uV60BF7vqYaK7lshDgq83Bu-4zYm9noXK7Q6_un5ojyUTY4byUV4-CibPiDpPbB7Px9i77PhYYp8l4kup9S__9YZHudkRvDDkcaWHr5cyv8rTq5yKMTBYHITGIAnFv-XV6L66FOhU5mOUEJwA31hwJIIvxtu:feedlydev"
          },
          body: body,
          callback: callback
        });
      // });
    };