import * as React from 'react';
import './submit.css'

const Submit = ({progress, onSub}) => {
    if (progress.continueSubmit) {
      return (
        <div className="sub">
          <button onClick={onSub}>Submit</button>
        </div>
      );
    }
  }

export default Submit