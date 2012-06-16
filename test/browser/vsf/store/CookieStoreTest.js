$(document).ready(function() {

  module('vsf.store.CookieStore');

  var cookieStore = new vsf.store.CookieStore();

  cookieStore.clear();

  test('APIs', function() {
    ok(cookieStore.isSupported, 'isSupported');
    ok(cookieStore.hasItem, 'hasItem');
    ok(cookieStore.setItem, 'setItem');
    ok(cookieStore.getItem, 'getItem');
    ok(cookieStore.removeItem, 'removeItem');
    ok(cookieStore.findByKey, 'findByKey');
    ok(cookieStore.sizeByKey, 'sizeByKey');
    ok(cookieStore.size, 'size');
    ok(cookieStore.isAllowed, 'isAllowed');
    ok(cookieStore.clear, 'clear');

    if (cookieStore.isSupported()) {
      cookieStore.setItem('key1', 'value1, value2, value3');
      cookieStore.setItem('key2', 'value2', 3);

      equal(cookieStore.size(), 2, 'size: 2');

      equal(cookieStore.hasItem('key1'), true, 'key1: true');
      equal(cookieStore.hasItem('key2'), true, 'key2: true');
      equal(cookieStore.hasItem('key3'), false, 'key3: false');

      equal(cookieStore.getItem('key1'), 'value1, value2, value3', 'value1, value2, value3');
      equal(cookieStore.getItem('key2'), 'value2', 'value2');
      equal(cookieStore.getItem('key3', undefined, 'undefined'));

      cookieStore.setItem('key1', 'new value 1');
      equal(cookieStore.getItem('key1'), 'new value 1', 'new value 1');

      equal(cookieStore.size(), '2', 'size: 2');

      cookieStore.removeItem('key2');

      equal(cookieStore.size(), 1, 'size: 1');

      equal(cookieStore.getItem('key2'), undefined, 'getItem(key2) == undefined');

      //try to clear all cookies
      cookieStore.removeItem('key1');
      cookieStore.removeItem('key3');

    } else {
      alert('cookieStore is not supported.');
    }
  });

  test('findByKey', function() {
    cookieStore.setItem('key1', 'value1');
    cookieStore.setItem('2', '{2}');
    cookieStore.setItem('key2', 'value2');
    cookieStore.setItem('key 3', 'value 3');

    equal(cookieStore.findByKey(/^key\d/).length, 2, 'findByKey /^key\\d/ : 2');
    equal(cookieStore.findByKey(/^\d/).length, 1, 'findByKey /^\\d/: 1');
    equal(cookieStore.findByKey(/^key\s\d/).length, 1, 'findByKey /^key\\s\\d/: 1');

    //clean up
    cookieStore.removeItem('key1');
    cookieStore.removeItem('2');
    cookieStore.removeItem('key2');
    cookieStore.removeItem('key 3');
  });

  test('sizeByKey', function() {
    cookieStore.setItem('key1', 'value1');
    cookieStore.setItem('2', '{2}');
    cookieStore.setItem('key2', 'value2');
    cookieStore.setItem('key 3', 'value 3');

    equal(cookieStore.sizeByKey(/^key\d/), 2, 'sizeByKey /^key\\d/ : 2');
    equal(cookieStore.sizeByKey(/^\d/), 1, 'sizeByKey /^\\d/: 1');
    equal(cookieStore.sizeByKey(/^key\s\d/), 1, 'sizeByKey /^key\\s\\d/: 1');

    //clean up
    cookieStore.removeItem('key1');
    cookieStore.removeItem('2');
    cookieStore.removeItem('key2');
    cookieStore.removeItem('key 3');

  });

  test('isAllowed', function() {
    var content = 'Why do BILLIONAIRES like Donald Trump and Warren Buffet involve themselves in the network marketing industry?' +

      'BECAUSE IT WORKS!' +

      'You’re about to learn how simple it is to get out of the rat race and ' +
      'start living life as YOU want to, under your terms…. Not your bosses.' +

      'HOW?' +

      'The answer is TIMING and POSITIONING.' +

      'Right NOW, we are perfectly positioned in front of two of the fastest growing business trends in history.' +

      'Imagine if you were positioned in front of trends like computers, cd players, or even the cell phone. People made MILLIONS…..' +

      'NOW, thanks to the power of the internet, the playing field has been LEVELED.' +
      'For the first time EVER, average people just like YOU are making fortunes in their spare time from home.' +
      'And they’re doing it without having to invest a lot of money AND without having to commit a lot of time to do it.' +

      'In fact, with tools like this movie, 95% of the work is AUTOMATED.' +
      'So all you need to do is plug into our system, follow a few simple steps to success,' +
      'and you are on your way to shaping your life as you want it.'+

      "It’s no secret that the internet is changing lives," +
      'but ANOTHER trend that is taking the world by storm is the Home Based Business revolution.' +

      'Right now, more than any time ever before,' +
      'the home based business industry is being recognized as a one of the most viable and lucrative career paths anywhere.' +
      'In fact statistics prove that the average person working from home makes MORE MONEY than the average person working in an office.' +

      'So what does all this mean to YOU???' +

      'We want YOU to be our next great success story.' +

      'We recognize that people have busy lives…. Families, jobs, responsibilities….' +
      'Although we desperately need it, there isn’t a lot of time to commit to much else.' +

      'We have created the most simple step by step training program to help YOU be successful without having to commit a lot of time, effort, or money.' +

      'In fact, thanks to the internet and our automated system, 95% of the work is done for you!' +

      'That means you can be making 24/7 whether you’re at work, spending time with your family, or even sleeping!' +

      'We provide everything: TRAINING, MENTORING, and MARKETING TOOLS.' +
      'In fact, all you need to do is follow a few simple instructions and we coach and train you every step of the way.' +

      'You are never alone in this business and there is virtually no risk.' +
      'We provide all the tools you need and you don’t have to sell your friends and family to be successful.' +

      'From housewives, students, retirees, and those working in the corporate world,  Our training is so complete that anyone, anywhere, can be as successful as they desire.' +

      'BUT, you must have the DESIRE. Remember, nothing changes in your life until you do something to change it.' +

      'Click on the link below to change your life NOW! Click on the link below to change your life NOW! Click on the link below to change yourr';

    equal(encodeURIComponent(content).length, 4086, '4086');

    equal(cookieStore.isAllowed('1', content), true, 'return true');

    cookieStore.setItem('1', content);

    equal(cookieStore.getItem('1'), content, 'content');

    cookieStore.removeItem('1');

    content += '1';

    equal(encodeURIComponent(content).length, 4087, '4087');

    //$.log('encodeURIComponent(content).length', encodeURIComponent(content).length);

    equal(cookieStore.isAllowed('2', content), false, 'return false');

    //safari allows, however, opera, chrome, firefox does not.
    raises(function() {
      cookieStore.setItem('test', content);
    });

  });


  test('clear', function() {

    var entry1 = {
      key: 'key1',
      value: 'value1'
    };

    var entry2 = {
      key: 'key 2',
      value: 'value 2'
    };

    cookieStore.setItem(entry1.key, entry1.value);
    cookieStore.setItem(entry2.key, entry2.value);

    equal(cookieStore.size(), 2, 'size: 2');

    cookieStore.clear();

    equal(cookieStore.size(), 0, 'size: 0');

  });


});