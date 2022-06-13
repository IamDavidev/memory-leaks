import { useState, useEffect } from 'react';
//

export default function useAsync(
  asyncFn: (...args: any[]) => Promise<any>,
  success: Function,
  returnFunction: Function,
  dependencies: any[] = []
) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    asyncFn().then((result) => {
      if (isActive) success(result);
    });
    return () => {
      returnFunction && returnFunction();
      setIsActive(false);
    };
  }, dependencies);
}
