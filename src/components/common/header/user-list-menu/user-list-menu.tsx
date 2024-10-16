'use client';
import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";

export default function UserListMenu({ isMobile }: { isMobile: boolean }) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
        className="avatar"
        style={{ borderRadius: "100%" }}
      ></MenuButton>
      <MenuList className="list-user">
        {isMobile && (
          <>
            <MenuItem className="item-user-menu">
              <Link href="/">Home</Link>
            </MenuItem>
            <MenuItem className="item-user-menu">
              <Link href="/cadastrar-contato">Cadastrar Contato</Link>
            </MenuItem>
          </>
        )}
        <MenuItem className="item-user-menu">
          <Link href="/login">Sair</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
