import { useState } from 'react';

const useOverlayHook = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    onClick,
    onClose,
  };
};

export default useOverlayHook;
