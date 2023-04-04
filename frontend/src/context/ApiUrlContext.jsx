import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const ApiUrlContext = React.createContext();

function ApiUrlContextProvider({ children }) {
  const [url] = useState(
    process.env.REACT_APP_API_URL || 'http://localhost:8080'
  );

  const context = useMemo(() => ({ url }), [url]);

  return (
    <ApiUrlContext.Provider value={context}>{children}</ApiUrlContext.Provider>
  );
}
ApiUrlContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ApiUrlContextProvider;
