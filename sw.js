var CACHE='ameliyat-v1';
var ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var url=e.request.url;
  if(e.request.method!=='GET')return;
  if(url.indexOf('googleapis.com')>-1&&url.indexOf('www.gstatic.com')===-1)return; /* Firestore/Auth istekleri ağa gitsin */
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){
      var cp=r.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp);});return r;
    }).catch(function(){return caches.match('./index.html');}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(hit){
    if(hit)return hit;
    return fetch(e.request).then(function(r){
      if(r.ok&&(url.indexOf('www.gstatic.com')>-1||url.indexOf('cdnjs.cloudflare.com')>-1||url.indexOf(self.location.origin)===0)){
        var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});
      }
      return r;
    });
  }));
});
