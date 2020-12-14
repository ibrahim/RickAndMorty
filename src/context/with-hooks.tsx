import React from 'react';

export const withHooks = (mapHooksToProps: any) => (WrappedComponent: any) => {
    return (props: any) => {
        let hookProps = mapHooksToProps(props);
        return <WrappedComponent {...hookProps} {...props} />;
    };
};
