import React from 'react';

const Filter = ({filterContent}) => {
      return (
        <>
        <div>
          filter shown with <input onChange={filterContent} />
        </div>
        </>
      )
}
export default Filter