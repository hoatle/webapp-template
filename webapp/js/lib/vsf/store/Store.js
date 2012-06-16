/**
 * Store interface for local or cookie storage
 */

(function() {

  var Store = function() {

  };

  Store.prototype = {
    /**
     * Checks if the implementation store is currently enabled.
     *
     * @return {Boolean}
     */
    isSupported: function() {
      return false;
    },
    /**
     * Checks if a store key is available.
     *
     * @param name the required key
     * @return {Boolean}
     */
    hasItem: function(key) {
      return this.getItem(key) !== undefined;
    },
    setItem: function(key, value) {
      vsf.raiseRequiredImplementationError('Store#setItem');
    },
    getItem: function(key) {
      vsf.raiseRequiredImplementationError('Store#getItem');
    },
    removeItem: function(key) {
      vsf.raiseRequiredImplementationError('Store#removeItem');
    },
    findByKey: function(keyRegExp) {
      vsf.raiseRequiredImplementationError('Store#findByKey');
    },
    sizeByKey: function(keyRegExp) {
      vsf.raiseRequiredImplementationError('Store#sizeByKey');
    },

    size: function() {
      vsf.raiseRequiredImplementationError('Store#size');
    },

    isAllowed: function(key, value) {
      vsf.raiseRequiredImplementationError('Store#isAllowed');
    },
    clear: function() {
      vsf.raiseRequiredImplementationError('Store#clear');
    }
  };

  vsf.export('vsf.store.Store', Store);

}).call(this, vsf);