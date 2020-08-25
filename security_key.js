NRF.setServices({
  0xabcd : {
    0xAB40 : {
      value : "Hello",
      maxLen : 50,
      notify: true,
      readable: true,
      writable: true,
    },
    0xAB41 : {
      value : "Hello",
      maxLen : 50,
      notify: true,
      readable: true,
      writable: true,
      security: {
        read: {
          encrypted: true,
          mitm: true
        }, write: {
          encrypted: true,
          mitm: true
        }
      },
      onWrite : function(evt) { // optional
        console.log("Written ", evt.data); // an ArrayBuffer
      }
    }
  }
}, {advertise: [ 0xabcd ]});
NRF.setSecurity({passkey:"123456", mitm:1, display:1});
NRF.on('disconnect',x=>print('disconnect',x));
NRF.on('connect',x=>print('connect',x));
var  on = false;
setWatch(function(e) {
  on = !on;
  LED1.write(on);
  var pressTime = e.time - e.lastTime;
  NRF.updateServices({
    0xBC10 : {
      0xAB40 : {
        value : "time: " + e.time,
        notify: true
      },
      0xAB41 : {
        value : "lastTime: " + e.lastTime,
        maxLen : 50,
        notify: true
      },
    }
  });
}, BTN, { repeat:true, edge:"falling", debounce: 50 });