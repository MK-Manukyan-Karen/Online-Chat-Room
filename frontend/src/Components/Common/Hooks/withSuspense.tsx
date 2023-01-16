import React from 'react';
import { Loading } from '../Loading/Loading';



export const withSuspense  = (Component:any) => {
  return (props:any) => {
    return (
      <React.Suspense fallback={<Loading />}>
        <Component {...props}/>
      </React.Suspense>
    )
  }
}