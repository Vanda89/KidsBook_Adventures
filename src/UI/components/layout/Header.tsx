'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spinner } from '@nextui-org/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import ThemeSelector from '../ThemeSelector';
import { MdLogout } from 'react-icons/md';
import AvatarSelector from '../AvatarSelector';

export const Header = ({ userId }: { userId: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="h-32 font-nunito ">
      <Navbar className="w-full h-full flex flex-col border-b border-gray-500" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/assets/images/logo.jpg"
                alt="logo"
                className="cursor-pointer  md:w-28 md:h-30"
                width={60}
                height={60}
                priority
              />
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden h-20" />
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8  text-teal-600">
          <NavbarItem aria-label="Accueil">
            <Link className="" href="/">
              Accueil
            </Link>
          </NavbarItem>
          {userId === undefined ? (
            <Spinner size="sm" />
          ) : userId ? (
            <>
              <NavbarItem aria-label="Créer un livre">
                <Link href="/books/creatorBook">Créer un livre</Link>
              </NavbarItem>
              <NavbarItem aria-label="Livres">
                <Link href="/dashboard">Livres</Link>
              </NavbarItem>
              <Dropdown
                isOpen={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                placement="bottom-end"
                className="border-2 rounded-lg bg-white">
                <NavbarItem aria-label="Paramètres">
                  <DropdownTrigger>
                    <Avatar as="button" name="U" className="text-md border-2 cursor-pointer" />
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label="Static Actions" className="font-bold w-full">
                  <DropdownItem key="profile" aria-label="Profile" className="h-13 w-full hover:bg-gray-100 rounded-lg">
                    <Link href={`/user/${userId}`} className="block w-full h-full">
                      Mon compte
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="theme" aria-label="Theme" className="py-4 hover:bg-gray-100 rounded-lg">
                    <ThemeSelector />
                  </DropdownItem>
                  <DropdownItem key="avatar" aria-label="Avatar" className="py-4 hover:bg-gray-100 rounded-lg">
                    <AvatarSelector />
                  </DropdownItem>
                  <DropdownItem key="logout" aria-label="Logout" className=" data-[hover]:bg-red-100 rounded-lg">
                    <Button
                      onClick={() => signOut()}
                      className="p-0 w-full flex bg-transparent  justify-between text-red-600 ">
                      Se déconnecter
                      <MdLogout className="text-red-600" />
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <>
              <NavbarItem>
                <Link href="/register">S'inscrire gratuitement</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/login">Se connecter</Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarMenu className="mt-4 top-24">
          <NavbarMenuItem aria-label="Accueil">
            <Link className="" href="/">
              Accueil
            </Link>
          </NavbarMenuItem>
          {userId === undefined ? (
            <Spinner size="sm" />
          ) : userId ? (
            <>
              <NavbarMenuItem aria-label="Créer un livre">
                <Link href="/books/creatorBook">Créer un livre</Link>
              </NavbarMenuItem>
              <NavbarMenuItem aria-label="Livres">
                <Link href="/dashboard">Livres</Link>
              </NavbarMenuItem>
              <NavbarMenuItem key="profile" aria-label="Mon compte" className=" hover:bg-gray-100 ">
                <Link href="/users">Mon compte</Link>
              </NavbarMenuItem>
              <NavbarMenuItem key="theme" aria-label="Theme" className=" hover:bg-gray-100 ">
                <ThemeSelector />
              </NavbarMenuItem>
              <NavbarMenuItem key="logout" aria-label="Se déconnecter" className=" ">
                <Button
                  onClick={() => signOut()}
                  className="h-7 bg-transparent text-lg px-0 justify-between text-red-600 ">
                  Se déconnecter
                  <MdLogout className="text-red-600" />
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem aria-label="S’inscrire">
                <Link href="/register">S'inscrire gratuitement</Link>
              </NavbarMenuItem>
              <NavbarMenuItem aria-label="Se connecter">
                <Link href="/login">Se connecter</Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>
    </div>
  );
};
