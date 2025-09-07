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
          scene="https://prod.spline.design/pwpEr7d5CjKABNa2/scene.splinecode"
          className="w-full h-full"
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
          scene="https://prod.spline.design/1tLKEkxSyPHhEw6D/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
};