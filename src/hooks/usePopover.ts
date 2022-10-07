import { useState } from 'react';

const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showPopover = () => setIsOpen(true);

  const hidePopover = () => setIsOpen(false);

  return { isOpen, showPopover, hidePopover };
};

export default usePopover;
