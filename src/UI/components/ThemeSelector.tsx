import React, { useState, useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

const ThemeSelector = ({
  isOpen,
  onOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
}) => {
  const { setTheme, theme } = useNextTheme();

  const handleThemeChange = (selectedTheme: string) => {
    localStorage.setItem('theme', selectedTheme);
    setTheme(selectedTheme);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" className="p-4 bg-secondary-100 text-primary-500">
        <ModalContent>
          <ModalHeader className="justify-center text-2xl text-content1 mb-4 ">Modification du thème</ModalHeader>
          <ModalBody>
            <div className="theme grid  grid-cols-4 md:grid-cols-5 gap-4 md:gap-6 ">
              <Button
                className={`bg-neutral-100 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('neutralTheme')}></Button>
              <Button
                className={`bg-violet-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('violetTheme')}></Button>
              <Button
                className={`bg-blue-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('blueTheme')}></Button>
              <Button
                className={`bg-green-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('greenTheme')}></Button>
              <Button
                className={`bg-yellow-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('yellowTheme')}></Button>
              <Button
                className={`bg-orange-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('orangeTheme')}></Button>
              <Button
                className={`bg-red-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('redTheme')}></Button>
              <Button
                className={`bg-pink-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('pinkTheme')}></Button>
              <Button
                className={`bg-orange-950 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('brownTheme')}></Button>
              <Button
                className={`bg-gray-500 p-0 w-0 h-16`}
                radius="full"
                variant="bordered"
                size="sm"
                onClick={() => handleThemeChange('grayTheme')}></Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ThemeSelector;
