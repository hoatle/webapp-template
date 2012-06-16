$(document).ready(function() {
  module('vsf.store.LocalStorageStore');

  var Store = vsf.store.Store;
  var localStorageStore = new vsf.store.LocalStorageStore();

  test('APIs', function() {
    ok(localStorageStore instanceof  Store, 'instanceof Store');
    ok(localStorageStore.isSupported, 'isSupported');
    ok(localStorageStore.hasItem, 'hasItem');
    ok(localStorageStore.setItem, 'setItem');
    ok(localStorageStore.getItem, 'getItem');
    ok(localStorageStore.removeItem, 'removeItem');
    ok(localStorageStore.findByKey, 'findByKey');
    ok(localStorageStore.sizeByKey, 'sizeByKey');
    ok(localStorageStore.size, 'size');
    ok(localStorageStore.isAllowed, 'isAllowed');
    ok(localStorageStore.clear, 'clear');

    localStorageStore.clear();

    if (localStorageStore.isSupported()) {

      var entry1 = {
        key: 'key1',
        value: 'value1'
      };

      var entry2 = {
        key: 'key2',
        value: '{"key":"value"}'
      };

      equal(localStorageStore.hasItem('some-key'), false, 'hasItem(\'some-key\'): return false');

      equal(localStorageStore.getItem('some-key'), undefined, 'getItem(\'some-key\'): return undefined');

      localStorageStore.setItem(entry1.key, entry1.value);

      equal(localStorageStore.getItem(entry1.key), entry1.value, 'entry1.value');
      ok(localStorageStore.hasItem('key1'), 'key1');
      equal(localStorageStore.size(), 1, 'size: 1');

      localStorageStore.setItem(entry2.key, entry2.value);

      equal(localStorageStore.getItem(entry2.key), entry2.value, 'entry2.value');
      ok(localStorageStore.hasItem('key2'), 'key2');
      equal(localStorageStore.size(), 2, 'size: 2');

      //clean up
      localStorageStore.removeItem('key1');
      localStorageStore.removeItem('key2');

      equal(localStorageStore.hasItem('key1'), false, 'false with key1');
      equal(localStorageStore.hasItem('key2'), false, 'false with key2');
      equal(localStorageStore.size(), 0, 'size: 0');

    } else {
      $.log('localStorageStore is not supported');
      alert('localStorageStore is not supported');
    }

  });

  test('findByKey', function() {
    ok(true); //to avoid no assertion error by qunit
    if (localStorageStore.isSupported()) {
      localStorageStore.setItem('key1', 'value1');
      localStorageStore.setItem('2', '{2}');
      localStorageStore.setItem('key2', 'value2');
      localStorageStore.setItem('key 3', 'value 3');

      equal(localStorageStore.findByKey(/^key\d/).length, 2, 'findByKey(/^key\\d/): 2');
      equal(localStorageStore.findByKey(/^\d/).length, 1, 'findByKey(/^\\d/): 1');
      equal(localStorageStore.findByKey(/^key\s\d/).length, 1, 'findByKey(/^key\\s\\d/): 1');
      equal(localStorageStore.findByKey(/^key/).length, 3, 'findByKey(/^key/): 3');

      //clean up
      localStorageStore.removeItem('key1');
      localStorageStore.removeItem('2');
      localStorageStore.removeItem('key2');
      localStorageStore.removeItem('key 3');
    }
  });

  test('sizeByKey', function() {
    ok(true); //to avoid no assertion error by qunit

    if (localStorageStore.isSupported()) {
      localStorageStore.setItem('key1', 'value1');
      localStorageStore.setItem('2', '{2}');
      localStorageStore.setItem('key2', 'value2');
      localStorageStore.setItem('key 3', 'value 3');

      equal(localStorageStore.sizeByKey(/^key\d/), 2, 'sizeByKey(/^key\\d/): 2');
      equal(localStorageStore.sizeByKey(/^\d/), 1, 'sizeByKey(/^\\d/): 1');
      equal(localStorageStore.sizeByKey(/^key\s\d/), 1, 'sizeByKey(/^key\\s\\d/): 1');
      equal(localStorageStore.sizeByKey(/^key/), 3, 'sizeByKey(/^key/): 3');

      //clean up
      localStorageStore.removeItem('key1');
      localStorageStore.removeItem('2');
      localStorageStore.removeItem('key2');
      localStorageStore.removeItem('key 3');
    }
  });

  test('isAllowed', function() {
    ok(true);
  });

  test('clear', function() {
    ok(true);
    if (localStorageStore.isSupported()) {
      localStorageStore.setItem('key1', 'value1');
      localStorageStore.setItem('2', '{2}');
      localStorageStore.setItem('key2', 'value2');
      localStorageStore.setItem('key 3', 'value 3');

      equal(localStorageStore.size(), 4, 'size(): 4');

      localStorageStore.clear();

      equal(localStorageStore.size(), 0, 'size: 0');

      equal(localStorageStore.getItem('key1'), undefined, 'return undefined');
    }
  });

});