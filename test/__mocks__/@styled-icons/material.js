import React from 'react';

const DummyIcon = props => <svg {...props} />;

// Auto-supply DummyIcon for any property accessed. Saves us from hand-listing
// every icon used anywhere in the codebase, and means new icons added later
// don't quietly fail in tests.
module.exports = new Proxy(
  {},
  {
    get() {
      return DummyIcon;
    },
  }
);
