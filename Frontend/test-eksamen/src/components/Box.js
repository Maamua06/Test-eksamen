import React from 'react';

function BoxComponent(props) {
  return (
    <div style={{
      width: props.width || '100px',
      height: props.height || '100px',
      backgroundColor: props.color || 'lightblue',
      border: '1px solid black',
      borderRadius: '5px',
      textAlign: 'center',
      lineHeight: props.height || '100px' // Vertically center content
    }}>
      {props.children}
    </div>
  );
}

export default BoxComponent;