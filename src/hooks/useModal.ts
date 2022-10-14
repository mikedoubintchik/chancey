import { useState } from 'react';

const useModal = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => setIsOpen(true);

  const hideModal = () => setIsOpen(false);

  return [isOpen, showModal, hideModal];
};

export default useModal;
