console.log('hi');
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  require('html/index.pug');
}
