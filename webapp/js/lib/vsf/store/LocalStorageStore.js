/**
 * Implementation of Store for localStorage capability.
 */
(function(vsf) {
  var root = this;

  var localStorage = root.localStorage;

  var LocalStorageStore = function() {

  };

  LocalStorageStore.prototype = new vsf.store.Store();

  LocalStorageStore.prototype.isSupported = function() {
    if (!localStorage) {
      return false;
    }
    var uid = new Date(),
      result;
    try {
      localStorage.setItem(uid.toString(), uid);
      result = localStorage.getItem(uid.toString()) == uid;
      localStorage.removeItem(uid.toString());
      return result;
    } catch(e) {
      return false;
    }
  };

  LocalStorageStore.prototype.setItem = function(key, value) {
    localStorage.setItem(key, value);
  };

  LocalStorageStore.prototype.getItem = function(key) {
    var item;
    if ((item = localStorage.getItem(key)) !== null) {
      return item;
    } else {
      return undefined;
    }
  };

  LocalStorageStore.prototype.removeItem = function(key) {
    localStorage.removeItem(key);
  };

  LocalStorageStore.prototype.findByKey = function(keyRegExp) {
    var results = [];

    keyRegExp = new RegExp(keyRegExp);

    for (var i = 0, len = this.size(); i < len; i++) {
      var key = localStorage.key(i);
      if (keyRegExp.test(key)) {
        results.push(this.getItem(key));
      }
    }

    return results;

  };

  LocalStorageStore.prototype.sizeByKey = function(keyRegExp) {
    var count = 0;
    keyRegExp = new RegExp(keyRegExp);

    for (var i = 0, len = this.size(); i < len; i++) {
      if (keyRegExp.test(localStorage.key(i))) {
        count += 1;
      }
    }
    return count;
  };

  LocalStorageStore.prototype.size = function() {
    return localStorage.length;
  };

  LocalStorageStore.prototype.isAllowed = function() {
    //TODO make sure to implement this
    return true;
  };

  LocalStorageStore.prototype.clear = function() {
    localStorage.clear();
  };


  vsf.export('vsf.store.LocalStorageStore', LocalStorageStore);

}).call(this, vsf);