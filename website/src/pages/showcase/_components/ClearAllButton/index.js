import React from 'react';
import { useClearQueryString } from '@docusaurus/theme-common';

export default function ClearAllButton() {
  const clearQueryString = useClearQueryString();
  // TODO translate
  return (
    <button
      className="button button--outline button--primary"
      type="button"
      onClick={() => clearQueryString()}>
      Clear All
    </button>
  );
}
