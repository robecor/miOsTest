function checkBodyData(data) {
  if (!data.domain) {
    throw new Error('Missing domain!');
  }
  if (!data.method) {
    throw new Error('Missing method!');
  }
}

module.exports = {
  checkBodyData
};
