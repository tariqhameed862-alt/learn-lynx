import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const SplineLoader = () => (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export const ComputerModel = () => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <Suspense fallback={<SplineLoader />}>
        <Spline 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
          className="w-full h-full"
          onError={(error) => console.warn('Spline error:', error)}
        />
      </Suspense>
    </div>
  );
};

export const WorldGlobeModel = () => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <Suspense fallback={<SplineLoader />}>
        <Spline 
          scene="https://prod.spline.design/6HRlT8GXxjjj6p8g/scene.splinecode"
          className="w-full h-full"
          onError={(error) => console.warn('Spline error:', error)}
        />
      </Suspense>
    </div>
  );
};

export const TechStackModel = () => {
  return (
    <div className="w-full h-[350px] lg:h-[450px] rounded-xl overflow-hidden">
      <Suspense fallback={<SplineLoader />}>
        <Spline 
          scene="https://prod.spline.design/lVrKyJLBBJB5zRNW/scene.splinecode"
          className="w-full h-full"
          onError={(error) => console.warn('Spline error:', error)}
        />
      </Suspense>
    </div>
  );
};