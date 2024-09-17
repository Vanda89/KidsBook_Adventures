import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

interface AvatarSelectorProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  selectedAvatar: string | undefined;
  setSelectedAvatar: (avatar: string | undefined) => void; // Fonction qui met à jour l'état
  avatars: string[];
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  selectedAvatar,
  setSelectedAvatar,
  avatars,
}) => {
  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('avatar', avatar);
    onOpenChange(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4 bg-secondary-100 text-primary-500">
        <ModalContent>
          <ModalHeader className="justify-center ">Modification de l'avatar</ModalHeader>
          <ModalBody>
            <div className="theme grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-6 ">
              {avatars.map((src, index) => (
                <Avatar
                  as={Button}
                  key={index}
                  size="lg"
                  src={src}
                  alt={`Image ${index}`}
                  className="p-0 h-24 w-24"
                  onClick={() => handleAvatarChange(src)}
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter className="pt-12 flex gap-4 font-nunito">
            <Button
              type="button"
              className="text-content1 border-secondary-300 font-bold"
              variant="bordered"
              onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              type="button"
              className="text-content1 border-secondary-300 font-bold"
              variant="bordered"
              onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AvatarSelector;
