/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import ToiletList from '../toiletList/ToiletList';
import { toiletPropTypes } from '../toilet/Toilet';

function Sidebar({ toilets, isLoading, children }) {
  return (
    <div className="max-h-[90vh] w-full p-4 lg:max-w-[500px] lg:overflow-auto lg:border-r-2">
      <div className="mx-auto h-2 w-[50%] rounded-full bg-gray-300 lg:hidden" />
      {children}
      <div className="mt-8">
        <div className="flex gap-2">
          <InformationCircleIcon className="w-7" />
          <h3 className="text-xl font-bold">
            Toilets <span>{`(${toilets.length})`}</span>
          </h3>
        </div>
        {isLoading ? (
          <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-center justify-center">
            <div className="custom-loader" />
            <p className="mt-4 animate-pulse text-center text-lg font-light text-gray-500">
              Loading...
            </p>
          </div>
        ) : (
          <ToiletList toilets={toilets} />
        )}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  toilets: PropTypes.arrayOf(toiletPropTypes).isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Sidebar;
