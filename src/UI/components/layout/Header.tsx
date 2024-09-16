'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { avatar, Button, Divider, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spinner } from '@nextui-org/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import ThemeSelector from '../ThemeSelector';
import AvatarSelector from '../AvatarSelector';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const { isOpen: isThemeModalOpen, onOpen: onThemeModalOpen, onOpenChange: onThemeModalOpenChange } = useDisclosure();

  const [avatars, setAvatars] = useState<string[]>([]);
  const {
    isOpen: isAvatarModalOpen,
    onOpen: onAvatarModalOpen,
    onOpenChange: onAvatarModalOpenChange,
  } = useDisclosure();
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch('/api/avatars');
      console.log(res);

      if (!res.ok) {
        throw new Error('Failed to fetch images');
      }
      const imagePaths: string[] = await res.json();
      setAvatars(imagePaths);
    }

    fetchImages();
  }, []);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  const isAuthenticated = status === 'authenticated' || !!userId;

  const dropdownLinks = [`/user/${userId}`];
  const isDropdownLinkActive = dropdownLinks.some((link) => pathname === link) ? 'bg-primary-500' : 'bg-secondary-400';
  const isActive = (href: string) => (pathname === href ? 'text-primary-500' : 'text-content1');

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="h-24 font-nunito ">
      <Navbar
        className="w-full h-full flex bg-content2 flex-col border-b-2 border-secondary-300"
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl">
        <NavbarContent className="">
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                className={`cursor-pointer ${isActive('/')} md:w-20 md:h-20`}
                width={80}
                height={80}
                priority
              />
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden h-20" />
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8" justify="end">
          <NavbarItem aria-label="Accueil">
            <Link href="/" className={`${isActive('/')} font-semibold`}>
              Accueil
            </Link>
          </NavbarItem>

          {status === 'loading' ? (
            <Spinner size="sm" />
          ) : !isAuthenticated ? (
            <>
              <NavbarItem>
                <Link href="/register" className={`${isActive('/register')} font-semibold`}>
                  S'inscrire gratuitement
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/login" className={`${isActive('/login')} font-semibold`}>
                  Se connecter
                </Link>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem aria-label="Créer un livre">
                <Link href="/books/creatorBook" className={`${isActive('/books/creatorBook')} font-semibold`}>
                  Créer un livre
                </Link>
              </NavbarItem>
              <NavbarItem aria-label="Livres">
                <Link href="/dashboard" className={`${isActive('/dashboard')} font-semibold`}>
                  Livres
                </Link>
              </NavbarItem>
              <Dropdown
                isOpen={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                placement="bottom-end"
                className="border-1.5 border-secondary-200 text-content1 rounded-lg bg-background">
                <NavbarItem aria-label="Paramètres">
                  <DropdownTrigger>
                    <Avatar
                      as="button"
                      {...(selectedAvatar
                        ? { src: selectedAvatar }
                        : { name: session?.user?.name?.charAt(0) as string })}
                      className={`${isDropdownLinkActive}  text-md text-white isDropdownActive border-2 border-secondary-300 cursor-pointer`}
                    />
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label="Static Actions" className="font-bold w-full">
                  <DropdownItem
                    key="profile"
                    showDivider
                    aria-label="Profile"
                    className="h-13 w-full data-[hover=true]:bg-focus  rounded-lg">
                    <Link href={`/user/${userId}`} className={`${isActive(`/user/${userId}`)} font-semibold`}>
                      Mon compte
                    </Link>
                  </DropdownItem>

                  <DropdownItem
                    key="theme"
                    aria-label="Theme"
                    showDivider
                    className="py-2 data-[hover=true]:bg-focus rounded-lg">
                    <Button
                      onPress={onThemeModalOpen}
                      variant="flat"
                      aria-label="Modification du thème"
                      className="bg-transparent p-0 w-full text-content1 flex justify-start font-semibold"
                      endContent={<span className="bg-content2 border rounded-full ml-20 p-4 "></span>}>
                      Thème
                    </Button>
                  </DropdownItem>
                  <DropdownItem
                    key="avatar"
                    aria-label="Avatar"
                    showDivider
                    className="py-2 data-[hover=true]:bg-focus  rounded-lg">
                    <Button
                      onPress={onAvatarModalOpen}
                      variant="flat"
                      aria-label="Modification de l'avatar"
                      className="bg-transparent p-0 w-full text-content1 flex justify-start font-semibold"
                      endContent={
                        <Avatar
                          {...(selectedAvatar
                            ? { src: selectedAvatar }
                            : { name: session?.user?.name?.charAt(0) as string })}
                          className={`${isDropdownLinkActive} ml-20 text-md text-white isDropdownActive border cursor-pointer`}
                        />
                      }>
                      Avatar
                    </Button>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    aria-label="Logout"
                    className="data-[hover]:bg-red-100 rounded-lg relative">
                    <Button
                      onClick={() => handleSignOut()}
                      className="p-0 w-full flex bg-transparent justify-between text-red-200 font-semibold">
                      Se déconnecter
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>
        <ThemeSelector isOpen={isThemeModalOpen} onOpen={onThemeModalOpen} onOpenChange={onThemeModalOpenChange} />
        <AvatarSelector
          isOpen={isAvatarModalOpen}
          onOpen={onAvatarModalOpen}
          onOpenChange={onAvatarModalOpenChange}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          avatars={avatars}
        />

        <NavbarMenu className="mt-8 top-24  ">
          <NavbarMenuItem aria-label="Accueil" className="mt-2">
            <Link href="/" className={`${isActive('/')} font-semibold`}>
              Accueil
            </Link>
            <Divider className=" mt-2 " />
          </NavbarMenuItem>
          {status === 'loading' ? (
            <Spinner size="sm" />
          ) : !isAuthenticated ? (
            <>
              <NavbarMenuItem aria-label="S’inscrire">
                <Link href="/register" className={`${isActive('/register')} font-semibold`}>
                  S'inscrire gratuitement
                </Link>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem aria-label="Se connecter">
                <Link href="/login" className={`${isActive('/login')} font-semibold`}>
                  Se connecter
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem aria-label="Créer un livre">
                <Link href="/books/creatorBook" className={`${isActive('/books/creatorBook')} font-semibold`}>
                  Créer un livre
                </Link>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem aria-label="Livres">
                <Link href="/dashboard" className={`${isActive('/dashboard')} font-semibold`}>
                  Livres
                </Link>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem key="profile" aria-label="Mon compte" className="data-[hover=true]:bg-focus ">
                <Link href="/user/${userId}" className={`${isActive('/user/${userId}')} font-semibold`}>
                  Mon compte
                </Link>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem key="theme" aria-label="Theme" className=" data-[hover=true]:bg-focus rounded-lg ">
                <Button
                  onPress={onThemeModalOpen}
                  variant="flat"
                  aria-label="Modification du thème"
                  className="bg-transparent p-0 h-6.5 w-full text-lg text-content1 flex justify-start font-semibold">
                  Thème
                </Button>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem key="avatar" aria-label="Avatar" className=" data-[hover=true]:bg-focus  rounded-lg">
                <Button
                  onPress={onAvatarModalOpen}
                  variant="flat"
                  aria-label="Modification de l'avatar"
                  className="bg-transparent p-0 h-6.5 w-full text-content1 text-lg flex justify-start font-semibold">
                  Avatar
                </Button>
                <Divider className=" mt-2 " />
              </NavbarMenuItem>
              <NavbarMenuItem key="logout" aria-label="Se déconnecter" className="">
                <Button
                  onClick={() => handleSignOut()}
                  className="p-0  h-6.5 w-full flex bg-transparent text-lg font-semibold justify-start text-shadow text-shadow-outline text-red-700">
                  Se déconnecter
                </Button>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
        <ThemeSelector isOpen={isThemeModalOpen} onOpen={onThemeModalOpen} onOpenChange={onThemeModalOpenChange} />
        <AvatarSelector
          isOpen={isAvatarModalOpen}
          onOpen={onAvatarModalOpen}
          onOpenChange={onAvatarModalOpenChange}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          avatars={avatars}
        />
      </Navbar>
    </div>
  );
};
