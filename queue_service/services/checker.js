const methodEnum = require('../../enums/methodEnum');

function checkBodyData(data) {
  if (!data.domain) {
    throw new Error('Missing domain!');
  }
  if (!data.method) {
    throw new Error('Missing method!');
  }
  if (!methodEnum.includes(data.method)) {
    throw new Error('Method not valid!');
  }
}

module.exports = {
  checkBodyData
};
