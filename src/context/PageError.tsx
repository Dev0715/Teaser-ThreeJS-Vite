import React from 'react';

const PageError: React.FC = () => {
  return (
    <div>
      <span>500</span>
      <div>
        <h4>
          <i className="fas fa-exclamation-triangle" />{' '}
          {'Oops! Something went wrong'}.
        </h4>
        <p>
          {
            'We will work on fixing that right away. Meanwhile, you can try to refresh the page or contact administrator'
          }
          .
        </p>
      </div>
    </div>
  );
};

export default PageError;
