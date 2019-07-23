ajax({ url: 'shortcuts://open-shortcut?name=update' }, function(data){
  var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
  simply.title(headline);
});
