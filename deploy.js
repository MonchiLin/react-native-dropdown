const path = require('path');
const ghpages = require('gh-pages');
require('dotenv').config()

ghpages.publish(
  path.join('MobileExample', 'web-build'),
  {
    repo: 'https://' + process.env.GITHUB_TOKEN + '@github.com/MonchiLin/react-native-dropdown.git',
    // branch: 'mobile-preview',
  },
  function (err) {
    console.log('done', err);
  }
);
