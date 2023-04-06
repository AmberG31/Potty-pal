/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import ToiletList from '../toiletList/ToiletList';
import { toiletPropTypes } from '../toilet/Toilet';

function Sidebar({ toilets, isLoading, children }) {
  return (
    <div className="w-full p-4 lg:max-w-[500px] lg:border-r-2">
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
          <p className="mt-10 animate-pulse text-center text-lg font-medium text-gray-500">
            Loading...
          </p>
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
