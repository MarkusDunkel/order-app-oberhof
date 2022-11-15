import * as React from 'react';

const Submit = ({progress, onSub}) => {
    if (progress.continueSubmit) {
      return (
        <button onClick={onSub}>Submit</button>
      );
    }
  }

export default Submit