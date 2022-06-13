import { useState, useEffect } from 'react';

export function useControllerCall() {
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState<AbortController>();

  const callEnpoint = async (call: any) => {
    if (call.controller) setController(call.controller);

    setIsLoading(true);
    try {
      const response = await call.callApi;
      setIsLoading(false);
      return response;
    } catch (err: any) {
      setIsLoading(false);
      return err;
    }
  };

  // abort the request if the component unmounts
  const cancelledCall = () => {
    setIsLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => cancelledCall();
  }, []);

  return {
    isLoading,
    controller,
    callEnpoint,
    cancelledCall,
  };
}
