/* eslint-disable react/prop-types */
import React from 'react';
import './ErrorLoadingTable.scss';

const ErrorLoadingTable = ({ onLoading }) => (
  <div className="err_load_container">
    <div className="err_load_msg">
      <div>failed to load users from server</div>
      <button
        type="button"
        onClick={onLoading}
        className="load_btn"
      >
        Try again
      </button>
    </div>

  </div>
);

export default ErrorLoadingTable;
